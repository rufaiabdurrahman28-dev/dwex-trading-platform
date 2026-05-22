import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, unauthorized } from '@/lib/api/response'

export async function GET() {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  const orders = await db.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  return success({
    orders,
  })
}
