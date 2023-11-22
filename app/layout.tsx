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
      <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
        <Navbar />
        <StarsCanvas />
        {children}
        <Footer />
      </body>
    </html>
  )
}
