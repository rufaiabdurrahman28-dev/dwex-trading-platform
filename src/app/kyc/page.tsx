'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, CheckCircle2, Clock, User, CreditCard, Camera, FileText, Upload, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  const [fullName, setFullName] = useState('')
  const [dob, setDob] = useState('')
  const [nationality, setNationality] = useState('')
  const [phone, setPhone] = useState('')
  const [idType, setIdType] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [selfieUploaded, setSelfieUploaded] = useState(false)
  const [addressDoc, setAddressDoc] = useState('')

  const nextStep = () => { setCurrentStep(Math.min(currentStep + 1, 4)); if (currentStep >= 1) setKycStatus('in_progress') }
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1))

  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#00A88A]/10 flex items-center justify-center"><Shield className="w-5 h-5 text-[#00A88A]" /></div>
            <div><h1 className="text-2xl sm:text-3xl font-bold text-gray-900">KYC Verification</h1><p className="text-gray-500 text-sm">Complete your identity verification to unlock full trading</p></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <Card className={cn('border shadow-sm', kycStatus === 'verified' ? 'bg-[#00A88A]/5 border-[#00A88A]/20' : kycStatus === 'in_progress' ? 'bg-[#E5940A]/5 border-[#E5940A]/20' : 'bg-[#E63950]/5 border-[#E63950]/20')}>
            <CardContent className="p-4 flex items-center gap-3">
              {kycStatus === 'verified' ? <CheckCircle2 className="w-5 h-5 text-[#00A88A] flex-shrink-0" /> : kycStatus === 'in_progress' ? <Clock className="w-5 h-5 text-[#E5940A] flex-shrink-0" /> : <AlertCircle className="w-5 h-5 text-[#E63950] flex-shrink-0" />}
              <div>
                <p className="font-semibold text-sm text-gray-900">{kycStatus === 'verified' ? 'Verified' : kycStatus === 'in_progress' ? 'Verification In Progress' : 'Not Started'}</p>
                <p className="text-xs text-gray-500">{kycStatus === 'verified' ? 'Your identity has been verified.' : kycStatus === 'in_progress' ? 'Complete all steps below to verify your identity.' : 'Start your KYC verification to unlock trading.'}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8">
          <div className="flex items-center justify-between">
            {kycSteps.map((step, i) => { const Icon = step.icon; return (
              <div key={step.number} className="flex items-center">
                <button onClick={() => setCurrentStep(step.number)} className="flex flex-col items-center gap-1.5">
                  <div className={cn('w-10 h-10 rounded-full flex items-center justify-center transition-all', currentStep >= step.number ? 'bg-[#00A88A] text-white' : 'bg-gray-200 text-gray-400 border border-gray-200')}>
                    {currentStep > step.number ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={cn('text-[10px] sm:text-xs font-medium', currentStep >= step.number ? 'text-[#00A88A]' : 'text-gray-400')}>{step.label}</span>
                </button>
                {i < kycSteps.length - 1 && <div className={cn('w-6 sm:w-12 h-0.5 mx-2 rounded mt-[-16px]', currentStep > step.number ? 'bg-[#00A88A]' : 'bg-gray-200')} />}
              </div>
            )})}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-white border-gray-200 rounded-2xl shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div key="kyc1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
                    <div><label className="text-sm text-gray-600 mb-1.5 block">Full Legal Name</label><Input placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /></div>
                    <div><label className="text-sm text-gray-600 mb-1.5 block">Date of Birth</label><Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /></div>
                    <div><label className="text-sm text-gray-600 mb-1.5 block">Nationality</label><Input placeholder="Enter your nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /></div>
                    <div><label className="text-sm text-gray-600 mb-1.5 block">Phone Number</label><Input type="tel" placeholder="+234 800 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /></div>
                    <Button onClick={nextStep} className="w-full bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-6 rounded-xl">Save & Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div key="kyc2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <h2 className="text-lg font-bold text-gray-900">ID Verification</h2>
                    <div><label className="text-sm text-gray-600 mb-1.5 block">ID Type</label><Select value={idType} onValueChange={setIdType}><SelectTrigger className="bg-white border-gray-200 text-gray-900"><SelectValue placeholder="Select ID type" /></SelectTrigger><SelectContent className="bg-white border-gray-200">{idTypes.map((t) => <SelectItem key={t} value={t} className="text-gray-900 focus:bg-gray-50">{t}</SelectItem>)}</SelectContent></Select></div>
                    <div><label className="text-sm text-gray-600 mb-1.5 block">ID Number</label><Input placeholder="Enter your ID number" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" /></div>
                    <div><label className="text-sm text-gray-600 mb-1.5 block">Upload ID Document</label><div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#00A88A]/30 transition cursor-pointer"><Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" /><p className="text-sm text-gray-500 mb-1">Click to upload or drag & drop</p><p className="text-xs text-gray-400">PNG, JPG up to 5MB</p></div></div>
                    <div className="flex gap-3">
                      <Button onClick={prevStep} variant="outline" className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 py-6 rounded-xl"><ChevronLeft className="w-4 h-4 mr-1" /> Back</Button>
                      <Button onClick={nextStep} className="flex-1 bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-6 rounded-xl">Save & Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div key="kyc3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <h2 className="text-lg font-bold text-gray-900">Selfie Verification</h2>
                    <p className="text-sm text-gray-500">Take a selfie for liveness check. Make sure your face is clearly visible and well-lit.</p>
                    <div className="flex justify-center">
                      <div className={cn('w-48 h-48 rounded-full border-4 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer', selfieUploaded ? 'border-[#00A88A] bg-[#00A88A]/5' : 'border-gray-200 hover:border-[#00A88A]/30')} onClick={() => setSelfieUploaded(!selfieUploaded)}>
                        {selfieUploaded ? <><CheckCircle2 className="w-12 h-12 text-[#00A88A] mb-2" /><span className="text-xs text-[#00A88A]">Uploaded</span></> : <><Camera className="w-12 h-12 text-gray-400 mb-2" /><span className="text-xs text-gray-400">Click to take selfie</span></>}
                      </div>
                    </div>
                    {!selfieUploaded && <div className="bg-[#E5940A]/5 border border-[#E5940A]/20 rounded-lg p-3 flex items-start gap-2"><AlertCircle className="w-4 h-4 text-[#E5940A] flex-shrink-0 mt-0.5" /><p className="text-xs text-gray-500">Liveness check will verify that you are a real person.</p></div>}
                    <div className="flex gap-3">
                      <Button onClick={prevStep} variant="outline" className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 py-6 rounded-xl"><ChevronLeft className="w-4 h-4 mr-1" /> Back</Button>
                      <Button onClick={nextStep} className="flex-1 bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-6 rounded-xl">Save & Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div key="kyc4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <h2 className="text-lg font-bold text-gray-900">Proof of Address</h2>
                    <p className="text-sm text-gray-500">Upload a recent utility bill or bank statement (not older than 3 months).</p>
                    <div><label className="text-sm text-gray-600 mb-1.5 block">Document Type</label><Select value={addressDoc} onValueChange={setAddressDoc}><SelectTrigger className="bg-white border-gray-200 text-gray-900"><SelectValue placeholder="Select document type" /></SelectTrigger><SelectContent className="bg-white border-gray-200"><SelectItem value="utility" className="text-gray-900 focus:bg-gray-50">Utility Bill</SelectItem><SelectItem value="bank" className="text-gray-900 focus:bg-gray-50">Bank Statement</SelectItem><SelectItem value="tax" className="text-gray-900 focus:bg-gray-50">Tax Document</SelectItem></SelectContent></Select></div>
                    <div><label className="text-sm text-gray-600 mb-1.5 block">Upload Document</label><div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#00A88A]/30 transition cursor-pointer"><Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" /><p className="text-sm text-gray-500 mb-1">Click to upload or drag & drop</p><p className="text-xs text-gray-400">PDF, PNG, JPG up to 10MB</p></div></div>
                    <div className="flex gap-3">
                      <Button onClick={prevStep} variant="outline" className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 py-6 rounded-xl"><ChevronLeft className="w-4 h-4 mr-1" /> Back</Button>
                      <Button onClick={() => setKycStatus('verified')} className="flex-1 bg-[#00A88A] hover:bg-[#008F74] text-white font-bold py-6 rounded-xl">Submit Verification</Button>
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
