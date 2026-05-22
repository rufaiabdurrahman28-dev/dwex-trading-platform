'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the DWEX platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform. DWEX reserves the right to modify these Terms at any time, and your continued use of the Platform after any changes constitutes your acceptance of the new Terms.`,
  },
  {
    title: '2. Description of Service',
    content: `DWEX is a broker aggregator platform that allows users to connect to multiple brokers through a single interface. DWEX provides technology infrastructure for accessing broker services but does not hold client funds, execute trades directly, or act as a financial intermediary. All trades are executed through connected, regulated brokers.`,
  },
  {
    title: '3. Account Registration',
    content: `To use the Platform, you must create an account by providing accurate and complete information. You must be at least 18 years old and have the legal capacity to enter into these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.`,
  },
  {
    title: '4. KYC Verification',
    content: `You agree to complete Know Your Customer (KYC) verification as required by DWEX and applicable regulations. This may include providing personal identification documents, proof of address, and other information. DWEX reserves the right to suspend or terminate accounts that fail to complete KYC verification or provide false information.`,
  },
  {
    title: '5. Trading and Broker Connections',
    content: `DWEX facilitates connections between users and regulated brokers. All trading activities, including order execution, pricing, and settlement, are handled by the connected brokers. DWEX is not responsible for broker performance, pricing accuracy, or trade execution quality.`,
  },
  {
    title: '6. Wallet and Payments',
    content: `The DWEX wallet allows users to deposit, withdraw, and transfer funds. Deposits are converted from NGN to USD at the prevailing RAWTIN rate for trading purposes. Withdrawals are subject to available balance and may incur fees. DWEX does not hold client funds — all deposits are held by the connected brokers.`,
  },
  {
    title: '7. Anti-Money Laundering (AML) Policy',
    content: `DWEX is committed to preventing money laundering and terrorist financing. We comply with all applicable AML laws and regulations, including the Nigeria Money Laundering (Prohibition) Act. We monitor transactions for suspicious activity and may report such activity to relevant authorities.`,
  },
  {
    title: '8. Risk Disclosure',
    content: `Trading in financial instruments involves significant risk of loss. You should carefully consider whether trading is appropriate for you in light of your financial condition. Past performance is not indicative of future results. Please read our full Risk Disclosure for more details.`,
  },
  {
    title: '9. Limitation of Liability',
    content: `DWEX shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses, resulting from your use of or inability to use the Platform.`,
  },
  {
    title: '10. Termination',
    content: `DWEX reserves the right to suspend or terminate your account at any time for any reason, including but not limited to violation of these Terms, suspicious activity, or regulatory requirements.`,
  },
  {
    title: '11. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms shall be resolved through arbitration in Lagos, Nigeria.`,
  },
  {
    title: '12. Contact',
    content: `If you have any questions about these Terms, please contact us at support@dwex.io or through our Support page.`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#00A88A]/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#00A88A]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Terms of Service</h1>
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
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 text-sm mb-4">Have questions about our terms?</p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/support">
                  <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-100">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/privacy">
                  <Button className="bg-[#00A88A] hover:bg-[#008F74] text-white font-semibold">
                    Privacy Policy <ArrowRight className="w-4 h-4 ml-1" />
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
