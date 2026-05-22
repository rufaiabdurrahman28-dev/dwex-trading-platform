'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  createChart,
  ColorType,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  Time,
  CrosshairMode,
} from 'lightweight-charts'
import { allAssets } from '@/lib/assets'

interface TradingChartProps {
  symbol: string
  height?: number
  timeframe?: string
}

// Base prices from allAssets for generating initial data
function getBasePrice(symbol: string): number {
  const asset = allAssets.find(a => a.symbol === symbol)
  return asset?.price ?? 100
}

// Generate initial candlestick data (last 200 candles)
function generateCandlestickData(
  symbol: string,
  timeframe: string,
  count: number = 200
): CandlestickData<Time>[] {
  const basePrice = getBasePrice(symbol)
  const data: CandlestickData<Time>[] = []

  // Determine time interval in seconds based on timeframe
  let intervalSeconds: number
  switch (timeframe) {
    case '1m': intervalSeconds = 60; break
    case '5m': intervalSeconds = 300; break
    case '15m': intervalSeconds = 900; break
    case '1H': intervalSeconds = 3600; break
    case '4H': intervalSeconds = 14400; break
    case '1D': intervalSeconds = 86400; break
    case '1W': intervalSeconds = 604800; break
    default: intervalSeconds = 900
  }

  // Calculate volatility based on price level
  let volatility: number
  if (basePrice < 1) volatility = 0.005
  else if (basePrice < 10) volatility = 0.003
  else if (basePrice < 100) volatility = 0.002
  else if (basePrice < 1000) volatility = 0.0015
  else if (basePrice < 10000) volatility = 0.001
  else volatility = 0.0008

  const now = Math.floor(Date.now() / 1000)
  const startTime = now - (count * intervalSeconds)

  let currentPrice = basePrice * (1 - volatility * count * 0.3) // start lower to trend up

  for (let i = 0; i < count; i++) {
    const time = startTime + (i * intervalSeconds) as Time

    // Random walk with slight upward bias
    const change = currentPrice * volatility * (Math.random() - 0.48)
    const open = currentPrice
    const close = open + change

    // Generate high/low with some noise
    const range = Math.abs(change) + currentPrice * volatility * 0.5 * Math.random()
    const high = Math.max(open, close) + range * Math.random()
    const low = Math.min(open, close) - range * Math.random()

    currentPrice = close

    data.push({
      time,
      open: parseFloat(open.toFixed(basePrice < 1 ? 6 : basePrice < 100 ? 4 : 2)),
      high: parseFloat(high.toFixed(basePrice < 1 ? 6 : basePrice < 100 ? 4 : 2)),
      low: parseFloat(low.toFixed(basePrice < 1 ? 6 : basePrice < 100 ? 4 : 2)),
      close: parseFloat(close.toFixed(basePrice < 1 ? 6 : basePrice < 100 ? 4 : 2)),
    })
  }

  return data
}

// Generate volume data from candlestick data
function generateVolumeData(
  candleData: CandlestickData<Time>[],
  basePrice: number
): { time: Time; value: number; color: string }[] {
  return candleData.map((candle) => {
    const isUp = candle.close >= candle.open
    const baseVolume = basePrice < 10 ? 1000000 : basePrice < 1000 ? 100000 : 10000
    const volume = baseVolume * (0.5 + Math.random() * 1.5)

    return {
      time: candle.time,
      value: parseFloat(volume.toFixed(0)),
      color: isUp ? 'rgba(0, 212, 170, 0.3)' : 'rgba(230, 57, 80, 0.3)',
    }
  })
}

