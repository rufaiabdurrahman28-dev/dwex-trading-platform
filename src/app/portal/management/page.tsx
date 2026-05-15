'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import QuoteSlider from '@/components/shared/QuoteSlider'
import type { Role, Section, AdmissionStatus, FileStatus } from '@/lib/types'

/* ============================================================
   TYPES
   ============================================================ */

type SectionTab = 'nursery' | 'primary' | 'jss' | 'sss'
type SubTab = 'admissions' | 'files' | 'teachers' | 'students' | 'helpdesk' | 'create-staff'

interface AdmissionRequest {
  id: string
  studentName: string
  parentName: string
  email: string
  phone: string
  section: Section
  status: AdmissionStatus
  date: string
  notes: string
}

interface FileReview {
  id: string
  studentName: string
  fileName: string
  fileType: string
  uploadedAt: string
  status: FileStatus
  section: Section
}

interface Teacher {
  id: string
  name: string
  email: string
  section: Section
  subject: string
  joinedAt: string
}

interface Student {
  id: string
  name: string
  email: string
  section: Section
  class: string
  admissionDate: string
  status: 'active' | 'inactive'
}

interface HelpdeskTicket {
  id: string
  senderName: string
  senderEmail: string
  subject: string
  message: string
  section: Section
  status: 'open' | 'closed'
  date: string
  reply: string
}

/* ============================================================
   MOCK DATA
   ============================================================ */

const mockAdmissions: AdmissionRequest[] = [
  { id: 'a1', studentName: 'Aisha Bello', parentName: 'Mallam Bello', email: 'bello@email.com', phone: '+234-801-111-0001', section: 'nursery', status: 'pending', date: '2026-02-10', notes: 'First child enrollment' },
  { id: 'a2', studentName: 'Yusuf Ibrahim', parentName: 'Hajja Ibrahim', email: 'hajja.i@email.com', phone: '+234-802-222-0002', section: 'primary', status: 'pending', date: '2026-02-12', notes: 'Transfer from another school' },
  { id: 'a3', studentName: 'Fatima Adamu', parentName: 'Alhaji Adamu', email: 'adamu@email.com', phone: '+234-803-333-0003', section: 'jss', status: 'reviewed', date: '2026-02-08', notes: 'Needs scholarship assessment' },
  { id: 'a4', studentName: 'Abdullahi Musa', parentName: 'Musa Dangote', email: 'musa.d@email.com', phone: '+234-804-444-0004', section: 'sss', status: 'pending', date: '2026-02-15', notes: 'Science track interest' },
  { id: 'a5', studentName: 'Khadijah Sani', parentName: 'Sani Abba', email: 'sani.a@email.com', phone: '+234-805-555-0005', section: 'nursery', status: 'accepted', date: '2026-01-28', notes: 'All documents complete' },
  { id: 'a6', studentName: 'Umar Farouk', parentName: 'Farouk Aliyu', email: 'farouk@email.com', phone: '+234-806-666-0006', section: 'primary', status: 'rejected', date: '2026-01-20', notes: 'Incomplete documents' },
  { id: 'a7', studentName: 'Zainab Garba', parentName: 'Garba Idris', email: 'garba.i@email.com', phone: '+234-807-777-0007', section: 'jss', status: 'pending', date: '2026-02-18', notes: 'Boarding request' },
  { id: 'a8', studentName: 'Ibrahim Hassan', parentName: 'Hassan Lawan', email: 'hassan.l@email.com', phone: '+234-808-888-0008', section: 'sss', status: 'reviewed', date: '2026-02-05', notes: 'Arts track interest' },
]

const mockFiles: FileReview[] = [
  { id: 'f1', studentName: 'Aisha Bello', fileName: 'birth_certificate.pdf', fileType: 'PDF', uploadedAt: '2026-02-10', status: 'pending', section: 'nursery' },
  { id: 'f2', studentName: 'Yusuf Ibrahim', fileName: 'passport_photo.jpg', fileType: 'Image', uploadedAt: '2026-02-12', status: 'pending', section: 'primary' },
  { id: 'f3', studentName: 'Fatima Adamu', fileName: 'previous_results.pdf', fileType: 'PDF', uploadedAt: '2026-02-08', status: 'approved', section: 'jss' },
  { id: 'f4', studentName: 'Abdullahi Musa', fileName: 'immunization_record.pdf', fileType: 'PDF', uploadedAt: '2026-02-15', status: 'pending', section: 'sss' },
  { id: 'f5', studentName: 'Khadijah Sani', fileName: 'transfer_letter.pdf', fileType: 'PDF', uploadedAt: '2026-01-28', status: 'not_approved', section: 'nursery' },
  { id: 'f6', studentName: 'Zainab Garba', fileName: 'medical_report.pdf', fileType: 'PDF', uploadedAt: '2026-02-18', status: 'pending', section: 'jss' },
]

