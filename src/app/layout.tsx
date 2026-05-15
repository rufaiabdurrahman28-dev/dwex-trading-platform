import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "9mach Trade — Trade Smart, Trade Global",
  description: "The most powerful trading platform for Forex, Stocks, Crypto & more. Deposit in Naira ₦, trade globally. 1,500+ assets, live charts, Nigerian wallet.",
  keywords: ["9mach Trade", "Forex", "Stocks", "Crypto", "Trading", "Nigeria", "Naira"],
  authors: [{ name: "9mach Trade" }],
  openGraph: {
    title: "9mach Trade — Trade Smart, Trade Global",
    description: "1,500+ assets. Live charts. Nigerian wallet. Start trading today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-[#0a0a0f] text-white">
        {children}
      </body>
    </html>
  );
}
