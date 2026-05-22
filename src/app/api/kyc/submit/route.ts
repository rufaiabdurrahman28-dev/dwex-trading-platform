import { db } from '@/lib/db'
import { getAuthUser } from '@/lib/api/auth'
import { success, error, unauthorized } from '@/lib/api/response'

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user) return unauthorized()

  try {
    const body = await request.json()
    const { documentType, documentNumber, documentFrontUrl, documentBackUrl, selfieUrl } = body

    // Validate required fields
    if (!documentType || !documentNumber || !documentFrontUrl || !selfieUrl) {
      return error('Missing required fields: documentType, documentNumber, documentFrontUrl, selfieUrl')
    }

    const validDocTypes = ['passport', 'drivers_license', 'national_id', 'voters_card']
    if (!validDocTypes.includes(documentType)) {
      return error('Invalid document type. Must be one of: passport, drivers_license, national_id, voters_card')
    }

    // Check if user already has a KYC record
    const existingKyc = await db.kYC.findUnique({
      where: { userId: user.id },
    })

    // Prevent resubmission if already verified
    if (existingKyc?.status === 'verified') {
      return error('KYC already verified. No need to resubmit.', 409)
    }

    const now = new Date()

    let kyc
    if (existingKyc) {
      // Update existing KYC record
      kyc = await db.kYC.update({
        where: { id: existingKyc.id },
        data: {
          status: 'submitted',
          documentType,
          documentNumber,
          documentFrontUrl,
          documentBackUrl,
          selfieUrl,
          submittedAt: now,
          reviewedBy: null,
          reviewNote: null,
          reviewedAt: null,
        },
      })
    } else {
      // Create new KYC record
      kyc = await db.kYC.create({
        data: {
          userId: user.id,
          status: 'submitted',
          documentType,
          documentNumber,
          documentFrontUrl,
          documentBackUrl,
          selfieUrl,
          submittedAt: now,
        },
      })
    }

    return success({
      kyc: {
        id: kyc.id,
        status: kyc.status,
        documentType: kyc.documentType,
        submittedAt: kyc.submittedAt,
      },
    })
  } catch (err) {
    console.error('KYC submit error:', err)
    return error('Failed to submit KYC', 500)
  }
}
