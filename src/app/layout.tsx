import type { Metadata } from 'next'
import { Poppins, Noto_Nastaliq_Urdu } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

const urduFont = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-urdu'
})

export const metadata: Metadata = {
  title: 'Jahez Calculator - جہیز کیلکولیٹر | Modern Desi Fusion',
  description: 'A satirical cultural calculator for Pakistani dowry expectations - Experience the digital extension of rishta culture with modern desi fusion design',
  keywords: ['jahez', 'dowry', 'calculator', 'pakistani', 'culture', 'rishta', 'desi', 'wedding', 'shaadi', 'mehndi'],
  authors: [{ name: 'Jahez Calculator Team' }],
  creator: 'Jahez Calculator',
  openGraph: {
    title: 'Jahez Calculator - جہیز کیلکولیٹر',
    description: 'Find out your Jahez estimate with our cultural calculator',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${urduFont.variable}`}>
      <body className={poppins.className}>
        <div className="min-h-screen bg-cream-200 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-full w-full bg-mehndi-pattern"></div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
