import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized, notFound } from '@/lib/api/response'

const VALID_METHODS = ['paystack', 'bank_transfer', 'crypto', 'ussd']
const VALID_CURRENCIES = ['NGN', 'USD', 'BTC', 'ETH', 'USDT']

// Minimum withdrawal amounts
const MIN_WITHDRAWAL_USD = 5
const MIN_WITHDRAWAL_NGN = 2000

const USD_TO_NGN_RATE = 1550

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  try {
    const body = await request.json()
    const { amount, currency, method, destination, brokerId } = body

    // Validate amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return error('Amount must be a positive number')
    }

    // Validate currency
    const normalizedCurrency = currency?.toUpperCase()
    if (!normalizedCurrency || !VALID_CURRENCIES.includes(normalizedCurrency)) {
      return error(`Invalid currency. Must be one of: ${VALID_CURRENCIES.join(', ')}`)
    }

    // Validate method
    if (!method || !VALID_METHODS.includes(method)) {
      return error(`Invalid method. Must be one of: ${VALID_METHODS.join(', ')}`)
    }

    // ═══════════════════════════════════════════════════
    // WITHDRAWAL FLOW FOR TRADING PLATFORM
    //
    // Trading happens in USD. Users deposit NGN → converted to USD → trade in USD.
    // When withdrawing, they withdraw from their USD wallet.
    // They can withdraw MORE than they deposited because:
    //   balance = deposits + trading_profits - trading_losses
    //
    // If currency is NGN, we convert USD → NGN for payout.
    // If currency is USD, we withdraw directly from USD wallet.
    // ═══════════════════════════════════════════════════

    // Determine which wallet to withdraw from
    // For NGN withdrawal requests, we still deduct from the USD wallet (and show NGN equivalent)
    let withdrawFromCurrency = normalizedCurrency
    let withdrawAmountInWalletCurrency = amount

    if (normalizedCurrency === 'NGN') {
      // User wants NGN — but funds are in USD wallet. Convert NGN → USD to determine deduction.
      withdrawFromCurrency = 'USD'
      withdrawAmountInWalletCurrency = parseFloat((amount / USD_TO_NGN_RATE).toFixed(2))
    }

    // Validate minimum withdrawal amount
    if (normalizedCurrency === 'USD' && amount < MIN_WITHDRAWAL_USD) {
      return error(`Minimum withdrawal amount is $${MIN_WITHDRAWAL_USD} USD`)
    }
    if (normalizedCurrency === 'NGN' && amount < MIN_WITHDRAWAL_NGN) {
      return error(`Minimum withdrawal amount is ₦${MIN_WITHDRAWAL_NGN.toLocaleString()} NGN`)
    }

    // Find wallet for the withdrawal currency
    const wallet = await db.wallet.findUnique({
      where: {
        userId_currency: {
          userId: user.id,
          currency: withdrawFromCurrency,
        },
      },
    })

    if (!wallet) {
      return notFound(`No ${withdrawFromCurrency} wallet found. Please deposit funds first.`)
    }

    // Calculate available (unlocked) balance
    // Available = balance - locked (locked = margin in open positions)
    const availableBalance = wallet.balance - wallet.locked

    if (availableBalance <= 0) {
      return error(
        `No available balance to withdraw. Your total balance is ${wallet.balance.toFixed(2)} ${withdrawFromCurrency}, but ${wallet.locked.toFixed(2)} ${withdrawFromCurrency} is locked as margin in open positions. Close your positions to free up funds.`
      )
    }

    if (availableBalance < withdrawAmountInWalletCurrency) {
      // Show the available in the user's requested currency
      const availableDisplay = normalizedCurrency === 'NGN'
        ? `₦${(availableBalance * USD_TO_NGN_RATE).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} NGN`
        : `$${availableBalance.toFixed(2)} USD`

      return error(
        `Insufficient available balance. You can withdraw up to ${availableDisplay}. The remaining ${wallet.locked.toFixed(2)} ${withdrawFromCurrency} is locked as margin in open positions and cannot be withdrawn until those positions are closed.`
      )
    }

    // Build transaction metadata
    const metadata: Record<string, any> = {
      walletId: wallet.id,
      destination: destination || null,
    }
    if (brokerId) {
      metadata.brokerId = brokerId
    }
    if (normalizedCurrency === 'NGN' && withdrawFromCurrency === 'USD') {
      metadata.conversionRate = USD_TO_NGN_RATE
      metadata.withdrawnUSD = withdrawAmountInWalletCurrency
      metadata.paidNGN = amount
    }

    // Create transaction
    const transaction = await db.transaction.create({
      data: {
        userId: user.id,
        type: 'withdrawal',
        amount: normalizedCurrency === 'NGN' ? amount : withdrawAmountInWalletCurrency,
        currency: normalizedCurrency,
        status: 'processing',
        method,
        reference: destination || null,
        description: normalizedCurrency === 'NGN'
          ? `Withdrawal of ₦${amount.toLocaleString()} NGN via ${method} (≈ $${withdrawAmountInWalletCurrency.toFixed(2)} USD at rate 1 USD = ₦${USD_TO_NGN_RATE})`
          : `Withdrawal of $${withdrawAmountInWalletCurrency.toFixed(2)} ${normalizedCurrency} via ${method}`,
        metadata: JSON.stringify(metadata),
      },
    })

    // Deduct from wallet balance in the wallet's currency (USD)
    // IMPORTANT: balance can include trading profits, so user can withdraw MORE than deposited
    const [updatedTransaction, updatedWallet] = await Promise.all([
      db.transaction.update({
        where: { id: transaction.id },
        data: { status: 'completed' },
      }),
      db.wallet.update({
        where: { id: wallet.id },
        data: { balance: { decrement: withdrawAmountInWalletCurrency } },
      }),
    ])

    return success({
      transaction: updatedTransaction,
      wallet: {
        id: updatedWallet.id,
        currency: updatedWallet.currency,
        balance: updatedWallet.balance,
        locked: updatedWallet.locked,
        available: updatedWallet.balance - updatedWallet.locked,
      },
      conversion: normalizedCurrency === 'NGN' ? {
        from: 'USD',
        to: 'NGN',
        deductedFromWallet: withdrawAmountInWalletCurrency,
        paidOut: amount,
        rate: USD_TO_NGN_RATE,
      } : null,
    })
  } catch (err) {
    console.error('Wallet withdraw error:', err)
    return error('Failed to process withdrawal', 500)
  }
}
