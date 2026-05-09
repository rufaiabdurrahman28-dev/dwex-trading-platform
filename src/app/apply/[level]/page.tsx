'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

interface FormData {
  childFirstName: string
  childLastName: string
  childAge: string
  childGender: string
  childDOB: string
  previousSchool: string
  parentFirstName: string
  parentLastName: string
  parentPhone: string
  parentEmail: string
  parentAddress: string
  parentOccupation: string
  quranLevel: string
  reasonForApplying: string
  additionalNotes: string
}

const LEVEL_CONFIG: Record<string, { title: string; description: string; ageRange: string }> = {
  primary: {
    title: 'Primary School',
    description: 'For children ages 6-12 seeking a strong foundation in Quranic studies and academics.',
    ageRange: '6-12',
  },
  junior: {
    title: 'Junior Secondary',
    description: 'For students ages 12-15 ready to deepen their Islamic and academic knowledge.',
    ageRange: '12-15',
  },
  senior: {
    title: 'Senior Secondary',
    description: 'For students ages 15-18 pursuing advanced Islamic scholarship and WAEC/NECO preparation.',
    ageRange: '15-18',
  },
}

export default function ApplyFormPage() {
  const params = useParams()
  const level = params.level as string
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.primary

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    childFirstName: '',
    childLastName: '',
    childAge: '',
    childGender: '',
    childDOB: '',
    previousSchool: '',
    parentFirstName: '',
    parentLastName: '',
    parentPhone: '',
    parentEmail: '',
    parentAddress: '',
    parentOccupation: '',
    quranLevel: '',
    reasonForApplying: '',
    additionalNotes: '',
  })

  /* Slide-in animation */
  useEffect(() => {
    const items = document.querySelectorAll('.apply-animate')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target as HTMLElement
            const index = Array.from(items).indexOf(item)
            setTimeout(() => {
              item.classList.add('slide-in-visible')
            }, index * 200)
            observer.unobserve(item)
          }
        })
      },
      { threshold: 0.1 }
    )
    items.forEach((item) => observer.observe(item))
    return () => {
      items.forEach((item) => observer.unobserve(item))
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save to localStorage for admin review
    const applications = JSON.parse(localStorage.getItem('aroyan_applications') || '[]')
    applications.push({
      id: Date.now(),
      level,
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    })
    localStorage.setItem('aroyan_applications', JSON.stringify(applications))
    setFormSubmitted(true)
  }

  if (formSubmitted) {
    return (
      <>
        <div className="D D1 D1-short">
          <Navbar />
          <section className="page-hero">
            <h1 className="page-hero-title">Application Submitted</h1>
          </section>
        </div>
        <div className="D D2 D2-auto">
          <div className="apply-success-section">
            <div className="apply-success-icon">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="rgba(45,95,63,0.1)" />
                <path d="M20 32l8 8 16-16" stroke="#2D5F3F" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="apply-success-title">Thank You!</h2>
            <p className="apply-success-text">
              Your application for <strong>{config.title}</strong> has been submitted successfully.
              Our admissions team will review your application and contact you shortly.
            </p>
            <div className="apply-success-actions">
              <a href="/apply" className="cta-btn cta-btn-filled">Back to Apply</a>
              <a href="/" className="cta-btn cta-btn-outline">Go Home</a>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      {/* ==================== D1 - Header ==================== */}
      <div className="D D1 D1-short">
        <Navbar />
        <section className="page-hero">
          <h1 className="page-hero-title">{config.title} Application</h1>
          <p className="page-hero-subtitle">{config.description} &mdash; No sign-up required</p>
        </section>
      </div>

      {/* ==================== D2 - Application Form ==================== */}
      <div className="D D2 D2-auto">
        <section className="apply-form-section">

          {/* No-signup notice */}
          <div className="apply-login-notice apply-animate">
            <div className="notice-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#C9A961" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <p className="notice-text">
              <strong>No account needed!</strong> Simply fill out the form below and submit your application.
              Our admissions team will review it and get back to you.
            </p>
          </div>

          <form className="apply-form apply-animate" onSubmit={handleSubmit}>
            {/* Child's Information */}
            <div className="apply-form-section-block">
              <h3 className="apply-form-section-title">Child&apos;s Information</h3>
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="childFirstName"
                    className="form-input"
                    placeholder="Enter first name"
                    value={formData.childFirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="childLastName"
                    className="form-input"
                    placeholder="Enter last name"
                    value={formData.childLastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">Age *</label>
                  <input
                    type="number"
                    name="childAge"
                    className="form-input"
                    placeholder={`Ages ${config.ageRange}`}
                    value={formData.childAge}
                    onChange={handleChange}
                    required
                    min={1}
                    max={20}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select
                    name="childGender"
                    className="form-input form-select"
                    value={formData.childGender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    name="childDOB"
                    className="form-input"
                    value={formData.childDOB}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Previous School</label>
                  <input
                    type="text"
                    name="previousSchool"
                    className="form-input"
                    placeholder="Enter previous school name"
                    value={formData.previousSchool}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Quran Recitation Level</label>
                <select
                  name="quranLevel"
                  className="form-input form-select"
                  value={formData.quranLevel}
                  onChange={handleChange}
                >
                  <option value="">Select level</option>
                  <option value="beginner">Beginner - No prior recitation</option>
                  <option value="intermediate">Intermediate - Can read Quran</option>
                  <option value="advanced">Advanced - Can recite with Tajweed</option>
                  <option value="hifz">Hifz - Memorizing Quran</option>
                </select>
              </div>
            </div>

            {/* Parent/Guardian Information */}
            <div className="apply-form-section-block">
              <h3 className="apply-form-section-title">Parent / Guardian Information</h3>
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="parentFirstName"
                    className="form-input"
                    placeholder="Enter first name"
                    value={formData.parentFirstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="parentLastName"
                    className="form-input"
                    placeholder="Enter last name"
                    value={formData.parentLastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row-2col">
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="parentPhone"
                    className="form-input"
                    placeholder="+234-XXX-XXX-XXXX"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="parentEmail"
                    className="form-input"
                    placeholder="parent@example.com"
                    value={formData.parentEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Home Address *</label>
                <input
                  type="text"
                  name="parentAddress"
                  className="form-input"
                  placeholder="Enter your home address"
                  value={formData.parentAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Occupation</label>
                <input
                  type="text"
                  name="parentOccupation"
                  className="form-input"
                  placeholder="Enter your occupation"
                  value={formData.parentOccupation}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="apply-form-section-block">
              <h3 className="apply-form-section-title">Additional Information</h3>
              <div className="form-group">
                <label className="form-label">Reason for Applying</label>
                <textarea
                  name="reasonForApplying"
                  className="form-input apply-textarea"
                  placeholder="Why do you want your child to attend Aroyan Muslim School?"
                  rows={4}
                  value={formData.reasonForApplying}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  className="form-input apply-textarea"
                  placeholder="Any other information you would like us to know..."
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit — No sign-up required! */}
            <div className="apply-form-submit">
              <p className="apply-submit-notice">No account or sign-up needed to apply</p>
              <button
                type="submit"
                className="form-submit-btn apply-submit-btn"
              >
                Submit Application
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* ==================== D3 - Footer ==================== */}
      <Footer />
    </>
  )
}
