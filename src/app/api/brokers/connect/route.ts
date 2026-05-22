import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized, notFound } from '@/lib/api/response'
import { getBrokerById, isBrokerActive } from '@/lib/trading-phases'

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  const body = await request.json()
  const { brokerId } = body

  if (!brokerId) {
    return error('Broker ID is required')
  }

  // Check if broker exists and is active
  const broker = getBrokerById(brokerId)
  if (!broker) {
    return notFound('Broker not found')
  }

  if (!isBrokerActive(brokerId)) {
    return error('This broker is not currently available for connection', 400)
  }

  // Check if user already has a connection
  const existingConnection = await db.brokerConnection.findUnique({
    where: {
      userId_brokerId: {
        userId: user.id,
        brokerId,
      },
    },
  })

  if (existingConnection) {
    if (existingConnection.status === 'connected') {
      return error('Already connected to this broker', 409)
    }
    // Re-connect if previously disconnected
    const connection = await db.brokerConnection.update({
      where: { id: existingConnection.id },
      data: {
        status: 'connected',
        accountId: `DEMO-${brokerId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
        accessToken: `demo_token_${Math.random().toString(36).substring(2)}`,
        lastSyncedAt: new Date(),
      },
    })

    return success({
      connection: {
        id: connection.id,
        brokerId: connection.brokerId,
        brokerName: connection.brokerName,
        status: connection.status,
      },
    })
  }

  // Create new connection (demo: auto-connect)
  const connection = await db.brokerConnection.create({
    data: {
      userId: user.id,
      brokerId,
      brokerName: broker.name,
      status: 'connected',
      accountId: `DEMO-${brokerId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
      accessToken: `demo_token_${Math.random().toString(36).substring(2)}`,
      refreshToken: `demo_refresh_${Math.random().toString(36).substring(2)}`,
      lastSyncedAt: new Date(),
      metadata: JSON.stringify({ demo: true, leverageMax: broker.leverageMax }),
    },
  })

  return success({
    connection: {
      id: connection.id,
      brokerId: connection.brokerId,
      brokerName: connection.brokerName,
      status: connection.status,
    },
  })
}
