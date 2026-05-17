'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Lock,
  Shield,
  Bell,
  Palette,
  Trash2,
  Camera,
  Eye,
  EyeOff,
  Smartphone,
  Key,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function SettingsPage() {
  const [profileName, setProfileName] = useState('John Doe')
  const [profileEmail, setProfileEmail] = useState('john@example.com')
  const [profilePhone, setProfilePhone] = useState('+234 800 000 0000')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)

  const [twoFA, setTwoFA] = useState(false)
  const [transPin, setTransPin] = useState(false)

  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)
  const [priceAlerts, setPriceAlerts] = useState(false)

  const [defaultCurrency, setDefaultCurrency] = useState('NGN')
  const [defaultPhase, setDefaultPhase] = useState('deriv')

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account preferences and security</p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-[#162D50] border-white/[0.06] rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-5 h-5 text-[#00D4AA]" />
                  <h2 className="font-bold text-lg">Profile</h2>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <Avatar className="w-16 h-16 border-2 border-[#00D4AA]/20">
                      <AvatarFallback className="bg-[#00D4AA]/10 text-[#00D4AA] text-xl font-bold">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00D4AA] flex items-center justify-center">
                      <Camera className="w-3 h-3 text-[#0A1628]" />
                    </button>
                  </div>
                  <div>
                    <p className="font-semibold">{profileName}</p>
                    <p className="text-xs text-slate-500">Click the camera icon to change avatar</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">Full Name</label>
                    <Input value={profileName} onChange={(e) => setProfileName(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">Email</label>
                    <Input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">Phone</label>
                    <Input type="tel" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white" />
                  </div>
                  <Button className="bg-[#00D4AA] hover:bg-[#00A888] text-[#0A1628] font-semibold">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-[#162D50] border-white/[0.06] rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-5 h-5 text-[#00D4AA]" />
                  <h2 className="font-bold text-lg">Security</h2>
                </div>

                <div className="space-y-5">
                  {/* Change Password */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Change Password</h3>
                    <div className="space-y-3">
                      <div className="relative">
                        <Input type={showCurrentPw ? 'text' : 'password'} placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white pr-10" />
                        <button onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                          {showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="relative">
                        <Input type={showNewPw ? 'text' : 'password'} placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-white/[0.06] border-white/[0.08] text-white pr-10" />
                        <button onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                          {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <Button variant="outline" className="border-white/[0.08] text-white hover:bg-white/[0.06]">
                        Update Password
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-white/[0.06]" />

                  {/* 2FA Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium">Two-Factor Authentication</p>
                        <p className="text-xs text-slate-500">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Switch checked={twoFA} onCheckedChange={setTwoFA} />
                  </div>

                  <Separator className="bg-white/[0.06]" />

                  {/* Transaction PIN */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Key className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium">Transaction PIN</p>
                        <p className="text-xs text-slate-500">Required for withdrawals and transfers</p>
                      </div>
                    </div>
                    <Switch checked={transPin} onCheckedChange={setTransPin} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-[#162D50] border-white/[0.06] rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="w-5 h-5 text-[#00D4AA]" />
                  <h2 className="font-bold text-lg">Notifications</h2>
                </div>

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Email Notifications</p>
                      <p className="text-xs text-slate-500">Receive trade alerts and updates via email</p>
                    </div>
                    <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
                  </div>

                  <Separator className="bg-white/[0.06]" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Push Notifications</p>
                      <p className="text-xs text-slate-500">Get real-time notifications in your browser</p>
                    </div>
                    <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
                  </div>

                  <Separator className="bg-white/[0.06]" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Price Alerts</p>
                      <p className="text-xs text-slate-500">Get notified when assets hit target prices</p>
                    </div>
                    <Switch checked={priceAlerts} onCheckedChange={setPriceAlerts} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preferences Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-[#162D50] border-white/[0.06] rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Palette className="w-5 h-5 text-[#00D4AA]" />
                  <h2 className="font-bold text-lg">Preferences</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">Default Currency</label>
                    <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                      <SelectTrigger className="bg-white/[0.06] border-white/[0.08] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#162D50] border-white/[0.08]">
                        <SelectItem value="NGN" className="text-white focus:bg-white/[0.08]">₦ NGN - Nigerian Naira</SelectItem>
                        <SelectItem value="USD" className="text-white focus:bg-white/[0.08]">$ USD - US Dollar</SelectItem>
                        <SelectItem value="GBP" className="text-white focus:bg-white/[0.08]">£ GBP - British Pound</SelectItem>
                        <SelectItem value="EUR" className="text-white focus:bg-white/[0.08]">€ EUR - Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">Default Trading Phase</label>
                    <Select value={defaultPhase} onValueChange={setDefaultPhase}>
                      <SelectTrigger className="bg-white/[0.06] border-white/[0.08] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#162D50] border-white/[0.08]">
                        <SelectItem value="deriv" className="text-white focus:bg-white/[0.08]">Deriv Phase</SelectItem>
                        <SelectItem value="wise" className="text-white focus:bg-white/[0.08]">Wise Phase</SelectItem>
                        <SelectItem value="eversend" className="text-white focus:bg-white/[0.08]">Eversend Phase</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-[#162D50] border-[#FF4D6A]/20 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trash2 className="w-5 h-5 text-[#FF4D6A]" />
                  <h2 className="font-bold text-lg text-[#FF4D6A]">Danger Zone</h2>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="border-[#FF4D6A]/30 text-[#FF4D6A] hover:bg-[#FF4D6A]/10">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-[#162D50] border-white/[0.08]">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-400">
                        This will permanently delete your account, close all positions, withdraw remaining funds, and remove all your data. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-white/[0.06] border-white/[0.08] text-white hover:bg-white/[0.1]">Cancel</AlertDialogCancel>
                      <AlertDialogAction className="bg-[#FF4D6A] hover:bg-[#E63E57] text-white">Delete Account</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
