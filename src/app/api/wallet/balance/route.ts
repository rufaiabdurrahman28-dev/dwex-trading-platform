import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, unauthorized } from '@/lib/api/response'

const NGN_TO_USD_RATE = 1550

export async function GET() {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  const wallets = await db.wallet.findMany({
    where: { userId: user.id },
    orderBy: { currency: 'asc' },
  })

  // Calculate totals
  let totalNGN = 0
  let totalUSD = 0

  for (const wallet of wallets) {
    const available = wallet.balance - wallet.locked
    if (wallet.currency === 'NGN') {
      totalNGN += available
      totalUSD += available / NGN_TO_USD_RATE
    } else if (wallet.currency === 'USD') {
      totalNGN += available * NGN_TO_USD_RATE
      totalUSD += available
    } else if (wallet.currency === 'USDT') {
      // USDT is pegged to USD
      totalNGN += available * NGN_TO_USD_RATE
      totalUSD += available
    } else if (wallet.currency === 'BTC') {
      // Approximate BTC value (could use live rate in production)
      const btcUsd = 65000
      totalNGN += available * btcUsd * NGN_TO_USD_RATE
      totalUSD += available * btcUsd
    } else if (wallet.currency === 'ETH') {
      // Approximate ETH value
      const ethUsd = 3500
      totalNGN += available * ethUsd * NGN_TO_USD_RATE
      totalUSD += available * ethUsd
    }
  }

  return success({
    wallets,
    totalNGN: Math.round(totalNGN * 100) / 100,
    totalUSD: Math.round(totalUSD * 100) / 100,
  })
}
