// DWEX — Real-Time Price Engine
// On Vercel (serverless): uses on-demand price fetching via Deriv REST API
// On localhost (dev): uses WebSocket + simulated feeds for real-time updates

import { allAssets } from '@/lib/assets'

// ─────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────

interface PriceEntry {
  price: number
  bid: number
  ask: number
  spread: number
  change: number
  timestamp: number
  openPrice: number
}

type PriceCallback = (price: number) => void

// ─────────────────────────────────────────────────
// Deriv Symbol Mapping
// ─────────────────────────────────────────────────

const DERIV_SYMBOL_MAP: Record<string, string> = {
  'EUR/USD': 'frxEURUSD',
  'GBP/USD': 'frxGBPUSD',
  'USD/JPY': 'frxUSDJPY',
  'USD/CHF': 'frxUSDCHF',
  'AUD/USD': 'frxAUDUSD',
  'USD/CAD': 'frxUSDCAD',
  'NZD/USD': 'frxNZDUSD',
  'EUR/GBP': 'frxEURGBP',
  'EUR/JPY': 'frxEURJPY',
  'GBP/JPY': 'frxGBPJPY',
  'EUR/AUD': 'frxEURAUD',
  'EUR/CAD': 'frxEURCAD',
  'EUR/CHF': 'frxEURCHF',
  'GBP/AUD': 'frxGBPAUD',
  'GBP/CAD': 'frxGBPCAD',
  'GBP/CHF': 'frxGBPCHF',
  'AUD/JPY': 'frxAUDJPY',
  'NZD/JPY': 'frxNZDJPY',
  'AUD/NZD': 'frxAUDNZD',
  'CAD/JPY': 'frxCADJPY',
  'CHF/JPY': 'frxCHFJPY',
  'USD/TRY': 'frxUSDTRY',
  'USD/ZAR': 'frxUSDZAR',
  'USD/SGD': 'frxUSDSGD',
  'USD/HKD': 'frxUSDHKD',
  'USD/NOK': 'frxUSDNOK',
  'USD/SEK': 'frxUSDSEK',
  'USD/DKK': 'frxUSDDKK',
  'USD/PLN': 'frxUSDPLN',
  'USD/CZK': 'frxUSDCZK',
  'USD/HUF': 'frxUSDHUF',
  'USD/MXN': 'frxUSDMXN',
  'USD/BRL': 'frxUSDBRL',
  'USD/CNH': 'frxUSDCNH',
  'USD/INR': 'frxUSDINR',
  'USD/THB': 'frxUSDTHB',
  'USD/PHP': 'frxUSDPHP',
  'USD/IDR': 'frxUSDIDR',
  'USD/MYR': 'frxUSDMYR',
  'AUD/CHF': 'frxAUDCHF',
  'NZD/CHF': 'frxNZDCHF',
  'NZD/CAD': 'frxNZDCAD',
  'AUD/SGD': 'frxAUDSGD',
  'EUR/SGD': 'frxEURSGD',
  'GBP/SGD': 'frxGBPSGD',
  'CHF/SGD': 'frxCHFSGD',
  'CAD/SGD': 'frxCADSGD',
  'BTC/USD': 'frxBTCUSD',
  'ETH/USD': 'frxETHUSD',
  'LTC/USD': 'frxLTCUSD',
  'BCH/USD': 'frxBCHUSD',
}

const DERIV_REVERSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(DERIV_SYMBOL_MAP).map(([dwex, deriv]) => [deriv, dwex])
)

const DERIV_SYMBOLS = new Set(Object.keys(DERIV_SYMBOL_MAP))

// ─────────────────────────────────────────────────
// Spread Computation
// ─────────────────────────────────────────────────

function computeSpread(price: number, category: string): number {
  let spreadFraction: number
  switch (category) {
    case 'forex': spreadFraction = 0.00003; break
    case 'crypto': spreadFraction = 0.0005; break
    case 'commodities': spreadFraction = 0.0002; break
    case 'indices': spreadFraction = 0.0001; break
    case 'stocks': spreadFraction = 0.0004; break
    case 'etfs': spreadFraction = 0.0003; break
    case 'synthetics': spreadFraction = 0.0001; break
    default: spreadFraction = 0.0003
  }
  return Math.max(price * spreadFraction, 0.01)
}

// ─────────────────────────────────────────────────
// Deriv REST API — On-Demand Price Fetching
// Works in serverless (Vercel) environments
// ─────────────────────────────────────────────────

