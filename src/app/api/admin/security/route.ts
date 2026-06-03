import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized, forbidden } from '@/lib/api/response'
import { getSecurityStats, getAuditLogs, detectSuspiciousActivity } from '@/lib/api/audit-log'

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) {
      return unauthorized()
    }

    if (user.role !== 'admin') {
      return forbidden('Admin access required')
    }

    const stats = getSecurityStats()
    const alerts = detectSuspiciousActivity()
    const recentLogs = getAuditLogs({ limit: 50 })

    return success({
      stats,
      alerts,
      recentLogs,
    })
  } catch (err) {
    return error('Failed to fetch security data', 500)
  }
}
