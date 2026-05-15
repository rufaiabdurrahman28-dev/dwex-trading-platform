import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase (uses anon key — respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin Supabase (uses service role key — bypasses RLS)
// Only create on server-side; returns null on client
export const supabaseAdmin = (() => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) return null
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
})()
