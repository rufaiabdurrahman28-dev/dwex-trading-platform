import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized, forbidden } from '@/lib/api/response'

export async function GET(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return unauthorized()
    }

    if (user.role !== 'admin') {
      return forbidden('Admin access required')
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const where: Record<string, unknown> = {}

    if (status) {
      where.status = status
    }

    const reviews = await db.kYC.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
            phone: true,
            accountStatus: true,
            createdAt: true,
          },
        },
      },
      orderBy: { submittedAt: 'desc' },
    })

    return success({ reviews })
  } catch (err) {
    return error('Failed to fetch KYC reviews', 500)
  }
}
