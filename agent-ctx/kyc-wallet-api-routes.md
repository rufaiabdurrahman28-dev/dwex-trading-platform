# KYC & Wallet API Routes - Work Summary

## Task: Build KYC and Wallet API routes for DWEX trading platform

### Files Created

#### KYC Routes
1. **`/src/app/api/kyc/submit/route.ts`** (POST)
   - Authenticates user via `getAuthUser()`
   - Validates required fields: documentType, documentNumber, documentFrontUrl, selfieUrl
   - Validates documentType against allowed values
   - Prevents resubmission if already verified
   - Creates or updates KYC record with status='submitted', submittedAt=now
   - Returns: { kyc: { id, status, documentType, submittedAt } }

2. **`/src/app/api/kyc/status/route.ts`** (GET)
   - Authenticates user via `getAuthUser()`
   - Finds KYC record by userId
   - Returns null/none status if no record exists
   - Returns: { kyc: { id, status, documentType, documentNumber, submittedAt, reviewedAt, reviewNote } }

3. **`/src/app/api/kyc/review/route.ts`** (POST)
   - Authenticates user, checks role='admin' (returns 403 if not admin)
   - Accepts: { userId, status, reviewNote }
   - Validates status values
   - Updates KYC record: status, reviewedBy, reviewedAt, reviewNote
   - Returns: { kyc: updated record }

#### Wallet Routes
4. **`/src/app/api/wallet/balance/route.ts`** (GET)
   - Authenticates user
   - Finds all wallets for user
   - Calculates total USD equivalent using NGN rate of 1550
   - Handles NGN, USD, USDT, BTC, ETH currencies
   - Returns: { wallets, totalNGN, totalUSD }

5. **`/src/app/api/wallet/deposit/route.ts`** (POST)
   - Accepts: { amount, currency, method, reference? }
   - Validates amount > 0, valid method (paystack, bank_transfer, crypto, ussd), valid currency
   - Creates or finds wallet for currency
   - Creates transaction with type='deposit', status='processing'
   - Demo: immediately marks completed and increments wallet balance
   - Returns: { transaction, wallet }

6. **`/src/app/api/wallet/withdraw/route.ts`** (POST)
   - Accepts: { amount, currency, method, destination? }
   - Validates amount > 0, sufficient balance (balance - locked >= amount)
   - Creates transaction with type='withdrawal', status='processing'
   - Deducts from wallet balance using decrement
   - Returns: { transaction, wallet }

7. **`/src/app/api/wallet/transfer/route.ts`** (POST)
   - Accepts: { recipientEmail, amount, currency }
   - Validates recipient exists and is active, prevents self-transfer
   - Validates sender has sufficient balance
   - Creates two transactions: transfer_out (sender), transfer_in (recipient)
   - Updates both wallets atomically
   - Returns: { transaction, senderWallet, recipientWallet }

8. **`/src/app/api/wallet/transactions/route.ts`** (GET)
   - Accepts query params: ?type=&status=&page=1&limit=20
   - Validates type and status filter values
   - Paginates results with default limit=20
   - Returns: { transactions, total, page, limit }

### Verification
- Prisma schema already in sync (no changes needed)
- All new API files pass ESLint cleanly
- Endpoints tested: unauthenticated requests correctly return 401 with `{"success": false, "error": "Authentication required"}`
