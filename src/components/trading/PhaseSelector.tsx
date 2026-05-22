'use client'

import { useState } from 'react'
import { brokerPhases, type BrokerPhase } from '@/lib/trading-phases'

export default function PhaseSelector() {
  const [activePhase, setActivePhase] = useState<string>('deriv')
  const [isOpen, setIsOpen] = useState(false)

  const active = brokerPhases.find(p => p.id === activePhase) || brokerPhases[0]

  return (
    <div className="relative">
      {/* Phase Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#1E2D4A] bg-[#0D1B2E] hover:border-[#00D4AA]/30 transition text-sm"
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: active.color }}
        >
          {active.icon}
        </div>
        <span className="font-medium text-white">{active.shortName} Phase</span>
        <span className={`w-2 h-2 rounded-full ${active.status === 'active' ? 'bg-[#00D4AA]' : 'bg-[#F5A623]'}`} />
        <svg className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-[#0D1B2E] rounded-xl shadow-xl border border-[#1E2D4A] z-50 overflow-hidden">
          <div className="p-3 border-b border-[#1E2D4A]">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select Broker Phase</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {brokerPhases.map(phase => (
              <button
                key={phase.id}
                onClick={() => {
                  if (phase.status === 'active') {
                    setActivePhase(phase.id)
                    setIsOpen(false)
                  }
                }}
                className={`w-full flex items-start gap-3 p-3 hover:bg-[#1E2D4A] transition text-left ${
                  activePhase === phase.id ? 'bg-[#00D4AA]/5' : ''
                } ${phase.status !== 'active' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ backgroundColor: phase.color }}
                >
                  {phase.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-sm">{phase.name}</span>
                    {phase.status === 'coming_soon' && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[#F5A623]/10 text-[#F5A623] font-medium">Soon</span>
                    )}
                    {phase.status === 'active' && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[#00D4AA]/10 text-[#00D4AA] font-medium">Active</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{phase.description}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-600">{phase.assets} assets</span>
                    <span className="text-xs text-gray-600">{phase.rate}</span>
                  </div>
                </div>
                {activePhase === phase.id && (
                  <svg className="w-5 h-5 text-[#00D4AA] shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
