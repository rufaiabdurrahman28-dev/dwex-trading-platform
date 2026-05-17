'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Shield, Bell, Palette, Trash2, Camera, Eye, EyeOff, Smartphone, Key } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

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
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-900">Settings</h1>
          <p className="text-gray-500">Manage your account preferences and security</p>
        </motion.div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white border-gray-200 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6"><User className="w-5 h-5 text-[#00A88A]" /><h2 className="font-bold text-lg text-gray-900">Profile</h2></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <Avatar className="w-16 h-16 border-2 border-[#00A88A]/20"><AvatarFallback className="bg-[#00A88A]/10 text-[#00A88A] text-xl font-bold">JD</AvatarFallback></Avatar>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00A88A] flex items-center justify-center"><Camera className="w-3 h-3 text-white" /></button>
                  </div>
                  <div><p className="font-semibold text-gray-900">{profileName}</p><p className="text-xs text-gray-400">Click the camera icon to change avatar</p></div>
                </div>
                <div className="space-y-4">
                  <div><label className="text-sm text-gray-600 mb-1.5 block">Full Name</label><Input value={profileName} onChange={(e) => setProfileName(e.target.value)} className="bg-white border-gray-200 text-gray-900" /></div>
                  <div><label className="text-sm text-gray-600 mb-1.5 block">Email</label><Input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} className="bg-white border-gray-200 text-gray-900" /></div>
                  <div><label className="text-sm text-gray-600 mb-1.5 block">Phone</label><Input type="tel" value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} className="bg-white border-gray-200 text-gray-900" /></div>
                  <Button className="bg-[#00A88A] hover:bg-[#008F74] text-white font-semibold">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white border-gray-200 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6"><Lock className="w-5 h-5 text-[#00A88A]" /><h2 className="font-bold text-lg text-gray-900">Security</h2></div>
                <div className="space-y-5">
                  <div><h3 className="text-sm font-semibold mb-3 text-gray-900">Change Password</h3><div className="space-y-3">
                    <div className="relative"><Input type={showCurrentPw ? 'text' : 'password'} placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="bg-white border-gray-200 text-gray-900 pr-10" /><button onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showCurrentPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
                    <div className="relative"><Input type={showNewPw ? 'text' : 'password'} placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-white border-gray-200 text-gray-900 pr-10" /><button onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
                    <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">Update Password</Button>
                  </div></div>
                  <Separator className="bg-gray-200" />
                  <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Smartphone className="w-4 h-4 text-gray-400" /><div><p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p><p className="text-xs text-gray-400">Add an extra layer of security</p></div></div><Switch checked={twoFA} onCheckedChange={setTwoFA} /></div>
                  <Separator className="bg-gray-200" />
                  <div className="flex items-center justify-between"><div className="flex items-center gap-3"><Key className="w-4 h-4 text-gray-400" /><div><p className="text-sm font-medium text-gray-900">Transaction PIN</p><p className="text-xs text-gray-400">Required for withdrawals and transfers</p></div></div><Switch checked={transPin} onCheckedChange={setTransPin} /></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-white border-gray-200 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6"><Bell className="w-5 h-5 text-[#00A88A]" /><h2 className="font-bold text-lg text-gray-900">Notifications</h2></div>
                <div className="space-y-5">
                  <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-900">Email Notifications</p><p className="text-xs text-gray-400">Receive trade alerts and updates via email</p></div><Switch checked={emailNotif} onCheckedChange={setEmailNotif} /></div>
                  <Separator className="bg-gray-200" />
                  <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-900">Push Notifications</p><p className="text-xs text-gray-400">Get real-time notifications in your browser</p></div><Switch checked={pushNotif} onCheckedChange={setPushNotif} /></div>
                  <Separator className="bg-gray-200" />
                  <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-gray-900">Price Alerts</p><p className="text-xs text-gray-400">Get notified when assets hit target prices</p></div><Switch checked={priceAlerts} onCheckedChange={setPriceAlerts} /></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-white border-gray-200 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6"><Palette className="w-5 h-5 text-[#00A88A]" /><h2 className="font-bold text-lg text-gray-900">Preferences</h2></div>
                <div className="space-y-4">
                  <div><label className="text-sm text-gray-600 mb-1.5 block">Default Currency</label><Select value={defaultCurrency} onValueChange={setDefaultCurrency}><SelectTrigger className="bg-white border-gray-200 text-gray-900"><SelectValue /></SelectTrigger><SelectContent className="bg-white border-gray-200"><SelectItem value="NGN" className="text-gray-900 focus:bg-gray-50">₦ NGN - Nigerian Naira</SelectItem><SelectItem value="USD" className="text-gray-900 focus:bg-gray-50">$ USD - US Dollar</SelectItem><SelectItem value="GBP" className="text-gray-900 focus:bg-gray-50">£ GBP - British Pound</SelectItem><SelectItem value="EUR" className="text-gray-900 focus:bg-gray-50">€ EUR - Euro</SelectItem></SelectContent></Select></div>
                  <div><label className="text-sm text-gray-600 mb-1.5 block">Default Trading Phase</label><Select value={defaultPhase} onValueChange={setDefaultPhase}><SelectTrigger className="bg-white border-gray-200 text-gray-900"><SelectValue /></SelectTrigger><SelectContent className="bg-white border-gray-200"><SelectItem value="deriv" className="text-gray-900 focus:bg-gray-50">Deriv Phase</SelectItem><SelectItem value="wise" className="text-gray-900 focus:bg-gray-50">Wise Phase</SelectItem><SelectItem value="eversend" className="text-gray-900 focus:bg-gray-50">Eversend Phase</SelectItem></SelectContent></Select></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="bg-white border-[#E63950]/20 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4"><Trash2 className="w-5 h-5 text-[#E63950]" /><h2 className="font-bold text-lg text-[#E63950]">Danger Zone</h2></div>
                <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="outline" className="border-[#E63950]/30 text-[#E63950] hover:bg-[#E63950]/10"><Trash2 className="w-4 h-4 mr-2" />Delete Account</Button></AlertDialogTrigger>
                  <AlertDialogContent className="bg-white border-gray-200">
                    <AlertDialogHeader><AlertDialogTitle className="text-gray-900">Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription className="text-gray-500">This will permanently delete your account, close all positions, withdraw remaining funds, and remove all your data. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel className="bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100">Cancel</AlertDialogCancel><AlertDialogAction className="bg-[#E63950] hover:bg-[#c5303f] text-white">Delete Account</AlertDialogAction></AlertDialogFooter>
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
