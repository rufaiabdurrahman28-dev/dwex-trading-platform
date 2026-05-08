import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aroyan Muslim School - Quranic Memorization & Western Education",
  description: "Aroyan Muslim School is dedicated to Quranic memorization and Islamic disciplines alongside Western education. Join our Saturday and Sunday Madrasah programs.",
  keywords: ["Aroyan", "Muslim School", "Quranic Memorization", "Islamic Education", "Madrasah", "Hifz", "Western Education"],
  authors: [{ name: "Aroyan Muslim School" }],
  icons: {
    icon: "/InShot_20260507_212731657.png",
  },
  openGraph: {
    title: "Aroyan Muslim School",
    description: "Quranic Memorization & Western Education Combined",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
