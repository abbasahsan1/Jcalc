'use client'

import { useState } from 'react'
import { UserProfile } from '@/types'
import { PROVINCES, CASTES } from '@/lib/utils'
import { User, MapPin, Home, Users, Heart } from 'lucide-react'

interface PersonalInfoFormProps {
  data: Partial<UserProfile>
  onUpdate: (updates: Partial<UserProfile>) => void
  onNext: () => void
}

export function PersonalInfoForm({ data, onUpdate, onNext }: PersonalInfoFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!data.fullName?.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!data.age || data.age < 18 || data.age > 65) {
      newErrors.age = 'Age must be between 18 and 65'
    }

    if (!data.province) {
      newErrors.province = 'Province is required'
    }

    if (!data.city?.trim()) {
      newErrors.city = 'City is required'
    }

    if (!data.areaType) {
      newErrors.areaType = 'Area type is required'
    }

    if (!data.caste) {
      newErrors.caste = 'Caste/Biradari is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Ensure arrays are initialized
      onUpdate({
        professionalCerts: data.professionalCerts || [],
        otherAssets: data.otherAssets || []
      })
      onNext()
    }
  }

  return (
    <div>
      <div className="desi-card-header">
        <h2 className="section-title">
          <User className="w-6 h-6 text-primary-500" />
          Personal Information
          <span className="text-lg">👤</span>
        </h2>
        <p className="text-sm text-charcoal/70 mt-2 flex items-center gap-2">
          <span>🎭</span>
          Basic identity details for the rishta calculation
          <span className="urdu-text">• بنیادی شناختی تفصیلات</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4">
          {/* Full Name */}
          <div className="form-field">
            <label className="form-label">
              <User className="w-4 h-4" />
              Full Name <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <input
                type="text"
                className="form-input"
                value={data.fullName || ''}
                onChange={(e) => onUpdate({ fullName: e.target.value })}
                placeholder="Enter full name"
              />
              <User className="input-icon" />
            </div>
            {errors.fullName && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.fullName}
              </span>
            )}
          </div>

          {/* Age */}
          <div className="form-field">
            <label className="form-label">
              <span className="text-lg">🎂</span>
              Age <span className="text-coral-500">*</span>
            </label>
            <input
              type="number"
              className="form-input"
              value={data.age || ''}
              onChange={(e) => onUpdate({ age: parseInt(e.target.value) || 0 })}
              placeholder="Enter age"
              min="18"
              max="65"
            />
            {errors.age && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.age}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4">
          {/* Religion */}
          <div className="form-field">
            <label className="form-label">
              <span className="text-lg">🕌</span>
              Religion
            </label>
            <select
              className="form-select"
              value={data.religion || ''}
              onChange={(e) => onUpdate({ religion: e.target.value })}
            >
              <option value="">Select religion</option>
              <option value="Islam">Islam ☪️</option>
              <option value="Christianity">Christianity ✝️</option>
              <option value="Hinduism">Hinduism 🕉️</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Sect */}
          <div className="form-field">
            <label className="form-label">
              <Heart className="w-4 h-4" />
              Sect
            </label>
            <div className="input-with-icon">
              <input
                type="text"
                className="form-input"
                value={data.sect || ''}
                onChange={(e) => onUpdate({ sect: e.target.value })}
                placeholder="e.g., Sunni, Shia, etc."
              />
              <Heart className="input-icon" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4">
          {/* Province */}
          <div className="form-field">
            <label className="form-label">
              <MapPin className="w-4 h-4" />
              Province <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <select
                className="form-select"
                value={data.province || ''}
                onChange={(e) => onUpdate({ province: e.target.value })}
              >
                <option value="">Select province</option>
                {PROVINCES.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              <MapPin className="input-icon" />
            </div>
            {errors.province && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.province}
              </span>
            )}
          </div>

          {/* City */}
          <div className="form-field">
            <label className="form-label">
              <span className="text-lg">🏙️</span>
              City <span className="text-coral-500">*</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={data.city || ''}
              onChange={(e) => onUpdate({ city: e.target.value })}
              placeholder="Enter city name"
            />
            {errors.city && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.city}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4">
          {/* Area Type */}
          <div className="form-field">
            <label className="form-label">
              <Home className="w-4 h-4" />
              Area Type <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <select
                className="form-select"
                value={data.areaType || ''}
                onChange={(e) => onUpdate({ areaType: e.target.value as UserProfile['areaType'] })}
              >
                <option value="">Select area type</option>
                <option value="urban">Urban</option>
                <option value="semi-urban">Semi-Urban</option>
                <option value="rural">Rural</option>
              </select>
              <Home className="input-icon" />
            </div>
            {errors.areaType && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.areaType}
              </span>
            )}
          </div>

          {/* Caste */}
          <div className="form-field">
            <label className="form-label">
              <Users className="w-4 h-4" />
              Caste/Biradari <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <select
                className="form-select"
                value={data.caste || ''}
                onChange={(e) => onUpdate({ caste: e.target.value })}
              >
                <option value="">Select caste</option>
                {CASTES.map((caste) => (
                  <option key={caste} value={caste}>
                    {caste}
                  </option>
                ))}
              </select>
              <Users className="input-icon" />
            </div>
            {errors.caste && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.caste}
              </span>
            )}
          </div>
        </div>

        {/* Cultural Note */}
        <div className="bg-gold-50 border-l-4 border-gold-400 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-gold-800 mb-1">Cultural Tip</h4>
              <p className="text-sm text-gold-700">
                These details help us calculate the traditional expectations in Pakistani rishta culture. 
                <span className="urdu-text block mt-1">یہ تفصیلات پاکستانی رشتہ کلچر میں روایتی توقعات کا حساب لگانے میں مدد کرتی ہیں۔</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button type="submit" className="btn-primary">
            Next Step: Physical Profile
            <span className="ml-2">💪 →</span>
          </button>
        </div>
      </form>
    </div>
  )
}
