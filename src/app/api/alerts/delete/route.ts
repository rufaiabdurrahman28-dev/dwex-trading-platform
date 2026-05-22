import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized, notFound } from '@/lib/api/response'

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return unauthorized()
    }

    const body = await request.json()
    const { alertId } = body

    if (!alertId) {
      return error('alertId is required')
    }

    const alert = await db.priceAlert.findUnique({
      where: { id: alertId },
    })

    if (!alert) {
      return notFound('Alert not found')
    }

    // Verify ownership
    if (alert.userId !== user.id) {
      return notFound('Alert not found')
    }

    await db.priceAlert.delete({
      where: { id: alertId },
    })

    return success({ message: 'Alert deleted' })
  } catch (err) {
    return error('Failed to delete alert', 500)
  }
}
