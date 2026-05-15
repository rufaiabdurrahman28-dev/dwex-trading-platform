'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import QuoteSlider from '@/components/shared/QuoteSlider'
import type { Section } from '@/lib/types'

/* ============================================================
   SECTION KEY MAP
   ============================================================ */
const SECTION_KEYS: Record<string, Section> = {
  NURS2026: 'nursery',
  PRIM2026: 'primary',
  JSS2026: 'jss',
  SSS2026: 'sss',
}

const SECTION_LABELS: Record<Section, string> = {
  nursery: 'Nursery Section',
  primary: 'Primary Section',
  jss: 'Junior Secondary School',
  sss: 'Senior Secondary School',
}

const SECTION_DESCRIPTIONS: Record<Section, string> = {
  nursery: 'Early childhood education for ages 3–5 with Islamic foundations',
  primary: 'Comprehensive primary education for ages 6–11 blending Western and Islamic curriculum',
  jss: 'Junior secondary education preparing students for senior studies',
  sss: 'Senior secondary education with specialized subject tracks',
}

/* ============================================================
   MOCK DATA
   ============================================================ */

interface ClassItem {
  id: string
  name: string
  teacher: string
  students: number
  subject: string
}

interface SchoolFile {
  id: string
  name: string
  category: string
  status: 'pending' | 'approved' | 'not_approved'
  uploadedBy: string
  date: string
}

interface Announcement {
  id: string
  title: string
  message: string
  date: string
  priority: 'normal' | 'important' | 'urgent'
  author: string
}

const MOCK_CLASSES: Record<Section, ClassItem[]> = {
  nursery: [
    { id: 'n1', name: 'Nursery 1A', teacher: 'Ustadha Khadijah', students: 22, subject: 'Arabic & Quran' },
    { id: 'n2', name: 'Nursery 1B', teacher: 'Ustadha Aisha', students: 20, subject: 'English & Numeracy' },
    { id: 'n3', name: 'Nursery 2A', teacher: 'Ustadha Fatimah', students: 24, subject: 'Islamic Studies' },
    { id: 'n4', name: 'Nursery 2B', teacher: 'Ustadha Maryam', students: 19, subject: 'Creative Arts' },
    { id: 'n5', name: 'Nursery 3', teacher: 'Ustadha Zainab', students: 21, subject: 'Social Habits' },
  ],
  primary: [
    { id: 'p1', name: 'Primary 1', teacher: 'Mallam Yusuf', students: 28, subject: 'Quran & Tajweed' },
    { id: 'p2', name: 'Primary 2', teacher: 'Mrs. Adebayo', students: 26, subject: 'English Studies' },
    { id: 'p3', name: 'Primary 3', teacher: 'Mallam Ibrahim', students: 30, subject: 'Mathematics' },
    { id: 'p4', name: 'Primary 4', teacher: 'Mrs. Okafor', students: 27, subject: 'Basic Science' },
    { id: 'p5', name: 'Primary 5', teacher: 'Mallam Abdullah', students: 25, subject: 'Islamic Studies' },
    { id: 'p6', name: 'Primary 6', teacher: 'Mrs. Salau', students: 29, subject: 'Civic Education' },
  ],
  jss: [
    { id: 'j1', name: 'JSS 1A', teacher: 'Mr. Hassan', students: 32, subject: 'Arabic Language' },
    { id: 'j2', name: 'JSS 1B', teacher: 'Mrs. Bello', students: 30, subject: 'English Language' },
    { id: 'j3', name: 'JSS 2A', teacher: 'Mr. Olamide', students: 28, subject: 'Mathematics' },
    { id: 'j4', name: 'JSS 2B', teacher: 'Mrs. Yakubu', students: 31, subject: 'Basic Technology' },
    { id: 'j5', name: 'JSS 3A', teacher: 'Mr. Muhammed', students: 26, subject: 'Fiqh & Aqeedah' },
    { id: 'j6', name: 'JSS 3B', teacher: 'Mrs. Ahmed', students: 29, subject: 'Social Studies' },
  ],
  sss: [
    { id: 's1', name: 'SSS 1 Science', teacher: 'Mr. Tijani', students: 24, subject: 'Physics & Chemistry' },
    { id: 's2', name: 'SSS 1 Arts', teacher: 'Mrs. Kazeem', students: 22, subject: 'Literature & History' },
    { id: 's3', name: 'SSS 1 Commercial', teacher: 'Mr. Dauda', students: 20, subject: 'Accounting & Commerce' },
    { id: 's4', name: 'SSS 2 Science', teacher: 'Mr. Suleiman', students: 23, subject: 'Biology & Chemistry' },
    { id: 's5', name: 'SSS 2 Arts', teacher: 'Mrs. Ganiyu', students: 21, subject: 'Government & Economics' },
    { id: 's6', name: 'SSS 3 Science', teacher: 'Mr. Shittu', students: 18, subject: 'Exam Preparation' },
  ],
}

