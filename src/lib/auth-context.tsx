'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import type { Profile, PortalAccess, Role } from '@/lib/types'
import { getPortalAccess } from '@/lib/types'
import type { User, Session } from '@supabase/supabase-js'

// Check if Supabase is properly configured
const isSupabaseConfigured =
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

interface AuthContextType {
  user: User | null
  profile: Profile | null
  portalAccess: PortalAccess | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, fullName: string, role: Role, section: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  portalAccess: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [portalAccess, setPortalAccess] = useState<PortalAccess | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchProfile(userId: string, retryCount = 0): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        if (retryCount < 3) {
          await new Promise(r => setTimeout(r, 1500))
          return fetchProfile(userId, retryCount + 1)
        }
        return null
      }

      return data as Profile
    } catch (err) {
      console.error('Profile fetch exception:', err)
      if (retryCount < 3) {
        await new Promise(r => setTimeout(r, 1500))
        return fetchProfile(userId, retryCount + 1)
      }
      return null
    }
  }

  useEffect(() => {
    // If Supabase is not configured, just mark loading as done
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    let subscription: { unsubscribe: () => void } | null = null

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        const prof = await fetchProfile(session.user.id)
        if (prof) {
          setProfile(prof)
          setPortalAccess(getPortalAccess(prof.role))
        }
      }
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })

    // Listen for auth changes
    try {
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            setUser(session.user)
            const prof = await fetchProfile(session.user.id)
            if (prof) {
              setProfile(prof)
              setPortalAccess(getPortalAccess(prof.role))
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null)
            setProfile(null)
            setPortalAccess(null)
          }
        }
      )
      subscription = data.subscription
    } catch (err) {
      console.warn('[DWEX] Auth state listener failed:', err)
    }

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  async function signIn(email: string, password: string) {
    if (!isSupabaseConfigured) {
      return { error: 'Authentication is not configured. Please set up Supabase.' }
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error: error.message }
      }

      if (data.user) {
        setUser(data.user)
        const prof = await fetchProfile(data.user.id)
        if (prof) {
          setProfile(prof)
          setPortalAccess(getPortalAccess(prof.role))
        }
      }

      return { error: null }
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred' }
    }
  }

  async function signUp(email: string, password: string, fullName: string, role: Role, section: string) {
    if (!isSupabaseConfigured) {
      return { error: 'Authentication is not configured. Please set up Supabase.' }
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
            section,
          },
          emailRedirectTo: 'https://my-project-eight-wheat.vercel.app',
        },
      })

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (err: any) {
      return { error: err.message || 'An unexpected error occurred' }
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut()
    } catch (err) {
      console.warn('[DWEX] Sign out error:', err)
    }
    setUser(null)
    setProfile(null)
    setPortalAccess(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, portalAccess, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
