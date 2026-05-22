import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized } from '@/lib/api/response'

const VALID_TYPES = ['deposit', 'withdrawal', 'transfer_in', 'transfer_out', 'trade_profit', 'trade_loss', 'fee', 'bonus']
const VALID_STATUSES = ['pending', 'processing', 'completed', 'failed', 'cancelled']

export async function GET(request: Request) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const pageParam = searchParams.get('page')
    const limitParam = searchParams.get('limit')

    // Parse and validate pagination
    const page = Math.max(1, parseInt(pageParam || '1', 10) || 1)
    const limit = Math.min(100, Math.max(1, parseInt(limitParam || '20', 10) || 20))
    const skip = (page - 1) * limit

    // Build filter
    const where: any = { userId: user.id }

    if (type) {
      if (!VALID_TYPES.includes(type)) {
        return error(`Invalid type filter. Must be one of: ${VALID_TYPES.join(', ')}`)
      }
      where.type = type
    }

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return error(`Invalid status filter. Must be one of: ${VALID_STATUSES.join(', ')}`)
      }
      where.status = status
    }

    // Fetch transactions with pagination
    const [transactions, total] = await Promise.all([
      db.transaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      db.transaction.count({ where }),
    ])

    return success({
      transactions,
      total,
      page,
      limit,
    })
  } catch (err) {
    console.error('Wallet transactions error:', err)
    return error('Failed to fetch transactions', 500)
  }
}
