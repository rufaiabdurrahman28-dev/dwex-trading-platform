import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import crypto from 'crypto'

const SESSION_DURATION_HOURS = 72

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':')
  const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return hash === verifyHash
}

export async function createSession(userId: string): Promise<string> {
  const token = crypto.randomBytes(48).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000)

  await db.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })

  return token
}

export async function getUserFromToken(token: string | undefined | null) {
  if (!token) return null

  const session = await db.session.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session) return null
  if (new Date() > session.expiresAt) {
    await db.session.delete({ where: { token } })
    return null
  }
  if (session.user.accountStatus === 'banned') return null

  return session.user
}

export async function getAuthUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('dwex_session')?.value
  return getUserFromToken(token || null)
}

export function generateApiKey(): string {
  return `dwex_${crypto.randomBytes(24).toString('hex')}`
}

export function generateSecret(): string {
  return crypto.randomBytes(32).toString('hex')
}
