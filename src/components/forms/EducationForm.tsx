'use client'

import { useState } from 'react'
import { UserProfile } from '@/types'
import { BookOpen, Globe, MessageCircle, Heart } from 'lucide-react'

interface EducationFormProps {
  data: Partial<UserProfile>
  onUpdate: (updates: Partial<UserProfile>) => void
  onNext: () => void
  onPrev: () => void
}

export function EducationForm({ data, onUpdate, onNext, onPrev }: EducationFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!data.highestDegree) {
      newErrors.highestDegree = 'Highest degree is required'
    }

    if (!data.institutionTier) {
      newErrors.institutionTier = 'Institution tier is required'
    }

    if (!data.englishFluency) {
      newErrors.englishFluency = 'English fluency level is required'
    }

    if (!data.religiousKnowledge) {
      newErrors.religiousKnowledge = 'Religious knowledge level is required'
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
      <div className="desi-card-header">
        <h2 className="section-title">
          <BookOpen className="w-6 h-6 text-primary-500" />
          Education & Intelligence
          <span className="text-lg">🎓</span>
        </h2>
        <p className="text-sm text-charcoal/70 mt-2 flex items-center gap-2">
          <span>📚</span>
          Academic background and intellectual capabilities
          <span className="urdu-text">• تعلیمی پس منظر اور ذہانت</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4">
          {/* Highest Degree */}
          <div className="form-field">
            <label className="form-label">
              <BookOpen className="w-4 h-4" />
              Highest Degree <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <select
                className="form-select"
                value={data.highestDegree || ''}
                onChange={(e) => onUpdate({ highestDegree: e.target.value as UserProfile['highestDegree'] })}
              >
                <option value="">Select highest degree</option>
                <option value="matric">Matric/O-Levels</option>
                <option value="fa-fsc">FA/FSc/A-Levels</option>
                <option value="ba-bsc">BA/BSc</option>
                <option value="bba">BBA</option>
                <option value="mba">MBA</option>
                <option value="mphil">MPhil</option>
                <option value="phd">PhD</option>
              </select>
              <BookOpen className="input-icon" />
            </div>
            {errors.highestDegree && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.highestDegree}
              </span>
            )}
          </div>

          {/* Institution Tier */}
          <div className="form-field">
            <label className="form-label">
              <span className="text-lg">🏫</span>
              Institution Tier <span className="text-coral-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.institutionTier || ''}
              onChange={(e) => onUpdate({ institutionTier: e.target.value as UserProfile['institutionTier'] })}
            >
              <option value="">Select institution tier</option>
              <option value="top-tier">Top-tier (LUMS, IBA, NUST, AKU, FAST)</option>
              <option value="mid-tier">Mid-tier Universities</option>
              <option value="local">Local Colleges</option>
            </select>
            {errors.institutionTier && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.institutionTier}
              </span>
            )}
          </div>
        </div>

        {/* Foreign Education */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="foreignEducation"
              className="w-4 h-4 text-primary-600 bg-cream-50 border-gold-300 rounded focus:ring-primary-500"
              checked={data.foreignEducation || false}
              onChange={(e) => onUpdate({ foreignEducation: e.target.checked })}
            />
            <label htmlFor="foreignEducation" className="form-label">
              <Globe className="w-4 h-4" />
              Foreign Education
            </label>
          </div>

          {data.foreignEducation && (
            <div className="form-field">
              <label className="form-label">
                <span className="text-lg">🌍</span>
                Country
              </label>
              <select
                className="form-select"
                value={data.foreignEducationCountry || ''}
                onChange={(e) => onUpdate({ foreignEducationCountry: e.target.value })}
              >
                <option value="">Select country</option>
                <option value="usa">USA 🇺🇸</option>
                <option value="uk">UK 🇬🇧</option>
                <option value="canada">Canada 🇨🇦</option>
                <option value="australia">Australia 🇦🇺</option>
                <option value="germany">Germany 🇩🇪</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4">
          {/* English Fluency */}
          <div className="form-field">
            <label className="form-label">
              <MessageCircle className="w-4 h-4" />
              English Fluency <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <select
                className="form-select"
                value={data.englishFluency || ''}
                onChange={(e) => onUpdate({ englishFluency: e.target.value as UserProfile['englishFluency'] })}
              >
                <option value="">Select fluency level</option>
                <option value="none">None</option>
                <option value="conversational">Conversational</option>
                <option value="fluent">Fluent</option>
              </select>
              <MessageCircle className="input-icon" />
            </div>
            {errors.englishFluency && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.englishFluency}
              </span>
            )}
          </div>

          {/* Religious Knowledge */}
          <div className="form-field">
            <label className="form-label">
              <Heart className="w-4 h-4" />
              Religious Knowledge <span className="text-coral-500">*</span>
            </label>
            <div className="input-with-icon">
              <select
                className="form-select"
                value={data.religiousKnowledge || ''}
                onChange={(e) => onUpdate({ religiousKnowledge: e.target.value as UserProfile['religiousKnowledge'] })}
              >
                <option value="">Select knowledge level</option>
                <option value="basic">Basic</option>
                <option value="moderate">Moderate</option>
                <option value="knowledgeable">Knowledgeable</option>
                <option value="hafiz">Hafiz</option>
                <option value="scholar">Religious Scholar</option>
              </select>
              <Heart className="input-icon" />
            </div>
            {errors.religiousKnowledge && (
              <span className="text-coral-500 text-sm flex items-center gap-1">
                <span>⚠️</span> {errors.religiousKnowledge}
              </span>
            )}
          </div>
        </div>

        {/* Cultural Note */}
        <div className="bg-gold-50 border-l-4 border-gold-400 p-4 rounded-r-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-gold-800 mb-1">Educational Tip</h4>
              <p className="text-sm text-gold-700">
                Higher education and foreign qualifications significantly boost expectations in Pakistani marriage culture.
                <span className="urdu-text block mt-1">اعلیٰ تعلیم اور بیرونی اہلیت پاکستانی شادی کی ثقافت میں توقعات کو نمایاں طور پر بڑھاتی ہے۔</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
          <button type="button" onClick={onPrev} className="btn-outline">
            ← Previous Step
          </button>
          <button type="submit" className="btn-primary">
            Next Step: Career & Income
            <span className="ml-2">💼 →</span>
          </button>
        </div>
      </form>
    </div>
  )
}
