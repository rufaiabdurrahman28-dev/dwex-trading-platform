# Task: Build DWEX TradingChart Component & Rebuild Trade Page

## Agent: code-builder

## Summary

Built two major features for the DWEX trading platform:

### 1. TradingChart Component (`/src/components/trading/TradingChart.tsx`)
- Real candlestick chart using lightweight-charts v5
- Dark navy theme matching platform colors (#0D1B30 background, #1E3A5F grid)
- Up candles: #00D4AA, Down candles: #E63950
- Volume bars with 30% opacity for both directions
- Generates 200 initial candles based on asset base price
- Polls `/api/markets/live-price` every 3 seconds for live updates
- Supports timeframes: 1m, 5m, 15m, 1H, 4H, 1D, 1W
- Responsive with ResizeObserver
- Proper cleanup on unmount
- Crosshair with price line
- Dynamic import with SSR disabled to avoid Turbopack issues

### 2. Rebuilt Trade Page (`/src/app/trade/page.tsx`)

**Left Panel (Asset Selector):**
- Searchable dropdown with full pair display (BASE/QUOTE with highlighted base, muted quote)
- Category filter chips (All, Forex, Crypto, Stocks, etc.)
- Popular pairs section at top
- Real-time price and change% from live-price API
- Category badges with color coding
- Scrollable watchlist with live updating prices

**Center Panel (Chart + Positions):**
- Real TradingChart component with candlestick + volume
- Chart header with symbol, live price, change%, and timeframe buttons
- Positions panel with tabs: Open, Pending, History
- Fetches positions from `/api/trade/positions?status=open`
- Fetches history from `/api/trade/history`
- Close position calls `/api/trade/close`
- P&L updates with live price ticks
- Loading spinners on close actions

**Right Panel (Order Panel):**
- Trading Phase selector from connected brokers (fetched from `/api/brokers/status`)
- Buy/Sell toggle with accent colors
- Order Type (Market/Limit/Stop)
- Amount input with QUOTE currency label (dynamic based on pair)
- Dynamic leverage slider based on broker's max leverage
- Stop Loss / Take Profit inputs
- Estimated Margin display
- Submit calls `/api/trade/open`
- Toast notifications for success/failure
- Loading state on submit

**State Management:**
- All local state with useState
- useEffect with fetch for API calls
- Poll live prices every 3 seconds
- Dynamic leverage options based on broker
- Asset filtering by broker phase and category

## Technical Notes
- Used `next/dynamic` with `ssr: false` for TradingChart to avoid Turbopack crash with ESM-only lightweight-charts
- All colors match dark navy theme: bg-[#0A1628], bg-[#0F1F3A], border-[#1E3A5F], accent #00D4AA
- Dev server compiles successfully, trade page returns 200
- Live-price API confirmed working with Deriv WebSocket connection