export default function TradingChart({ symbol, height, timeframe = '15m' }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null)
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [chartHeight, setChartHeight] = useState(height ?? 0)
  const lastCandleRef = useRef<CandlestickData<Time> | null>(null)
  const symbolRef = useRef(symbol)
  const timeframeRef = useRef(timeframe)

  // Format price based on price level
  const getDecimals = useCallback((price: number): number => {
    if (price < 0.001) return 8
    if (price < 1) return 6
    if (price < 100) return 4
    return 2
  }, [])

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current) return

    // Clean up any existing chart
    if (chartRef.current) {
      chartRef.current.remove()
      chartRef.current = null
    }

    const container = chartContainerRef.current

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: '#0D1B30' },
        textColor: '#64748B',
        fontSize: 11,
      },
      grid: {
        vertLines: { color: 'rgba(30, 58, 95, 0.5)' },
        horzLines: { color: 'rgba(30, 58, 95, 0.5)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: 'rgba(0, 212, 170, 0.4)',
          width: 1,
          style: 2,
          labelBackgroundColor: '#1A2D4A',
        },
        horzLine: {
          color: 'rgba(0, 212, 170, 0.4)',
          width: 1,
          style: 2,
          labelBackgroundColor: '#1A2D4A',
        },
      },
      rightPriceScale: {
        borderColor: '#1E3A5F',
        scaleMargins: {
          top: 0.1,
          bottom: 0.25,
        },
      },
      timeScale: {
        borderColor: '#1E3A5F',
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 5,
        barSpacing: 8,
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    })

    chartRef.current = chart

    // Add candlestick series
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#00D4AA',
      downColor: '#E63950',
      borderUpColor: '#00D4AA',
      borderDownColor: '#E63950',
      wickUpColor: '#00D4AA',
      wickDownColor: '#E63950',
    })
    candleSeriesRef.current = candleSeries

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'volume',
    })
    volumeSeriesRef.current = volumeSeries

    // Configure volume scale
    chart.priceScale('volume').applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    // Generate and set initial data
    const basePrice = getBasePrice(symbol)
    const candleData = generateCandlestickData(symbol, timeframe)
    const volumeData = generateVolumeData(candleData, basePrice)

    candleSeries.setData(candleData)
    volumeSeries.setData(volumeData)

    // Store the last candle for live updates
    lastCandleRef.current = candleData[candleData.length - 1] ?? null

    // Fit content
    chart.timeScale().fitContent()

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        const w = chartContainerRef.current.clientWidth
        const h = chartContainerRef.current.clientHeight
        chart.applyOptions({ width: w, height: h || 400 })
      }
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    // Initial size - use container dimensions
    const initialHeight = container.clientHeight || 400
    chart.applyOptions({
      width: container.clientWidth,
      height: initialHeight,
    })

    return () => {
      resizeObserver.disconnect()
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = null
      }
      chart.remove()
      chartRef.current = null
      candleSeriesRef.current = null
      volumeSeriesRef.current = null
    }
  }, [symbol, timeframe, chartHeight, getDecimals])

  // Polling for live price updates
  useEffect(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current)
      pollIntervalRef.current = null
    }

    symbolRef.current = symbol
    timeframeRef.current = timeframe

    const fetchLivePrice = async () => {
      try {
        const response = await fetch(`/api/markets/live-price?symbols=${encodeURIComponent(symbolRef.current)}`)
        const result = await response.json()

        if (!result.success || !result.data) return

        const priceData = result.data[symbolRef.current]
        if (!priceData || !candleSeriesRef.current || !volumeSeriesRef.current) return

        const price = priceData.price
        const now = Math.floor(Date.now() / 1000)

        // Determine the candle time based on timeframe
        let intervalSeconds: number
        switch (timeframeRef.current) {
          case '1m': intervalSeconds = 60; break
          case '5m': intervalSeconds = 300; break
          case '15m': intervalSeconds = 900; break
          case '1H': intervalSeconds = 3600; break
          case '4H': intervalSeconds = 14400; break
          case '1D': intervalSeconds = 86400; break
          case '1W': intervalSeconds = 604800; break
          default: intervalSeconds = 900
        }

        const candleTime = Math.floor(now / intervalSeconds) * intervalSeconds as Time

        const decimals = price < 1 ? 6 : price < 100 ? 4 : 2

        if (lastCandleRef.current && lastCandleRef.current.time === candleTime) {
          // Update existing candle
          const updated: CandlestickData<Time> = {
            time: candleTime,
            open: lastCandleRef.current.open,
            high: Math.max(lastCandleRef.current.high, price),
            low: Math.min(lastCandleRef.current.low, price),
            close: parseFloat(price.toFixed(decimals)),
          }
          lastCandleRef.current = updated

          try {
            candleSeriesRef.current.update(updated)

            const isUp = updated.close >= updated.open
            volumeSeriesRef.current.update({
              time: candleTime,
              value: parseFloat((Math.random() * 50000 + 10000).toFixed(0)),
              color: isUp ? 'rgba(0, 212, 170, 0.3)' : 'rgba(230, 57, 80, 0.3)',
            })
          } catch {
            // lightweight-charts may throw on duplicate time updates
          }
        } else {
          // New candle
          const newCandle: CandlestickData<Time> = {
            time: candleTime,
            open: parseFloat(price.toFixed(decimals)),
            high: parseFloat(price.toFixed(decimals)),
            low: parseFloat(price.toFixed(decimals)),
            close: parseFloat(price.toFixed(decimals)),
          }
          lastCandleRef.current = newCandle

          try {
            candleSeriesRef.current.update(newCandle)
            volumeSeriesRef.current.update({
              time: candleTime,
              value: parseFloat((Math.random() * 50000 + 10000).toFixed(0)),
              color: 'rgba(0, 212, 170, 0.3)',
            })
          } catch {
            // May throw if time is before existing data
          }
        }
      } catch (err) {
        // Silently handle fetch errors
      }
    }

    // Start polling every 3 seconds
    pollIntervalRef.current = setInterval(fetchLivePrice, 3000)

    // Initial fetch
    fetchLivePrice()

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = null
      }
    }
  }, [symbol, timeframe])

  // Handle container resize for height
  useEffect(() => {
    if (chartRef.current && chartContainerRef.current) {
      chartRef.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartHeight,
      })
    }
  }, [chartHeight])

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-full"
      style={{ minHeight: '300px' }}
    />
  )
}
