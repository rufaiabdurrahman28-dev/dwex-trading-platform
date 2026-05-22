import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone } = body

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, password, and name are required' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, phone },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    const user = await db.user.create({
      data: {
        id: authData.user.id,
        email,
        name,
        phone,
        password: 'managed_by_supabase',
      },
    })

    await db.wallet.createMany({
      data: [
        { userId: user.id, currency: 'NGN', balance: 0, available: 0, locked: 0 },
        { userId: user.id, currency: 'USD', balance: 0, available: 0, locked: 0 },
      ],
    })

    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name },
      message: 'Account created successfully',
    }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
