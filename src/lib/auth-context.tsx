'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
import type { Profile, PortalAccess, Role } from '@/lib/types'
import { getPortalAccess } from '@/lib/types'
import type { User, Session } from '@supabase/supabase-js'

// Check if Supabase is properly configured
const isSupabaseConfigured =
  typeof window !== 'undefined' &&
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

interface AuthContextType {
  user: User | null
  profile: Profile | null
  portalAccess: PortalAccess | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (data: SignUpData) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

export interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  country?: string
  referralCode?: string
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

  // Fetch user profile from our API
  async function fetchProfile(userId: string): Promise<Profile | null> {
    try {
      const res = await fetch(`/api/user/profile?userId=${userId}`)
      if (!res.ok) return null
      const data = await res.json()
      return data.profile as Profile
    } catch (err) {
      console.error('Profile fetch error:', err)
      return null
    }
  }

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    let subscription: { unsubscribe: () => void } | null = null

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

    try {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
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
      })
      subscription = data.subscription
    } catch (err) {
      console.warn('[DWEX] Auth state listener failed:', err)
    }

    return () => { subscription?.unsubscribe() }
  }, [])

  async function signIn(email: string, password: string) {
    if (!isSupabaseConfigured) {
      return { error: 'Authentication is not configured.' }
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { error: error.message }

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

  async function signUp(signUpData: SignUpData) {
    if (!isSupabaseConfigured) {
      return { error: 'Authentication is not configured.' }
    }
    try {
      // 1. Create auth user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            full_name: `${signUpData.firstName} ${signUpData.lastName}`,
            phone: signUpData.phone || '',
            country: signUpData.country || '',
            referral_code: signUpData.referralCode || '',
          },
          emailRedirectTo: 'https://my-project-eight-wheat.vercel.app',
        },
      })

      if (error) return { error: error.message }

      // 2. Create user profile in our database via API
      if (data.user) {
        try {
          const res = await fetch('/api/user/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: data.user.id,
              email: signUpData.email,
              name: `${signUpData.firstName} ${signUpData.lastName}`,
              phone: signUpData.phone || '',
              country: signUpData.country || '',
              role: 'trader',
            }),
          })

          if (res.ok) {
            const prof = await fetchProfile(data.user.id)
            if (prof) {
              setProfile(prof)
              setPortalAccess(getPortalAccess(prof.role))
            }
          }
        } catch (err) {
          console.error('[DWEX] Profile creation error:', err)
          // Non-fatal — profile can be created on next login
        }

        setUser(data.user)
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
