'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Chrome, Apple } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4 py-8">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#00D4AA]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-[#00D4AA]/3 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#00D4AA]/20">
              <Image src="/dwex-logo.jpg" alt="DWEX Logo" fill className="object-cover" sizes="40px" />
            </div>
            <span className="text-2xl font-bold">DWEX</span>
          </Link>
          <p className="text-slate-400 text-sm mt-3">Welcome back. Log in to your account.</p>
        </div>

        {/* Login Card */}
        <Card className="bg-[#162D50] border-white/[0.06] rounded-2xl">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/[0.06] border-white/[0.08] text-white placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-slate-400 mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/[0.06] border-white/[0.08] text-white placeholder:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(checked) => setRemember(checked as boolean)}
                    className="border-white/[0.15] data-[state=checked]:bg-[#00D4AA] data-[state=checked]:border-[#00D4AA]"
                  />
                  <label htmlFor="remember" className="text-sm text-slate-400 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <Link href="#" className="text-sm text-[#00D4AA] hover:text-[#33DDBB] transition">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-[#00D4AA] hover:bg-[#00A888] text-[#0A1628] font-bold py-6 rounded-xl glow-dwex-strong text-base"
              >
                Log In
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/[0.06]" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#162D50] text-slate-500">or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:text-white py-5">
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button variant="outline" className="border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:text-white py-5">
                <Apple className="w-4 h-4 mr-2" />
                Apple
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sign up link */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#00D4AA] hover:text-[#33DDBB] font-medium transition">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
