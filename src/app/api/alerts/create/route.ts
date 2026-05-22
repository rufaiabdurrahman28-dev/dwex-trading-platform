import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized } from '@/lib/api/response'

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return unauthorized()
    }

    const body = await request.json()
    const { symbol, condition, targetPrice } = body

    // Validate required fields
    if (!symbol || !condition || targetPrice === undefined) {
      return error('Symbol, condition, and targetPrice are required')
    }

    // Validate condition
    if (condition !== 'above' && condition !== 'below') {
      return error('Condition must be "above" or "below"')
    }

    // Validate targetPrice
    if (typeof targetPrice !== 'number' || targetPrice <= 0) {
      return error('targetPrice must be a positive number')
    }

    const alert = await db.priceAlert.create({
      data: {
        userId: user.id,
        symbol,
        condition,
        targetPrice,
        status: 'active',
      },
      select: {
        id: true,
        symbol: true,
        condition: true,
        targetPrice: true,
        status: true,
      },
    })

    return success({ alert }, 201)
  } catch (err) {
    return error('Failed to create alert', 500)
  }
}
