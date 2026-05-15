'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import QuoteSlider from '@/components/shared/QuoteSlider'

/* ── Mock Data Types ── */

interface Message {
  id: string
  sender: 'user' | 'admin'
  senderName: string
  body: string
  timestamp: string
}

interface Conversation {
  id: string
  subject: string
  status: 'open' | 'closed'
  createdAt: string
  updatedAt: string
  messages: Message[]
}

/* ── Mock Conversations ── */
const initialMockConversations: Conversation[] = [
  {
    id: 'conv-1',
    subject: 'Issue with accessing assignment materials',
    status: 'open',
    createdAt: '2026-03-01T09:30:00Z',
    updatedAt: '2026-03-02T14:15:00Z',
    messages: [
      {
        id: 'msg-1a',
        sender: 'user',
        senderName: 'You',
        body: 'Assalamu Alaikum. I am unable to download the Arabic Language assignment materials from the student portal. The download link seems to be broken. Please assist.',
        timestamp: '2026-03-01T09:30:00Z',
      },
      {
        id: 'msg-1b',
        sender: 'admin',
        senderName: 'Admin Support',
        body: 'Wa Alaikum Salam. Thank you for reporting this. We have identified the issue with the file hosting server. It should be resolved within 24 hours. We will notify you once it is fixed.',
        timestamp: '2026-03-02T14:15:00Z',
      },
    ],
  },
  {
    id: 'conv-2',
    subject: 'Request for transcript for transfer',
    status: 'closed',
    createdAt: '2026-02-15T11:00:00Z',
    updatedAt: '2026-02-20T16:45:00Z',
    messages: [
      {
        id: 'msg-2a',
        sender: 'user',
        senderName: 'You',
        body: 'I need an official transcript for a transfer application. What is the process and how long will it take?',
        timestamp: '2026-02-15T11:00:00Z',
      },
      {
        id: 'msg-2b',
        sender: 'admin',
        senderName: 'Admin Support',
        body: 'Please visit the school office with a valid ID and a written request. Transcripts are typically ready within 5 business days. There is no fee for current students.',
        timestamp: '2026-02-16T10:00:00Z',
      },
      {
        id: 'msg-2c',
        sender: 'user',
        senderName: 'You',
        body: 'Thank you for the information. I will visit the office this week.',
        timestamp: '2026-02-16T12:30:00Z',
      },
      {
        id: 'msg-2d',
        sender: 'admin',
        senderName: 'Admin Support',
        body: 'You are welcome. This conversation has been resolved. Feel free to open a new one if you need further assistance.',
        timestamp: '2026-02-20T16:45:00Z',
      },
    ],
  },
  {
    id: 'conv-3',
    subject: 'Schedule conflict with Madrasah classes',
    status: 'open',
    createdAt: '2026-03-05T08:00:00Z',
    updatedAt: '2026-03-05T08:00:00Z',
    messages: [
      {
        id: 'msg-3a',
        sender: 'user',
        senderName: 'You',
        body: 'My Saturday Madrasah class overlaps with the new extra-curricular schedule. Can this be adjusted?',
        timestamp: '2026-03-05T08:00:00Z',
      },
    ],
  },
]

/* ── Tab Types ── */
type TabKey = 'new' | 'conversations'

