'use client'

import { useState, useEffect } from 'react'
import { UserProfile } from '@/types'
import { JahezCalculator } from '@/lib/calculator'
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm'
import { PhysicalProfileForm } from '@/components/forms/PhysicalProfileForm'
import { EducationForm } from '@/components/forms/EducationForm'
import { CareerForm } from '@/components/forms/CareerForm'
import { SocialForm } from '@/components/forms/SocialForm'
import { ResultsDisplay } from '@/components/ResultsDisplay'
import { Header } from '@/components/Header'
import { Stepper } from '@/components/Stepper'

const STEPS = [
  { id: 1, title: 'Personal Info', description: 'Basic identity details' },
  { id: 2, title: 'Physical Profile', description: 'Appearance & fitness' },
  { id: 3, title: 'Education', description: 'Academic background' },
  { id: 4, title: 'Career', description: 'Job & income details' },
  { id: 5, title: 'Social Background', description: 'Family & lifestyle' },
  { id: 6, title: 'Results', description: 'Your Jahez estimate' },
]

// Cultural popup messages
const CULTURAL_MESSAGES = [
  "MashAllah! Level upgraded! 🎉",
  "Waah waah! With this education, get ready for at least a Corolla 🚗",
  "Peeche tou dekho! Fortuner aa rahi hai! 🚙",
  "Shaadi season ka shehzada! 👑",
  "Jahez game strong! 💪",
  "Rishta aunty approved! ✅",
  "Mehndi ki tayyariyan shuru karo! 🎋"
]

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    professionalCerts: [],
    otherAssets: []
  })
  const [results, setResults] = useState<ReturnType<typeof JahezCalculator.calculateJahez> | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }

  const showCulturalPopup = () => {
    const randomMessage = CULTURAL_MESSAGES[Math.floor(Math.random() * CULTURAL_MESSAGES.length)]
    setPopupMessage(randomMessage)
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 3000)
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
      
      // Show cultural popup on certain steps
      if (currentStep === 2 || currentStep === 3 || currentStep === 4) {
        setTimeout(showCulturalPopup, 500)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateResults = () => {
    if (profile as UserProfile) {
      const calculationResults = JahezCalculator.calculateJahez(profile as UserProfile)
      setResults(calculationResults)
      nextStep()
      setTimeout(() => {
        setPopupMessage("Natija aa gaya! MashAllah! 🎊")
        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 3000)
      }, 800)
    }
  }

  const resetCalculator = () => {
    setCurrentStep(1)
    setProfile({
      professionalCerts: [],
      otherAssets: []
    })
    setResults(null)
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={profile}
            onUpdate={updateProfile}
            onNext={nextStep}
          />
        )
      case 2:
        return (
          <PhysicalProfileForm
            data={profile}
            onUpdate={updateProfile}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <EducationForm
            data={profile}
            onUpdate={updateProfile}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 4:
        return (
          <CareerForm
            data={profile}
            onUpdate={updateProfile}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 5:
        return (
          <SocialForm
            data={profile}
            onUpdate={updateProfile}
            onNext={calculateResults}
            onPrev={prevStep}
          />
        )
      case 6:
        return (
          <ResultsDisplay
            results={results}
            onReset={resetCalculator}
            onPrev={prevStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-cream-25">
      <Header />
      
      <main className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <Stepper steps={STEPS} currentStep={currentStep} />
          </div>
          
          <div className="desi-card">
            {renderCurrentStep()}
          </div>
        </div>
      </main>

      {/* Cultural Popup */}
      {showPopup && (
        <div className="cultural-popup">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎭</span>
            <span className="font-semibold">{popupMessage}</span>
          </div>
        </div>
      )}

      {/* Background decorative elements */}
      <div className="fixed bottom-4 right-4 opacity-10 pointer-events-none">
        <div className="text-6xl">🎋</div>
      </div>
      <div className="fixed top-1/4 left-4 opacity-10 pointer-events-none">
        <div className="text-4xl">💍</div>
      </div>
    </div>
  )
}
