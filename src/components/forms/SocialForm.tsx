'use client'

import { useState } from 'react'
import { UserProfile } from '@/types'

interface SocialFormProps {
  data: Partial<UserProfile>
  onUpdate: (updates: Partial<UserProfile>) => void
  onNext: () => void
  onPrev: () => void
}

export function SocialForm({ data, onUpdate, onNext, onPrev }: SocialFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!data.familyBackground) {
      newErrors.familyBackground = 'Family background is required'
    }

    if (!data.fatherProfession?.trim()) {
      newErrors.fatherProfession = 'Father\'s profession is required'
    }

    if (!data.motherEducation) {
      newErrors.motherEducation = 'Mother\'s education is required'
    }

    if (!data.familyReputation) {
      newErrors.familyReputation = 'Family reputation is required'
    }

    if (!data.familyType) {
      newErrors.familyType = 'Family type is required'
    }

    if (!data.numberOfSiblings || data.numberOfSiblings < 0) {
      newErrors.numberOfSiblings = 'Number of siblings is required'
    }

    if (!data.birthOrder) {
      newErrors.birthOrder = 'Birth order is required'
    }

    if (!data.religiousInclination) {
      newErrors.religiousInclination = 'Religious inclination is required'
    }

    if (!data.lifestylePreference) {
      newErrors.lifestylePreference = 'Lifestyle preference is required'
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
    <div>
      <div className="clean-card-header">
        <h2 className="section-title">Social Background & Family</h2>
        <p className="text-sm text-gray-600 mt-1">
          Family background and lifestyle preferences
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Family Background */}
          <div className="form-field">
            <label className="form-label">
              Family Background <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.familyBackground || ''}
              onChange={(e) => onUpdate({ familyBackground: e.target.value as UserProfile['familyBackground'] })}
            >
              <option value="">Select family background</option>
              <option value="landed-elite">Landed Elite 👑</option>
              <option value="upper-class">Upper Class 💎</option>
              <option value="upper-middle-class">Upper Middle Class 🏛️</option>
              <option value="middle-class">Middle Class 🏠</option>
              <option value="lower-middle">Lower-Middle Class 🏘️</option>
            </select>
            {errors.familyBackground && (
              <span className="text-red-500 text-sm">{errors.familyBackground}</span>
            )}
          </div>

          {/* Father's Profession */}
          <div className="form-field">
            <label className="form-label">
              Father&apos;s Profession <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={data.fatherProfession || ''}
              onChange={(e) => onUpdate({ fatherProfession: e.target.value })}
              placeholder="e.g., Doctor, Engineer, Farmer, etc."
            />
            {errors.fatherProfession && (
              <span className="text-red-500 text-sm">{errors.fatherProfession}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mother's Education */}
          <div className="form-field">
            <label className="form-label">
              Mother&apos;s Education <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.motherEducation || ''}
              onChange={(e) => onUpdate({ motherEducation: e.target.value as UserProfile['motherEducation'] })}
            >
              <option value="">Select mother&apos;s education</option>
              <option value="illiterate">Illiterate</option>
              <option value="matric">Matric</option>
              <option value="graduate">Graduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>
            {errors.motherEducation && (
              <span className="text-red-500 text-sm">{errors.motherEducation}</span>
            )}
          </div>

          {/* Family Reputation */}
          <div className="form-field">
            <label className="form-label">
              Family Reputation <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.familyReputation || ''}
              onChange={(e) => onUpdate({ familyReputation: e.target.value as UserProfile['familyReputation'] })}
            >
              <option value="">Select family reputation</option>
              <option value="highly-respected">Highly Respected</option>
              <option value="average">Average</option>
              <option value="local-notoriety">Local Notoriety</option>
            </select>
            {errors.familyReputation && (
              <span className="text-red-500 text-sm">{errors.familyReputation}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Family Type */}
          <div className="form-field">
            <label className="form-label">
              Family Type <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.familyType || ''}
              onChange={(e) => onUpdate({ familyType: e.target.value as UserProfile['familyType'] })}
            >
              <option value="">Select family type</option>
              <option value="joint">Joint Family</option>
              <option value="extended-joint">Extended Joint Family</option>
              <option value="nuclear">Nuclear Family</option>
            </select>
            {errors.familyType && (
              <span className="text-red-500 text-sm">{errors.familyType}</span>
            )}
          </div>

          {/* Number of Siblings */}
          <div className="form-field">
            <label className="form-label">
              Number of Siblings <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="form-input"
              value={data.numberOfSiblings || ''}
              onChange={(e) => onUpdate({ numberOfSiblings: parseInt(e.target.value) || 0 })}
              placeholder="Total number of siblings"
              min="0"
              max="20"
            />
            {errors.numberOfSiblings && (
              <span className="text-red-500 text-sm">{errors.numberOfSiblings}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Birth Order */}
          <div className="form-field">
            <label className="form-label">
              Birth Order <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.birthOrder || ''}
              onChange={(e) => onUpdate({ birthOrder: e.target.value as UserProfile['birthOrder'] })}
            >
              <option value="">Select birth order</option>
              <option value="eldest">Eldest</option>
              <option value="middle">Middle Child</option>
              <option value="youngest">Youngest</option>
              <option value="only-child">Only Child</option>
            </select>
            {errors.birthOrder && (
              <span className="text-red-500 text-sm">{errors.birthOrder}</span>
            )}
          </div>

          {/* Religious Inclination */}
          <div className="form-field">
            <label className="form-label">
              Religious Inclination <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.religiousInclination || ''}
              onChange={(e) => onUpdate({ religiousInclination: e.target.value as UserProfile['religiousInclination'] })}
            >
              <option value="">Select religious inclination</option>
              <option value="liberal">Liberal</option>
              <option value="balanced">Balanced</option>
              <option value="practicing">Practicing</option>
              <option value="ultra-conservative">Ultra-Conservative</option>
            </select>
            {errors.religiousInclination && (
              <span className="text-red-500 text-sm">{errors.religiousInclination}</span>
            )}
          </div>
        </div>

        {/* Lifestyle Preference */}
        <div className="form-field">
          <label className="form-label">
            Lifestyle Preference <span className="text-red-500">*</span>
          </label>
          <select
            className="form-select"
            value={data.lifestylePreference || ''}
            onChange={(e) => onUpdate({ lifestylePreference: e.target.value as UserProfile['lifestylePreference'] })}
          >
            <option value="">Select lifestyle preference</option>
            <option value="eastern-traditional">Eastern Traditional</option>
            <option value="modern-conservative">Modern Conservative</option>
            <option value="westernized">Fully Westernized</option>
          </select>
          {errors.lifestylePreference && (
            <span className="text-red-500 text-sm">{errors.lifestylePreference}</span>
          )}
        </div>

        <div className="flex justify-between pt-6">
          <button type="button" onClick={onPrev} className="btn-outline">
            ← Previous
          </button>
          <button type="submit" className="btn-primary">
            Calculate Jahez →
          </button>
        </div>
      </form>
    </div>
  )
}
