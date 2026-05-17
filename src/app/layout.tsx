import type { Metadata } from "next";
import "./globals.css";
import { ConditionalLayout } from "@/components/shared/ConditionalLayout";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "DWEX — Trade Across Brokers, One Platform",
  description:
    "DWEX is a broker aggregator platform. Trade 1,500+ assets across 20+ brokers. Deposit in Naira ₦, trade globally. Forex, Stocks, Crypto, Commodities, Indices & ETFs.",
  keywords: [
    "DWEX",
    "Broker Aggregator",
    "Forex",
    "Stocks",
    "Crypto",
    "Trading",
    "Nigeria",
    "Naira",
  ],
  authors: [{ name: "DWEX" }],
  openGraph: {
    title: "DWEX — Trade Across Brokers, One Platform",
    description:
      "1,500+ assets. 20+ brokers. Live charts. Nigerian wallet. Start trading today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-gray-900 min-h-screen flex flex-col">
        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
