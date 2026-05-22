# Task: Connect DWEX Frontend Pages to Backend APIs

## Summary
Connected all 12 frontend pages and 1 shared component to their respective backend APIs, replacing mock/static data with real API calls.

## Files Modified

### 1. `/src/app/login/page.tsx`
- Added `useRouter` for navigation
- Added loading/error states
- Replaced form `onSubmit` with actual `POST /api/auth/login` call
- On success: redirect to `/markets`
- Shows API error messages

### 2. `/src/app/signup/page.tsx`
- Added `useRouter` for navigation
- Added loading/error states
- Step 3 "Create Account" button now calls `POST /api/auth/signup`
- On success: redirect to `/kyc`
- Shows API error messages

### 3. `/src/app/kyc/page.tsx`
- Added loading/error states
- Step 4 "Submit Verification" now calls `POST /api/kyc/submit`
- On success: shows success state with navigation options
- Added `submitted` status display

### 4. `/src/app/wallet/page.tsx`
- On mount: fetches `GET /api/wallet/balance` and `GET /api/wallet/transactions`
- Deposit form calls `POST /api/wallet/deposit`
- Withdraw form calls `POST /api/wallet/withdraw`
- Transfer form calls `POST /api/wallet/transfer`
- Shows real balance data and transaction history with loading states

### 5. `/src/app/portfolio/page.tsx`
- On mount: fetches `GET /api/trade/positions`, `GET /api/trade/history`, `GET /api/brokers/status`
- Shows real open positions with PnL
- Shows real trade history
- Shows connected brokers

### 6. `/src/app/brokers/page.tsx`
- On mount: fetches `GET /api/brokers/status`
- Connect button calls `POST /api/brokers/connect`
- Disconnect button calls `POST /api/brokers/disconnect`
- Shows real connection status

### 7. `/src/app/markets/page.tsx`
- On mount: fetches `GET /api/markets/prices` with category filter
- Search uses API parameter
- Asset cards link to `/trade/[symbol]`

### 8. `/src/app/alerts/page.tsx`
- On mount: fetches `GET /api/alerts/list`
- Create form calls `POST /api/alerts/create`
- Delete button calls `POST /api/alerts/delete`

### 9. `/src/app/settings/page.tsx`
- On mount: fetches `GET /api/auth/me` for profile data
- Shows real user data (name, email, phone)
- Profile initials generated from real name

### 10. `/src/app/admin/page.tsx`
- On mount: fetches `GET /api/admin/stats`, `GET /api/admin/users`, `GET /api/admin/kyc-review`
- Shows real stats, user data, and KYC reviews

### 11. `/src/app/trade/[symbol]/page.tsx`
- On mount: fetches `GET /api/trade/positions` and `GET /api/trade/history`
- Buy/Sell buttons call `POST /api/trade/open`
- Close position calls `POST /api/trade/close`
- Shows open positions and trade history

### 12. `/src/components/shared/Navbar.tsx`
- On mount: checks auth via `GET /api/auth/me`
- If logged in: shows "Dashboard" link and "Logout" button
- If not logged in: shows "Log In" and "Start Trading" buttons
- Logout button calls `POST /api/auth/logout` then redirects to `/`
- Re-checks auth state on route changes

## Common Patterns Used
- All API calls use `fetch()` with `credentials: 'include'`
- All API calls have `try/catch` error handling
- Loading states shown with `Loader2` spinner component
- Error messages from API displayed in red alert boxes
- Success messages shown in green alert boxes
- Data fetching uses `useCallback` + `useEffect` pattern
- All existing visual designs preserved
