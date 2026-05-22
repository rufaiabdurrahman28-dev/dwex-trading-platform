import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, unauthorized } from '@/lib/api/response'
import { brokerPhases } from '@/lib/trading-phases'

export async function GET() {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  const connections = await db.brokerConnection.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  })

  // Enrich connections with broker details from brokerPhases
  const enrichedConnections = connections.map(conn => {
    const brokerInfo = brokerPhases.find(b => b.id === conn.brokerId)
    return {
      id: conn.id,
      brokerId: conn.brokerId,
      brokerName: conn.brokerName,
      status: conn.status,
      accountId: conn.accountId,
      lastSyncedAt: conn.lastSyncedAt,
      createdAt: conn.createdAt,
      brokerDetails: brokerInfo
        ? {
            color: brokerInfo.color,
            assetCount: brokerInfo.assetCount,
            description: brokerInfo.description,
            supportedCategories: brokerInfo.supportedCategories,
            leverageMax: brokerInfo.leverageMax,
            commission: brokerInfo.commission,
            features: brokerInfo.features,
            isActive: brokerInfo.status === 'active',
          }
        : null,
    }
  })

  return success({
    connections: enrichedConnections,
  })
}
