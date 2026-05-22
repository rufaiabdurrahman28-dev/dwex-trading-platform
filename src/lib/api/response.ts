import { NextResponse } from 'next/server'

export function success(data: any, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function error(message: string, status = 400, details?: any) {
  return NextResponse.json(
    { success: false, error: message, ...(details && { details }) },
    { status }
  )
}

export function unauthorized(message = 'Authentication required') {
  return NextResponse.json({ success: false, error: message }, { status: 401 })
}

export function forbidden(message = 'Access denied') {
  return NextResponse.json({ success: false, error: message }, { status: 403 })
}

export function notFound(message = 'Resource not found') {
  return NextResponse.json({ success: false, error: message }, { status: 404 })
}