const derivPriceCache: Map<string, PriceEntry> = new Map()
const pendingFetches: Map<string, Promise<PriceEntry | null>> = new Map()
const CACHE_TTL = 5000 // 5 seconds cache

async function fetchDerivPrice(symbol: string): Promise<PriceEntry | null> {
  const derivSymbol = DERIV_SYMBOL_MAP[symbol]
  if (!derivSymbol) return null

  // Check cache first
  const cached = derivPriceCache.get(symbol)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached
  }

  // Deduplicate concurrent fetches
  const pending = pendingFetches.get(symbol)
  if (pending) return pending

  const fetchPromise = (async () => {
    try {
      const url = `https://api.binary.me/v3/tick?symbol=${encodeURIComponent(derivSymbol)}&count=1`
      const response = await fetch(url, {
        signal: AbortSignal.timeout(5000),
        headers: { 'Accept': 'application/json' },
      })

      if (!response.ok) return null

      const data = await response.json()
      if (data.msg_type !== 'tick' || !data.tick) return null

      const tick = data.tick
      const price = tick.quote
      if (!price || price <= 0) return null

      const asset = allAssets.find(a => a.symbol === symbol)
      const category = asset?.category ?? 'forex'
      const spread = computeSpread(price, category)
      const openPrice = asset ? asset.price / (1 + asset.change / 100) : price
      const change = openPrice !== 0 ? ((price - openPrice) / openPrice) * 100 : 0

      const entry: PriceEntry = {
        price,
        bid: price - spread / 2,
        ask: price + spread / 2,
        spread,
        change: Math.round(change * 100) / 100,
        timestamp: Date.now(),
        openPrice,
      }

      derivPriceCache.set(symbol, entry)
      return entry
    } catch {
      return null
    } finally {
      pendingFetches.delete(symbol)
    }
  })()

  pendingFetches.set(symbol, fetchPromise)
  return fetchPromise
}

// ─────────────────────────────────────────────────
// WebSocket Price Engine (dev/long-running server only)
// ─────────────────────────────────────────────────

class PriceEngine {
  private cache: Map<string, PriceEntry> = new Map()
  private subscribers: Map<string, Set<PriceCallback>> = new Map()
  private ws: WebSocket | null = null
  private simulatedIntervals: Map<string, ReturnType<typeof setInterval>> = new Map()
  private isRunning = false
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 50
  private baseReconnectDelay = 1000
  private subscribedDerivSymbols: Set<string> = new Set()
  private globalSubscribers: Set<PriceCallback> = new Set()

  constructor() {
    for (const asset of allAssets) {
      const spread = computeSpread(asset.price, asset.category)
      this.cache.set(asset.symbol, {
        price: asset.price,
        bid: asset.price - spread / 2,
        ask: asset.price + spread / 2,
        spread,
        change: asset.change,
        timestamp: Date.now(),
        openPrice: asset.price / (1 + asset.change / 100),
      })
    }
  }

  private connectDeriv(): void {
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return
    }

