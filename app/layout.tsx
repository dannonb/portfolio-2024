import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import StarsCanvas from '@/components/StarBackground'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dannon Bigham Portfolio',
  description: 'Dannon Bigham Portfolio',
  keywords: [
    'Dannon Bigham Portfolio', 
    'Dannon Bigham', 
    'Web Developer Fresno', 
    'Fresno Website Maker', 
    'Software Engineer Fresno'
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/20 pointer-events-none" />
        <Navbar />
        <StarsCanvas />
        {children}
        <Footer />
      </body>
    </html>
  )
}
