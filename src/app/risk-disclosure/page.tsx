'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  {
    title: 'Important Risk Warning',
    content: `Trading in financial instruments (including but not limited to forex, stocks, cryptocurrencies, commodities, indices, and ETFs) involves substantial risk of loss and is not suitable for every investor. The value of investments can go down as well as up, and you may lose more than your initial investment. You should carefully consider whether trading is appropriate for you in light of your financial condition, investment experience, and risk tolerance.`,
    highlight: true,
  },
  {
    title: '1. Market Risk',
    content: `Financial markets are inherently volatile and unpredictable. Prices can fluctuate rapidly due to various factors including economic conditions, political events, natural disasters, and market sentiment. You may incur significant losses due to adverse market movements. Past performance is not indicative of future results.`,
  },
  {
    title: '2. Leverage Risk',
    content: `Trading on margin (using leverage) can magnify both profits and losses. While leverage allows you to control larger positions with a smaller deposit, it also means that even small market movements can result in significant losses that exceed your initial margin. You may be required to deposit additional funds to maintain your positions, and failure to do so may result in the forced closure of your positions at a loss.`,
  },
  {
    title: '3. Liquidity Risk',
    content: `Certain financial instruments may become illiquid under adverse market conditions, making it difficult or impossible to close positions at desired prices. This can result in substantial losses, especially during periods of high volatility or market stress.`,
  },
  {
    title: '4. Technology Risk',
    content: `DWEX relies on technology infrastructure to provide its services. System failures, connectivity issues, software bugs, cyber attacks, or other technological problems may disrupt your ability to access the platform, execute trades, or manage your account. DWEX is not liable for losses resulting from technology failures beyond our reasonable control.`,
  },
  {
    title: '5. Broker Risk',
    content: `DWEX is a broker aggregator and does not hold client funds or execute trades directly. All trading is conducted through connected, regulated brokers. The financial health, regulatory compliance, and operational reliability of these brokers are beyond DWEX's control. In the event of a broker's insolvency or regulatory action, you may lose some or all of your funds held with that broker.`,
  },
  {
    title: '6. Currency Risk',
    content: `DWEX operates primarily with USD trading accounts funded through NGN deposits. Currency conversion rates (RAWTIN rates) fluctuate and may result in gains or losses when converting between currencies. Changes in the NGN/USD exchange rate can significantly impact the value of your deposits and withdrawals.`,
  },
  {
    title: '7. Regulatory Risk',
    content: `Changes in laws, regulations, or government policies in Nigeria or other jurisdictions may adversely affect the availability, legality, or terms of our services. Regulatory actions could restrict your ability to trade, access your funds, or use certain features of the platform.`,
  },
  {
    title: '8. Cryptocurrency-Specific Risks',
    content: `Trading cryptocurrencies carries additional risks including:
• Extreme price volatility
• Regulatory uncertainty across jurisdictions
• Potential for hacking, theft, or loss of digital assets
• Limited recourse in case of fraudulent transactions
• Technological risks related to blockchain networks`,
  },
  {
    title: '9. Risk Management Recommendations',
    content: `To manage your risks, we recommend:
• Only trade with money you can afford to lose
• Use stop-loss orders to limit potential losses
• Diversify your portfolio across different asset classes
• Avoid excessive leverage
• Stay informed about market conditions and events
• Regularly review and adjust your trading strategy
• Complete KYC verification to access full platform features`,
  },
  {
    title: '10. No Guarantee of Profits',
    content: `DWEX makes no representation or guarantee that you will profit from trading, and you acknowledge that losses are possible. Any examples, tutorials, or educational materials provided by DWEX are for illustrative purposes only and should not be construed as investment advice or guarantees of performance.`,
  },
]

export default function RiskDisclosurePage() {
  return (
    <div className="min-h-screen pt-20 pb-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#E63950]/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#E63950]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Risk Disclosure</h1>
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
              <Card className={`shadow-sm ${section.highlight ? 'bg-[#E63950]/5 border-[#E63950]/20' : 'bg-white border-gray-200'}`}>
                <CardContent className="p-6">
                  <h2 className={`text-lg font-bold mb-3 ${section.highlight ? 'text-[#E63950]' : 'text-gray-900'}`}>{section.title}</h2>
                  <div className={`text-sm leading-relaxed whitespace-pre-line ${section.highlight ? 'text-[#E63950]/80' : 'text-gray-600'}`}>{section.content}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6 text-center">
              <p className="text-gray-500 text-sm mb-4">By using DWEX, you acknowledge that you have read and understood these risks.</p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/terms">
                  <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-100">
                    Terms of Service
                  </Button>
                </Link>
                <Link href="/privacy">
                  <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-100">
                    Privacy Policy
                  </Button>
                </Link>
                <Link href="/support">
                  <Button className="bg-[#00A88A] hover:bg-[#008F74] text-white font-semibold">
                    Contact Support <ArrowRight className="w-4 h-4 ml-1" />
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
