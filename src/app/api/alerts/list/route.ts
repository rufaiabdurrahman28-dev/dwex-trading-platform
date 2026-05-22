import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized } from '@/lib/api/response'

export async function GET(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return unauthorized()
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where: Record<string, unknown> = {
      userId: user.id,
    }

    if (status) {
      where.status = status
    }

    const alerts = await db.priceAlert.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return success({ alerts })
  } catch (err) {
    return error('Failed to fetch alerts', 500)
  }
}
