'use client'

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-500 text-sm mb-4 text-center max-w-md">
            The trading page encountered an error. This is usually temporary.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="px-6 py-2.5 bg-[#00A88A] text-white rounded-lg font-semibold hover:bg-[#008F74] transition"
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
