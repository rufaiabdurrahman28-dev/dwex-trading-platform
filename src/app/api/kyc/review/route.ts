import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized, forbidden, notFound } from '@/lib/api/response'

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  // Check admin role
  if (user.role !== 'admin') {
    return forbidden('Admin access required')
  }

  try {
    const body = await request.json()
    const { userId, status, reviewNote } = body

    // Validate required fields
    if (!userId || !status) {
      return error('Missing required fields: userId, status')
    }

    const validStatuses = ['verified', 'rejected', 'submitted', 'pending']
    if (!validStatuses.includes(status)) {
      return error('Invalid status. Must be one of: verified, rejected, submitted, pending')
    }

    // Find the KYC record for the specified user
    const kyc = await db.kYC.findUnique({
      where: { userId },
    })

    if (!kyc) {
      return notFound('KYC record not found for this user')
    }

    const now = new Date()

    // Update KYC record
    const updatedKyc = await db.kYC.update({
      where: { id: kyc.id },
      data: {
        status,
        reviewedBy: user.id,
        reviewNote: reviewNote || null,
        reviewedAt: now,
      },
    })

    return success({
      kyc: {
        id: updatedKyc.id,
        userId: updatedKyc.userId,
        status: updatedKyc.status,
        documentType: updatedKyc.documentType,
        documentNumber: updatedKyc.documentNumber,
        reviewedBy: updatedKyc.reviewedBy,
        reviewNote: updatedKyc.reviewNote,
        submittedAt: updatedKyc.submittedAt,
        reviewedAt: updatedKyc.reviewedAt,
        createdAt: updatedKyc.createdAt,
        updatedAt: updatedKyc.updatedAt,
      },
    })
  } catch (err) {
    console.error('KYC review error:', err)
    return error('Failed to review KYC', 500)
  }
}
