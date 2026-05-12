'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import QuoteSlider from '@/components/shared/QuoteSlider'
import type { Section } from '@/lib/types'

/* ───────────────────── Mock Data ───────────────────── */

interface MockStudent {
  id: string
  name: string
  section: Section
  present: boolean
}

interface MockAssignment {
  id: string
  title: string
  section: Section
  subject: string
  dueDate: string
  status: 'active' | 'closed'
}

interface MockGrade {
  subject: string
  score: number
  grade: string
}

const initialStudents: MockStudent[] = [
  { id: 's1', name: 'Aisha Abdullahi', section: 'jss', present: true },
  { id: 's2', name: 'Yusuf Ibrahim', section: 'jss', present: true },
  { id: 's3', name: 'Fatima Muhammad', section: 'jss', present: false },
  { id: 's4', name: 'Abubakar Sadiq', section: 'jss', present: true },
  { id: 's5', name: 'Zainab Aliyu', section: 'sss', present: true },
  { id: 's6', name: 'Umar Farouk', section: 'sss', present: true },
  { id: 's7', name: 'Khadijah Musa', section: 'sss', present: false },
  { id: 's8', name: 'Abdullahi Hassan', section: 'primary', present: true },
  { id: 's9', name: 'Maryam Bello', section: 'primary', present: true },
  { id: 's10', name: 'Ibrahim Suleiman', section: 'primary', present: true },
  { id: 's11', name: 'Hauwa Garba', section: 'nursery', present: true },
  { id: 's12', name: 'Ahmed Tijjani', section: 'nursery', present: true },
]

const initialAssignments: MockAssignment[] = [
  { id: 'a1', title: 'Arabic Vocabulary – Chapter 5', section: 'jss', subject: 'Arabic', dueDate: '2026-03-15', status: 'active' },
  { id: 'a2', title: 'Islamic History Essay', section: 'sss', subject: 'Islamic Studies', dueDate: '2026-03-10', status: 'active' },
  { id: 'a3', title: 'Mathematics Problem Set 3', section: 'jss', subject: 'Mathematics', dueDate: '2026-03-08', status: 'closed' },
  { id: 'a4', title: 'English Comprehension Practice', section: 'primary', subject: 'English', dueDate: '2026-03-12', status: 'active' },
  { id: 'a5', title: 'Quran Memorization – Surah Al-Mulk', section: 'sss', subject: 'Quran', dueDate: '2026-03-20', status: 'active' },
  { id: 'a6', title: 'Basic Addition & Subtraction', section: 'nursery', subject: 'Mathematics', dueDate: '2026-03-05', status: 'closed' },
]

const mockReportStudent = {
  name: 'Aisha Abdullahi',
  section: 'JSS 2' as string,
  term: 'Second Term 2025/2026',
  grades: [
    { subject: 'Arabic', score: 88, grade: 'A' },
    { subject: 'Islamic Studies', score: 92, grade: 'A+' },
    { subject: 'English Language', score: 76, grade: 'B' },
    { subject: 'Mathematics', score: 71, grade: 'B' },
    { subject: 'Quran', score: 95, grade: 'A+' },
    { subject: 'Social Studies', score: 82, grade: 'A' },
    { subject: 'Basic Science', score: 68, grade: 'C+' },
    { subject: 'Computer Studies', score: 85, grade: 'A' },
  ] as MockGrade[],
  teacherComment: 'Aisha is an outstanding student with excellent dedication to her Islamic studies. She should focus more on Basic Science and Mathematics to achieve a well-rounded performance. Keep up the great work!',
  headTeacherComment: 'Commended for exemplary conduct and academic excellence. Continue to strive for the best.',
}

/* ───────────────────── Tab type ───────────────────── */

type TabKey = 'attendance' | 'assignments' | 'reportcards'

/* ═══════════════════════════════════════════════════════
   Teacher Portal Page
   ═══════════════════════════════════════════════════════ */

