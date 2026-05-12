'use client'

import { useState, useEffect } from 'react'

const quotes = [
  {
    text: 'Seeking knowledge is an obligation upon every Muslim.',
    author: 'Prophet Muhammad (PBUH)',
  },
  {
    text: 'The best of people are those who are most beneficial to others.',
    author: 'Prophet Muhammad (PBUH)',
  },
  {
    text: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela',
  },
  {
    text: 'Whoever treads a path in search of knowledge, Allah will make easy for him the path to Paradise.',
    author: 'Sahih Muslim',
  },
  {
    text: 'The ink of the scholar is more sacred than the blood of the martyr.',
    author: 'Islamic Proverb',
  },
]

export default function QuoteSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const quote = quotes[current]

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px 24px',
        maxWidth: '680px',
        margin: '0 auto',
        opacity: 1,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C9A961"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 28, height: 28, margin: '0 auto 10px', display: 'block', opacity: 0.6 }}
      >
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3z" />
      </svg>
      <p
        style={{
          fontSize: '15px',
          fontStyle: 'italic',
          color: '#555',
          lineHeight: 1.7,
          margin: '0 0 8px',
          transition: 'opacity 0.4s ease',
        }}
      >
        {quote.text}
      </p>
      <p
        style={{
          fontSize: '13px',
          color: '#C9A961',
          fontWeight: 600,
          margin: 0,
        }}
      >
        — {quote.author}
      </p>
    </div>
  )
}
