import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({
      status: 'ok',
      service: '9-mach-trade',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}