    try {
      this.ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089')

      this.ws.onopen = () => {
        console.log('[PriceEngine] Connected to Deriv WebSocket')
        this.reconnectAttempts = 0
        for (const symbol of Array.from(this.subscribedDerivSymbols)) {
          const derivSymbol = DERIV_SYMBOL_MAP[symbol]
          if (derivSymbol) {
            this.subscribeDerivTick(derivSymbol)
          }
        }
      }

      this.ws.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data)
          if (data.msg_type === 'tick' && data.tick) {
            this.handleDerivTick(data.tick)
          }
        } catch { /* ignore */ }
      }

      this.ws.onclose = () => {
        console.log('[PriceEngine] Deriv WebSocket closed')
        this.ws = null
        this.scheduleReconnect()
      }

      this.ws.onerror = () => { /* onclose fires after onerror */ }
    } catch (err) {
      console.error('[PriceEngine] Failed to connect Deriv WebSocket:', err)
      this.scheduleReconnect()
    }
  }

  private subscribeDerivTick(derivSymbol: string): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ ticks: derivSymbol }))
    }
  }

  private handleDerivTick(tick: { symbol: string; quote: number; epoch: number }): void {
    const dwexSymbol = DERIV_REVERSE_MAP[tick.symbol]
    if (!dwexSymbol) return

    const existing = this.cache.get(dwexSymbol)
    const price = tick.quote
    const category = existing ? this.getCategoryFromCache(dwexSymbol) : 'forex'
    const spread = computeSpread(price, category)
    const bid = price - spread / 2
    const ask = price + spread / 2
    const openPrice = existing?.openPrice ?? price
    const change = openPrice !== 0 ? ((price - openPrice) / openPrice) * 100 : 0

    const entry: PriceEntry = {
      price, bid, ask, spread,
      change: Math.round(change * 100) / 100,
      timestamp: tick.epoch * 1000,
      openPrice,
    }

    this.cache.set(dwexSymbol, entry)
    this.notifySubscribers(dwexSymbol, price)
  }

  private getCategoryFromCache(symbol: string): string {
    const asset = allAssets.find(a => a.symbol === symbol)
    return asset?.category ?? 'forex'
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return
    if (this.reconnectAttempts >= this.maxReconnectAttempts) return

    const delay = Math.min(
      this.baseReconnectDelay * Math.pow(2, this.reconnectAttempts),
      30000
    )
    this.reconnectAttempts++

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      if (this.isRunning) this.connectDeriv()
    }, delay)
  }

  private startSimulatedFeed(symbol: string): void {
    if (this.simulatedIntervals.has(symbol)) return

    const updateSimulatedPrice = () => {
      const entry = this.cache.get(symbol)
      if (!entry) return

      const movementPercent = (Math.random() * 0.08 - 0.04)
      const movement = entry.price * (movementPercent / 100)
      const newPrice = Math.max(entry.price + movement, 0.0001)

      const asset = allAssets.find(a => a.symbol === symbol)
      const category = asset?.category ?? 'forex'
      const spread = computeSpread(newPrice, category)
      const openPrice = entry.openPrice
      const change = openPrice !== 0 ? ((newPrice - openPrice) / openPrice) * 100 : 0

      const updated: PriceEntry = {
        price: Math.round(newPrice * 10000) / 10000,
        bid: Math.round((newPrice - spread / 2) * 10000) / 10000,
        ask: Math.round((newPrice + spread / 2) * 10000) / 10000,
        spread: Math.round(spread * 10000) / 10000,
        change: Math.round(change * 100) / 100,
        timestamp: Date.now(),
        openPrice,
      }

      this.cache.set(symbol, updated)
      this.notifySubscribers(symbol, updated.price)
    }

    const intervalMs = 1000 + Math.floor(Math.random() * 2000)
    const id = setInterval(updateSimulatedPrice, intervalMs)
    this.simulatedIntervals.set(symbol, id)
  }

  private stopSimulatedFeed(symbol: string): void {
    const id = this.simulatedIntervals.get(symbol)
    if (id !== undefined) {
      clearInterval(id)
      this.simulatedIntervals.delete(symbol)
    }
  }

  private notifySubscribers(symbol: string, price: number): void {
    const subs = this.subscribers.get(symbol)
    if (subs) {
      for (const cb of Array.from(subs)) {
        try { cb(price) } catch { /* ignore */ }
      }
    }
    for (const cb of Array.from(this.globalSubscribers)) {
      try { cb(price) } catch { /* ignore */ }
    }
  }

  startPriceFeed(): void {
    if (this.isRunning) return
    this.isRunning = true
    console.log('[PriceEngine] Starting price feed (WebSocket mode)...')
    this.connectDeriv()
    for (const symbol of Array.from(DERIV_SYMBOLS)) {
      this.subscribedDerivSymbols.add(symbol)
    }
    for (const asset of allAssets) {
      if (!DERIV_SYMBOLS.has(asset.symbol)) {
        this.startSimulatedFeed(asset.symbol)
      }
    }
  }

  stopPriceFeed(): void {
    if (!this.isRunning) return
    this.isRunning = false
    console.log('[PriceEngine] Stopping price feed...')
    if (this.ws) { this.ws.close(); this.ws = null }
    if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null }
    for (const symbol of Array.from(this.simulatedIntervals.keys())) {
      this.stopSimulatedFeed(symbol)
    }
    this.simulatedIntervals.clear()
    this.subscribedDerivSymbols.clear()
    this.globalSubscribers.clear()
  }

  getLivePrice(symbol: string): number {
    const entry = this.cache.get(symbol)
    if (entry) return entry.price
    const asset = allAssets.find(a => a.symbol === symbol)
    return asset?.price ?? 0
  }

  getBidAsk(symbol: string): { bid: number; ask: number; spread: number } {
    const entry = this.cache.get(symbol)
    if (entry) return { bid: entry.bid, ask: entry.ask, spread: entry.spread }
    const asset = allAssets.find(a => a.symbol === symbol)
    if (asset) {
      const spread = computeSpread(asset.price, asset.category)
      return { bid: asset.price - spread / 2, ask: asset.price + spread / 2, spread }
    }
    return { bid: 0, ask: 0, spread: 0 }
  }

  getPriceEntry(symbol: string): PriceEntry | null {
    return this.cache.get(symbol) ?? null
  }

  getAllPrices(): Map<string, PriceEntry> {
    return new Map(this.cache)
  }

  subscribeToPrice(symbol: string, callback: PriceCallback): () => void {
    if (!this.subscribers.has(symbol)) this.subscribers.set(symbol, new Set())
    this.subscribers.get(symbol)!.add(callback)
    return () => {
      const subs = this.subscribers.get(symbol)
      if (subs) { subs.delete(callback); if (subs.size === 0) this.subscribers.delete(symbol) }
    }
  }

  subscribeToAllPrices(callback: PriceCallback): () => void {
    this.globalSubscribers.add(callback)
    return () => { this.globalSubscribers.delete(callback) }
  }

  isActive(): boolean { return this.isRunning }
  getTrackedSymbolCount(): number { return this.cache.size }
}

