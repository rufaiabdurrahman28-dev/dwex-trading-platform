export type Role = 'parent' | 'student' | 'teacher' | 'manager'
export type Section = 'nursery' | 'primary' | 'jss' | 'sss'
export type AdmissionStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected'
export type FileStatus = 'pending' | 'approved' | 'not_approved'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: Role
  section: Section
  created_at: string
}

export interface PortalAccess {
  management: boolean
  school: boolean
  teacher: boolean
  student: boolean
  helpdesk: boolean
}

export function getPortalAccess(role: Role): PortalAccess {
  switch (role) {
    case 'manager':
      return { management: true, school: true, teacher: true, student: true, helpdesk: true }
    case 'teacher':
      return { management: false, school: true, teacher: true, student: false, helpdesk: true }
    case 'student':
      return { management: false, school: false, teacher: false, student: true, helpdesk: true }
    case 'parent':
      return { management: false, school: false, teacher: false, student: true, helpdesk: true }
    default:
      return { management: false, school: false, teacher: false, student: false, helpdesk: false }
  }
}
