'use client'

import { useEffect } from 'react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export default function AdmissionPage() {
  /* Slide-in animation observer */
  useEffect(() => {
    const items = document.querySelectorAll('.admission-animate')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target as HTMLElement
            const index = Array.from(items).indexOf(item)
            setTimeout(() => {
              item.classList.add('slide-in-visible')
            }, index * 250)
            observer.unobserve(item)
          }
        })
      },
      { threshold: 0.15 }
    )

    items.forEach((item) => observer.observe(item))
    return () => {
      items.forEach((item) => observer.unobserve(item))
    }
  }, [])

  return (
    <>
      {/* ==================== D1 - Header + Hero ==================== */}
      <div className="D D1 D1-short">
        <Navbar />
        <section className="page-hero">
          <h1 className="page-hero-title">Admission</h1>
          <p className="page-hero-subtitle">
            Everything you need to know about joining Aroyan Muslim School
          </p>
        </section>
      </div>

      {/* ==================== D2 - Formal Admission Content ==================== */}
      <div className="D D2 D2-auto">
        <section className="admission-section">

          {/* ── Welcome & Overview ────────────────────── */}
          <div className="admission-block admission-animate">
            <h2 className="section-heading">Welcome to Aroyan Admissions</h2>
            <p className="section-intro">
              Thank you for your interest in Aroyan Muslim School. We are delighted that you are
              considering our institution for your child&apos;s education. Our admissions process is
              designed to be straightforward and supportive, ensuring every family feels welcomed
              from the very first step. At Aroyan, we combine Quranic memorization and Islamic
              disciplines with a rigorous Western academic curriculum, producing well-rounded
              students who excel in both spheres of knowledge.
            </p>
            <p className="section-intro">
              We admit students into three levels: Primary School (ages 6&ndash;12), Junior Secondary
              (ages 12&ndash;15), and Senior Secondary (ages 15&ndash;18). In addition, our weekend
              Madrasah program is open to learners of all ages who wish to deepen their Islamic
              knowledge alongside their regular studies or daily commitments.
            </p>
          </div>

          {/* ── Admission Requirements ──────────────────── */}
          <div className="admission-block admission-animate">
            <h2 className="section-heading">Admission Requirements</h2>
            <div className="requirements-grid">
              <div className="requirement-card">
                <h3 className="requirement-title">Full-Time Program</h3>
                <ul className="requirement-list">
                  <li>Ages 6-15 for primary/secondary enrollment</li>
                  <li>Previous school transcripts or records</li>
                  <li>Birth certificate and passport photographs</li>
                  <li>Parent or guardian consent form</li>
                  <li>Entrance assessment in English and Mathematics</li>
                  <li>Basic Quran recitation ability (preferred)</li>
                </ul>
              </div>
              <div className="requirement-card">
                <h3 className="requirement-title">Weekend Madrasah</h3>
                <ul className="requirement-list">
                  <li>Open to all ages (children and adults)</li>
                  <li>No previous Islamic education required</li>
                  <li>Birth certificate for minors</li>
                  <li>Parent or guardian consent form for under 18</li>
                  <li>Commitment to attend Saturday and Sunday sessions</li>
                  <li>Willingness to learn Quran recitation and Tajweed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── How to Apply ────────────────────────────── */}
          <div className="admission-block admission-animate">
            <h2 className="section-heading">How to Apply</h2>
            <p className="section-intro">
              Follow these simple steps to enroll your child at Aroyan Muslim School. We welcome
              students of all backgrounds who are eager to learn and grow in an Islamic environment.
              No sign-up or account creation is required to apply.
            </p>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="step-title">Choose a Level</h3>
                <p className="step-desc">
                  Navigate to the &ldquo;Apply for Admission&rdquo; page and select from Primary School,
                  Junior Secondary, or Senior Secondary. Click the Apply button on the banner
                  that matches your child&apos;s level to begin your application.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="step-title">Fill Application Form</h3>
                <p className="step-desc">
                  Complete the application form with your child&apos;s details, including
                  personal information, previous school records, and preferred program of study.
                  No account or sign-up is needed &mdash; simply fill and submit.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="step-title">Entrance Assessment</h3>
                <p className="step-desc">
                  Your child will take a brief assessment to determine their current academic level
                  and Quranic proficiency. This helps us place them in the right class and program
                  for their growth and success.
                </p>
              </div>
              <div className="step-card">
                <div className="step-number">4</div>
                <h3 className="step-title">Admission Offer</h3>
                <p className="step-desc">
                  Successful applicants will receive an admission offer letter with details about
                  tuition fees, resumption date, and orientation schedule for new students.
                  Welcome to the Aroyan family!
                </p>
              </div>
            </div>
          </div>

          {/* ── Programs & Tuition ─────────────────────── */}
          <div className="admission-block admission-animate">
            <h2 className="section-heading">Programs &amp; Tuition</h2>
            <div className="programs-table-wrapper">
              <table className="programs-table">
                <thead>
                  <tr>
                    <th>Program</th>
                    <th>Duration</th>
                    <th>Schedule</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="program-name">Hifz Program</td>
                    <td>3-5 years</td>
                    <td>Mon - Fri</td>
                    <td>Complete Quran memorization with Tajweed</td>
                  </tr>
                  <tr>
                    <td className="program-name">Full-Time Academic</td>
                    <td>Per term</td>
                    <td>Mon - Fri</td>
                    <td>Western curriculum + Islamic studies</td>
                  </tr>
                  <tr>
                    <td className="program-name">Saturday Madrasah</td>
                    <td>Per term</td>
                    <td>Saturdays</td>
                    <td>Quran recitation, Tajweed, and Islamic studies</td>
                  </tr>
                  <tr>
                    <td className="program-name">Sunday Madrasah</td>
                    <td>Per term</td>
                    <td>Sundays</td>
                    <td>Arabic language, Fiqh, and Seerah</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="fees-note">
              For detailed tuition fees and payment plans, please contact our admissions office
              at info@aroyanschool.edu or call +234-XXX-XXX-XXXX.
            </p>
          </div>

          {/* ── Key Dates ─────────────────────── */}
          <div className="admission-block admission-animate">
            <h2 className="section-heading">Key Admission Dates</h2>
            <div className="requirements-grid">
              <div className="requirement-card">
                <h3 className="requirement-title">First Term Intake</h3>
                <ul className="requirement-list">
                  <li>Application opens: January 15</li>
                  <li>Entrance assessment: March 10</li>
                  <li>Admission offers released: March 25</li>
                  <li>Resumption date: April 14</li>
                </ul>
              </div>
              <div className="requirement-card">
                <h3 className="requirement-title">Second Term Intake</h3>
                <ul className="requirement-list">
                  <li>Application opens: May 1</li>
                  <li>Entrance assessment: July 5</li>
                  <li>Admission offers released: July 20</li>
                  <li>Resumption date: August 18</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── CTA to Apply ─────────────────────── */}
          <div className="admission-block admission-animate">
            <div className="admission-cta">
              <h2 className="section-heading" style={{ marginBottom: '8px' }}>Ready to Apply?</h2>
              <p className="section-intro" style={{ marginBottom: '0' }}>
                Start your child&apos;s journey at Aroyan Muslim School today. No sign-up required &mdash;
                simply choose a level and fill the application form.
              </p>
              <div className="admission-cta-buttons">
                <a href="/apply" className="cta-btn cta-btn-filled">Apply for Admission</a>
                <a href="/about" className="cta-btn cta-btn-outline">Learn About Us</a>
              </div>
            </div>
          </div>

        </section>
      </div>

      {/* ==================== D3 - Footer ==================== */}
      <Footer />
    </>
  )
}
