'use client'

import { useState } from 'react'
import { UserProfile } from '@/types'

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
    <div className="desi-card max-w-2xl mx-auto">
      <div className="desi-card-header">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-mehndi-500 to-coral-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">💪</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-mehndi-600 to-coral-600 bg-clip-text text-transparent">
              Physical Profile
            </h2>
            <p className="urdu-text text-gold-600 text-lg font-semibold">
              جسمانی خصوصیات
            </p>
            <p className="text-sm text-charcoal/70 mt-1">
              Appearance and fitness details (unfortunately still important!) 💪
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="desi-card-content space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Height */}
          <div className="desi-form-field">
            <label className="desi-form-label">
              Height (feet) <span className="text-coral-500">*</span>
            </label>
            <input
              type="number"
              step="0.1"
              className="desi-form-input"
              value={data.height || ''}
              onChange={(e) => onUpdate({ height: parseFloat(e.target.value) || 0 })}
              placeholder="e.g., 5.8"
              min="4.5"
              max="7.0"
            />
            {errors.height && (
              <span className="text-coral-500 text-sm font-medium">{errors.height}</span>
            )}
          </div>

          {/* Weight */}
          <div className="desi-form-field">
            <label className="desi-form-label">
              Weight (kg) <span className="text-coral-500">*</span>
            </label>
            <input
              type="number"
              className="desi-form-input"
              value={data.weight || ''}
              onChange={(e) => onUpdate({ weight: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 70"
              min="40"
              max="150"
            />
            {errors.weight && (
              <span className="text-coral-500 text-sm font-medium">{errors.weight}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Complexion */}
          <div className="desi-form-field">
            <label className="desi-form-label">
              Complexion <span className="text-coral-500">*</span>
            </label>
            <select
              className="desi-form-select"
              value={data.complexion || ''}
              onChange={(e) => onUpdate({ complexion: e.target.value as UserProfile['complexion'] })}
            >
              <option value="">Select complexion</option>
              <option value="very-fair">Very Fair</option>
              <option value="fair">Fair</option>
              <option value="wheatish">Wheatish</option>
              <option value="dark">Dark</option>
              <option value="very-dark">Very Dark</option>
            </select>
            {errors.complexion && (
              <span className="text-coral-500 text-sm font-medium">{errors.complexion}</span>
            )}
          </div>

          {/* Grooming Style */}
          <div className="desi-form-field">
            <label className="desi-form-label">
              Grooming Style <span className="text-coral-500">*</span>
            </label>
            <select
              className="desi-form-select"
              value={data.grooming || ''}
              onChange={(e) => onUpdate({ grooming: e.target.value as UserProfile['grooming'] })}
            >
              <option value="">Select grooming style</option>
              <option value="western">Western</option>
              <option value="clean-cut">Clean Cut</option>
              <option value="simple">Simple</option>
              <option value="religious">Religious</option>
            </select>
            {errors.grooming && (
              <span className="text-coral-500 text-sm font-medium">{errors.grooming}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Beard */}
          <div className="desi-form-field">
            <label className="desi-form-label">
              Beard Status <span className="text-coral-500">*</span>
            </label>
            <select
              className="desi-form-select"
              value={data.beard || ''}
              onChange={(e) => onUpdate({ beard: e.target.value as UserProfile['beard'] })}
            >
              <option value="">Select beard status</option>
              <option value="none">Clean Shaven</option>
              <option value="yes">Yes (Regular)</option>
              <option value="sunnah">Sunnah Beard</option>
            </select>
            {errors.beard && (
              <span className="text-coral-500 text-sm font-medium">{errors.beard}</span>
            )}
          </div>

          {/* Fitness Level */}
          <div className="desi-form-field">
            <label className="desi-form-label">
              Fitness Level <span className="text-coral-500">*</span>
            </label>
            <select
              className="desi-form-select"
              value={data.fitnessLevel || ''}
              onChange={(e) => onUpdate({ fitnessLevel: e.target.value as UserProfile['fitnessLevel'] })}
            >
              <option value="">Select fitness level</option>
              <option value="gym-built">Gym Built</option>
              <option value="average">Average</option>
              <option value="overweight">Overweight</option>
              <option value="slim">Slim</option>
            </select>
            {errors.fitnessLevel && (
              <span className="text-coral-500 text-sm font-medium">{errors.fitnessLevel}</span>
            )}
          </div>

          {/* Hairline Status */}
          <div className="desi-form-field">
            <label className="desi-form-label">
              Hairline Status <span className="text-coral-500">*</span>
            </label>
            <select
              className="desi-form-select"
              value={data.hairlineStatus || ''}
              onChange={(e) => onUpdate({ hairlineStatus: e.target.value as UserProfile['hairlineStatus'] })}
            >
              <option value="">Select hairline status</option>
              <option value="full">Full Hair</option>
              <option value="thinning">Thinning</option>
              <option value="balding">Balding</option>
            </select>
            {errors.hairlineStatus && (
              <span className="text-coral-500 text-sm font-medium">{errors.hairlineStatus}</span>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button type="button" onClick={onPrev} className="desi-btn-outline">
            ← Previous
          </button>
          <button type="submit" className="desi-btn-primary">
            Next Step →
          </button>
        </div>
      </form>
    </div>
  )
}
