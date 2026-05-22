import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized, forbidden } from '@/lib/api/response'

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) {
      return unauthorized()
    }

    if (user.role !== 'admin') {
      return forbidden('Admin access required')
    }

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const [
      totalUsers,
      activeUsers,
      totalPositions,
      openPositions,
      totalDepositsResult,
      totalWalletBalanceResult,
    ] = await Promise.all([
      db.user.count(),
      db.user.count({
        where: {
          sessions: {
            some: {
              createdAt: { gte: thirtyDaysAgo },
            },
          },
        },
      }),
      db.position.count(),
      db.position.count({
        where: { status: 'open' },
      }),
      db.transaction.aggregate({
        where: {
          type: 'deposit',
          status: 'completed',
        },
        _sum: {
          amount: true,
        },
      }),
      db.wallet.aggregate({
        _sum: {
          balance: true,
        },
      }),
    ])

    const totalDeposits = totalDepositsResult._sum.amount || 0
    const totalWalletBalance = totalWalletBalanceResult._sum.balance || 0

    return success({
      stats: {
        totalUsers,
        activeUsers,
        totalPositions,
        openPositions,
        totalDeposits,
        totalWalletBalance,
      },
    })
  } catch (err) {
    return error('Failed to fetch admin stats', 500)
  }
}
