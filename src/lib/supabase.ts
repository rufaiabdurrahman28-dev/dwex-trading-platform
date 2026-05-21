import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Safe Supabase client — returns a no-op client if env vars are missing
// This prevents the entire app from crashing when env vars aren't configured
let supabaseInstance: SupabaseClient

if (supabaseUrl && supabaseAnonKey) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Create a mock client that won't crash but logs warnings
  console.warn('[DWEX] Supabase env vars missing — using no-op client. Auth features will be disabled.')
  supabaseInstance = createClient('https://placeholder.supabase.co', 'placeholder-key')
}

// Client-side Supabase (uses anon key — respects RLS)
export const supabase = supabaseInstance

// Admin Supabase (uses service role key — bypasses RLS)
// Only create on server-side; returns null on client or if key is missing
export const supabaseAdmin = (() => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) return null
  if (!supabaseUrl) return null
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
})()
