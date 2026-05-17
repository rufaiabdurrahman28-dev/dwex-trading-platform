'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

const countries = ['Nigeria','Ghana','Kenya','South Africa','Uganda','Tanzania','United States','United Kingdom','Canada','Germany','France','Australia','India','China','Japan','Brazil','Mexico','Egypt','Morocco','Cameroon','Senegal','Rwanda','Ethiopia','Democratic Republic of Congo','Angola','Mozambique','Zimbabwe','Botswana','Namibia','Zambia','Malawi','Tunisia','Algeria','Libya','Sudan','Somalia','Ivory Coast','Burkina Faso','Benin','Togo','Sierra Leone','Liberia','Mali','Niger','Chad','Guinea','Mauritania','Cape Verde','Gambia','Comoros']

const steps = [{ number: 1, label: 'Account' }, { number: 2, label: 'Profile' }, { number: 3, label: 'Complete' }]

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [referralCode, setReferralCode] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, 3))
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1))

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#00A88A]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-[#00A88A]/3 rounded-full blur-[100px]" />
      </div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#00A88A]/20">
              <Image src="/dwex-logo.jpg" alt="DWEX Logo" fill className="object-cover" sizes="40px" />
            </div>
            <span className="text-2xl font-bold text-gray-900">DWEX</span>
          </Link>
          <p className="text-gray-500 text-sm mt-3">Create your trading account</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((step, i) => (
            <div key={step.number} className="flex items-center">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all', currentStep >= step.number ? 'bg-[#00A88A] text-white' : 'bg-gray-200 text-gray-400 border border-gray-200')}>
                {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <span className={cn('text-xs ml-1.5 hidden sm:inline', currentStep >= step.number ? 'text-[#00A88A]' : 'text-gray-400')}>{step.label}</span>
              {i < steps.length - 1 && <div className={cn('w-8 sm:w-12 h-0.5 mx-2 rounded', currentStep > step.number ? 'bg-[#00A88A]' : 'bg-gray-200')} />}
            </div>
          ))}
        </div>

        <Card className="bg-white border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          <CardContent className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <h2 className="text-lg font-bold text-gray-900">Create Account</h2>
                  <div><label className="text-sm text-gray-600 mb-1.5 block">Email Address</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /></div></div>
                  <div><label className="text-sm text-gray-600 mb-1.5 block">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input type={showPassword ? 'text' : 'password'} placeholder="Min 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
                  <div><label className="text-sm text-gray-600 mb-1.5 block">Confirm Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input type={showConfirm ? 'text' : 'password'} placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 pr-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /><button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">{showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div></div>
                  <Button onClick={nextStep} className="w-full bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-6 rounded-xl">Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-sm text-gray-600 mb-1.5 block">First Name</label><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /></div></div>
                    <div><label className="text-sm text-gray-600 mb-1.5 block">Last Name</label><Input placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /></div>
                  </div>
                  <div><label className="text-sm text-gray-600 mb-1.5 block">Phone Number</label><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><Input type="tel" placeholder="+234 800 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /></div></div>
                  <div><label className="text-sm text-gray-600 mb-1.5 block">Country</label>
                    <Select value={country} onValueChange={setCountry}><SelectTrigger className="bg-white border-gray-200 text-gray-900"><div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" /><SelectValue placeholder="Select country" /></div></SelectTrigger><SelectContent className="bg-white border-gray-200 max-h-60">{countries.map((c) => <SelectItem key={c} value={c} className="text-gray-900 focus:bg-gray-50">{c}</SelectItem>)}</SelectContent></Select>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={prevStep} variant="outline" className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 py-6 rounded-xl"><ChevronLeft className="w-4 h-4 mr-1" /> Back</Button>
                    <Button onClick={nextStep} className="flex-1 bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-6 rounded-xl">Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <h2 className="text-lg font-bold text-gray-900">Almost There!</h2>
                  <div><label className="text-sm text-gray-600 mb-1.5 block">Referral Code (Optional)</label><Input placeholder="Enter referral code" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /></div>
                  <div className="flex items-start gap-2">
                    <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} className="mt-0.5 border-gray-300 data-[state=checked]:bg-[#00A88A] data-[state=checked]:border-[#00A88A]" />
                    <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">I agree to the <Link href="#" className="text-[#00A88A] hover:underline">Terms of Service</Link> and <Link href="#" className="text-[#00A88A] hover:underline">Privacy Policy</Link></label>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={prevStep} variant="outline" className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 py-6 rounded-xl"><ChevronLeft className="w-4 h-4 mr-1" /> Back</Button>
                    <Button className="flex-1 bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-6 rounded-xl" disabled={!agreeTerms}>Create Account</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">Already have an account? <Link href="/login" className="text-[#00A88A] hover:text-[#008F74] font-medium transition">Log In</Link></p>
      </motion.div>
    </div>
  )
}
