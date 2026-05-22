'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, Eye, EyeOff, Mail, Lock, User, Phone, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const passwordsMatch = password && confirmPassword && password === confirmPassword
  const passwordStrength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword || !agreedToTerms) return
    if (password !== confirmPassword) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('Registration functionality will be connected to Supabase auth.')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D4AA] to-[#00A88A] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#0A1628]" />
            </div>
            <span className="text-2xl font-bold">
              9-<span className="text-[#00D4AA]">Mach</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-[#8BA3C1] mt-1">Start your trading journey today</p>
        </div>

        <Card className="bg-[#162D50] border-border">
          <CardContent className="p-6 space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-[#8BA3C1]">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA3C1]" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-[#0A1628] border-border text-white placeholder:text-[#8BA3C1]/50"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-[#8BA3C1]">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA3C1]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-[#0A1628] border-border text-white placeholder:text-[#8BA3C1]/50"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm text-[#8BA3C1]">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA3C1]" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 812 345 6789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 bg-[#0A1628] border-border text-white placeholder:text-[#8BA3C1]/50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-[#8BA3C1]">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA3C1]" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-[#0A1628] border-border text-white placeholder:text-[#8BA3C1]/50"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8BA3C1] hover:text-white transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Password strength indicator */}
              {password && (
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        passwordStrength >= level
                          ? passwordStrength === 1 ? 'bg-[#FF4D6A]'
                            : passwordStrength === 2 ? 'bg-[#F5A623]'
                            : 'bg-[#00D4AA]'
                          : 'bg-[#1C3D66]'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-sm text-[#8BA3C1]">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8BA3C1]" />
                <Input
                  id="confirm"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 bg-[#0A1628] border-border text-white placeholder:text-[#8BA3C1]/50"
                />
                {confirmPassword && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {passwordsMatch ? (
                      <Check className="w-4 h-4 text-[#00D4AA]" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-[#FF4D6A]" />
                    )}
                  </div>
                )}
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-[#FF4D6A] mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="border-border data-[state=checked]:bg-[#00D4AA] data-[state=checked]:border-[#00D4AA] mt-0.5"
              />
              <Label htmlFor="terms" className="text-sm text-[#8BA3C1] cursor-pointer leading-snug">
                I agree to the{' '}
                <Link href="#" className="text-[#00D4AA] hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="#" className="text-[#00D4AA] hover:underline">Privacy Policy</Link>
              </Label>
            </div>

            <Button
              onClick={handleRegister}
              disabled={loading || !agreedToTerms}
              className="w-full bg-[#00D4AA] hover:bg-[#00B894] text-[#0A1628] font-bold h-12 text-base disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#0A1628]/30 border-t-[#0A1628] rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </Button>

            <p className="text-center text-sm text-[#8BA3C1]">
              Already have an account?{' '}
              <Link href="/login" className="text-[#00D4AA] hover:underline font-medium">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
