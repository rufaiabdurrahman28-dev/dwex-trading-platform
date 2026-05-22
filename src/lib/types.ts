// DWEX Trading Platform — Types

export type Role = 'admin' | 'trader' | 'user'
export type KYCStatus = 'pending' | 'submitted' | 'verified' | 'rejected'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: Role
  phone?: string
  country?: string
  kyc_status: KYCStatus
  is_active: boolean
  created_at: string
}

export interface WalletData {
  id: string
  userId: string
  phase: string
  currency: string
  balance: number
  locked: number
  createdAt: string
}

export interface PortalAccess {
  trading: boolean
  wallet: boolean
  portfolio: boolean
  admin: boolean
  settings: boolean
}

export function getPortalAccess(role: Role): PortalAccess {
  switch (role) {
    case 'admin':
      return { trading: true, wallet: true, portfolio: true, admin: true, settings: true }
    case 'trader':
      return { trading: true, wallet: true, portfolio: true, admin: false, settings: true }
    case 'user':
      return { trading: true, wallet: true, portfolio: true, admin: false, settings: false }
    default:
      return { trading: true, wallet: true, portfolio: true, admin: false, settings: false }
  }
}
