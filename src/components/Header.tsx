'use client'

import { Calculator, Crown } from 'lucide-react'

export function Header() {
  return (
    <header className="desi-header">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-center">
          {/* Desi Logo Section - Centered */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-gold-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <Calculator className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <Crown className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 text-gold-500" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-charcoal flex items-center gap-2">
                Jahez Calculator
                <span className="text-lg md:text-2xl">💍</span>
              </h1>
              <p className="text-xs md:text-sm text-gold-600 font-medium">
                <span>Rishta Market Analysis <span className="urdu-text hidden md:inline">• رشتہ مارکیٹ تجزیہ</span></span>
              </p>
            </div>
          </div>
        </div>

        {/* Cultural Tagline - Simplified for mobile */}
        <div className="mt-3 md:mt-4 text-center">
          <p className="text-charcoal/70 text-xs md:text-sm font-medium">
            <span className="block md:inline">🎭 Digital rishta culture analyzer</span>
            <span className="hidden md:inline"> • MashAllah level predictions 🎋</span>
          </p>
        </div>
      </div>
    </header>
  )
}
