import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, unauthorized } from '@/lib/api/response'

export async function GET() {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  const kyc = await db.kYC.findUnique({
    where: { userId: user.id },
  })

  if (!kyc) {
    return success({
      kyc: {
        id: null,
        status: 'none',
        documentType: null,
        documentNumber: null,
        submittedAt: null,
        reviewedAt: null,
        reviewNote: null,
      },
    })
  }

  return success({
    kyc: {
      id: kyc.id,
      status: kyc.status,
      documentType: kyc.documentType,
      documentNumber: kyc.documentNumber,
      submittedAt: kyc.submittedAt,
      reviewedAt: kyc.reviewedAt,
      reviewNote: kyc.reviewNote,
    },
  })
}