/* ── Component ── */
export default function HelpdeskPortalPage() {
  const router = useRouter()
  const { profile, portalAccess, loading, user } = useAuth()

  const [activeTab, setActiveTab] = useState<TabKey>('conversations')
  const [conversations, setConversations] = useState<Conversation[]>(initialMockConversations)
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null)

  /* New message form */
  const [newSubject, setNewSubject] = useState('')
  const [newBody, setNewBody] = useState('')
  const [sendingNew, setSendingNew] = useState(false)
  const [newSuccess, setNewSuccess] = useState(false)

  /* Reply form */
  const [replyBody, setReplyBody] = useState('')
  const [sendingReply, setSendingReply] = useState(false)
  const [replySuccess, setReplySuccess] = useState(false)

  /* Auth guard */
  useEffect(() => {
    if (!loading && !profile && !user) {
      router.push('/login')
    }
  }, [loading, profile, user, router])

  /* Handlers */
  function handleSendNew(e: React.FormEvent) {
    e.preventDefault()
    if (!newSubject.trim() || !newBody.trim()) return

    setSendingNew(true)
    setTimeout(() => {
      const newConv: Conversation = {
        id: `conv-${Date.now()}`,
        subject: newSubject.trim(),
        status: 'open',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: 'user',
            senderName: 'You',
            body: newBody.trim(),
            timestamp: new Date().toISOString(),
          },
        ],
      }
      setConversations((prev) => [newConv, ...prev])
      setNewSubject('')
      setNewBody('')
      setSendingNew(false)
      setNewSuccess(true)
      setTimeout(() => setNewSuccess(false), 3000)
    }, 800)
  }

  function handleReply(e: React.FormEvent) {
    e.preventDefault()
    if (!replyBody.trim() || !selectedConv || selectedConv.status === 'closed') return

    setSendingReply(true)
    setTimeout(() => {
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        sender: 'user',
        senderName: 'You',
        body: replyBody.trim(),
        timestamp: new Date().toISOString(),
      }
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConv.id
            ? { ...c, messages: [...c.messages, newMsg], updatedAt: new Date().toISOString() }
            : c
        )
      )
      setSelectedConv((prev) =>
        prev ? { ...prev, messages: [...prev.messages, newMsg], updatedAt: new Date().toISOString() } : prev
      )
      setReplyBody('')
      setSendingReply(false)
      setReplySuccess(true)
      setTimeout(() => setReplySuccess(false), 3000)
    }, 600)
  }

  function openConversation(conv: Conversation) {
    setSelectedConv(conv)
    setActiveTab('conversations')
  }

  /* ── Render: Loading ── */
  if (loading) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">Helpdesk</h1>
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

  /* ── Render: Not logged in ── */
  if (!profile && !user) return null

  /* ── Render: No helpdesk access ── */
  if (portalAccess && !portalAccess.helpdesk) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">Helpdesk</h1>
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
              You do not have permission to access the Helpdesk. Please contact the school administrator if you believe this is an error.
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

  /* ── Render: Profile still loading ── */
  if (!profile) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">Helpdesk</h1>
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
      key: 'conversations',
      label: 'My Conversations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      key: 'new',
      label: 'New Message',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* ── Portal-specific CSS ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .helpdesk-tabs {
          display: flex;
          gap: 8px;
          padding: 0 24px;
          max-width: 960px;
          margin: 0 auto 28px;
          flex-wrap: wrap;
        }
        .helpdesk-tab {
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
        .helpdesk-tab:hover {
          border-color: #2D5F3F;
          color: #2D5F3F;
          background: rgba(45, 95, 63, 0.04);
        }
        .helpdesk-tab-active {
          background: #2D5F3F;
          color: #FFFFFF;
          border-color: #2D5F3F;
        }
        .helpdesk-tab-active:hover {
          background: #1F4A2E;
          color: #FFFFFF;
          border-color: #1F4A2E;
        }
        .helpdesk-content {
          max-width: 960px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px 40px;
        }
        /* Conversations list */
        .conv-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .conv-card {
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 12px;
          padding: 18px 22px;
          cursor: pointer;
          transition: box-shadow 0.25s ease, transform 0.2s ease, border-color 0.25s ease;
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .conv-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          transform: translateY(-2px);
          border-color: #2D5F3F;
        }
        .conv-card-selected {
          border-color: #2D5F3F;
          box-shadow: 0 0 0 2px rgba(45,95,63,0.15);
        }
        .conv-icon {
          width: 42px; height: 42px; min-width: 42px;
          background: rgba(45,95,63,0.08);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2D5F3F;
        }
        .conv-info { flex: 1; }
        .conv-subject {
          font-size: 15px; font-weight: 600; color: #333; margin: 0 0 4px;
        }
        .conv-meta {
          font-size: 12px; color: #999; margin: 0;
        }
        .conv-status {
          display: inline-flex;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
          border: 1px solid;
        }
        .conv-status-open {
          background: #E8F5E9; color: #2E7D32; border-color: #81C784;
        }
        .conv-status-closed {
          background: #F5F5F5; color: #999; border-color: #DDD;
        }
        /* Conversation detail */
        .conv-detail {
          margin-top: 20px;
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 14px;
          overflow: hidden;
        }
        .conv-detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
          border-bottom: 1px solid #F0F0F0;
          background: rgba(45,95,63,0.03);
        }
        .conv-detail-subject {
          font-size: 17px; font-weight: 700; color: #2D5F3F; margin: 0;
        }
        .conv-detail-back {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 8px;
          background: transparent; border: 1px solid #DDD;
          color: #555; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.2s ease;
        }
        .conv-detail-back:hover {
          border-color: #2D5F3F; color: #2D5F3F;
        }
        .conv-messages {
          padding: 20px 24px;
          max-height: 420px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .conv-messages::-webkit-scrollbar {
          width: 5px;
        }
        .conv-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .conv-messages::-webkit-scrollbar-thumb {
          background: #DDD;
          border-radius: 4px;
        }
        .conv-msg {
          max-width: 80%;
          padding: 14px 18px;
          border-radius: 14px;
          font-size: 14px;
          line-height: 1.65;
        }
        .conv-msg-user {
          align-self: flex-end;
          background: #2D5F3F;
          color: #FFFFFF;
          border-bottom-right-radius: 4px;
        }
        .conv-msg-admin {
          align-self: flex-start;
          background: #F4F6F3;
          color: #444;
          border-bottom-left-radius: 4px;
          border: 1px solid #E8E8E8;
        }
        .conv-msg-sender {
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .conv-msg-user .conv-msg-sender { color: rgba(255,255,255,0.7); }
        .conv-msg-admin .conv-msg-sender { color: #2D5F3F; }
        .conv-msg-time {
          font-size: 11px;
          margin-top: 6px;
          opacity: 0.6;
        }
        .conv-msg-user .conv-msg-time { color: rgba(255,255,255,0.6); }
        .conv-msg-admin .conv-msg-time { color: #999; }
        /* Reply area */
        .conv-reply-area {
          padding: 16px 24px 20px;
          border-top: 1px solid #F0F0F0;
          background: rgba(45,95,63,0.02);
        }
        .conv-reply-closed {
          text-align: center;
          padding: 16px 24px;
          color: #999;
          font-size: 14px;
          border-top: 1px solid #F0F0F0;
          font-style: italic;
        }
        .conv-reply-form {
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }
        .conv-reply-input {
          flex: 1;
          padding: 10px 16px;
          border: 1.5px solid #DDD;
          border-radius: 10px;
          font-size: 14px;
          color: #333;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          font-family: inherit;
          resize: none;
          min-height: 44px;
          max-height: 120px;
        }
        .conv-reply-input:focus {
          border-color: #2D5F3F;
          box-shadow: 0 0 0 3px rgba(45,95,63,0.1);
        }
        .conv-reply-btn {
          padding: 10px 20px;
          background: #2D5F3F;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          white-space: nowrap;
        }
        .conv-reply-btn:hover {
          background: #1F4A2E;
          transform: translateY(-1px);
        }
        .conv-reply-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
        /* New message form */
        .new-msg-card {
          background: #FFFFFF;
          border: 1px solid #E8E8E8;
          border-radius: 14px;
          padding: 32px;
        }
        .new-msg-title {
          font-size: 20px; font-weight: 700; color: #2D5F3F; margin: 0 0 24px;
        }
        .new-msg-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #DDD;
          border-radius: 10px;
          font-size: 14px;
          color: #333;
          background: #FAFAFA;
          resize: vertical;
          box-sizing: border-box;
          outline: none;
          font-family: inherit;
          line-height: 1.6;
          min-height: 140px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .new-msg-textarea:focus {
          border-color: #2D5F3F;
          box-shadow: 0 0 0 3px rgba(45,95,63,0.12);
          background: #FFFFFF;
        }
        /* Success toast */
        .helpdesk-success-toast {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(45,95,63,0.1);
          color: #2D5F3F;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 16px;
          animation: fadeInUp 0.35s ease;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Responsive */
        @media (max-width: 640px) {
          .helpdesk-tabs { gap: 6px; }
          .helpdesk-tab { padding: 10px 16px; font-size: 13px; }
          .conv-card { padding: 14px 16px; }
          .conv-detail-header { padding: 14px 16px; flex-direction: column; gap: 10px; align-items: flex-start; }
          .conv-messages { padding: 16px; max-height: 350px; }
          .conv-msg { max-width: 90%; }
          .conv-reply-form { flex-direction: column; }
          .conv-reply-btn { width: 100%; }
          .new-msg-card { padding: 20px; }
        }
      ` }} />

      {/* ── D1 - Hero ── */}
      <div className="D D1 D1-short">
        <Navbar />
        <section className="page-hero">
          <h1 className="page-hero-title">Helpdesk</h1>
          <p className="page-hero-subtitle">Send messages and get support from the school</p>
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
            How can we help you today?
          </p>
        </div>

        {/* Tabs */}
        <div className="helpdesk-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`helpdesk-tab${activeTab === tab.key ? ' helpdesk-tab-active' : ''}`}
              onClick={() => {
                setActiveTab(tab.key)
                if (tab.key === 'new') setSelectedConv(null)
              }}
              aria-label={tab.label}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="helpdesk-content">

          {/* ─── Conversations Tab ─── */}
          {activeTab === 'conversations' && (
            <>
              {/* Conversations list */}
              <div className="conv-list">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`conv-card${selectedConv?.id === conv.id ? ' conv-card-selected' : ''}`}
                    onClick={() => openConversation(conv)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openConversation(conv) }
                    }}
                  >
                    <div className="conv-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div className="conv-info">
                      <h4 className="conv-subject">{conv.subject}</h4>
                      <p className="conv-meta">
                        {conv.messages.length} message{conv.messages.length > 1 ? 's' : ''} &middot; Updated {new Date(conv.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`conv-status conv-status-${conv.status}`}>
                      {conv.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                  </div>
                ))}

                {conversations.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48, margin: '0 auto 12px', display: 'block' }}>
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <p style={{ fontSize: '15px', color: '#999', margin: '0' }}>No conversations yet. Send a new message to get started.</p>
                  </div>
                )}
              </div>

              {/* Conversation detail */}
              {selectedConv && (
                <div className="conv-detail">
                  <div className="conv-detail-header">
                    <h3 className="conv-detail-subject">{selectedConv.subject}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={`conv-status conv-status-${selectedConv.status}`}>
                        {selectedConv.status === 'open' ? 'Open' : 'Closed'}
                      </span>
                      <button
                        className="conv-detail-back"
                        onClick={() => setSelectedConv(null)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                          <line x1="19" y1="12" x2="5" y2="12" />
                          <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back
                      </button>
                    </div>
                  </div>

                  <div className="conv-messages">
                    {selectedConv.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`conv-msg ${msg.sender === 'user' ? 'conv-msg-user' : 'conv-msg-admin'}`}
                      >
                        <div className="conv-msg-sender">{msg.senderName}</div>
                        <div>{msg.body}</div>
                        <div className="conv-msg-time">
                          {new Date(msg.timestamp).toLocaleString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedConv.status === 'open' ? (
                    <div className="conv-reply-area">
                      {replySuccess && (
                        <div className="helpdesk-success-toast">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          Reply sent successfully!
                        </div>
                      )}
                      <form className="conv-reply-form" onSubmit={handleReply}>
                        <textarea
                          className="conv-reply-input"
                          placeholder="Type your reply..."
                          value={replyBody}
                          onChange={(e) => setReplyBody(e.target.value)}
                          rows={1}
                          required
                          disabled={sendingReply}
                        />
                        <button
                          type="submit"
                          className="conv-reply-btn"
                          disabled={sendingReply || !replyBody.trim()}
                        >
                          {sendingReply ? 'Sending...' : 'Send'}
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="conv-reply-closed">
                      This conversation is closed. Open a new message if you need further help.
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ─── New Message Tab ─── */}
          {activeTab === 'new' && (
            <div className="new-msg-card">
              <h3 className="new-msg-title">Send a New Message</h3>

              {newSuccess && (
                <div className="helpdesk-success-toast">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Message sent successfully!
                </div>
              )}

              <form onSubmit={handleSendNew}>
                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label htmlFor="helpdesk-subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    id="helpdesk-subject"
                    className="form-input"
                    placeholder="Brief description of your inquiry"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    required
                    disabled={sendingNew}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '22px' }}>
                  <label htmlFor="helpdesk-body" className="form-label">Message</label>
                  <textarea
                    id="helpdesk-body"
                    className="new-msg-textarea"
                    placeholder="Describe your issue or question in detail..."
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    required
                    disabled={sendingNew}
                  />
                </div>

                <button
                  type="submit"
                  className="form-submit-btn"
                  disabled={sendingNew || !newSubject.trim() || !newBody.trim()}
                  style={{ opacity: sendingNew ? 0.7 : 1, maxWidth: '220px' }}
                >
                  {sendingNew ? 'Sending...' : 'Send Message'}
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
