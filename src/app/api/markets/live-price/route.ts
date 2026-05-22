// DWEX — Live Price API Endpoint
// GET /api/markets/live-price?symbols=BTC/USD,EUR/USD,XAU/USD

import { NextRequest, NextResponse } from 'next/server'
import { allAssets } from '@/lib/assets'

interface LivePriceData {
  price: number
  bid: number
  ask: number
  spread: number
  change: number
  timestamp: number
}

// Lazy-load the price engine to avoid initialization issues
let priceEngineStarted = false

async function getPriceEngine() {
  const { startPriceFeed, getLivePrice, getBidAsk, isEngineActive, getPriceEntry } = await import('@/lib/price-engine')

  // Ensure engine is started
  if (!priceEngineStarted || !isEngineActive()) {
    startPriceFeed()
    priceEngineStarted = true
  }

  return { getLivePrice, getBidAsk, getPriceEntry }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const symbolsParam = searchParams.get('symbols')

    if (!symbolsParam) {
      return NextResponse.json(
        { success: false, error: 'Missing "symbols" query parameter. Example: ?symbols=BTC/USD,EUR/USD' },
        { status: 400 }
      )
    }

    const symbols = symbolsParam.split(',').map(s => s.trim()).filter(Boolean)

    if (symbols.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid symbols provided' },
        { status: 400 }
      )
    }

    // Limit to 50 symbols per request to prevent abuse
    if (symbols.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Too many symbols. Maximum 50 per request.' },
        { status: 400 }
      )
    }

    // Try to get live prices from the price engine
    let engine: Awaited<ReturnType<typeof getPriceEngine>> | null = null
    try {
      engine = await getPriceEngine()
    } catch {
      // Price engine not available — will fallback to static prices
    }

    // Build a lookup map for static assets
    const assetMap = new Map(allAssets.map(a => [a.symbol, a]))

    const data: Record<string, LivePriceData> = {}

    for (const symbol of symbols) {
      // Try live price engine first
      if (engine) {
        try {
          const entry = engine.getPriceEntry(symbol)
          if (entry) {
            data[symbol] = {
              price: entry.price,
              bid: entry.bid,
              ask: entry.ask,
              spread: entry.spread,
              change: entry.change,
              timestamp: entry.timestamp,
            }
            continue
          }

          // No cache entry but engine is running — compute from live functions
          const livePrice = engine.getLivePrice(symbol)
          const bidAsk = engine.getBidAsk(symbol)
          if (livePrice > 0) {
            data[symbol] = {
              price: livePrice,
              bid: bidAsk.bid,
              ask: bidAsk.ask,
              spread: bidAsk.spread,
              change: 0,
              timestamp: Date.now(),
            }
            continue
          }
        } catch {
          // Engine error for this symbol — fall through to static
        }
      }

      // Fallback to static asset prices
      const asset = assetMap.get(symbol)
      if (asset) {
        // Compute approximate spread
        let spreadFraction = 0.0003
        switch (asset.category) {
          case 'forex': spreadFraction = 0.00003; break
          case 'crypto': spreadFraction = 0.0005; break
          case 'commodities': spreadFraction = 0.0002; break
          case 'indices': spreadFraction = 0.0001; break
          case 'stocks': spreadFraction = 0.0004; break
          case 'etfs': spreadFraction = 0.0003; break
          case 'synthetics': spreadFraction = 0.0001; break
        }
        const spread = Math.max(asset.price * spreadFraction, 0.01)

        data[symbol] = {
          price: asset.price,
          bid: asset.price - spread / 2,
          ask: asset.price + spread / 2,
          spread,
          change: asset.change,
          timestamp: Date.now(),
        }
      }
      // If symbol not found in static assets either, we skip it
    }

    return NextResponse.json({
      success: true,
      data,
      meta: {
        total: Object.keys(data).length,
        requested: symbols.length,
        engine: engine ? 'live' : 'static',
        timestamp: Date.now(),
      },
    })
  } catch (err) {
    console.error('[LivePrice API] Error:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch live prices' },
      { status: 500 }
    )
  }
}
