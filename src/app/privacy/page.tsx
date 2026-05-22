'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, including:
• Personal identification information (name, email address, phone number, date of birth, nationality)
• Identity verification documents (passport, national ID, driver's license, utility bills)
• Financial information (bank account details, transaction history)
• Technical information (IP address, browser type, device information, cookies)
• Usage data (pages visited, features used, trading activity)`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to:
• Provide, maintain, and improve our services
• Verify your identity and comply with KYC/AML regulations
• Process transactions and manage your wallet
• Connect you with broker partners and facilitate trading
• Communicate with you about your account, services, and updates
• Monitor for fraud, suspicious activity, and security threats
• Comply with legal obligations and regulatory requirements
• Improve our platform and develop new features`,
  },
  {
    title: '3. Information Sharing',
    content: `We may share your information with:
• Connected brokers: To facilitate trading and account management
• Regulatory authorities: As required by law and regulatory obligations
• Service providers: Third-party services that help us operate the platform (payment processors, identity verification services)
• Law enforcement: When required by law or to protect our rights and safety

We do not sell your personal information to third parties for marketing purposes.`,
  },
  {
    title: '4. Data Security',
    content: `We implement industry-standard security measures to protect your personal information, including:
• End-to-end encryption for all data in transit and at rest (AES-256)
• Two-factor authentication for account access
• Regular security audits and penetration testing
• Secure cloud infrastructure with 99.9% uptime SLA
• Transaction PIN for high-value operations

However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '5. Data Retention',
    content: `We retain your personal information for as long as your account is active or as needed to provide you services. We may also retain certain information as required by law or for legitimate business purposes, such as resolving disputes and enforcing our agreements. KYC documents are retained for a minimum of 5 years as required by Nigerian regulations.`,
  },
  {
    title: '6. Your Rights',
    content: `You have the right to:
• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your information (subject to legal requirements)
• Object to or restrict processing of your information
• Data portability — receive your data in a structured format

To exercise these rights, please contact us at support@dwex.io.`,
  },
  {
    title: '7. Cookies',
    content: `We use cookies and similar technologies to collect information about your browsing activity. You can control cookies through your browser settings. Essential cookies are required for the platform to function properly, while analytics cookies help us improve our services.`,
  },
  {
    title: '8. Third-Party Links',
    content: `Our Platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read the privacy policies of any third-party services you access through our Platform.`,
  },
  {
    title: '9. Children\'s Privacy',
    content: `Our Platform is not intended for children under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 18, we will take steps to delete such information.`,
  },
  {
    title: '10. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Platform after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '11. Contact Us',
    content: `If you have questions about this Privacy Policy, please contact us at:
• Email: support@dwex.io
• Phone: +234 800 DWEX HELP
• Telegram: t.me/dwexsupport`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#00A88A]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#00A88A]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-500 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h2>
                  <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{section.content}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 text-sm mb-4">Related documents</p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/terms">
                  <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-100">
                    Terms of Service
                  </Button>
                </Link>
                <Link href="/risk-disclosure">
                  <Button className="bg-[#00A88A] hover:bg-[#008F74] text-white font-semibold">
                    Risk Disclosure <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
