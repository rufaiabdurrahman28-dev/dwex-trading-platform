import Link from 'next/link'

export default function TradingFooter() {
  return (
    <footer className="bg-[#060E1A] border-t border-[#1E2D4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/dwex-logo.jpg"
                alt="DWEX"
                className="w-7 h-7 rounded object-cover"
              />
              <span className="font-bold text-white">DWEX</span>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Trade Smart, Trade Global. The most powerful broker aggregator platform for Africa and the world.
            </p>
            <div className="flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#1E2D4A] flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#2A3F5F] transition" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#1E2D4A] flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#2A3F5F] transition" aria-label="Telegram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#1E2D4A] flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#2A3F5F] transition" aria-label="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Markets */}
          <div>
            <h4 className="font-semibold mb-3 text-sm text-white">Markets</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/dashboard?cat=forex" className="hover:text-white transition">Forex</Link></li>
              <li><Link href="/dashboard?cat=stocks" className="hover:text-white transition">Stocks</Link></li>
              <li><Link href="/dashboard?cat=crypto" className="hover:text-white transition">Crypto</Link></li>
              <li><Link href="/dashboard?cat=commodities" className="hover:text-white transition">Commodities</Link></li>
              <li><Link href="/dashboard?cat=indices" className="hover:text-white transition">Indices</Link></li>
              <li><Link href="/dashboard?cat=etfs" className="hover:text-white transition">ETFs</Link></li>
              <li><Link href="/dashboard?cat=synthetics" className="hover:text-white transition">Synthetics</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3 text-sm text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/brokers" className="hover:text-white transition">Brokers</Link></li>
              <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
              <li><Link href="/kyc" className="hover:text-white transition">KYC Verification</Link></li>
              <li><a href="mailto:support@dwex.trade" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3 text-sm text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/risk" className="hover:text-white transition">Risk Disclosure</Link></li>
              <li><Link href="/compliance" className="hover:text-white transition">Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1E2D4A] pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">
              &copy; 2026 DWEX. All rights reserved.
            </p>
            <p className="text-gray-700 text-xs max-w-2xl text-center sm:text-right">
              Trading involves significant risk of loss. Past performance is not indicative of future results.
              DWEX is a broker aggregator platform and does not hold client funds directly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