const MOCK_FILES: SchoolFile[] = [
  { id: 'f1', name: 'Term 2 Scheme of Work - Nursery', category: 'Curriculum', status: 'approved', uploadedBy: 'Admin', date: '2026-01-15' },
  { id: 'f2', name: 'Primary 6 Exam Timetable', category: 'Examination', status: 'approved', uploadedBy: 'Ustadha Khadijah', date: '2026-02-08' },
  { id: 'f3', name: 'JSS 3 Lesson Notes - Fiqh', category: 'Lesson Notes', status: 'approved', uploadedBy: 'Mr. Muhammed', date: '2026-01-20' },
  { id: 'f4', name: 'SSS 1 Physics Practical Guide', category: 'Resources', status: 'pending', uploadedBy: 'Mr. Tijani', date: '2026-02-12' },
  { id: 'f5', name: 'School Calendar 2025–2026', category: 'Administrative', status: 'approved', uploadedBy: 'Admin', date: '2025-09-01' },
  { id: 'f6', name: 'Arabic Language Syllabus (Revised)', category: 'Curriculum', status: 'not_approved', uploadedBy: 'Mallam Yusuf', date: '2026-02-14' },
  { id: 'f7', name: 'Mid-Term Report Template', category: 'Administrative', status: 'approved', uploadedBy: 'Admin', date: '2026-01-28' },
  { id: 'f8', name: 'SSS 3 WAEC Registration Guide', category: 'Examination', status: 'approved', uploadedBy: 'Mr. Shittu', date: '2026-02-05' },
]

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: 'Mid-Term Break Notice', message: 'School will be closed from February 20th to February 27th for mid-term break. All students are expected to resume on February 28th.', date: '2026-02-10', priority: 'important', author: 'Head of School' },
  { id: 'a2', title: 'Quran Competition Registration', message: 'The annual Quran recitation competition is scheduled for March 15th. Interested students should register with their class teachers by March 1st.', date: '2026-02-08', priority: 'normal', author: 'Islamic Studies Dept.' },
  { id: 'a3', title: 'Parent-Teacher Conference', message: 'Mandatory parent-teacher conference for all sections on March 5th from 9:00 AM to 2:00 PM. Please ensure your ward\'s report card is collected.', date: '2026-02-14', priority: 'urgent', author: 'Academic Affairs' },
  { id: 'a4', title: 'New Library Hours', message: 'The school library will now be open from 8:00 AM to 4:00 PM on weekdays and 10:00 AM to 2:00 PM on Saturdays.', date: '2026-02-06', priority: 'normal', author: 'Librarian' },
  { id: 'a5', title: 'Sports Day Preparations', message: 'Inter-house sports day is coming up on March 22nd. All students must participate in at least one event. Practice sessions begin next week.', date: '2026-02-12', priority: 'important', author: 'Sports Department' },
  { id: 'a6', title: 'WAEC Registration Deadline', message: 'SSS 3 students are reminded that WAEC registration closes on February 28th. Late registration will attract additional fees.', date: '2026-02-13', priority: 'urgent', author: 'Examinations Officer' },
]

/* ============================================================
   TAB TYPE
   ============================================================ */
