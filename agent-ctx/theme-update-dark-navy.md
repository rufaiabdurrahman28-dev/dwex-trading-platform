# Task: DWEX Dark Navy Theme Update - All 12 Pages

## Summary
Updated 12 page components to use the DWEX dark navy design system. All pages now use TradingNav and TradingFooter, consistent dark theme colors, JetBrains Mono for prices/numbers, and DWEX branding.

## Color Mappings Applied
- `bg-white` / `bg-gray-50` → `bg-[#0D1B2E]` (cards/surfaces)
- `bg-gray-100` → `bg-[#0A1628]` (darkest background, input backgrounds)
- `border-gray-200` → `border-[#1E2D4A]` (borders)
- `text-gray-900` → `text-white` (headings)
- `text-emerald-500/600` → `text-[#00D4AA]` (accent/teal)
- `bg-emerald-500` → `bg-[#00D4AA]` (primary CTA)
- `hover:bg-emerald-600` → `hover:bg-[#00B894]`
- `text-red-500/600` → `text-[#FF4D6A]` (sell/loss)
- `bg-red-500` → `bg-[#FF4D6A]`
- `text-amber-500/600` → `text-[#F5A623]` (warning)
- `bg-emerald-50` → `bg-[#00D4AA]/10`
- `text-emerald-700` → `text-[#00D4AA]`
- `focus:border-emerald-400` → `focus:border-[#00D4AA]`
- `focus:ring-emerald-100` → `focus:ring-[#00D4AA]/20`
- `bg-red-50` → `bg-[#FF4D6A]/10`
- `bg-amber-50` → `bg-[#F5A623]/10`
- Prices/numbers → `font-['JetBrains_Mono',monospace]`

## Files Updated
1. `src/app/wallet/page.tsx` - Dark theme, bank details "DWEX Ltd", transfer "DWEX User"
2. `src/app/support/page.tsx` - Dark theme, kept all FAQ and contact form
3. `src/app/about/page.tsx` - Complete rewrite from Aroyan Muslim School to DWEX about page with dark theme
4. `src/app/alerts/page.tsx` - Dark theme, kept all alert functionality
5. `src/app/portfolio/page.tsx` - Dark theme, JetBrains Mono for all values
6. `src/app/settings/page.tsx` - Dark theme, teal toggle switches
7. `src/app/kyc/page.tsx` - Dark theme, teal progress steps
8. `src/app/terms/page.tsx` - Dark theme, DWEX branding
9. `src/app/privacy/page.tsx` - Dark theme, DWEX branding
10. `src/app/risk/page.tsx` - Dark theme, DWEX branding
11. `src/app/compliance/page.tsx` - Dark theme, DWEX branding
12. `src/app/trade/[symbol]/page.tsx` - Dark theme, TradingNav/Footer added, JetBrains Mono for all prices

## Verification
- All 12 pages compile with 200 status
- No new lint errors introduced
- All pages use TradingNav and TradingFooter
