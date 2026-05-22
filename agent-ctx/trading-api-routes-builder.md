# Task: Build Trading and Broker API Routes for DWEX Platform

## Status: COMPLETED

## Summary
Built 8 API route files and 1 support module for the DWEX trading platform.

## Files Created

### Support Module
- `src/lib/trading-phases.ts` — BrokerPhases config with 18 brokers, helper functions (getBrokerById, getActiveBrokers, isBrokerActive)

### Broker Routes
1. `src/app/api/brokers/connect/route.ts` (POST) — Connect user to broker, auto-demo-connect, handles reconnection
2. `src/app/api/brokers/disconnect/route.ts` (POST) — Disconnect broker, auto-closes open positions with PnL settlement
3. `src/app/api/brokers/status/route.ts` (GET) — List all user broker connections with enriched broker details

### Trading Routes
4. `src/app/api/trade/open/route.ts` (POST) — Open position with margin validation, wallet locking, symbol validation
5. `src/app/api/trade/close/route.ts` (POST) — Close position with PnL calc, wallet unlock, transaction creation
6. `src/app/api/trade/positions/route.ts` (GET) — List positions with unrealized PnL for open positions
7. `src/app/api/trade/orders/route.ts` (GET) — List all orders
8. `src/app/api/trade/history/route.ts` (GET) — Paginated closed positions with symbol filter

## Key Implementation Details
- All routes use `getAuthUser()` for authentication check
- Uses `db` from `@/lib/db` (Prisma ORM with SQLite)
- Uses `success/error/unauthorized/forbidden/notFound` from `@/lib/api/response`
- Price data from `allAssets` in `@/lib/assets` (symbol format with '/' e.g. 'BTC/USD')
- Broker data from `brokerPhases` in `@/lib/trading-phases`
- Margin calculation: lotSize * openPrice * 0.01 (1%)
- PnL for buy: (closePrice - openPrice) * lotSize; for sell: (openPrice - closePrice) * lotSize
- Commission: 0.1% of margin
- All new files pass ESLint with no errors
- Database schema was already in sync (no changes needed)
