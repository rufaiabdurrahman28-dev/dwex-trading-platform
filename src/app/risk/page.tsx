'use client'

import TradingNav from '@/components/trading/TradingNav'
import TradingFooter from '@/components/trading/TradingFooter'

export default function RiskPage() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col">
      <TradingNav />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full mt-16">
        <h1 className="text-2xl font-bold text-white mb-2">Risk Disclosure</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 1, 2026</p>

        <div className="bg-[#FF4D6A]/5 border border-[#FF4D6A]/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-[#FF4D6A] font-medium">
            WARNING: Trading in financial instruments involves substantial risk of loss and is not suitable for all investors. You should carefully consider whether trading is appropriate for you in light of your financial condition.
          </p>
        </div>

        <div className="bg-[#0D1B2E] border border-[#1E2D4A] rounded-xl p-6 sm:p-8 space-y-6 text-gray-400 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. General Risk Warning</h2>
            <p>Trading in Forex, stocks, cryptocurrencies, commodities, indices, and other financial instruments carries a high level of risk and may not be suitable for all investors. The value of investments can go down as well as up, and you may lose more than your initial investment. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Market Risk</h2>
            <p>Financial markets are inherently volatile. Prices of instruments can fluctuate rapidly due to factors including but not limited to: economic indicators, political events, natural disasters, market sentiment, and regulatory changes. Such volatility can result in significant losses within very short periods. Past performance is not indicative of future results, and no representation or warranty is made regarding the likelihood of profit or loss.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Leverage Risk</h2>
            <p>Trading with leverage amplifies both potential profits and potential losses. A small market movement can result in a proportionately much larger movement in your account balance. You may lose your entire initial margin and be required to deposit additional funds. If you fail to meet a margin call, your positions may be liquidated at a loss, and you will be liable for any resulting deficit in your account.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Cryptocurrency Risk</h2>
            <p>Cryptocurrency markets operate 24/7 and are highly volatile. Cryptocurrencies are not backed by any government or central bank, and their value is determined entirely by market supply and demand. Additional risks include: regulatory changes that may restrict or ban cryptocurrency trading, technology failures, hacking, and the potential loss of access to your digital assets. You should only invest what you can afford to lose entirely.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Liquidity Risk</h2>
            <p>Certain instruments may become illiquid under adverse market conditions, making it difficult or impossible to execute trades at desired prices. This is particularly relevant for exotic currency pairs, small-cap stocks, and certain synthetic instruments. You may not be able to close a position at a favorable price, or at all, during periods of low liquidity.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Technology Risk</h2>
            <p>Trading through electronic platforms involves risks including, but not limited to: software failures, hardware malfunctions, internet connectivity issues, system downtime, and cyber attacks. DWEX is not responsible for losses resulting from technology failures, including delays in trade execution, data feed errors, or platform unavailability. You should have alternative means of managing your positions in case of platform failure.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Broker Risk</h2>
            <p>DWEX operates as a broker aggregator. Trades are executed through third-party brokers, each with their own terms, conditions, and risk profiles. The financial condition of a broker may affect their ability to fulfill obligations. While DWEX carefully vets its partner brokers, we cannot guarantee their continued solvency or operational stability. In the event of broker insolvency, client funds may be at risk.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Regulatory Risk</h2>
            <p>Changes in laws, regulations, or government policies in any jurisdiction where you or DWEX operate may adversely affect your trading activities. This includes potential restrictions on certain financial instruments, trading practices, or cross-border transactions. DWEX does not provide legal or tax advice, and you should consult appropriate professionals regarding the legal and tax implications of your trading activities.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Acknowledgment</h2>
            <p>By using the DWEX platform, you acknowledge that you have read and understood this Risk Disclosure, and that you are aware of the risks associated with trading financial instruments. You accept full responsibility for your trading decisions and agree that DWEX, its directors, employees, and affiliates shall not be held liable for any losses arising from your use of the platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Seek Independent Advice</h2>
            <p>If you are unsure about any aspect of the risks involved in trading, you should seek independent financial, legal, and tax advice from qualified professionals before using the DWEX platform.</p>
          </section>
        </div>
      </main>
      <TradingFooter />
    </div>
  )
}
