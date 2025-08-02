'use client'

import { useState } from 'react'
import { UserProfile } from '@/types'
import { JOB_ROLES } from '@/lib/utils'

interface CareerFormProps {
  data: Partial<UserProfile>
  onUpdate: (updates: Partial<UserProfile>) => void
  onNext: () => void
  onPrev: () => void
}

export function CareerForm({ data, onUpdate, onNext, onPrev }: CareerFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [customAsset, setCustomAsset] = useState('')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!data.jobRole?.trim()) {
      newErrors.jobRole = 'Job role is required'
    }

    if (!data.employmentType) {
      newErrors.employmentType = 'Employment type is required'
    }

    if (!data.monthlyIncome || data.monthlyIncome < 0) {
      newErrors.monthlyIncome = 'Monthly income is required'
    }

    if (!data.jobLocation) {
      newErrors.jobLocation = 'Job location is required'
    }

    if (!data.homeOwnership) {
      newErrors.homeOwnership = 'Home ownership status is required'
    }

    if (!data.taxStatus) {
      newErrors.taxStatus = 'Tax status is required'
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

  const handleAssetAdd = () => {
    if (customAsset.trim()) {
      const currentAssets = data.otherAssets || []
      if (!currentAssets.includes(customAsset.trim())) {
        onUpdate({ 
          otherAssets: [...currentAssets, customAsset.trim()] 
        })
      }
      setCustomAsset('')
    }
  }

  const handleAssetRemove = (asset: string) => {
    const currentAssets = data.otherAssets || []
    onUpdate({ 
      otherAssets: currentAssets.filter(a => a !== asset)
    })
  }

  return (
    <div>
      <div className="clean-card-header">
        <h2 className="section-title">Career & Income</h2>
        <p className="text-sm text-gray-600 mt-1">
          Professional details and financial status
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Role */}
          <div className="form-field">
            <label className="form-label">
              Job Role <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.jobRole || ''}
              onChange={(e) => onUpdate({ jobRole: e.target.value })}
            >
              <option value="">Select job role</option>
              {JOB_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.jobRole && (
              <span className="text-red-500 text-sm">{errors.jobRole}</span>
            )}
          </div>

          {/* Employment Type */}
          <div className="form-field">
            <label className="form-label">
              Employment Type <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.employmentType || ''}
              onChange={(e) => onUpdate({ employmentType: e.target.value as UserProfile['employmentType'] })}
            >
              <option value="">Select employment type</option>
              <option value="government">Government</option>
              <option value="private">Private Sector</option>
              <option value="freelance">Freelance</option>
              <option value="family-business">Family Business</option>
            </select>
            {errors.employmentType && (
              <span className="text-red-500 text-sm">{errors.employmentType}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Monthly Income */}
          <div className="form-field">
            <label className="form-label">
              Monthly Income (PKR) <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.monthlyIncome || ''}
              onChange={(e) => onUpdate({ monthlyIncome: parseInt(e.target.value) || 0 })}
            >
              <option value="">Select income range</option>
              <option value="25000">Under 50,000</option>
              <option value="75000">50,000 - 100,000</option>
              <option value="150000">100,000 - 200,000</option>
              <option value="250000">200,000 - 300,000</option>
              <option value="400000">300,000 - 500,000</option>
              <option value="750000">500,000 - 1,000,000</option>
              <option value="1500000">1,000,000 - 2,000,000</option>
              <option value="2500000">Above 2,000,000</option>
            </select>
            {errors.monthlyIncome && (
              <span className="text-red-500 text-sm">{errors.monthlyIncome}</span>
            )}
          </div>

          {/* Job Location */}
          <div className="form-field">
            <label className="form-label">
              Job Location <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.jobLocation || ''}
              onChange={(e) => onUpdate({ jobLocation: e.target.value as UserProfile['jobLocation'] })}
            >
              <option value="">Select job location</option>
              <option value="local">Local (Pakistan)</option>
              <option value="gulf">Gulf Countries</option>
              <option value="uk">United Kingdom</option>
              <option value="usa">United States</option>
              <option value="europe">Europe</option>
              <option value="other">Other Countries</option>
            </select>
            {errors.jobLocation && (
              <span className="text-red-500 text-sm">{errors.jobLocation}</span>
            )}
          </div>
        </div>

        {/* Visa Type (for overseas jobs) */}
        {data.jobLocation && data.jobLocation !== 'local' && (
          <div className="form-field">
            <label className="form-label">Visa Type</label>
            <select
              className="form-select"
              value={data.visaType || ''}
              onChange={(e) => onUpdate({ visaType: e.target.value as UserProfile['visaType'] })}
            >
              <option value="">Select visa type</option>
              <option value="visit">Visit Visa</option>
              <option value="work">Work Visa</option>
              <option value="permanent">Permanent Residency</option>
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Home Ownership */}
          <div className="form-field">
            <label className="form-label">
              Home Ownership <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.homeOwnership || ''}
              onChange={(e) => onUpdate({ homeOwnership: e.target.value as UserProfile['homeOwnership'] })}
            >
              <option value="">Select ownership status</option>
              <option value="owned">Owned</option>
              <option value="rented">Rented</option>
              <option value="joint">Joint/Family Property</option>
            </select>
            {errors.homeOwnership && (
              <span className="text-red-500 text-sm">{errors.homeOwnership}</span>
            )}
          </div>

          {/* Tax Status */}
          <div className="form-field">
            <label className="form-label">
              Tax Status <span className="text-red-500">*</span>
            </label>
            <select
              className="form-select"
              value={data.taxStatus || ''}
              onChange={(e) => onUpdate({ taxStatus: e.target.value as UserProfile['taxStatus'] })}
            >
              <option value="">Select tax status</option>
              <option value="filer">Tax Filer</option>
              <option value="non-filer">Non-Filer</option>
            </select>
            {errors.taxStatus && (
              <span className="text-red-500 text-sm">{errors.taxStatus}</span>
            )}
          </div>
        </div>

        {/* Other Assets */}
        <div className="form-field">
          <label className="form-label">Other Assets</label>
          
          <div className="flex space-x-2">
            <input
              type="text"
              className="form-input flex-1"
              value={customAsset}
              onChange={(e) => setCustomAsset(e.target.value)}
              placeholder="e.g., Plot, Agricultural land, etc."
            />
            <button
              type="button"
              onClick={handleAssetAdd}
              className="btn-outline"
            >
              Add
            </button>
          </div>

          {/* Selected Assets */}
          {data.otherAssets && data.otherAssets.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Listed assets:</p>
              <div className="flex flex-wrap gap-2">
                {data.otherAssets.map((asset) => (
                  <span
                    key={asset}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
                  >
                    {asset}
                    <button
                      type="button"
                      onClick={() => handleAssetRemove(asset)}
                      className="ml-2 text-green-500 hover:text-green-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-6">
          <button type="button" onClick={onPrev} className="btn-outline">
            ← Previous
          </button>
          <button type="submit" className="btn-primary">
            Next Step →
          </button>
        </div>
      </form>
    </div>
  )
}
