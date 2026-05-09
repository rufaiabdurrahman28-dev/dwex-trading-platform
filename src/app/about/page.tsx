'use client'

import { useEffect } from 'react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'

export default function AboutPage() {
  useEffect(() => {
    const items = document.querySelectorAll('.about-animate')
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
          <h1 className="page-hero-title">About Aroyan Muslim School</h1>
          <p className="page-hero-subtitle">
            Nurturing minds with faith, knowledge, and character since our founding
          </p>
        </section>
      </div>

      {/* ==================== D2 - About Content ==================== */}
      <div className="D D2 D2-auto">
        <section className="about-section">
          {/* Mission & Vision */}
          <div className="about-block about-animate">
            <div className="about-block-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-svg">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <div className="about-block-content">
              <h2 className="about-block-title">Our Mission</h2>
              <p className="about-block-text">
                Aroyan Muslim School is dedicated to providing a holistic education that seamlessly
                integrates Quranic memorization and Islamic disciplines with a rigorous Western academic
                curriculum. Our mission is to develop students who are not only academically excellent but
                also deeply rooted in their faith, moral values, and commitment to serving their community.
                We believe that true education shapes both the intellect and the soul, preparing our
                students to become responsible, compassionate leaders of tomorrow.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="about-block about-animate">
            <div className="about-block-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-svg">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="about-block-content">
              <h2 className="about-block-title">Our Vision</h2>
              <p className="about-block-text">
                Our vision is to become a leading Islamic educational institution recognized for producing
                graduates who excel in both religious and secular fields. We aspire to create a learning
                environment where students develop a deep love for the Quran, a strong sense of identity,
                and the academic competence to thrive in an ever-changing world. Aroyan envisions a future
                where every student carries forward the light of knowledge and faith, contributing
                positively to society and upholding the values of integrity, respect, and excellence.
              </p>
            </div>
          </div>

          {/* Islamic Values */}
          <div className="about-block about-animate">
            <div className="about-block-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-svg">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div className="about-block-content">
              <h2 className="about-block-title">Our Islamic Values</h2>
              <p className="about-block-text">
                At the core of Aroyan Muslim School are the timeless Islamic values that guide every
                aspect of our educational approach. We emphasize Taqwa (God-consciousness), Ikhlas
                (sincerity), Adab (good manners), and Ihsan (excellence in all endeavors). Our students
                learn to approach every task with dedication and seek knowledge as an act of worship.
                We foster an atmosphere of brotherhood, compassion, and mutual respect, where students
                are encouraged to support one another and grow together as a community of learners.
              </p>
            </div>
          </div>

          {/* Programs */}
          <div className="about-block about-animate">
            <div className="about-block-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feature-svg">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <div className="about-block-content">
              <h2 className="about-block-title">Our Programs</h2>
              <p className="about-block-text">
                Aroyan Muslim School offers a range of programs designed to meet the diverse needs of
                our students and their families. Our flagship Hifz program provides a structured pathway
                for complete Quran memorization under the guidance of certified scholars. The Saturday
                and Sunday Madrasah programs offer flexible weekend Islamic education for students
                attending conventional schools during the week. Additionally, our full-time academic
                program delivers a comprehensive Western curriculum alongside Islamic studies, ensuring
                that every student receives a well-rounded education that prepares them for future success.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ==================== D3 - Footer ==================== */}
      <Footer />
    </>
  )
}
