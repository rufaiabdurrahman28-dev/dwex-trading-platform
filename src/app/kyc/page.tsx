'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  CheckCircle2,
  Clock,
  User,
  CreditCard,
  Camera,
  FileText,
  Upload,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const kycSteps = [
  { number: 1, label: 'Personal Info', icon: User },
  { number: 2, label: 'ID Verification', icon: CreditCard },
  { number: 3, label: 'Selfie', icon: Camera },
  { number: 4, label: 'Address Proof', icon: FileText },
]

const idTypes = ['Passport', 'National ID', "Driver's License"]

export default function KycPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [kycStatus, setKycStatus] = useState<'not_started' | 'in_progress' | 'verified'>('in_progress')

  // Step 1
  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')
  const [nationality, setNationality] = useState('')
  const [phone, setPhone] = useState('')

  // Step 2
  const [idType, setIdType] = useState('')
  const [idNumber, setIdNumber] = useState('')

  // Step 3
  const [selfieUploaded, setSelfieUploaded] = useState(false)

  // Step 4
  const [addressDoc, setAddressDoc] = useState('')

  const nextStep = () => {
    setCurrentStep(Math.min(currentStep + 1, 4))
    if (currentStep >= 1) setKycStatus('in_progress')
  }
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1))

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#00D4AA]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">KYC Verification</h1>
              <p className="text-slate-400 text-sm">Complete your identity verification to unlock full trading</p>
            </div>
          </div>
        </motion.div>

        {/* KYC Status Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <Card className={cn(
            'border',
            kycStatus === 'verified' ? 'bg-[#00D4AA]/5 border-[#00D4AA]/20' :
            kycStatus === 'in_progress' ? 'bg-[#F5A623]/5 border-[#F5A623]/20' :
            'bg-[#FF4D6A]/5 border-[#FF4D6A]/20'
          )}>
            <CardContent className="p-4 flex items-center gap-3">
              {kycStatus === 'verified' ? (
                <CheckCircle2 className="w-5 h-5 text-[#00D4AA] flex-shrink-0" />
              ) : kycStatus === 'in_progress' ? (
                <Clock className="w-5 h-5 text-[#F5A623] flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-[#FF4D6A] flex-shrink-0" />
              )}
              <div>
                <p className="font-semibold text-sm">
                  {kycStatus === 'verified' ? 'Verified' : kycStatus === 'in_progress' ? 'Verification In Progress' : 'Not Started'}
                </p>
                <p className="text-xs text-slate-400">
                  {kycStatus === 'verified'
                    ? 'Your identity has been verified. You have full access to all features.'
                    : kycStatus === 'in_progress'
                    ? 'Complete all steps below to verify your identity.'
                    : 'Start your KYC verification to unlock trading features.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Step Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="flex items-center justify-between">
            {kycSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.number} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.number)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 group',
                    )}
                  >
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                      currentStep >= step.number
                        ? 'bg-[#00D4AA] text-[#0A1628]'
                        : 'bg-white/[0.06] text-slate-500 border border-white/[0.08]'
                    )}>
                      {currentStep > step.number ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span className={cn(
                      'text-[10px] sm:text-xs font-medium',
                      currentStep >= step.number ? 'text-[#00D4AA]' : 'text-slate-500'
                    )}>
                      {step.label}
                    </span>
                  </button>
                  {i < kycSteps.length - 1 && (
                    <div className={cn(
                      'w-6 sm:w-12 h-0.5 mx-2 rounded mt-[-16px]',
                      currentStep > step.number ? 'bg-[#00D4AA]' : 'bg-white/[0.06]'
                    )} />
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Step Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-[#162D50] border-white/[0.06] rounded-2xl">
            <CardContent className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <motion.div key="kyc1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <h2 className="text-lg font-bold">Personal Information</h2>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Full Legal Name</label>
                      <Input placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-slate-600" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Date of Birth</label>
                      <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-slate-600" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Nationality</label>
                      <Input placeholder="Enter your nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-slate-600" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Phone Number</label>
                      <Input type="tel" placeholder="+234 800 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-slate-600" />
                    </div>
                    <Button onClick={nextStep} className="w-full bg-[#00D4AA] hover:bg-[#00A888] text-[#0A1628] font-bold py-6 rounded-xl glow-dwex-strong">
                      Save & Continue <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: ID Verification */}
                {currentStep === 2 && (
                  <motion.div key="kyc2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <h2 className="text-lg font-bold">ID Verification</h2>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">ID Type</label>
                      <Select value={idType} onValueChange={setIdType}>
                        <SelectTrigger className="bg-white/[0.06] border-white/[0.08] text-white">
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#162D50] border-white/[0.08]">
                          {idTypes.map((t) => (
                            <SelectItem key={t} value={t} className="text-white focus:bg-white/[0.08]">{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">ID Number</label>
                      <Input placeholder="Enter your ID number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-slate-600" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Upload ID Document</label>
                      <div className="border-2 border-dashed border-white/[0.1] rounded-xl p-8 text-center hover:border-[#00D4AA]/30 transition cursor-pointer">
                        <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                        <p className="text-sm text-slate-400 mb-1">Click to upload or drag & drop</p>
                        <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={prevStep} variant="outline" className="flex-1 border-white/[0.08] text-white hover:bg-white/[0.06] py-6 rounded-xl">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                      </Button>
                      <Button onClick={nextStep} className="flex-1 bg-[#00D4AA] hover:bg-[#00A888] text-[#0A1628] font-bold py-6 rounded-xl glow-dwex-strong">
                        Save & Continue <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Selfie */}
                {currentStep === 3 && (
                  <motion.div key="kyc3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <h2 className="text-lg font-bold">Selfie Verification</h2>
                    <p className="text-sm text-slate-400">Take a selfie for liveness check. Make sure your face is clearly visible and well-lit.</p>
                    <div className="flex justify-center">
                      <div className={cn(
                        'w-48 h-48 rounded-full border-4 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer',
                        selfieUploaded ? 'border-[#00D4AA] bg-[#00D4AA]/5' : 'border-white/[0.1] hover:border-[#00D4AA]/30'
                      )} onClick={() => setSelfieUploaded(!selfieUploaded)}>
                        {selfieUploaded ? (
                          <>
                            <CheckCircle2 className="w-12 h-12 text-[#00D4AA] mb-2" />
                            <span className="text-xs text-[#00D4AA]">Uploaded</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-12 h-12 text-slate-500 mb-2" />
                            <span className="text-xs text-slate-500">Click to take selfie</span>
                          </>
                        )}
                      </div>
                    </div>
                    {!selfieUploaded && (
                      <div className="bg-[#F5A623]/5 border border-[#F5A623]/20 rounded-lg p-3 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-[#F5A623] flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400">Liveness check will verify that you are a real person. Follow the on-screen instructions when prompted.</p>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Button onClick={prevStep} variant="outline" className="flex-1 border-white/[0.08] text-white hover:bg-white/[0.06] py-6 rounded-xl">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                      </Button>
                      <Button onClick={nextStep} className="flex-1 bg-[#00D4AA] hover:bg-[#00A888] text-[#0A1628] font-bold py-6 rounded-xl glow-dwex-strong">
                        Save & Continue <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Address Proof */}
                {currentStep === 4 && (
                  <motion.div key="kyc4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <h2 className="text-lg font-bold">Proof of Address</h2>
                    <p className="text-sm text-slate-400">Upload a recent utility bill or bank statement (not older than 3 months).</p>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Document Type</label>
                      <Select value={addressDoc} onValueChange={setAddressDoc}>
                        <SelectTrigger className="bg-white/[0.06] border-white/[0.08] text-white">
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#162D50] border-white/[0.08]">
                          <SelectItem value="utility" className="text-white focus:bg-white/[0.08]">Utility Bill</SelectItem>
                          <SelectItem value="bank" className="text-white focus:bg-white/[0.08]">Bank Statement</SelectItem>
                          <SelectItem value="tax" className="text-white focus:bg-white/[0.08]">Tax Document</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Upload Document</label>
                      <div className="border-2 border-dashed border-white/[0.1] rounded-xl p-8 text-center hover:border-[#00D4AA]/30 transition cursor-pointer">
                        <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                        <p className="text-sm text-slate-400 mb-1">Click to upload or drag & drop</p>
                        <p className="text-xs text-slate-500">PDF, PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={prevStep} variant="outline" className="flex-1 border-white/[0.08] text-white hover:bg-white/[0.06] py-6 rounded-xl">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                      </Button>
                      <Button
                        onClick={() => setKycStatus('verified')}
                        className="flex-1 bg-[#00D4AA] hover:bg-[#00A888] text-[#0A1628] font-bold py-6 rounded-xl glow-dwex-strong"
                      >
                        Submit Verification
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
