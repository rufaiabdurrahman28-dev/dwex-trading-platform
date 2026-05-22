'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) { setError('Please enter your email address'); return }
    if (!password) { setError('Please enter your password'); return }

    setLoading(true)
    try {
      const { error: signInError } = await signIn(email, password)

      if (signInError) {
        setError(signInError)
        return
      }

      // Login successful — redirect to wallet
      router.push('/wallet')
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#00A88A]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-[#00A88A]/3 rounded-full blur-[100px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#00A88A]/20">
              <Image src="/dwex-logo.jpg" alt="DWEX Logo" fill className="object-cover" sizes="40px" />
            </div>
            <span className="text-2xl font-bold text-gray-900">DWEX</span>
          </Link>
          <p className="text-gray-500 text-sm mt-3">Welcome back. Log in to your account.</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-[#E63950]/10 border border-[#E63950]/20 text-[#E63950] text-sm text-center">
            {error}
          </div>
        )}

        <Card className="bg-white border-gray-200 rounded-2xl shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-sm text-gray-600 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" checked={remember} onCheckedChange={(checked) => setRemember(checked as boolean)} className="border-gray-300 data-[state=checked]:bg-[#00A88A] data-[state=checked]:border-[#00A88A]" />
                  <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">Remember me</label>
                </div>
                <Link href="#" className="text-sm text-[#00A88A] hover:text-[#008F74] transition">Forgot Password?</Link>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-6 rounded-xl text-base disabled:opacity-50">
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Logging in...</> : 'Log In'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-gray-400">or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 py-5">Google</Button>
              <Button type="button" variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 py-5">Apple</Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#00A88A] hover:text-[#008F74] font-medium transition">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  )
}