const mockTeachers: Teacher[] = [
  { id: 't1', name: 'Mal. Usman Ali', email: 'usman.ali@aroyan.edu', section: 'nursery', subject: 'Islamic Studies & Arabic', joinedAt: '2023-09-01' },
  { id: 't2', name: 'Mal. Hauwa Sadiq', email: 'hauwa.s@aroyan.edu', section: 'nursery', subject: 'Early Childhood Education', joinedAt: '2024-01-15' },
  { id: 't3', name: 'Mal. Nasir Kabir', email: 'nasir.k@aroyan.edu', section: 'primary', subject: 'Mathematics', joinedAt: '2022-09-01' },
  { id: 't4', name: 'Mal. Amina Jibo', email: 'amina.j@aroyan.edu', section: 'primary', subject: 'English Language', joinedAt: '2023-01-10' },
  { id: 't5', name: 'Mal. Tahir Bello', email: 'tahir.b@aroyan.edu', section: 'jss', subject: 'Basic Science', joinedAt: '2021-09-01' },
  { id: 't6', name: 'Mal. Maryam Dabo', email: 'maryam.d@aroyan.edu', section: 'jss', subject: 'Quran & Tajweed', joinedAt: '2022-01-15' },
  { id: 't7', name: 'Mal. Ahmad Rufai', email: 'ahmad.r@aroyan.edu', section: 'sss', subject: 'Physics', joinedAt: '2020-09-01' },
  { id: 't8', name: 'Mal. Zainab Musa', email: 'zainab.m@aroyan.edu', section: 'sss', subject: 'Literature in English', joinedAt: '2023-09-01' },
]

const mockStudents: Student[] = [
  { id: 's1', name: 'Aisha Bello', email: 'aisha.b@student.aroyan.edu', section: 'nursery', class: 'Nursery 1', admissionDate: '2026-01-15', status: 'active' },
  { id: 's2', name: 'Khadijah Sani', email: 'khadijah.s@student.aroyan.edu', section: 'nursery', class: 'Nursery 2', admissionDate: '2025-09-01', status: 'active' },
  { id: 's3', name: 'Yusuf Ibrahim', email: 'yusuf.i@student.aroyan.edu', section: 'primary', class: 'Primary 3', admissionDate: '2025-09-01', status: 'active' },
  { id: 's4', name: 'Bilal Ahmad', email: 'bilal.a@student.aroyan.edu', section: 'primary', class: 'Primary 5', admissionDate: '2024-09-01', status: 'active' },
  { id: 's5', name: 'Fatima Adamu', email: 'fatima.a@student.aroyan.edu', section: 'jss', class: 'JSS 2', admissionDate: '2024-09-01', status: 'active' },
  { id: 's6', name: 'Abubakar Sadiq', email: 'abubakar.s@student.aroyan.edu', section: 'jss', class: 'JSS 1', admissionDate: '2025-09-01', status: 'active' },
  { id: 's7', name: 'Abdullahi Musa', email: 'abdullahi.m@student.aroyan.edu', section: 'sss', class: 'SSS 1 Science', admissionDate: '2025-09-01', status: 'active' },
  { id: 's8', name: 'Halima Garba', email: 'halima.g@student.aroyan.edu', section: 'sss', class: 'SSS 2 Arts', admissionDate: '2024-09-01', status: 'active' },
  { id: 's9', name: 'Umar Farouk', email: 'umar.f@student.aroyan.edu', section: 'primary', class: 'Primary 2', admissionDate: '2024-01-15', status: 'inactive' },
]

const mockHelpdesk: HelpdeskTicket[] = [
  { id: 'h1', senderName: 'Mallam Bello', senderEmail: 'bello@email.com', subject: 'Admission status inquiry', message: 'Salam, I submitted my daughter\'s application 2 weeks ago. Can I get an update?', section: 'nursery', status: 'open', date: '2026-02-20', reply: '' },
  { id: 'h2', senderName: 'Hajja Ibrahim', senderEmail: 'hajja.i@email.com', subject: 'Fee payment clarification', message: 'Please provide the breakdown of fees for Primary section. Jazakallahu khairan.', section: 'primary', status: 'open', date: '2026-02-19', reply: '' },
  { id: 'h3', senderName: 'Alhaji Adamu', senderEmail: 'adamu@email.com', subject: 'Scholarship request', message: 'My daughter Fatima is a top student. We would like to apply for the scholarship program.', section: 'jss', status: 'open', date: '2026-02-18', reply: '' },
  { id: 'h4', senderName: 'Musa Dangote', senderEmail: 'musa.d@email.com', subject: 'School bus route', message: 'Is there a school bus that covers the Nassarawa area?', section: 'sss', status: 'closed', date: '2026-02-10', reply: 'Yes, we have a bus covering Nassarawa. Please visit the school office for route details and pricing.' },
  { id: 'h5', senderName: 'Garba Idris', senderEmail: 'garba.i@email.com', subject: 'Uniform purchase', message: 'Where can we buy the school uniform? And what are the required items?', section: 'jss', status: 'open', date: '2026-02-21', reply: '' },
]

