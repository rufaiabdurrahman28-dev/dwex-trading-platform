'use client'

import { useEffect } from 'react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export default function AdmissionPage() {
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
            }, index * 200)
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
            Begin your journey of knowledge and faith at Aroyan Muslim School
          </p>
        </section>
      </div>

      {/* ==================== D2 - Admission Content ==================== */}
      <div className="D D2 D2-auto">
        <section className="admission-section">
          {/* Admission Steps */}
          <div className="admission-block admission-animate">
            <h2 className="section-heading">How to Apply</h2>
            <p className="section-intro">
              Follow these simple steps to enroll your child at Aroyan Muslim School. We welcome
              students of all backgrounds who are eager to learn and grow in an Islamic environment.
            </p>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="step-title">Fill Application Form</h3>
                <p className="step-desc">
                  Complete the online application form with your child&apos;s details, including
                  personal information, previous school records, and preferred program of study.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="step-title">Submit Documents</h3>
                <p className="step-desc">
                  Provide the required documents including birth certificate, passport photographs,
                  previous school transcripts, and a copy of the parent or guardian&apos;s identification.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="step-title">Entrance Assessment</h3>
                <p className="step-desc">
                  Your child will take a brief assessment to determine their current academic level
                  and Quranic proficiency. This helps us place them in the right class and program.
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">4</div>
                <h3 className="step-title">Admission Offer</h3>
                <p className="step-desc">
                  Successful applicants will receive an admission offer letter with details about
                  tuition fees, resumption date, and orientation schedule for new students.
                </p>
              </div>
            </div>
          </div>

          {/* Requirements */}
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

          {/* Programs & Fees */}
          <div className="admission-block admission-animate">
            <h2 className="section-heading">Programs & Tuition</h2>
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

          {/* CTA */}
          <div className="admission-cta admission-animate">
            <h2 className="section-heading">Ready to Enroll?</h2>
            <p className="section-intro">
              Take the first step towards a brighter future for your child. Apply now and join the
              Aroyan Muslim School family.
            </p>
            <div className="admission-cta-buttons">
              <a href="/signup" className="cta-btn cta-btn-filled">Apply Now</a>
              <a href="/about" className="cta-btn cta-btn-outline">Learn More About Us</a>
            </div>
          </div>
        </section>
      </div>

      {/* ==================== D3 - Footer ==================== */}
      <Footer />
    </>
  )
}