// ─────────────────────────────────────────────────
// Singleton & Exports
// ─────────────────────────────────────────────────

const isServerless = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME

let engineInstance: PriceEngine | null = null

function getEngine(): PriceEngine {
  if (!engineInstance) {
    engineInstance = new PriceEngine()
  }
  return engineInstance
}

// Synchronous price lookup — uses cache or static fallback
export function getLivePrice(symbol: string): number {
  if (isServerless) {
    // In serverless, check Deriv REST cache first
    const cached = derivPriceCache.get(symbol)
    if (cached) return cached.price
    // Fallback to static
    const asset = allAssets.find(a => a.symbol === symbol)
    return asset?.price ?? 0
  }
  return getEngine().getLivePrice(symbol)
}

export function getBidAsk(symbol: string): { bid: number; ask: number; spread: number } {
  if (isServerless) {
    const cached = derivPriceCache.get(symbol)
    if (cached) return { bid: cached.bid, ask: cached.ask, spread: cached.spread }
    const asset = allAssets.find(a => a.symbol === symbol)
    if (asset) {
      const spread = computeSpread(asset.price, asset.category)
      return { bid: asset.price - spread / 2, ask: asset.price + spread / 2, spread }
    }
    return { bid: 0, ask: 0, spread: 0 }
  }
  return getEngine().getBidAsk(symbol)
}

// Async live price — fetches from Deriv REST API in serverless
export async function getLivePriceAsync(symbol: string): Promise<number> {
  if (isServerless) {
    // Try Deriv REST API for supported symbols
    const entry = await fetchDerivPrice(symbol)
    if (entry) return entry.price
    // Fallback to static
    const asset = allAssets.find(a => a.symbol === symbol)
    return asset?.price ?? 0
  }
  return getEngine().getLivePrice(symbol)
}

export function startPriceFeed(): void {
  if (isServerless) {
    console.log('[PriceEngine] Serverless mode — using on-demand REST API fetching')
    return
  }
  getEngine().startPriceFeed()
}

export function stopPriceFeed(): void {
  if (isServerless) return
  getEngine().stopPriceFeed()
}

export function subscribeToPrice(symbol: string, callback: PriceCallback): () => void {
  if (isServerless) return () => {} // No subscriptions in serverless
  return getEngine().subscribeToPrice(symbol, callback)
}

export function getPriceEntry(symbol: string) {
  if (isServerless) {
    return derivPriceCache.get(symbol) ?? null
  }
  return getEngine().getPriceEntry(symbol)
}

export function getAllPrices() {
  if (isServerless) {
    return new Map(derivPriceCache)
  }
  return getEngine().getAllPrices()
}

export function isEngineActive(): boolean {
  if (isServerless) return true // Always "active" in serverless (on-demand)
  return getEngine().isActive()
}

// Auto-start the engine ONLY in non-serverless environments
if (typeof window === 'undefined' && !isServerless) {
  setTimeout(() => {
    try {
      getEngine().startPriceFeed()
    } catch (err) {
      console.error('[PriceEngine] Failed to auto-start:', err)
    }
  }, 2000)
}
