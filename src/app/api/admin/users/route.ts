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
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    const where: Record<string, unknown> = {}

    if (search) {
      where.OR = [
        { email: { contains: search } },
        { fullName: { contains: search } },
        { phone: { contains: search } },
      ]
    }

    if (status) {
      where.accountStatus = status
    }

    const total = await db.user.count({ where })

    const users = await db.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        accountStatus: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })

    return success({ users, total, page, limit })
  } catch (err) {
    return error('Failed to fetch users', 500)
  }
}
