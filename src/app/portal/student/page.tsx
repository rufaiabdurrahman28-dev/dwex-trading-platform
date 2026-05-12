'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import QuoteSlider from '@/components/shared/QuoteSlider'

/* ── Mock Data ── */

interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  status: 'Pending' | 'Submitted' | 'Late' | 'Graded'
}

interface Result {
  id: string
  subject: string
  term: string
  score: number
  grade: string
  remarks: string
}

interface ReportCard {
  term: string
  session: string
  classTeacher: string
  principalComment: string
  overallGrade: string
  subjects: { name: string; ca: number; exam: number; total: number; grade: string }[]
}

const mockAssignments: Assignment[] = [
  { id: '1', title: 'Surah Al-Baqarah Memorization (Ayat 1-20)', subject: 'Quranic Studies', dueDate: '2026-03-15', status: 'Pending' },
  { id: '2', title: 'Arabic Verb Conjugation Worksheet', subject: 'Arabic Language', dueDate: '2026-03-12', status: 'Submitted' },
  { id: '3', title: 'Fraction Word Problems', subject: 'Mathematics', dueDate: '2026-03-10', status: 'Graded' },
  { id: '4', title: 'Essay: The Life of Prophet Muhammad (PBUH)', subject: 'Islamic Studies', dueDate: '2026-03-18', status: 'Pending' },
  { id: '5', title: 'Reading Comprehension: Chapter 5', subject: 'English Language', dueDate: '2026-03-08', status: 'Late' },
  { id: '6', title: 'Tajweed Practice Record', subject: 'Quranic Studies', dueDate: '2026-03-20', status: 'Pending' },
  { id: '7', title: 'Basic Science Experiment Report', subject: 'Basic Science', dueDate: '2026-03-05', status: 'Graded' },
  { id: '8', title: 'Map Reading Exercise', subject: 'Social Studies', dueDate: '2026-03-22', status: 'Pending' },
]

const mockResults: Result[] = [
  { id: '1', subject: 'Quranic Studies', term: 'First Term 2025/2026', score: 92, grade: 'A+', remarks: 'Excellent memorization' },
  { id: '2', subject: 'Arabic Language', term: 'First Term 2025/2026', score: 85, grade: 'A', remarks: 'Very good understanding' },
  { id: '3', subject: 'Mathematics', term: 'First Term 2025/2026', score: 78, grade: 'B+', remarks: 'Good effort, improve on algebra' },
  { id: '4', subject: 'English Language', term: 'First Term 2025/2026', score: 81, grade: 'A-', remarks: 'Solid comprehension skills' },
  { id: '5', subject: 'Islamic Studies', term: 'First Term 2025/2026', score: 95, grade: 'A+', remarks: 'Outstanding performance' },
  { id: '6', subject: 'Basic Science', term: 'First Term 2025/2026', score: 72, grade: 'B', remarks: 'Satisfactory, needs more practice' },
  { id: '7', subject: 'Social Studies', term: 'First Term 2025/2026', score: 88, grade: 'A', remarks: 'Very good participation' },
]

const mockReportCard: ReportCard = {
  term: 'First Term 2025/2026',
  session: '2025/2026',
  classTeacher: 'Ustadh Ahmad Ibrahim',
  principalComment: 'A diligent student with excellent Quranic memorization skills. Keep up the great work and focus more on Mathematics and Science.',
  overallGrade: 'A',
  subjects: [
    { name: 'Quranic Studies', ca: 28, exam: 64, total: 92, grade: 'A+' },
    { name: 'Arabic Language', ca: 25, exam: 60, total: 85, grade: 'A' },
    { name: 'Mathematics', ca: 22, exam: 56, total: 78, grade: 'B+' },
    { name: 'English Language', ca: 24, exam: 57, total: 81, grade: 'A-' },
    { name: 'Islamic Studies', ca: 29, exam: 66, total: 95, grade: 'A+' },
    { name: 'Basic Science', ca: 20, exam: 52, total: 72, grade: 'B' },
    { name: 'Social Studies', ca: 26, exam: 62, total: 88, grade: 'A' },
  ],
}

/* ── Tab Types ── */
type TabKey = 'assignments' | 'results' | 'report'

/* ── Status Color Helper ── */
function getStatusStyle(status: Assignment['status']) {
  switch (status) {
    case 'Pending': return { bg: '#FFF3E0', color: '#E65100', border: '#FFB74D' }
    case 'Submitted': return { bg: '#E3F2FD', color: '#1565C0', border: '#64B5F6' }
    case 'Late': return { bg: '#FFEBEE', color: '#C62828', border: '#EF9A9A' }
    case 'Graded': return { bg: '#E8F5E9', color: '#2E7D32', border: '#81C784' }
  }
}

