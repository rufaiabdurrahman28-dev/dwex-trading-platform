import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, unauthorized } from '@/lib/api/response'

export async function GET(request: Request) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const symbol = searchParams.get('symbol')

  // Build where clause — only closed positions
  const where: any = {
    userId: user.id,
    status: 'closed',
  }

  if (symbol) {
    // Support both BTC-USD and BTC/USD formats
    const normalizedSymbol = symbol.replace('-', '/')
    where.symbol = { in: [symbol, normalizedSymbol] }
  }

  const skip = (page - 1) * limit

  const [trades, total] = await Promise.all([
    db.position.findMany({
      where,
      orderBy: { closedAt: 'desc' },
      skip,
      take: limit,
    }),
    db.position.count({ where }),
  ])

  return success({
    trades,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  })
}