export default function TeacherPortalPage() {
  const router = useRouter()
  const { profile, portalAccess, loading } = useAuth()

  const [activeTab, setActiveTab] = useState<TabKey>('attendance')
  const [students, setStudents] = useState<MockStudent[]>(initialStudents)
  const [assignments, setAssignments] = useState<MockAssignment[]>(initialAssignments)
  const [attendanceDate, setAttendanceDate] = useState(() => new Date().toISOString().split('T')[0])
  const [attendanceSaved, setAttendanceSaved] = useState(false)

  /* New assignment form */
  const [newTitle, setNewTitle] = useState('')
  const [newSubject, setNewSubject] = useState('')
  const [newSection, setNewSection] = useState<Section>('jss')
  const [newDueDate, setNewDueDate] = useState('')

  /* Report card state */
  const [reportStudent, setReportStudent] = useState(mockReportStudent.name)
  const [showReportPreview, setShowReportPreview] = useState(false)

  /* ── Auth guards ── */
  useEffect(() => {
    if (!loading && !profile) {
      router.push('/login')
    }
  }, [loading, profile, router])

  if (loading) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">Teacher Portal</h1>
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

  if (!portalAccess?.teacher) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">Teacher Portal</h1>
          </section>
        </div>
        <div className="D D2 D2-auto D2-center">
          <div style={{ textAlign: 'center', padding: '60px 24px', maxWidth: 480, margin: '0 auto' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(220,53,69,0.1)', display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center', marginBottom: 20,
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 36, height: 36 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1F3D2A', margin: '0 0 12px' }}>Access Denied</h2>
            <p style={{ fontSize: 15, color: '#777', lineHeight: 1.6, margin: '0 0 24px' }}>
              You do not have permission to access the Teacher Portal. Please contact the school administration if you believe this is an error.
            </p>
            <a href="/dashboard" className="cta-btn cta-btn-filled" style={{ fontSize: 14, padding: '10px 28px' }}>
              Back to Dashboard
            </a>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  /* ── Handlers ── */

  function toggleStudentPresent(id: string) {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, present: !s.present } : s))
    )
    setAttendanceSaved(false)
  }

  function markAllPresent() {
    setStudents((prev) => prev.map((s) => ({ ...s, present: true })))
    setAttendanceSaved(false)
  }

  function saveAttendance() {
    setAttendanceSaved(true)
  }

  function addAssignment() {
    if (!newTitle.trim() || !newSubject.trim() || !newDueDate) return
    const a: MockAssignment = {
      id: `a${Date.now()}`,
      title: newTitle.trim(),
      subject: newSubject.trim(),
      section: newSection,
      dueDate: newDueDate,
      status: 'active',
    }
    setAssignments((prev) => [a, ...prev])
    setNewTitle('')
    setNewSubject('')
    setNewDueDate('')
  }

  function closeAssignment(id: string) {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'closed' } : a))
    )
  }

  function deleteAssignment(id: string) {
    setAssignments((prev) => prev.filter((a) => a.id !== id))
  }

  /* ── Tab data ── */

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    {
      key: 'attendance',
      label: 'Attendance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      key: 'assignments',
      label: 'Assignments',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      key: 'reportcards',
      label: 'Report Cards',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      ),
    },
  ]

  /* ── Section badge color helper ── */
  function sectionColor(section: Section) {
    switch (section) {
      case 'nursery': return '#F59E0B'
      case 'primary': return '#3B82F6'
      case 'jss': return '#2D5F3F'
      case 'sss': return '#8B5CF6'
      default: return '#999'
    }
  }

  /* ═══════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════ */

  return (
    <>
      {/* ──── Portal-specific CSS ──── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Tab bar ── */
        .tp-tab-bar {
          display: flex;
          gap: 4px;
          background: #F3F4F1;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 28px;
        }
        .tp-tab {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #777;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .tp-tab:hover {
          color: #2D5F3F;
          background: rgba(45,95,63,0.06);
        }
        .tp-tab-active {
          color: #FFFFFF;
          background: #2D5F3F;
          box-shadow: 0 2px 8px rgba(45,95,63,0.3);
        }
        .tp-tab-active:hover {
          color: #FFFFFF;
          background: #245535;
        }

        /* ── Attendance ── */
        .tp-attendance-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .tp-date-input {
          padding: 8px 14px;
          border: 1.5px solid #DDD;
          border-radius: 8px;
          font-size: 14px;
          color: #333;
          background: #FAFAFA;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .tp-date-input:focus {
          border-color: #2D5F3F;
        }
        .tp-attendance-actions {
          display: flex;
          gap: 8px;
          margin-left: auto;
        }
        .tp-btn-sm {
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        .tp-btn-outline {
          background: transparent;
          border: 1.5px solid #DDD;
          color: #555;
        }
        .tp-btn-outline:hover {
          border-color: #2D5F3F;
          color: #2D5F3F;
        }
        .tp-btn-green {
          background: #2D5F3F;
          color: #FFFFFF;
        }
        .tp-btn-green:hover {
          background: #1F4A2E;
        }
        .tp-btn-gold {
          background: #C9A961;
          color: #FFFFFF;
        }
        .tp-btn-gold:hover {
          background: #B8943F;
        }

        .tp-student-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .tp-student-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          background: #FFFFFF;
          border: 1px solid #ECECEC;
          border-radius: 10px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .tp-student-row:hover {
          border-color: #C9A961;
          box-shadow: 0 2px 8px rgba(201,169,97,0.1);
        }
        .tp-student-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(45,95,63,0.12), rgba(201,169,97,0.18));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: #2D5F3F;
          flex-shrink: 0;
        }
        .tp-student-name {
          flex: 1;
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }
        .tp-section-badge {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .tp-toggle {
          position: relative;
          width: 44px;
          height: 24px;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.3s ease;
          flex-shrink: 0;
          border: none;
          padding: 0;
        }
        .tp-toggle-present {
          background: #2D5F3F;
        }
        .tp-toggle-absent {
          background: #DC3545;
        }
        .tp-toggle-knob {
          position: absolute;
          top: 2px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0 1px 4px rgba(0,0,0,0.15);
          transition: left 0.25s ease;
        }
        .tp-toggle-present .tp-toggle-knob {
          left: 22px;
        }
        .tp-toggle-absent .tp-toggle-knob {
          left: 2px;
        }
        .tp-status-label {
          font-size: 12px;
          font-weight: 600;
          min-width: 52px;
          text-align: right;
          flex-shrink: 0;
        }
        .tp-status-present { color: #2D5F3F; }
        .tp-status-absent { color: #DC3545; }

        .tp-attendance-summary {
          display: flex;
          gap: 16px;
          margin-top: 20px;
          padding: 16px;
          background: rgba(45,95,63,0.04);
          border-radius: 10px;
          border: 1px dashed rgba(45,95,63,0.2);
        }
        .tp-summary-item {
          text-align: center;
          flex: 1;
        }
        .tp-summary-num {
          font-size: 24px;
          font-weight: 700;
          color: #2D5F3F;
          margin: 0;
        }
        .tp-summary-num-red { color: #DC3545; }
        .tp-summary-label {
          font-size: 12px;
          color: #777;
          margin: 0;
          margin-top: 2px;
        }

        /* ── Assignments ── */
        .tp-assignment-form {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr auto;
          gap: 10px;
          align-items: end;
          margin-bottom: 24px;
          padding: 20px;
          background: rgba(45,95,63,0.03);
          border: 1px solid rgba(45,95,63,0.1);
          border-radius: 12px;
        }
        .tp-assignment-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .tp-assignment-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: #FFFFFF;
          border: 1px solid #ECECEC;
          border-radius: 10px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .tp-assignment-row:hover {
          border-color: #C9A961;
          box-shadow: 0 2px 8px rgba(201,169,97,0.1);
        }
        .tp-assignment-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .tp-assignment-status-active { background: #22C55E; }
        .tp-assignment-status-closed { background: #999; }
        .tp-assignment-info {
          flex: 1;
        }
        .tp-assignment-title {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin: 0 0 2px;
        }
        .tp-assignment-meta {
          font-size: 12px;
          color: #999;
          margin: 0;
        }
        .tp-assignment-actions {
          display: flex;
          gap: 6px;
        }
        .tp-action-icon {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          border: 1px solid #E8E8E8;
          background: #FAFAFA;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          padding: 0;
        }
        .tp-action-icon:hover {
          background: #2D5F3F;
          border-color: #2D5F3F;
        }
        .tp-action-icon:hover svg {
          color: #FFFFFF;
        }
        .tp-action-icon svg {
          width: 14px;
          height: 14px;
          color: #777;
        }
        .tp-action-icon-danger:hover {
          background: #DC3545;
          border-color: #DC3545;
        }

        /* ── Report Cards ── */
        .tp-report-select {
          display: flex;
          gap: 12px;
          align-items: end;
          margin-bottom: 24px;
        }
        .tp-report-card {
          background: #FFFFFF;
          border: 2px solid #2D5F3F;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(45,95,63,0.1);
        }
        .tp-report-header {
          background: linear-gradient(135deg, #1F3D2A, #2D5F3F);
          padding: 24px 28px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .tp-report-logo {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid #C9A961;
          object-fit: contain;
          flex-shrink: 0;
        }
        .tp-report-school-info {
          flex: 1;
        }
        .tp-report-school-name {
          font-size: 20px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 4px;
        }
        .tp-report-school-motto {
          font-size: 12px;
          color: #C9A961;
          margin: 0;
          font-style: italic;
        }
        .tp-report-body {
          padding: 24px 28px;
        }
        .tp-report-student-info {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #EEE;
        }
        .tp-report-info-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .tp-report-info-label {
          font-size: 11px;
          font-weight: 600;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .tp-report-info-value {
          font-size: 15px;
          font-weight: 600;
          color: #1F3D2A;
        }
        .tp-grades-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .tp-grades-table th {
          background: #2D5F3F;
          color: #FFFFFF;
          padding: 10px 14px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
        }
        .tp-grades-table td {
          padding: 10px 14px;
          border-bottom: 1px solid #F0F0F0;
          font-size: 14px;
          color: #444;
        }
        .tp-grades-table tr:last-child td {
          border-bottom: none;
        }
        .tp-grades-table tr:hover td {
          background: rgba(45,95,63,0.03);
        }
        .tp-grade-badge {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 700;
        }
        .tp-grade-a { background: rgba(45,95,63,0.1); color: #2D5F3F; }
        .tp-grade-b { background: rgba(59,130,246,0.1); color: #3B82F6; }
        .tp-grade-c { background: rgba(245,158,11,0.1); color: #D97706; }
        .tp-grade-d { background: rgba(220,53,69,0.1); color: #DC3545; }

        .tp-report-comments {
          margin-bottom: 16px;
        }
        .tp-comment-block {
          margin-bottom: 14px;
        }
        .tp-comment-label {
          font-size: 12px;
          font-weight: 600;
          color: #2D5F3F;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 4px;
        }
        .tp-comment-text {
          font-size: 14px;
          color: #555;
          line-height: 1.6;
          margin: 0;
          padding: 12px 16px;
          background: rgba(45,95,63,0.03);
          border-radius: 8px;
          border-left: 3px solid #C9A961;
        }
        .tp-report-footer {
          margin-top: 24px;
          padding-top: 16px;
          border-top: 1px solid #EEE;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .tp-report-stamp {
          text-align: center;
          padding: 10px 20px;
          border: 2px solid #C9A961;
          border-radius: 8px;
          color: #C9A961;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.7;
        }

        /* ── Toast ── */
        .tp-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          padding: 12px 20px;
          background: #2D5F3F;
          color: #FFFFFF;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(45,95,63,0.3);
          z-index: 999;
          animation: tpToastIn 0.3s ease, tpToastOut 0.3s ease 2.2s forwards;
        }
        @keyframes tpToastIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tpToastOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(20px); }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .tp-assignment-form {
            grid-template-columns: 1fr;
          }
          .tp-attendance-header {
            flex-direction: column;
            align-items: stretch;
          }
          .tp-attendance-actions {
            margin-left: 0;
            justify-content: stretch;
          }
          .tp-attendance-actions .tp-btn-sm {
            flex: 1;
            text-align: center;
          }
          .tp-report-header {
            flex-direction: column;
            text-align: center;
            padding: 20px;
          }
          .tp-report-body {
            padding: 20px;
          }
          .tp-report-student-info {
            flex-direction: column;
            gap: 12px;
          }
          .tp-report-footer {
            flex-direction: column;
            gap: 16px;
            align-items: center;
          }
          .tp-student-row {
            flex-wrap: wrap;
            gap: 8px;
          }
          .tp-assignment-row {
            flex-wrap: wrap;
            gap: 8px;
          }
          .tp-report-select {
            flex-direction: column;
          }
        }
      ` }} />

      {/* ──── Page Layout ──── */}
      <div className="D D1 D1-short">
        <Navbar />
        <section className="page-hero" style={{ paddingBottom: '24px' }}>
          <h1 className="page-hero-title">Teacher Portal</h1>
          <p className="page-hero-subtitle">
            Manage attendance, assignments &amp; report cards — {profile.full_name}
          </p>
        </section>
      </div>

      <div className="D D2 D2-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <QuoteSlider />

        <div className="admission-section" style={{ maxWidth: 960 }}>
          {/* ── Tab Bar ── */}
          <div className="tp-tab-bar">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`tp-tab${activeTab === tab.key ? ' tp-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* ════════════════════════════════════
              ATTENDANCE TAB
              ════════════════════════════════════ */}
          {activeTab === 'attendance' && (
            <div>
              <div className="tp-attendance-header">
                <div className="form-group" style={{ gap: 4 }}>
                  <label className="form-label" style={{ fontSize: 12 }}>Date</label>
                  <input
                    type="date"
                    className="tp-date-input"
                    value={attendanceDate}
                    onChange={(e) => { setAttendanceDate(e.target.value); setAttendanceSaved(false) }}
                  />
                </div>
                <div className="tp-attendance-actions">
                  <button className="tp-btn-sm tp-btn-outline" onClick={markAllPresent}>
                    Mark All Present
                  </button>
                  <button className="tp-btn-sm tp-btn-green" onClick={saveAttendance}>
                    Save Attendance
                  </button>
                </div>
              </div>

              <div className="tp-student-list">
                {students.map((s) => (
                  <div key={s.id} className="tp-student-row">
                    <div className="tp-student-avatar">
                      {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className="tp-student-name">{s.name}</span>
                    <span
                      className="tp-section-badge"
                      style={{ backgroundColor: sectionColor(s.section) }}
                    >
                      {s.section}
                    </span>
                    <span className={`tp-status-label${s.present ? ' tp-status-present' : ' tp-status-absent'}`}>
                      {s.present ? 'Present' : 'Absent'}
                    </span>
                    <button
                      className={`tp-toggle${s.present ? ' tp-toggle-present' : ' tp-toggle-absent'}`}
                      onClick={() => toggleStudentPresent(s.id)}
                      aria-label={s.present ? 'Mark absent' : 'Mark present'}
                    >
                      <span className="tp-toggle-knob" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="tp-attendance-summary">
                <div className="tp-summary-item">
                  <p className="tp-summary-num">{students.filter((s) => s.present).length}</p>
                  <p className="tp-summary-label">Present</p>
                </div>
                <div className="tp-summary-item">
                  <p className="tp-summary-num tp-summary-num-red">{students.filter((s) => !s.present).length}</p>
                  <p className="tp-summary-label">Absent</p>
                </div>
                <div className="tp-summary-item">
                  <p className="tp-summary-num">{students.length}</p>
                  <p className="tp-summary-label">Total</p>
                </div>
              </div>

              {attendanceSaved && (
                <div className="tp-toast">Attendance saved successfully!</div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════
              ASSIGNMENTS TAB
              ════════════════════════════════════ */}
          {activeTab === 'assignments' && (
            <div>
              {/* New Assignment Form */}
              <div className="tp-assignment-form">
                <div className="form-group" style={{ gap: 4 }}>
                  <label className="form-label" style={{ fontSize: 12 }}>Title</label>
                  <input
                    className="form-input"
                    placeholder="Assignment title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ gap: 4 }}>
                  <label className="form-label" style={{ fontSize: 12 }}>Subject</label>
                  <input
                    className="form-input"
                    placeholder="Subject"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ gap: 4 }}>
                  <label className="form-label" style={{ fontSize: 12 }}>Section</label>
                  <select
                    className="form-input form-select"
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value as Section)}
                  >
                    <option value="nursery">Nursery</option>
                    <option value="primary">Primary</option>
                    <option value="jss">JSS</option>
                    <option value="sss">SSS</option>
                  </select>
                </div>
                <div className="form-group" style={{ gap: 4 }}>
                  <label className="form-label" style={{ fontSize: 12 }}>Due Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                  />
                </div>
                <button
                  className="tp-btn-sm tp-btn-green"
                  style={{ alignSelf: 'end', padding: '10px 18px', whiteSpace: 'nowrap' }}
                  onClick={addAssignment}
                  disabled={!newTitle.trim() || !newSubject.trim() || !newDueDate}
                >
                  + Add
                </button>
              </div>

              {/* Assignment List */}
              <div className="tp-assignment-list">
                {assignments.length === 0 && (
                  <p style={{ textAlign: 'center', color: '#999', padding: 32, fontSize: 14 }}>
                    No assignments yet. Create one above.
                  </p>
                )}
                {assignments.map((a) => (
                  <div key={a.id} className="tp-assignment-row">
                    <span className={`tp-assignment-status${a.status === 'active' ? ' tp-assignment-status-active' : ' tp-assignment-status-closed'}`} />
                    <div className="tp-assignment-info">
                      <p className="tp-assignment-title">{a.title}</p>
                      <p className="tp-assignment-meta">
                        {a.subject} &bull; <span style={{ textTransform: 'uppercase' }}>{a.section}</span> &bull; Due: {a.dueDate}
                      </p>
                    </div>
                    <span
                      className="tp-section-badge"
                      style={{
                        backgroundColor: a.status === 'active' ? '#22C55E' : '#999',
                        fontSize: 10,
                      }}
                    >
                      {a.status}
                    </span>
                    <div className="tp-assignment-actions">
                      {a.status === 'active' && (
                        <button
                          className="tp-action-icon"
                          title="Close assignment"
                          onClick={() => closeAssignment(a.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </button>
                      )}
                      <button
                        className="tp-action-icon tp-action-icon-danger"
                        title="Delete assignment"
                        onClick={() => deleteAssignment(a.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════════════════════════════
              REPORT CARDS TAB
              ════════════════════════════════════ */}
          {activeTab === 'reportcards' && (
            <div>
              <div className="tp-report-select">
                <div className="form-group" style={{ gap: 4, flex: 1 }}>
                  <label className="form-label" style={{ fontSize: 12 }}>Student</label>
                  <select
                    className="form-input form-select"
                    value={reportStudent}
                    onChange={(e) => setReportStudent(e.target.value)}
                  >
                    {initialStudents.map((s) => (
                      <option key={s.id} value={s.name}>{s.name} ({s.section.toUpperCase()})</option>
                    ))}
                  </select>
                </div>
                <button
                  className="tp-btn-sm tp-btn-gold"
                  style={{ alignSelf: 'end', padding: '10px 20px' }}
                  onClick={() => setShowReportPreview(true)}
                >
                  Generate Preview
                </button>
              </div>

              {showReportPreview && (
                <div className="tp-report-card">
                  {/* Header */}
                  <div className="tp-report-header">
                    <img
                      src="/school-logo.png"
                      alt="Aroyan Muslim School Logo"
                      className="tp-report-logo"
                    />
                    <div className="tp-report-school-info">
                      <h2 className="tp-report-school-name">Aroyan Muslim School</h2>
                      <p className="tp-report-school-motto">Knowledge &amp; Faith — Hand in Hand</p>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="tp-report-body">
                    <div className="tp-report-student-info">
                      <div className="tp-report-info-item">
                        <span className="tp-report-info-label">Student Name</span>
                        <span className="tp-report-info-value">{reportStudent}</span>
                      </div>
                      <div className="tp-report-info-item">
                        <span className="tp-report-info-label">Class</span>
                        <span className="tp-report-info-value">{mockReportStudent.section}</span>
                      </div>
                      <div className="tp-report-info-item">
                        <span className="tp-report-info-label">Term</span>
                        <span className="tp-report-info-value">{mockReportStudent.term}</span>
                      </div>
                    </div>

                    {/* Grades Table */}
                    <table className="tp-grades-table">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Score</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockReportStudent.grades.map((g, i) => (
                          <tr key={i}>
                            <td style={{ fontWeight: 500 }}>{g.subject}</td>
                            <td>{g.score}</td>
                            <td>
                              <span className={`tp-grade-badge${g.grade.startsWith('A') ? ' tp-grade-a' : g.grade.startsWith('B') ? ' tp-grade-b' : g.grade.startsWith('C') ? ' tp-grade-c' : ' tp-grade-d'}`}>
                                {g.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Comments */}
                    <div className="tp-report-comments">
                      <div className="tp-comment-block">
                        <p className="tp-comment-label">Teacher&apos;s Comment</p>
                        <p className="tp-comment-text">{mockReportStudent.teacherComment}</p>
                      </div>
                      <div className="tp-comment-block">
                        <p className="tp-comment-label">Head Teacher&apos;s Comment</p>
                        <p className="tp-comment-text">{mockReportStudent.headTeacherComment}</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="tp-report-footer">
                      <div style={{ fontSize: 12, color: '#999' }}>
                        Generated on {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="tp-report-stamp">Official Report</div>
                    </div>
                  </div>
                </div>
              )}

              {!showReportPreview && (
                <div style={{
                  textAlign: 'center', padding: '60px 24px', color: '#999',
                  border: '2px dashed #E8E8E8', borderRadius: 12,
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48, margin: '0 auto 16px', display: 'block' }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M9 15l2 2 4-4" />
                  </svg>
                  <p style={{ fontSize: 15, margin: 0 }}>Select a student and click &ldquo;Generate Preview&rdquo; to view the report card.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
