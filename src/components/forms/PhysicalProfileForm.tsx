'use client'

import { useState } from 'react'
import { UserProfile } from '@/types'
import { User, Heart, Ruler, Weight, Palette, Scissors, Crown } from 'lucide-react'

interface PhysicalProfileFormProps {
  data: Partial<UserProfile>
  onUpdate: (updates: Partial<UserProfile>) => void
  onNext: () => void
  onPrev: () => void
}

export function PhysicalProfileForm({ data, onUpdate, onNext, onPrev }: PhysicalProfileFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!data.height || data.height < 4.5 || data.height > 7.0) {
      newErrors.height = 'Height must be between 4.5 and 7.0 feet'
    }

    if (!data.weight || data.weight < 40 || data.weight > 150) {
      newErrors.weight = 'Weight must be between 40 and 150 kg'
    }

    if (!data.complexion) {
      newErrors.complexion = 'Complexion is required'
    }

    if (!data.grooming) {
      newErrors.grooming = 'Grooming style is required'
    }

    if (!data.beard) {
      newErrors.beard = 'Beard status is required'
    }

    if (!data.fitnessLevel) {
      newErrors.fitnessLevel = 'Fitness level is required'
    }

    if (!data.hairlineStatus) {
      newErrors.hairlineStatus = 'Hairline status is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="w-full">
      <div className="desi-card-header">
        <h2 className="section-title">
          <User className="w-6 h-6 text-primary-500" />
          Pehli Nazar - Sehat o Soorat
          <span className="text-lg">👁️</span>
        </h2>
        <p className="text-sm text-charcoal/70 mt-2 flex items-center gap-2">
          <span>💪</span>
          Physical appearance and grooming standards
          <span className="urdu-text hidden md:inline">• جسمانی خصوصیات اور سنگھار</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Height & Weight - Top Priority */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4">
          {/* Height */}
          <div className="form-field">
            <label className="form-label">
              <Ruler className="w-4 h-4" />
              Height (feet) <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <input
                type="number"
                step="0.1"
                className="form-input text-base md:text-sm h-12 md:h-10"
                value={data.height || ''}
                onChange={(e) => onUpdate({ height: parseFloat(e.target.value) || 0 })}
                placeholder="e.g., 5.8"
                min="4.5"
                max="7.0"
              />
              <Ruler className="input-icon" />
            </div>
            {errors.height && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.height}
              </span>
            )}
            <p className="text-xs text-charcoal/60 mt-1">Aunties ka favorite measurement! 📏</p>
          </div>

          {/* Weight */}
          <div className="form-field">
            <label className="form-label">
              <Weight className="w-4 h-4" />
              Weight (kg) <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <input
                type="number"
                className="form-input text-base md:text-sm h-12 md:h-10"
                value={data.weight || ''}
                onChange={(e) => onUpdate({ weight: parseInt(e.target.value) || 0 })}
                placeholder="e.g., 70"
                min="40"
                max="150"
              />
              <Weight className="input-icon" />
            </div>
            {errors.weight && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.weight}
              </span>
            )}
            <p className="text-xs text-charcoal/60 mt-1">Gym jana zaruri hai! 💪</p>
          </div>
        </div>

        {/* Complexion & Grooming */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4">
          {/* Complexion */}
          <div className="form-field">
            <label className="form-label">
              <Palette className="w-4 h-4" />
              Complexion <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <select
                className="form-select text-base md:text-sm h-12 md:h-10"
                value={data.complexion || ''}
                onChange={(e) => onUpdate({ complexion: e.target.value as UserProfile['complexion'] })}
              >
                <option value="">Select complexion</option>
                <option value="very-fair">Very Fair (Gora/Gori) ✨</option>
                <option value="fair">Fair (Acha Rang) 🤍</option>
                <option value="wheatish">Wheatish (Gehun Rang) 🌾</option>
                <option value="dark">Dark (Kala Rang) ☕</option>
                <option value="very-dark">Very Dark (Kala Kala) 🖤</option>
              </select>
              <Palette className="input-icon" />
            </div>
            {errors.complexion && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.complexion}
              </span>
            )}
            <p className="text-xs text-charcoal/60 mt-1">Fair & Lovely ki legacy! 🧴</p>
          </div>

          {/* Grooming Style */}
          <div className="form-field">
            <label className="form-label">
              <Scissors className="w-4 h-4" />
              Grooming Style <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <select
                className="form-select text-base md:text-sm h-12 md:h-10"
                value={data.grooming || ''}
                onChange={(e) => onUpdate({ grooming: e.target.value as UserProfile['grooming'] })}
              >
                <option value="">Select grooming style</option>
                <option value="western">Western (Clean & Modern) 💼</option>
                <option value="clean-cut">Clean Cut (Smart Look) ✂️</option>
                <option value="simple">Simple (Basic) 🙂</option>
                <option value="religious">Religious (Islamic) 🕌</option>
              </select>
              <Scissors className="input-icon" />
            </div>
            {errors.grooming && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.grooming}
              </span>
            )}
            <p className="text-xs text-charcoal/60 mt-1">First impression matters! ✨</p>
          </div>
        </div>

        {/* Detailed Physical Features - Mobile Stacked */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-1 lg:grid-cols-3 md:gap-4">
          {/* Beard */}
          <div className="form-field">
            <label className="form-label">
              <span className="text-lg">🧔</span>
              Beard Status <span className="text-coral-500">*</span>
            </label>
            <select
              className="form-select text-base md:text-sm h-12 md:h-10"
              value={data.beard || ''}
              onChange={(e) => onUpdate({ beard: e.target.value as UserProfile['beard'] })}
            >
              <option value="">Select beard status</option>
              <option value="none">Clean Shaven 🪒</option>
              <option value="yes">Yes (Regular) 🧔</option>
              <option value="sunnah">Sunnah Beard 🕌</option>
            </select>
            {errors.beard && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.beard}
              </span>
            )}
            <p className="text-xs text-charcoal/60 mt-1">Dadi ka faisla! 🤔</p>
          </div>

          {/* Fitness Level */}
          <div className="form-field">
            <label className="form-label">
              <Heart className="w-4 h-4" />
              Fitness Level <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <select
                className="form-select text-base md:text-sm h-12 md:h-10"
                value={data.fitnessLevel || ''}
                onChange={(e) => onUpdate({ fitnessLevel: e.target.value as UserProfile['fitnessLevel'] })}
              >
                <option value="">Select fitness level</option>
                <option value="gym-built">Gym Built 💪</option>
                <option value="average">Average ⚖️</option>
                <option value="overweight">Overweight 🍔</option>
                <option value="slim">Slim 🥗</option>
              </select>
              <Heart className="input-icon" />
            </div>
            {errors.fitnessLevel && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.fitnessLevel}
              </span>
            )}
            <p className="text-xs text-charcoal/60 mt-1">Gym membership chahiye! 🏋️</p>
          </div>

          {/* Hairline Status */}
          <div className="form-field">
            <label className="form-label">
              <Crown className="w-4 h-4" />
              Hairline Status <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <select
                className="form-select text-base md:text-sm h-12 md:h-10"
                value={data.hairlineStatus || ''}
                onChange={(e) => onUpdate({ hairlineStatus: e.target.value as UserProfile['hairlineStatus'] })}
              >
                <option value="">Select hairline status</option>
                <option value="full">Full Hair 👨‍🦱</option>
                <option value="thinning">Thinning 👨‍🦲</option>
                <option value="balding">Balding 👨‍🦲</option>
              </select>
              <Crown className="input-icon" />
            </div>
            {errors.hairlineStatus && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.hairlineStatus}
              </span>
            )}
            <p className="text-xs text-charcoal/60 mt-1">Baal ka khel! 💇‍♂️</p>
          </div>
        </div>

        {/* Cultural Note */}
        <div className="bg-gold-50 border-l-4 border-gold-400 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-gold-800 mb-1">Cultural Reality Check</h4>
              <p className="text-sm text-gold-700">
                Pakistani rishta culture heavily emphasizes physical appearance. Height, complexion, and grooming significantly impact expectations!
                <span className="urdu-text block mt-1 text-xs">پاکستانی رشتہ کلچر میں جسمانی خوبصورتی کو بہت اہمیت دی جاتی ہے۔</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <button type="button" onClick={onPrev} className="btn-outline">
            ← Previous Step
          </button>
          <button type="submit" className="btn-primary">
            Next Step: Education
            <span className="ml-2">🎓 →</span>
          </button>
        </div>
      </form>
    </div>
  )
}