/* ── Component ── */
export default function StudentPortalPage() {
  const router = useRouter()
  const { profile, portalAccess, loading, user } = useAuth()
  const [activeTab, setActiveTab] = useState<TabKey>('assignments')

  /* Auth guard */
  useEffect(() => {
    if (!loading && !profile && !user) {
      router.push('/login')
    }
  }, [loading, profile, user, router])

  /* Loading state */
  if (loading) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">Student Portal</h1>
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

  /* Not logged in */
  if (!profile && !user) return null

  /* No student access */
  if (portalAccess && !portalAccess.student) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">Student Portal</h1>
          </section>
        </div>
        <div className="D D2 D2-auto D2-center">
          <div style={{
            textAlign: 'center',
            padding: '60px 24px',
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            <div style={{
              width: '80px', height: '80px', margin: '0 auto 20px',
              background: 'rgba(220, 53, 69, 0.1)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 36, height: 36 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#dc3545', margin: '0 0 12px' }}>Access Denied</h2>
            <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.6, margin: '0 0 24px' }}>
              You do not have permission to access the Student Portal. Please contact the school administrator if you believe this is an error.
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

  /* Profile still loading */
  if (!profile) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">Student Portal</h1>
          </section>
        </div>
        <div className="D D2 D2-auto D2-center">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#777', fontSize: '16px' }}>Setting up your profile...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  /* Tab config */
  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    {
      key: 'assignments',
      label: 'My Assignments',
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
      key: 'results',
      label: 'My Results',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
    {
      key: 'report',
      label: 'My Report Card',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* ── Portal-specific CSS ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .student-tabs {
          display: flex;
          gap: 8px;
          padding: 0 24px;
          max-width: 960px;
          margin: 0 auto 28px;
          flex-wrap: wrap;
        }
        .student-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border: 1.5px solid #E0E0E0;
          border-radius: 10px;
          background: #FFFFFF;
          color: #555;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .student-tab:hover {
          border-color: #2D5F3F;
          color: #2D5F3F;
          background: rgba(45, 95, 63, 0.04);
        }
        .student-tab-active {
          background: #2D5F3F;
          color: #FFFFFF;
          border-color: #2D5F3F;
        }
        .student-tab-active:hover {
          background: #1F4A2E;
          color: #FFFFFF;
          border-color: #1F4A2E;
        }
        .student-content {
          max-width: 960px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px 40px;
        }
        /* Assignments */
        .assignment-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .assignment-card {
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: box-shadow 0.25s ease, transform 0.2s ease;
        }
        .assignment-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }
        .assignment-icon {
          width: 44px; height: 44px; min-width: 44px;
          background: rgba(45,95,63,0.08);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2D5F3F;
        }
        .assignment-info { flex: 1; }
        .assignment-title {
          font-size: 16px; font-weight: 600; color: #333; margin: 0 0 4px;
        }
        .assignment-subject {
          font-size: 13px; color: #2D5F3F; font-weight: 500; margin: 0 0 6px;
        }
        .assignment-due {
          font-size: 12px; color: #999; margin: 0;
        }
        .assignment-status {
          display: inline-flex;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          border: 1px solid;
        }
        /* Results table */
        .results-table-wrap {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid #E8E8E8;
        }
        .results-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .results-table th {
          background-color: #2D5F3F;
          color: #FFFFFF;
          padding: 14px 16px;
          text-align: left;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .results-table td {
          padding: 12px 16px;
          border-bottom: 1px solid #F0F0F0;
          color: #444;
        }
        .results-table tr:last-child td { border-bottom: none; }
        .results-table tr:hover td { background-color: #F8F9F5; }
        .grade-badge {
          display: inline-flex;
          padding: 3px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 700;
        }
        /* Report card */
        .report-card-wrapper {
          background: #FFFFFF;
          border: 1.5px solid #E0E0E0;
          border-radius: 16px;
          overflow: hidden;
        }
        .report-card-header {
          background: linear-gradient(135deg, #2D5F3F, #1F4A2E);
          color: #FFFFFF;
          padding: 28px 32px;
          text-align: center;
        }
        .report-card-header h3 {
          font-size: 22px; font-weight: 700; margin: 0 0 6px;
        }
        .report-card-header p {
          font-size: 14px; margin: 0; opacity: 0.85;
        }
        .report-card-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 24px 32px;
          border-bottom: 1px solid #F0F0F0;
        }
        .report-meta-item label {
          display: block; font-size: 11px; color: #999; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;
        }
        .report-meta-item span {
          font-size: 15px; color: #333; font-weight: 600;
        }
        .report-subjects-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .report-subjects-table th {
          background: rgba(45,95,63,0.06);
          color: #2D5F3F;
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }
        .report-subjects-table td {
          padding: 11px 16px;
          border-bottom: 1px solid #F0F0F0;
          color: #444;
        }
        .report-subjects-table tr:last-child td { border-bottom: none; }
        .report-comments {
          padding: 24px 32px;
          border-top: 1px solid #F0F0F0;
        }
        .report-comments h4 {
          font-size: 13px; font-weight: 600; color: #999;
          text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;
        }
        .report-comments p {
          font-size: 14px; color: #555; line-height: 1.7; margin: 0;
        }
        .report-overall {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px; border-radius: 8px;
          font-size: 16px; font-weight: 700;
          background: rgba(201,169,97,0.12); color: #C9A961;
        }
        /* Empty state */
        .empty-state {
          text-align: center; padding: 48px 24px;
        }
        .empty-state svg {
          color: #CCC; margin-bottom: 12px;
        }
        .empty-state p {
          font-size: 15px; color: #999; margin: 0;
        }
        /* Responsive */
        @media (max-width: 640px) {
          .student-tabs {
            gap: 6px;
          }
          .student-tab {
            padding: 10px 16px;
            font-size: 13px;
          }
          .assignment-card {
            flex-direction: column;
            gap: 10px;
          }
          .report-card-meta {
            grid-template-columns: 1fr;
            padding: 20px;
          }
          .report-card-header {
            padding: 20px;
          }
          .report-comments {
            padding: 20px;
          }
        }
      ` }} />

      {/* ── D1 - Hero ── */}
      <div className="D D1 D1-short">
        <Navbar />
        <section className="page-hero">
          <h1 className="page-hero-title">Student Portal</h1>
          <p className="page-hero-subtitle">View your assignments, results, and report cards</p>
        </section>
      </div>

      {/* ── D2 - Content ── */}
      <div className="D D2 D2-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <QuoteSlider />

        {/* Welcome */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '12px 24px 28px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#2D5F3F', margin: '0 0 4px' }}>
            Assalamu Alaikum, {profile.full_name}
          </h2>
          <p style={{ fontSize: '14px', color: '#888', margin: '0' }}>
            {profile.section.toUpperCase()} Section &middot; Student
          </p>
        </div>

        {/* Tabs */}
        <div className="student-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`student-tab${activeTab === tab.key ? ' student-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
              aria-label={tab.label}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="student-content">
          {/* ─── Assignments Tab ─── */}
          {activeTab === 'assignments' && (
            <div className="assignment-list">
              {mockAssignments.map((a) => {
                const sc = getStatusStyle(a.status)
                return (
                  <div key={a.id} className="assignment-card">
                    <div className="assignment-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div className="assignment-info">
                      <h4 className="assignment-title">{a.title}</h4>
                      <p className="assignment-subject">{a.subject}</p>
                      <p className="assignment-due">Due: {new Date(a.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <span
                      className="assignment-status"
                      style={{ background: sc.bg, color: sc.color, borderColor: sc.border }}
                    >
                      {a.status}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {/* ─── Results Tab ─── */}
          {activeTab === 'results' && (
            <div className="results-table-wrap">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Term</th>
                    <th>Score</th>
                    <th>Grade</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {mockResults.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600, color: '#2D5F3F' }}>{r.subject}</td>
                      <td>{r.term}</td>
                      <td style={{ fontWeight: 600 }}>{r.score}/100</td>
                      <td>
                        <span className="grade-badge" style={{
                          background: r.score >= 80 ? 'rgba(45,95,63,0.1)' : r.score >= 60 ? 'rgba(201,169,97,0.15)' : 'rgba(220,53,69,0.1)',
                          color: r.score >= 80 ? '#2D5F3F' : r.score >= 60 ? '#C9A961' : '#dc3545',
                        }}>
                          {r.grade}
                        </span>
                      </td>
                      <td>{r.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ─── Report Card Tab ─── */}
          {activeTab === 'report' && (
            <div className="report-card-wrapper">
              <div className="report-card-header">
                <h3>Aroyan Muslim School</h3>
                <p>Official Student Report Card</p>
              </div>

              <div className="report-card-meta">
                <div className="report-meta-item">
                  <label>Student Name</label>
                  <span>{profile.full_name}</span>
                </div>
                <div className="report-meta-item">
                  <label>Section</label>
                  <span>{profile.section.toUpperCase()}</span>
                </div>
                <div className="report-meta-item">
                  <label>Term</label>
                  <span>{mockReportCard.term}</span>
                </div>
                <div className="report-meta-item">
                  <label>Overall Grade</label>
                  <span className="report-overall">{mockReportCard.overallGrade}</span>
                </div>
              </div>

              <table className="report-subjects-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>CA (30)</th>
                    <th>Exam (70)</th>
                    <th>Total (100)</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReportCard.subjects.map((s, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, color: '#2D5F3F' }}>{s.name}</td>
                      <td>{s.ca}</td>
                      <td>{s.exam}</td>
                      <td style={{ fontWeight: 700 }}>{s.total}</td>
                      <td>
                        <span className="grade-badge" style={{
                          background: s.total >= 80 ? 'rgba(45,95,63,0.1)' : s.total >= 60 ? 'rgba(201,169,97,0.15)' : 'rgba(220,53,69,0.1)',
                          color: s.total >= 80 ? '#2D5F3F' : s.total >= 60 ? '#C9A961' : '#dc3545',
                        }}>
                          {s.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="report-comments">
                <h4>Class Teacher</h4>
                <p style={{ marginBottom: '16px' }}>{mockReportCard.classTeacher}</p>
                <h4>Principal&apos;s Comment</h4>
                <p>{mockReportCard.principalComment}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
