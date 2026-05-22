import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Safe Supabase client — fully resilient to missing/invalid env vars
// Prevents the entire app from crashing when env vars aren't configured
let supabaseInstance: SupabaseClient

try {
  if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://') && supabaseAnonKey.startsWith('ey')) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  } else {
    // Create a valid but non-functional client with placeholder values
    // This prevents crashes while still allowing the app to render
    console.warn('[DWEX] Supabase env vars missing or invalid — using placeholder client. Auth features will be disabled.')
    supabaseInstance = createClient('https://placeholder.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwbGFjZWhvbGRlciJ9.placeholder')
  }
} catch (err) {
  console.warn('[DWEX] Supabase client creation failed:', err)
  // Last resort — create with minimal valid values
  supabaseInstance = createClient('https://placeholder.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwbGFjZWhvbGRlciJ9.placeholder')
}

// Client-side Supabase (uses anon key — respects RLS)
export const supabase = supabaseInstance

// Admin Supabase (uses service role key — bypasses RLS)
// Only create on server-side; returns null on client or if key is missing
export const supabaseAdmin = (() => {
  if (typeof window !== 'undefined') return null // Don't create on client
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey || !supabaseUrl || !supabaseUrl.startsWith('https://mfqx')) return null
  try {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  } catch {
    return null
  }
})()