type TabKey = 'classes' | 'files' | 'announcements'

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function SchoolPortalPage() {
  const router = useRouter()
  const { profile, portalAccess, loading } = useAuth()

  // Section key state
  const [keyInput, setKeyInput] = useState('')
  const [keyError, setKeyError] = useState('')
  const [unlockedSection, setUnlockedSection] = useState<Section | null>(null)

  // Tab state
  const [activeTab, setActiveTab] = useState<TabKey>('classes')

  /* ---- Auth Guard ---- */
  useEffect(() => {
    if (!loading && !profile) {
      router.push('/login')
    }
  }, [loading, profile, router])

  /* ---- Section key submit ---- */
  function handleKeySubmit(e: React.FormEvent) {
    e.preventDefault()
    const key = keyInput.trim().toUpperCase()
    if (SECTION_KEYS[key]) {
      setUnlockedSection(SECTION_KEYS[key])
      setKeyError('')
      setKeyInput('')
    } else {
      setKeyError('Invalid section key. Please check and try again.')
    }
  }

  /* ---- Status badge ---- */
  function renderFileStatus(status: SchoolFile['status']) {
    const map = {
      approved: { bg: 'rgba(45,95,63,0.1)', color: '#2D5F3F', label: 'Approved' },
      pending: { bg: 'rgba(201,169,97,0.15)', color: '#B8943F', label: 'Pending' },
      not_approved: { bg: 'rgba(220,53,69,0.1)', color: '#dc3545', label: 'Not Approved' },
    }
    const s = map[status]
    return (
      <span style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        background: s.bg,
        color: s.color,
      }}>
        {s.label}
      </span>
    )
  }

  /* ---- Priority badge ---- */
  function renderPriority(priority: Announcement['priority']) {
    const map = {
      normal: { bg: 'rgba(45,95,63,0.1)', color: '#2D5F3F', label: 'Normal' },
      important: { bg: 'rgba(201,169,97,0.15)', color: '#B8943F', label: 'Important' },
      urgent: { bg: 'rgba(220,53,69,0.1)', color: '#dc3545', label: 'Urgent' },
    }
    const p = map[priority]
    return (
      <span style={{
        display: 'inline-block',
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        background: p.bg,
        color: p.color,
      }}>
        {p.label}
      </span>
    )
  }

  /* ======== LOADING STATE ======== */
  if (loading) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">School Portal</h1>
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

  /* ======== NO PROFILE ======== */
  if (!profile) return null

  /* ======== NO SCHOOL ACCESS ======== */
  if (!portalAccess?.school) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">School Portal</h1>
          </section>
        </div>
        <div className="D D2 D2-auto D2-center">
          <div style={{
            textAlign: 'center',
            padding: '60px 24px',
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 64, height: 64, margin: '0 auto 20px', display: 'block' }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#dc3545', margin: '0 0 12px' }}>Access Denied</h2>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.6, margin: '0 0 24px' }}>
              You do not have access to the School Portal. This portal is available for teachers and managers only.
              If you believe this is an error, please contact the school administration.
            </p>
            <a href="/dashboard" className="cta-btn cta-btn-filled" style={{ fontSize: '14px', padding: '10px 28px' }}>
              Back to Dashboard
            </a>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  /* ======== SECTION KEY ENTRY ======== */
  if (!unlockedSection) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: `
          .school-key-section {
            max-width: 520px;
            width: 100%;
            margin: 0 auto;
            padding: 40px 24px;
          }
          .school-key-card {
            background: #FFFFFF;
            border: 1.5px solid #E8E8E8;
            border-radius: 16px;
            padding: 36px 32px;
            box-shadow: 0 6px 24px rgba(0,0,0,0.06);
            position: relative;
            overflow: hidden;
          }
          .school-key-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 4px;
            background: linear-gradient(90deg, #2D5F3F, #C9A961);
          }
          .school-key-icon {
            width: 72px; height: 72px;
            background: linear-gradient(135deg, rgba(45,95,63,0.1), rgba(201,169,97,0.15));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            color: #2D5F3F;
          }
          .school-key-title {
            font-size: 24px; font-weight: 700; color: #2D5F3F;
            margin: 0 0 8px; text-align: center;
          }
          .school-key-desc {
            font-size: 14px; color: #777; line-height: 1.6;
            margin: 0 0 28px; text-align: center;
          }
          .school-key-form {
            display: flex; flex-direction: column; gap: 14px;
          }
          .school-key-error {
            color: #dc3545; font-size: 13px; font-weight: 500;
            margin: 0; text-align: center;
          }
          .school-key-hint {
            margin-top: 20px; padding: 16px 18px;
            background: rgba(201,169,97,0.08);
            border: 1px solid rgba(201,169,97,0.2);
            border-radius: 10px;
          }
          .school-key-hint-title {
            font-size: 13px; font-weight: 600; color: #C9A961;
            margin: 0 0 6px;
          }
          .school-key-hint-text {
            font-size: 12px; color: #888; line-height: 1.6; margin: 0;
          }
          .school-key-sections-grid {
            display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
            margin-top: 12px;
          }
          .school-key-section-chip {
            display: flex; align-items: center; gap: 8px;
            padding: 8px 12px;
            background: rgba(45,95,63,0.04);
            border: 1px solid rgba(45,95,63,0.1);
            border-radius: 8px;
            font-size: 12px; color: #555; font-weight: 500;
          }
          .school-key-section-dot {
            width: 8px; height: 8px; border-radius: 50%; min-width: 8px;
          }
        ` }} />

        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">School Portal</h1>
            <p className="page-hero-subtitle">Access class content, school files, and announcements</p>
          </section>
        </div>

        <div className="D D2 D2-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <QuoteSlider />
          <div className="school-key-section">
            <div className="school-key-card">
              <div className="school-key-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 className="school-key-title">Enter Section Key</h2>
              <p className="school-key-desc">
                Please enter the section access key provided by the school administration to view your section content.
              </p>

              <form className="school-key-form" onSubmit={handleKeySubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="section-key">Section Key</label>
                  <input
                    id="section-key"
                    className="form-input"
                    type="text"
                    placeholder="e.g. PRIM2026"
                    value={keyInput}
                    onChange={(e) => { setKeyInput(e.target.value); setKeyError('') }}
                    autoComplete="off"
                    style={{ textAlign: 'center', letterSpacing: '2px', fontWeight: 600, textTransform: 'uppercase' }}
                  />
                </div>
                {keyError && <p className="school-key-error">{keyError}</p>}
                <button type="submit" className="form-submit-btn">Unlock Section</button>
              </form>

              <div className="school-key-hint">
                <p className="school-key-hint-title">Available Sections</p>
                <p className="school-key-hint-text">Contact the school administration to obtain your section access key.</p>
                <div className="school-key-sections-grid">
                  <div className="school-key-section-chip">
                    <span className="school-key-section-dot" style={{ background: '#C9A961' }}></span>
                    Nursery
                  </div>
                  <div className="school-key-section-chip">
                    <span className="school-key-section-dot" style={{ background: '#2D5F3F' }}></span>
                    Primary
                  </div>
                  <div className="school-key-section-chip">
                    <span className="school-key-section-dot" style={{ background: '#1F3D2A' }}></span>
                    JSS
                  </div>
                  <div className="school-key-section-chip">
                    <span className="school-key-section-dot" style={{ background: '#8B6914' }}></span>
                    SSS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    )
  }

  /* ======== UNLOCKED CONTENT ======== */
  const sectionClasses = MOCK_CLASSES[unlockedSection]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* === SCHOOL PORTAL LAYOUT === */
        .school-portal-layout {
          max-width: 1060px;
          width: 100%;
          margin: 0 auto;
          padding: 32px 24px 48px;
        }
        .school-portal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 28px;
        }
        .school-portal-section-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .school-portal-section-badge {
          width: 52px; height: 52px;
          background: linear-gradient(135deg, #2D5F3F, #1F3D2A);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C9A961;
        }
        .school-portal-section-name {
          font-size: 22px; font-weight: 700; color: #2D5F3F;
          margin: 0;
        }
        .school-portal-section-desc {
          font-size: 13px; color: #777; margin: 2px 0 0;
        }
        .school-portal-back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 18px;
          background: transparent;
          border: 1.5px solid #DDD;
          border-radius: 8px;
          color: #555;
          font-size: 13px; font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .school-portal-back-btn:hover {
          border-color: #2D5F3F;
          color: #2D5F3F;
          background: rgba(45,95,63,0.04);
        }

        /* === TABS === */
        .school-portal-tabs {
          display: flex;
          gap: 4px;
          background: #F5F5F5;
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 28px;
        }
        .school-portal-tab {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          background: transparent;
          color: #777;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .school-portal-tab:hover {
          color: #2D5F3F;
          background: rgba(45,95,63,0.04);
        }
        .school-portal-tab-active {
          background: #FFFFFF;
          color: #2D5F3F;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .school-portal-tab-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 22px;
          height: 22px;
          padding: 0 6px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          background: rgba(45,95,63,0.1);
          color: #2D5F3F;
        }
        .school-portal-tab-active .school-portal-tab-count {
          background: #2D5F3F;
          color: #FFFFFF;
        }

        /* === CLASS CONTENT CARDS === */
        .school-classes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .school-class-card {
          background: #FFFFFF;
          border: 1.5px solid #E8E8E8;
          border-radius: 14px;
          padding: 22px 20px;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.2s ease, border-color 0.3s ease;
        }
        .school-class-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2D5F3F, #C9A961);
        }
        .school-class-card:hover {
          box-shadow: 0 8px 24px rgba(45,95,63,0.1);
          transform: translateY(-3px);
          border-color: rgba(45,95,63,0.2);
        }
        .school-class-name {
          font-size: 17px; font-weight: 700; color: #2D5F3F;
          margin: 0 0 8px;
        }
        .school-class-detail {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; color: #666; margin-bottom: 6px;
        }
        .school-class-detail svg {
          width: 14px; height: 14px; color: #C9A961; min-width: 14px;
        }
        .school-class-subject-badge {
          display: inline-block;
          margin-top: 10px;
          padding: 4px 12px;
          background: rgba(45,95,63,0.06);
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #2D5F3F;
        }

        /* === FILES TABLE === */
        .school-files-wrapper {
          border: 1.5px solid #E8E8E8;
          border-radius: 14px;
          overflow: hidden;
        }
        .school-files-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .school-files-table th {
          background-color: #2D5F3F;
          color: #FFFFFF;
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          font-size: 13px;
        }
        .school-files-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #F0F0F0;
          color: #555;
        }
        .school-files-table tr:last-child td {
          border-bottom: none;
        }
        .school-files-table tr:hover td {
          background-color: #F8F9F5;
        }
        .school-files-name {
          font-weight: 600; color: #2D5F3F;
          display: flex; align-items: center; gap: 8px;
        }
        .school-files-name svg {
          width: 16px; height: 16px; min-width: 16px; color: #C9A961;
        }
        .school-files-category-badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          background: rgba(45,95,63,0.06);
          color: #2D5F3F;
        }

        /* === ANNOUNCEMENTS === */
        .school-announcements-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .school-announcement-card {
          background: #FFFFFF;
          border: 1.5px solid #E8E8E8;
          border-radius: 14px;
          padding: 22px 24px;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .school-announcement-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          border-color: rgba(45,95,63,0.15);
        }
        .school-announcement-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 4px;
        }
        .school-announcement-priority-normal::before {
          background: #2D5F3F;
        }
        .school-announcement-priority-important::before {
          background: #C9A961;
        }
        .school-announcement-priority-urgent::before {
          background: #dc3545;
        }
        .school-announcement-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 10px;
        }
        .school-announcement-title {
          font-size: 17px; font-weight: 700; color: #2D5F3F; margin: 0;
        }
        .school-announcement-meta {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 10px;
          font-size: 12px; color: #999;
        }
        .school-announcement-meta-item {
          display: flex; align-items: center; gap: 4px;
        }
        .school-announcement-meta svg {
          width: 12px; height: 12px;
        }
        .school-announcement-message {
          font-size: 14px; color: #555; line-height: 1.7; margin: 0;
        }

        /* === EMPTY STATE === */
        .school-empty-state {
          text-align: center;
          padding: 48px 24px;
          color: #999;
        }
        .school-empty-state svg {
          margin: 0 auto 12px; display: block;
        }
        .school-empty-state p {
          font-size: 14px; margin: 0;
        }

        /* === RESPONSIVE === */
        @media (max-width: 768px) {
          .school-classes-grid {
            grid-template-columns: 1fr;
          }
          .school-portal-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .school-portal-tabs {
            flex-wrap: wrap;
          }
          .school-portal-tab {
            flex: unset;
            flex-grow: 1;
            min-width: calc(50% - 4px);
            font-size: 12px;
            padding: 10px 12px;
          }
          .school-files-table th,
          .school-files-table td {
            padding: 10px 12px;
            font-size: 12px;
          }
          .school-portal-section-name {
            font-size: 18px;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .school-classes-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      ` }} />

      <div className="D D1 D1-short">
        <Navbar />
        <section className="page-hero">
          <h1 className="page-hero-title">School Portal</h1>
          <p className="page-hero-subtitle">{SECTION_LABELS[unlockedSection]}</p>
        </section>
      </div>

      <div className="D D2 D2-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <QuoteSlider />

        <div className="school-portal-layout">
          {/* Header */}
          <div className="school-portal-header">
            <div className="school-portal-section-info">
              <div className="school-portal-section-badge">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                  <path d="M3 21h18" />
                  <path d="M5 21V7l8-4v18" />
                  <path d="M19 21V11l-6-4" />
                  <path d="M9 9h1" />
                  <path d="M9 13h1" />
                  <path d="M9 17h1" />
                </svg>
              </div>
              <div>
                <h2 className="school-portal-section-name">{SECTION_LABELS[unlockedSection]}</h2>
                <p className="school-portal-section-desc">{SECTION_DESCRIPTIONS[unlockedSection]}</p>
              </div>
            </div>
            <button className="school-portal-back-btn" onClick={() => setUnlockedSection(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                <path d="M19 12H5" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Change Section
            </button>
          </div>

          {/* Tabs */}
          <div className="school-portal-tabs" role="tablist">
            <button
              className={`school-portal-tab${activeTab === 'classes' ? ' school-portal-tab-active' : ''}`}
              onClick={() => setActiveTab('classes')}
              role="tab"
              aria-selected={activeTab === 'classes'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Class Content
              <span className="school-portal-tab-count">{sectionClasses.length}</span>
            </button>
            <button
              className={`school-portal-tab${activeTab === 'files' ? ' school-portal-tab-active' : ''}`}
              onClick={() => setActiveTab('files')}
              role="tab"
              aria-selected={activeTab === 'files'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              School Files
              <span className="school-portal-tab-count">{MOCK_FILES.length}</span>
            </button>
            <button
              className={`school-portal-tab${activeTab === 'announcements' ? ' school-portal-tab-active' : ''}`}
              onClick={() => setActiveTab('announcements')}
              role="tab"
              aria-selected={activeTab === 'announcements'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              Announcements
              <span className="school-portal-tab-count">{MOCK_ANNOUNCEMENTS.length}</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'classes' && (
            <div className="school-classes-grid" role="tabpanel">
              {sectionClasses.map((cls) => (
                <div key={cls.id} className="school-class-card">
                  <h3 className="school-class-name">{cls.name}</h3>
                  <div className="school-class-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    {cls.teacher}
                  </div>
                  <div className="school-class-detail">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {cls.students} Students
                  </div>
                  <span className="school-class-subject-badge">{cls.subject}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'files' && (
            <div className="school-files-wrapper" role="tabpanel">
              <div style={{ overflowX: 'auto' }}>
                <table className="school-files-table">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Uploaded By</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_FILES.map((file) => (
                      <tr key={file.id}>
                        <td>
                          <div className="school-files-name">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                            {file.name}
                          </div>
                        </td>
                        <td>
                          <span className="school-files-category-badge">{file.category}</span>
                        </td>
                        <td>{renderFileStatus(file.status)}</td>
                        <td>{file.uploadedBy}</td>
                        <td>{file.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'announcements' && (
            <div className="school-announcements-list" role="tabpanel">
              {MOCK_ANNOUNCEMENTS.map((ann) => (
                <div
                  key={ann.id}
                  className={`school-announcement-card school-announcement-priority-${ann.priority}`}
                >
                  <div className="school-announcement-top">
                    <h3 className="school-announcement-title">{ann.title}</h3>
                    {renderPriority(ann.priority)}
                  </div>
                  <div className="school-announcement-meta">
                    <span className="school-announcement-meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      {ann.date}
                    </span>
                    <span className="school-announcement-meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {ann.author}
                    </span>
                  </div>
                  <p className="school-announcement-message">{ann.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