/* ============================================================
   HELPER
   ============================================================ */

const sectionLabels: Record<SectionTab, string> = {
  nursery: 'Nursery',
  primary: 'Primary',
  jss: 'JSS',
  sss: 'SSS',
}

const subTabLabels: Record<SubTab, string> = {
  admissions: 'Admission Requests',
  files: 'File Review',
  teachers: 'Teachers',
  students: 'Students',
  helpdesk: 'Helpdesk Inbox',
  'create-staff': '➕ Create Staff Account',
}

const statusColors: Record<AdmissionStatus, { bg: string; text: string }> = {
  pending: { bg: '#FFF3CD', text: '#856404' },
  reviewed: { bg: '#CCE5FF', text: '#004085' },
  accepted: { bg: '#D4EDDA', text: '#155724' },
  rejected: { bg: '#F8D7DA', text: '#721C24' },
}

const fileStatusColors: Record<FileStatus, { bg: string; text: string }> = {
  pending: { bg: '#FFF3CD', text: '#856404' },
  approved: { bg: '#D4EDDA', text: '#155724' },
  not_approved: { bg: '#F8D7DA', text: '#721C24' },
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function ManagementPortalPage() {
  const router = useRouter()
  const { profile, portalAccess, loading, signOut } = useAuth()

  const [sectionTab, setSectionTab] = useState<SectionTab>('nursery')
  const [subTab, setSubTab] = useState<SubTab>('admissions')

  // Admission state
  const [admissions, setAdmissions] = useState<AdmissionRequest[]>(mockAdmissions)
  const [reviewingAdmission, setReviewingAdmission] = useState<AdmissionRequest | null>(null)

  // File state
  const [files, setFiles] = useState<FileReview[]>(mockFiles)

  // Helpdesk state
  const [tickets, setTickets] = useState<HelpdeskTicket[]>(mockHelpdesk)
  const [replyingTicket, setReplyingTicket] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  // Create staff state
  const [staffForm, setStaffForm] = useState({
    fullName: '',
    email: '',
    tempPassword: '',
    role: 'teacher' as Role,
    section: 'nursery' as Section,
  })
  const [staffFormLoading, setStaffFormLoading] = useState(false)
  const [staffFormError, setStaffFormError] = useState('')
  const [staffFormSuccess, setStaffFormSuccess] = useState('')

  // Auth checks
  useEffect(() => {
    if (!loading && !profile) {
      router.push('/login')
    }
  }, [loading, profile, router])

  // Filtered data for current section
  const filteredAdmissions = admissions.filter((a) => a.section === sectionTab)
  const filteredFiles = files.filter((f) => f.section === sectionTab)
  const filteredTeachers = mockTeachers.filter((t) => t.section === sectionTab)
  const filteredStudents = mockStudents.filter((s) => s.section === sectionTab)
  const filteredTickets = tickets.filter((t) => t.section === sectionTab)

  // Admission handlers
  function handleAdmissionStatus(id: string, status: AdmissionStatus) {
    setAdmissions((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    )
    setReviewingAdmission(null)
  }

  // File handlers
  function handleFileStatus(id: string, status: FileStatus) {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)))
  }

  // Helpdesk handlers
  function handleSendReply(ticketId: string) {
    if (!replyText.trim()) return
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, reply: replyText, status: 'closed' as const } : t
      )
    )
    setReplyingTicket(null)
    setReplyText('')
  }

  function handleCloseTicket(ticketId: string) {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: 'closed' as const } : t))
    )
  }

  // Staff account creation
  async function handleCreateStaff(e: React.FormEvent) {
    e.preventDefault()
    setStaffFormError('')
    setStaffFormSuccess('')
    setStaffFormLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email: staffForm.email,
        password: staffForm.tempPassword,
        options: {
          data: {
            full_name: staffForm.fullName,
            role: staffForm.role,
            section: staffForm.section,
          },
          emailRedirectTo: 'https://my-project-eight-wheat.vercel.app',
        },
      })

      if (error) {
        setStaffFormError(error.message)
      } else {
        setStaffFormSuccess(`Staff account created for ${staffForm.fullName}. A confirmation email has been sent.`)
        setStaffForm({ fullName: '', email: '', tempPassword: '', role: 'teacher', section: 'nursery' })
      }
    } catch (err: any) {
      setStaffFormError(err.message || 'An unexpected error occurred')
    } finally {
      setStaffFormLoading(false)
    }
  }

  async function handleLogout() {
    await signOut()
    router.push('/login')
  }

  /* ============================================================
     RENDER: Loading
     ============================================================ */
  if (loading) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">Management Portal</h1>
          </section>
        </div>
        <div className="D D2 D2-auto D2-center">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#777', fontSize: '16px' }}>Loading...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!profile) return null

  /* ============================================================
     RENDER: Access Denied
     ============================================================ */
  if (!portalAccess?.management) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">Management Portal</h1>
          </section>
        </div>
        <div className="D D2 D2-auto D2-center">
          <div style={{
            textAlign: 'center',
            padding: '60px 24px',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(220, 53, 69, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 40, height: 40 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#2D5F3F', margin: '0 0 12px' }}>Access Denied</h2>
            <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.6, margin: '0 0 24px' }}>
              You do not have permission to access the Management Portal. This area is restricted to managers and administrators only.
            </p>
            <a href="/dashboard" className="cta-btn cta-btn-filled" style={{ display: 'inline-block' }}>
              Back to Dashboard
            </a>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  /* ============================================================
     RENDER: Main Portal
     ============================================================ */
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* === SECTION TABS === */
        .mgmt-section-tabs {
          display: flex;
          gap: 0;
          border-bottom: 2px solid #E8E8E8;
          margin-bottom: 0;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .mgmt-section-tab {
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 600;
          color: #777;
          background: transparent;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          position: relative;
          bottom: -2px;
        }
        .mgmt-section-tab:hover {
          color: #2D5F3F;
        }
        .mgmt-section-tab-active {
          color: #2D5F3F;
          border-bottom-color: #2D5F3F;
        }

        /* === SUB TABS === */
        .mgmt-sub-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          padding: 16px 0;
          border-bottom: 1px solid #F0F0F0;
        }
        .mgmt-sub-tab {
          padding: 8px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #555;
          background: #F8F8F8;
          border: 1.5px solid #E8E8E8;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .mgmt-sub-tab:hover {
          border-color: #2D5F3F;
          color: #2D5F3F;
          background: rgba(45, 95, 63, 0.04);
        }
        .mgmt-sub-tab-active {
          background: #2D5F3F;
          color: #FFFFFF;
          border-color: #2D5F3F;
        }

        /* === TABLES === */
        .mgmt-table-wrapper {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #E8E8E8;
          margin-top: 8px;
        }
        .mgmt-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .mgmt-table th {
          background-color: #2D5F3F;
          color: #FFFFFF;
          padding: 12px 14px;
          text-align: left;
          font-weight: 600;
          font-size: 13px;
          white-space: nowrap;
        }
        .mgmt-table td {
          padding: 11px 14px;
          border-bottom: 1px solid #F0F0F0;
          color: #555;
          vertical-align: middle;
        }
        .mgmt-table tr:last-child td {
          border-bottom: none;
        }
        .mgmt-table tr:hover td {
          background-color: #F8F9F5;
        }

        /* === STATUS BADGES === */
        .mgmt-badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
          white-space: nowrap;
        }

        /* === ACTION BUTTONS === */
        .mgmt-action-btn {
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .mgmt-action-btn:hover {
          transform: translateY(-1px);
        }
        .mgmt-btn-review {
          background: #E8F4FF;
          color: #004085;
        }
        .mgmt-btn-review:hover {
          background: #CCE5FF;
        }
        .mgmt-btn-accept {
          background: #D4EDDA;
          color: #155724;
        }
        .mgmt-btn-accept:hover {
          background: #C3E6CB;
        }
        .mgmt-btn-reject {
          background: #F8D7DA;
          color: #721C24;
        }
        .mgmt-btn-reject:hover {
          background: #F5C6CB;
        }
        .mgmt-btn-approve {
          background: #D4EDDA;
          color: #155724;
        }
        .mgmt-btn-approve:hover {
          background: #C3E6CB;
        }
        .mgmt-btn-not-approve {
          background: #F8D7DA;
          color: #721C24;
        }
        .mgmt-btn-not-approve:hover {
          background: #F5C6CB;
        }

        /* === TEACHER CARDS === */
        .mgmt-teacher-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .mgmt-teacher-card {
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 12px;
          padding: 24px;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .mgmt-teacher-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #2D5F3F, #C9A961);
        }
        .mgmt-teacher-card:hover {
          box-shadow: 0 8px 24px rgba(45, 95, 63, 0.12);
          transform: translateY(-2px);
        }
        .mgmt-teacher-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(45, 95, 63, 0.15), rgba(201, 169, 97, 0.2));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 700;
          color: #2D5F3F;
          margin-bottom: 14px;
        }
        .mgmt-teacher-name {
          font-size: 17px;
          font-weight: 700;
          color: #2D5F3F;
          margin: 0 0 4px;
        }
        .mgmt-teacher-subject {
          font-size: 13px;
          color: #C9A961;
          font-weight: 600;
          margin: 0 0 8px;
        }
        .mgmt-teacher-email {
          font-size: 13px;
          color: #777;
          margin: 0 0 4px;
        }
        .mgmt-teacher-joined {
          font-size: 12px;
          color: #AAA;
          margin: 0;
        }

        /* === HELPDESK === */
        .mgmt-ticket {
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          transition: box-shadow 0.3s ease;
        }
        .mgmt-ticket:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }
        .mgmt-ticket-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .mgmt-ticket-subject {
          font-size: 16px;
          font-weight: 700;
          color: #2D5F3F;
          margin: 0;
        }
        .mgmt-ticket-meta {
          font-size: 13px;
          color: #777;
          margin: 0 0 10px;
        }
        .mgmt-ticket-message {
          font-size: 14px;
          color: #555;
          line-height: 1.6;
          margin: 0 0 12px;
          padding: 12px;
          background: rgba(45, 95, 63, 0.03);
          border-radius: 8px;
          border-left: 3px solid #C9A961;
        }
        .mgmt-ticket-reply {
          font-size: 13px;
          color: #155724;
          line-height: 1.6;
          margin: 0 0 12px;
          padding: 10px 12px;
          background: rgba(21, 87, 36, 0.06);
          border-radius: 8px;
          border-left: 3px solid #2D5F3F;
        }
        .mgmt-ticket-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .mgmt-reply-area {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid #DDD;
          border-radius: 8px;
          font-size: 14px;
          color: #333;
          background: #FAFAFA;
          resize: vertical;
          box-sizing: border-box;
          outline: none;
          font-family: inherit;
          line-height: 1.6;
          margin-bottom: 8px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .mgmt-reply-area:focus {
          border-color: #2D5F3F;
          box-shadow: 0 0 0 3px rgba(45, 95, 63, 0.12);
          background: #FFFFFF;
        }

        /* === REVIEW MODAL === */
        .mgmt-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 24px;
        }
        .mgmt-modal {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 32px;
          max-width: 520px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          max-height: 90vh;
          overflow-y: auto;
        }
        .mgmt-modal-title {
          font-size: 20px;
          font-weight: 700;
          color: #2D5F3F;
          margin: 0 0 20px;
        }
        .mgmt-modal-close {
          position: absolute;
          top: 14px;
          right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          color: #999;
          cursor: pointer;
        }
        .mgmt-modal-field {
          margin-bottom: 14px;
        }
        .mgmt-modal-field-label {
          font-size: 13px;
          font-weight: 600;
          color: #999;
          margin: 0 0 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .mgmt-modal-field-value {
          font-size: 15px;
          color: #333;
          margin: 0;
        }
        .mgmt-modal-actions {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        /* === STAFF FORM === */
        .mgmt-staff-form {
          max-width: 560px;
        }
        .mgmt-staff-success {
          padding: 14px 18px;
          background: #D4EDDA;
          border: 1px solid #C3E6CB;
          border-radius: 10px;
          color: #155724;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        .mgmt-staff-error {
          padding: 14px 18px;
          background: #F8D7DA;
          border: 1px solid #F5C6CB;
          border-radius: 10px;
          color: #721C24;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 16px;
          line-height: 1.5;
        }

        /* === EMPTY STATE === */
        .mgmt-empty {
          text-align: center;
          padding: 48px 24px;
          color: #AAA;
        }
        .mgmt-empty-icon {
          margin-bottom: 12px;
        }
        .mgmt-empty-text {
          font-size: 15px;
          margin: 0;
        }

        /* === STAT CARDS === */
        .mgmt-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .mgmt-stat-card {
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 12px;
          padding: 18px 16px;
          text-align: center;
          transition: box-shadow 0.3s ease;
        }
        .mgmt-stat-card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
        }
        .mgmt-stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #2D5F3F;
          margin: 0 0 4px;
        }
        .mgmt-stat-label {
          font-size: 12px;
          font-weight: 600;
          color: #777;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0;
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
          .mgmt-section-tabs {
            gap: 0;
          }
          .mgmt-section-tab {
            padding: 10px 16px;
            font-size: 14px;
          }
          .mgmt-sub-tabs {
            gap: 6px;
          }
          .mgmt-sub-tab {
            padding: 6px 12px;
            font-size: 12px;
          }
          .mgmt-teacher-grid {
            grid-template-columns: 1fr;
          }
          .mgmt-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .mgmt-table th,
          .mgmt-table td {
            padding: 8px 10px;
            font-size: 12px;
          }
        }
      ` }} />

      {/* === HEADER === */}
      <div className="D D1 D1-short">
        <Navbar />
        <section className="page-hero" style={{ paddingBottom: '24px' }}>
          <h1 className="page-hero-title">Management Portal</h1>
          <p className="page-hero-subtitle">Administer sections, admissions, staff, and support for Aroyan Muslim School</p>
          <button
            className="dashboard-logout-btn"
            onClick={handleLogout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              background: 'transparent',
              border: '1.5px solid rgba(255,255,255,0.4)',
              borderRadius: '8px',
              color: '#FFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginTop: '12px',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </section>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="D D2 D2-auto" style={{ background: '#F8F9F5' }}>
        <div className="admission-section" style={{ maxWidth: '1100px' }}>
          <QuoteSlider />

          {/* Section Tabs */}
          <div className="mgmt-section-tabs" style={{ marginTop: '24px' }}>
            {(Object.keys(sectionLabels) as SectionTab[]).map((key) => (
              <button
                key={key}
                className={`mgmt-section-tab${sectionTab === key ? ' mgmt-section-tab-active' : ''}`}
                onClick={() => {
                  setSectionTab(key)
                  setSubTab('admissions')
                }}
              >
                {sectionLabels[key]}
              </button>
            ))}
          </div>

          {/* Sub Tabs */}
          <div className="mgmt-sub-tabs">
            {(Object.keys(subTabLabels) as SubTab[]).map((key) => (
              <button
                key={key}
                className={`mgmt-sub-tab${subTab === key ? ' mgmt-sub-tab-active' : ''}`}
                onClick={() => setSubTab(key)}
              >
                {subTabLabels[key]}
              </button>
            ))}
          </div>

          {/* Stats Row */}
          <div className="mgmt-stats">
            <div className="mgmt-stat-card">
              <p className="mgmt-stat-value">{filteredAdmissions.filter((a) => a.status === 'pending').length}</p>
              <p className="mgmt-stat-label">Pending</p>
            </div>
            <div className="mgmt-stat-card">
              <p className="mgmt-stat-value">{filteredTeachers.length}</p>
              <p className="mgmt-stat-label">Teachers</p>
            </div>
            <div className="mgmt-stat-card">
              <p className="mgmt-stat-value">{filteredStudents.filter((s) => s.status === 'active').length}</p>
              <p className="mgmt-stat-label">Active Students</p>
            </div>
            <div className="mgmt-stat-card">
              <p className="mgmt-stat-value">{filteredTickets.filter((t) => t.status === 'open').length}</p>
              <p className="mgmt-stat-label">Open Tickets</p>
            </div>
          </div>

          {/* ============================== */}
          {/* ADMISSION REQUESTS             */}
          {/* ============================== */}
          {subTab === 'admissions' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#2D5F3F', margin: '0 0 16px' }}>
                Admission Requests — {sectionLabels[sectionTab]}
              </h3>
              {filteredAdmissions.length === 0 ? (
                <div className="mgmt-empty">
                  <div className="mgmt-empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <p className="mgmt-empty-text">No admission requests for this section</p>
                </div>
              ) : (
                <div className="mgmt-table-wrapper">
                  <table className="mgmt-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Parent</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAdmissions.map((req) => (
                        <tr key={req.id}>
                          <td style={{ fontWeight: 600, color: '#2D5F3F' }}>{req.studentName}</td>
                          <td>{req.parentName}</td>
                          <td style={{ fontSize: '13px' }}>{req.email}</td>
                          <td style={{ fontSize: '13px' }}>{req.phone}</td>
                          <td style={{ whiteSpace: 'nowrap' }}>{req.date}</td>
                          <td>
                            <span
                              className="mgmt-badge"
                              style={{
                                background: statusColors[req.status].bg,
                                color: statusColors[req.status].text,
                              }}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              <button
                                className="mgmt-action-btn mgmt-btn-review"
                                onClick={() => setReviewingAdmission(req)}
                              >
                                Review
                              </button>
                              {req.status !== 'accepted' && (
                                <button
                                  className="mgmt-action-btn mgmt-btn-accept"
                                  onClick={() => handleAdmissionStatus(req.id, 'accepted')}
                                >
                                  Accept
                                </button>
                              )}
                              {req.status !== 'rejected' && (
                                <button
                                  className="mgmt-action-btn mgmt-btn-reject"
                                  onClick={() => handleAdmissionStatus(req.id, 'rejected')}
                                >
                                  Reject
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Review Modal */}
              {reviewingAdmission && (
                <div className="mgmt-modal-overlay" onClick={() => setReviewingAdmission(null)}>
                  <div className="mgmt-modal" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
                    <button className="mgmt-modal-close" onClick={() => setReviewingAdmission(null)}>✕</button>
                    <h3 className="mgmt-modal-title">Review Admission Request</h3>

                    <div className="mgmt-modal-field">
                      <p className="mgmt-modal-field-label">Student Name</p>
                      <p className="mgmt-modal-field-value">{reviewingAdmission.studentName}</p>
                    </div>
                    <div className="mgmt-modal-field">
                      <p className="mgmt-modal-field-label">Parent / Guardian</p>
                      <p className="mgmt-modal-field-value">{reviewingAdmission.parentName}</p>
                    </div>
                    <div className="mgmt-modal-field">
                      <p className="mgmt-modal-field-label">Email</p>
                      <p className="mgmt-modal-field-value">{reviewingAdmission.email}</p>
                    </div>
                    <div className="mgmt-modal-field">
                      <p className="mgmt-modal-field-label">Phone</p>
                      <p className="mgmt-modal-field-value">{reviewingAdmission.phone}</p>
                    </div>
                    <div className="mgmt-modal-field">
                      <p className="mgmt-modal-field-label">Section</p>
                      <p className="mgmt-modal-field-value" style={{ textTransform: 'capitalize' }}>{reviewingAdmission.section}</p>
                    </div>
                    <div className="mgmt-modal-field">
                      <p className="mgmt-modal-field-label">Submitted</p>
                      <p className="mgmt-modal-field-value">{reviewingAdmission.date}</p>
                    </div>
                    <div className="mgmt-modal-field">
                      <p className="mgmt-modal-field-label">Current Status</p>
                      <p className="mgmt-modal-field-value">
                        <span
                          className="mgmt-badge"
                          style={{
                            background: statusColors[reviewingAdmission.status].bg,
                            color: statusColors[reviewingAdmission.status].text,
                          }}
                        >
                          {reviewingAdmission.status}
                        </span>
                      </p>
                    </div>
                    <div className="mgmt-modal-field">
                      <p className="mgmt-modal-field-label">Notes</p>
                      <p className="mgmt-modal-field-value">{reviewingAdmission.notes}</p>
                    </div>

                    <div className="mgmt-modal-actions">
                      <button
                        className="mgmt-action-btn mgmt-btn-accept"
                        style={{ padding: '10px 20px', fontSize: '14px' }}
                        onClick={() => handleAdmissionStatus(reviewingAdmission.id, 'accepted')}
                      >
                        ✅ Accept
                      </button>
                      <button
                        className="mgmt-action-btn mgmt-btn-reject"
                        style={{ padding: '10px 20px', fontSize: '14px' }}
                        onClick={() => handleAdmissionStatus(reviewingAdmission.id, 'rejected')}
                      >
                        ❌ Reject
                      </button>
                      <button
                        className="mgmt-action-btn"
                        style={{ padding: '10px 20px', fontSize: '14px', background: '#F0F0F0', color: '#777' }}
                        onClick={() => setReviewingAdmission(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================== */}
          {/* FILE REVIEW                    */}
          {/* ============================== */}
          {subTab === 'files' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#2D5F3F', margin: '0 0 16px' }}>
                File Review — {sectionLabels[sectionTab]}
              </h3>
              {filteredFiles.length === 0 ? (
                <div className="mgmt-empty">
                  <div className="mgmt-empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                      <polyline points="13 2 13 9 20 9" />
                    </svg>
                  </div>
                  <p className="mgmt-empty-text">No files pending review for this section</p>
                </div>
              ) : (
                <div className="mgmt-table-wrapper">
                  <table className="mgmt-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>File Name</th>
                        <th>Type</th>
                        <th>Uploaded</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFiles.map((file) => (
                        <tr key={file.id}>
                          <td style={{ fontWeight: 600, color: '#2D5F3F' }}>{file.studentName}</td>
                          <td>{file.fileName}</td>
                          <td>{file.fileType}</td>
                          <td style={{ whiteSpace: 'nowrap' }}>{file.uploadedAt}</td>
                          <td>
                            <span
                              className="mgmt-badge"
                              style={{
                                background: fileStatusColors[file.status].bg,
                                color: fileStatusColors[file.status].text,
                              }}
                            >
                              {file.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {file.status !== 'approved' && (
                                <button
                                  className="mgmt-action-btn mgmt-btn-approve"
                                  onClick={() => handleFileStatus(file.id, 'approved')}
                                >
                                  Approve
                                </button>
                              )}
                              {file.status !== 'not_approved' && (
                                <button
                                  className="mgmt-action-btn mgmt-btn-not-approve"
                                  onClick={() => handleFileStatus(file.id, 'not_approved')}
                                >
                                  Not Approve
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ============================== */}
          {/* TEACHERS                       */}
          {/* ============================== */}
          {subTab === 'teachers' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#2D5F3F', margin: '0 0 16px' }}>
                Teachers — {sectionLabels[sectionTab]}
              </h3>
              {filteredTeachers.length === 0 ? (
                <div className="mgmt-empty">
                  <div className="mgmt-empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <p className="mgmt-empty-text">No teachers assigned to this section yet</p>
                </div>
              ) : (
                <div className="mgmt-teacher-grid">
                  {filteredTeachers.map((teacher) => (
                    <div key={teacher.id} className="mgmt-teacher-card">
                      <div className="mgmt-teacher-avatar">
                        {teacher.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <p className="mgmt-teacher-name">{teacher.name}</p>
                      <p className="mgmt-teacher-subject">{teacher.subject}</p>
                      <p className="mgmt-teacher-email">{teacher.email}</p>
                      <p className="mgmt-teacher-joined">Joined: {teacher.joinedAt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================== */}
          {/* STUDENTS                       */}
          {/* ============================== */}
          {subTab === 'students' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#2D5F3F', margin: '0 0 16px' }}>
                Students — {sectionLabels[sectionTab]}
              </h3>
              {filteredStudents.length === 0 ? (
                <div className="mgmt-empty">
                  <div className="mgmt-empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <p className="mgmt-empty-text">No students enrolled in this section yet</p>
                </div>
              ) : (
                <div className="mgmt-table-wrapper">
                  <table className="mgmt-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Admission Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td style={{ fontWeight: 600, color: '#2D5F3F' }}>{student.name}</td>
                          <td style={{ fontSize: '13px' }}>{student.email}</td>
                          <td>{student.class}</td>
                          <td style={{ whiteSpace: 'nowrap' }}>{student.admissionDate}</td>
                          <td>
                            <span
                              className="mgmt-badge"
                              style={{
                                background: student.status === 'active' ? '#D4EDDA' : '#F8D7DA',
                                color: student.status === 'active' ? '#155724' : '#721C24',
                              }}
                            >
                              {student.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ============================== */}
          {/* HELPDESK INBOX                 */}
          {/* ============================== */}
          {subTab === 'helpdesk' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#2D5F3F', margin: '0 0 16px' }}>
                Helpdesk Inbox — {sectionLabels[sectionTab]}
              </h3>
              {filteredTickets.length === 0 ? (
                <div className="mgmt-empty">
                  <div className="mgmt-empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                  </div>
                  <p className="mgmt-empty-text">No support tickets for this section</p>
                </div>
              ) : (
                filteredTickets.map((ticket) => (
                  <div key={ticket.id} className="mgmt-ticket">
                    <div className="mgmt-ticket-header">
                      <h4 className="mgmt-ticket-subject">{ticket.subject}</h4>
                      <span
                        className="mgmt-badge"
                        style={{
                          background: ticket.status === 'open' ? '#FFF3CD' : '#D4EDDA',
                          color: ticket.status === 'open' ? '#856404' : '#155724',
                        }}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <p className="mgmt-ticket-meta">
                      From: <strong>{ticket.senderName}</strong> ({ticket.senderEmail}) &middot; {ticket.date}
                    </p>
                    <p className="mgmt-ticket-message">{ticket.message}</p>
                    {ticket.reply && (
                      <p className="mgmt-ticket-reply">
                        <strong>Reply:</strong> {ticket.reply}
                      </p>
                    )}

                    {replyingTicket === ticket.id ? (
                      <div>
                        <textarea
                          className="mgmt-reply-area"
                          rows={3}
                          placeholder="Type your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="mgmt-action-btn mgmt-btn-accept"
                            style={{ padding: '8px 16px', fontSize: '13px' }}
                            onClick={() => handleSendReply(ticket.id)}
                          >
                            Send Reply
                          </button>
                          <button
                            className="mgmt-action-btn"
                            style={{ padding: '8px 16px', fontSize: '13px', background: '#F0F0F0', color: '#777' }}
                            onClick={() => {
                              setReplyingTicket(null)
                              setReplyText('')
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mgmt-ticket-actions">
                        {ticket.status === 'open' && (
                          <>
                            <button
                              className="mgmt-action-btn mgmt-btn-review"
                              onClick={() => setReplyingTicket(ticket.id)}
                            >
                              Reply
                            </button>
                            <button
                              className="mgmt-action-btn"
                              style={{ background: '#F0F0F0', color: '#777' }}
                              onClick={() => handleCloseTicket(ticket.id)}
                            >
                              Close Ticket
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* ============================== */}
          {/* CREATE STAFF ACCOUNT           */}
          {/* ============================== */}
          {subTab === 'create-staff' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#2D5F3F', margin: '0 0 16px' }}>
                Create Staff Account
              </h3>
              <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.6, margin: '0 0 24px' }}>
                Create a new teacher or manager account. The staff member will receive a confirmation email to set up their account.
              </p>

              {staffFormSuccess && <div className="mgmt-staff-success">{staffFormSuccess}</div>}
              {staffFormError && <div className="mgmt-staff-error">{staffFormError}</div>}

              <form className="auth-form mgmt-staff-form" onSubmit={handleCreateStaff}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Mal. Ahmad Rufai"
                    value={staffForm.fullName}
                    onChange={(e) => setStaffForm({ ...staffForm, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="e.g. ahmad.r@aroyan.edu"
                    value={staffForm.email}
                    onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Temporary Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Minimum 6 characters"
                    value={staffForm.tempPassword}
                    onChange={(e) => setStaffForm({ ...staffForm, tempPassword: e.target.value })}
                    required
                    minLength={6}
                  />
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label className="form-label">Role</label>
                    <select
                      className="form-input form-select"
                      value={staffForm.role}
                      onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value as Role })}
                      required
                    >
                      <option value="teacher">Teacher</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Section</label>
                    <select
                      className="form-input form-select"
                      value={staffForm.section}
                      onChange={(e) => setStaffForm({ ...staffForm, section: e.target.value as Section })}
                      required
                    >
                      <option value="nursery">Nursery</option>
                      <option value="primary">Primary</option>
                      <option value="jss">JSS</option>
                      <option value="sss">SSS</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="form-submit-btn"
                  disabled={staffFormLoading}
                  style={staffFormLoading ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                >
                  {staffFormLoading ? 'Creating Account...' : 'Create Staff Account'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
