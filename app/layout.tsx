import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ChurnGuard AI",
    template: "%s | ChurnGuard AI",
  },
  description: "AI-powered web app to predict customer churn using machine learning.",
  icons: {
    icon: "/churnguard-logo.png",
    apple: "/churnguard-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>)
 {
  return (
    <html lang="en">
  <head>
    <title>ChurnGuard AI</title>
  </head>
  <body className="font-sans antialiased">
    {children}
    <Analytics />
  </body>
</html>
  )
}
