import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, unauthorized } from '@/lib/api/response'
import { allAssets } from '@/lib/assets'

export async function GET(request: Request) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  const { searchParams } = new URL(request.url)
  const statusFilter = searchParams.get('status')

  // Build where clause
  const where: any = { userId: user.id }
  if (statusFilter) {
    where.status = statusFilter
  }

  const positions = await db.position.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  // For open positions, calculate unrealized PnL using current prices
  const enrichedPositions = positions.map(pos => {
    if (pos.status === 'open') {
      const normalizedSymbol = pos.symbol.replace('/', '-')
      const asset = allAssets.find(
        a => a.symbol === pos.symbol || a.symbol.replace('/', '-') === normalizedSymbol
      )

      if (asset) {
        const currentPrice = asset.price
        let unrealizedPnl: number
        if (pos.direction === 'buy') {
          unrealizedPnl = (currentPrice - pos.openPrice) * pos.lotSize
        } else {
          unrealizedPnl = (pos.openPrice - currentPrice) * pos.lotSize
        }
        unrealizedPnl = unrealizedPnl - pos.swap - pos.commission

        return {
          ...pos,
          currentPrice,
          unrealizedPnl,
        }
      }

      return {
        ...pos,
        currentPrice: pos.openPrice,
        unrealizedPnl: 0,
      }
    }

    return pos
  })

  // Calculate totals for open positions
  const openPositions = enrichedPositions.filter(p => p.status === 'open')
  const totalOpen = openPositions.length
  const totalPnl = openPositions.reduce((sum, p) => sum + (p.unrealizedPnl || 0), 0)

  return success({
    positions: enrichedPositions,
    totalOpen,
    totalPnl,
  })
}
