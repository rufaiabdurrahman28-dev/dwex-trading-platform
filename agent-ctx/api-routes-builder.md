# Task: DWEX API Routes - Market Data, Price Alerts, Admin

## Summary
Created 9 API route files for the DWEX trading platform covering Market Data, Price Alerts, and Admin functionality. Also added a `categories` export alias to `src/lib/assets.ts`.

## Files Created

### Market Routes
1. **`/src/app/api/markets/prices/route.ts`** (GET) - Fetches paginated market prices with category filter, search by symbol/name, and pagination
2. **`/src/app/api/markets/search/route.ts`** (GET) - Quick search returning top 10 assets matching query
3. **`/src/app/api/markets/categories/route.ts`** (GET) - Returns all categories with actual asset counts

### Alert Routes
4. **`/src/app/api/alerts/create/route.ts`** (POST) - Creates price alert with validation (condition=above/below, targetPrice>0)
5. **`/src/app/api/alerts/list/route.ts`** (GET) - Lists user's alerts with optional status filter
6. **`/src/app/api/alerts/delete/route.ts`** (POST) - Deletes alert with ownership verification

### Admin Routes
7. **`/src/app/api/admin/users/route.ts`** (GET) - Admin-only paginated user list with search and status filter (excludes passwordHash)
8. **`/src/app/api/admin/stats/route.ts`** (GET) - Admin-only dashboard stats (totalUsers, activeUsers, totalPositions, openPositions, totalDeposits, totalWalletBalance)
9. **`/src/app/api/admin/kyc-review/route.ts`** (GET) - Admin-only KYC review list with status filter and user data included

## File Modified
- **`/src/lib/assets.ts`** - Added `export const categories = assetCategories` alias for API route imports

## Technical Details
- All routes use `getAuthUser()` for authentication
- Admin routes check `user.role === 'admin'` and return `forbidden()` if not
- All responses use helper functions from `@/lib/api/response` (success, error, unauthorized, forbidden, notFound)
- Uses Prisma ORM via `db` from `@/lib/db`
- No lint or TypeScript errors in any new file
