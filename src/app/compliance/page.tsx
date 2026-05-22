'use client'

import TradingNav from '@/components/trading/TradingNav'
import TradingFooter from '@/components/trading/TradingFooter'

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col">
      <TradingNav />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full mt-16">
        <h1 className="text-2xl font-bold text-white mb-2">Compliance</h1>
        <p className="text-sm text-gray-500 mb-8">DWEX regulatory compliance and anti-money laundering policies</p>

        <div className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-xl p-6 sm:p-8 space-y-6 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Regulatory Framework</h2>
            <p>DWEX operates as a broker aggregator platform and is committed to full compliance with applicable financial regulations in all jurisdictions where we operate. Our compliance framework is designed in accordance with the guidelines of the Nigerian Securities and Exchange Commission (SEC), the Central Bank of Nigeria (CBN), the Nigerian Financial Intelligence Unit (NFIU), and international standards set by the Financial Action Task Force (FATF).</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Anti-Money Laundering (AML)</h2>
            <p className="mb-2">DWEX maintains a comprehensive AML program that includes:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Customer identification and verification (KYC) procedures for all users</li>
              <li>Risk-based assessment of customers and transactions</li>
              <li>Ongoing monitoring of account activity for suspicious patterns</li>
              <li>Transaction reporting to relevant authorities as required by law</li>
              <li>Enhanced due diligence for high-risk customers and transactions</li>
              <li>Regular staff training on AML procedures and emerging threats</li>
              <li>Record-keeping in compliance with regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Know Your Customer (KYC)</h2>
            <p>All DWEX users are required to complete KYC verification before accessing trading features. Our KYC process includes collection and verification of: full legal name, date of birth, residential address, government-issued photo identification, proof of address (utility bill or bank statement), and source of funds declaration. We use automated and manual verification processes to ensure the authenticity of submitted documents.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Suspicious Activity Reporting</h2>
            <p>DWEX is obligated to monitor and report suspicious transactions to the Nigerian Financial Intelligence Unit (NFIU) and other relevant authorities. Activities that may trigger a report include: transactions inconsistent with a customer&apos;s profile, structuring of deposits to avoid reporting thresholds, use of multiple accounts for unclear purposes, and transactions involving sanctioned jurisdictions or individuals.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Sanctions Compliance</h2>
            <p>DWEX screens all customers and transactions against international sanctions lists, including the United Nations Security Council Sanctions List, the US Office of Foreign Assets Control (OFAC) Specially Designated Nationals List, the European Union Consolidated List, and the Nigerian sanctions lists. We do not provide services to individuals or entities subject to sanctions.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Data Protection</h2>
            <p>DWEX complies with the Nigeria Data Protection Regulation (NDPR) and the Nigeria Data Protection Act (NDPA) 2023. We process personal data lawfully, fairly, and transparently. Personal data is collected for specified, explicit, and legitimate purposes and is not processed in a manner incompatible with those purposes. We implement appropriate technical and organizational measures to protect personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Client Fund Protection</h2>
            <p>DWEX does not hold client funds directly. All client deposits are held in segregated accounts with our partner brokers and payment processors. These funds are kept separate from DWEX operational accounts and cannot be used for DWEX business operations. In the event of DWEX insolvency, client funds would be protected and returned to clients.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Complaint Resolution</h2>
            <p>DWEX maintains a formal complaint resolution process. All complaints are acknowledged within 24 hours and investigated promptly. We aim to resolve complaints within 14 business days. If you are unsatisfied with the outcome, you may escalate your complaint to the appropriate regulatory body. To file a complaint, contact us at <a href="mailto:compliance@dwex.trade" className="text-[#00D4AA] hover:text-[#00B894]">compliance@dwex.trade</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Compliance Officer</h2>
            <p>DWEX maintains a dedicated Compliance Officer responsible for overseeing the implementation and effectiveness of our compliance program. The Compliance Officer reports directly to senior management and the Board of Directors on compliance matters, ensuring independent oversight of all compliance activities.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Contact</h2>
            <p>For compliance-related inquiries, please contact our Compliance Team at <a href="mailto:compliance@dwex.trade" className="text-[#00D4AA] hover:text-[#00B894]">compliance@dwex.trade</a> or call +234 800 DWEX 000.</p>
          </section>
        </div>
      </main>
      <TradingFooter />
    </div>
  )
}
