'use client'

import { CalculationResult } from '@/types'
import { formatCurrency, formatHeight } from '@/lib/utils'
import { Trophy, Heart, Gift, Car, Home, Smartphone, Download, Share2, RotateCcw } from 'lucide-react'
import { useState } from 'react'

interface ResultsDisplayProps {
  results: CalculationResult | null
  onReset: () => void
  onPrev: () => void
}

export function ResultsDisplay({ results, onReset, onPrev }: ResultsDisplayProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  if (!results) {
    return (
      <div>
        <div className="desi-card-header">
          <p className="text-charcoal/70">No results to display. Please complete the form first.</p>
        </div>
        <div className="text-center pt-6">
          <button onClick={onPrev} className="btn-primary">
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  const { userProfile, estimates, scoreBreakdown } = results

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-amber-600'
    return 'text-coral-600'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-300'
    if (score >= 60) return 'bg-blue-100 border-blue-300'
    if (score >= 40) return 'bg-amber-100 border-amber-300'
    return 'bg-coral-100 border-coral-300'
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'household':
      case 'bedroom':
      case 'living room':
      case 'kitchen':
      case 'cooling':
      case 'entertainment':
        return <Home className="h-5 w-5" />
      case 'transport':
        return <Car className="h-5 w-5" />
      case 'jewelry':
      case 'cash gift':
        return <Gift className="h-5 w-5" />
      case 'electronics':
        return <Smartphone className="h-5 w-5" />
      default:
        return <Heart className="h-5 w-5" />
    }
  }

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Jahez Calculator Results',
        text: `I scored ${scoreBreakdown.totalScore}/100! My estimated jahez value is ${formatCurrency(estimates.average.totalEstimatedValue)}`,
        url: window.location.href
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Celebration Header */}
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-8xl">🎊</div>
        </div>
        <div className="relative z-10">
          <h1 className="page-title text-4xl mb-4">
            🎯 Natija Aa Gaya! 
            <span className="urdu-text block text-2xl mt-2">نتیجہ آگیا!</span>
          </h1>
          <p className="text-lg text-charcoal/80 font-medium">
            Jahez calculation for: <span className="text-primary-600 font-bold">{userProfile.fullName}</span>
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <span className="text-3xl">🏆</span>
            <span className="text-xl font-bold text-gold-600">
              Total Score: {scoreBreakdown.totalScore}/100
            </span>
            <span className="text-3xl">🏆</span>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="desi-card">
        <div className="desi-card-header">
          <h2 className="section-title">
            <Trophy className="h-6 w-6 text-gold-500" />
            Score Breakdown
            <span className="text-2xl">📊</span>
          </h2>
          <p className="text-sm text-charcoal/70 urdu-text">اسکور کی تفصیل</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Physical', score: scoreBreakdown.physicalScore, emoji: '💪' },
            { label: 'Education', score: scoreBreakdown.educationScore, emoji: '🎓' },
            { label: 'Career', score: scoreBreakdown.careerScore, emoji: '💼' },
            { label: 'Social', score: scoreBreakdown.socialScore, emoji: '👨‍👩‍👧‍👦' },
            { label: 'Total', score: scoreBreakdown.totalScore, emoji: '🎯' }
          ].map((item, index) => (
            <div 
              key={item.label}
              className={`text-center p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${getScoreBackground(item.score)}`}
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className={`text-3xl font-bold ${getScoreColor(item.score)}`}>
                {item.score}
              </div>
              <div className="text-sm text-charcoal/70 font-medium mt-1">{item.label}</div>
              {item.label === 'Total' && (
                <div className="mt-2 px-2 py-1 bg-white/50 rounded-full text-xs font-medium">
                  {item.score >= 80 ? 'Excellent!' : item.score >= 60 ? 'Good!' : item.score >= 40 ? 'Average' : 'Needs Improvement'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Estimates Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Minimum Estimate */}
        <div className="result-card result-card-minimum" onClick={() => setExpandedCard(expandedCard === 'min' ? null : 'min')}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                <span className="text-2xl">💼</span>
                Minimum
              </h3>
              <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-bold">Basic</span>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-2">
              {formatCurrency(estimates.minimum.totalEstimatedValue)}
            </p>
            <p className="text-sm text-green-700 mb-4">Essential items only</p>
            
            {expandedCard === 'min' ? (
              <div className="space-y-3 max-h-96 md:max-h-[500px] overflow-y-auto">
                {Object.entries(estimates.minimum.categories).map(([categoryName, items]) => 
                  (items as any[]).map((item, index) => (
                    <div key={`${categoryName}-${index}`} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-green-600 mt-1 text-lg">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-charcoal mb-1">{item.item}</div>
                        <div className="text-sm text-green-600 font-medium leading-relaxed">{item.minimum}</div>
                        <div className="text-xs text-green-500 mt-1">Priority: {item.priority}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-sm text-green-600 cursor-pointer hover:underline">
                Click to see details →
              </p>
            )}
          </div>
        </div>

        {/* Average Estimate */}
        <div className="result-card result-card-average" onClick={() => setExpandedCard(expandedCard === 'avg' ? null : 'avg')}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                <span className="text-2xl">�</span>
                Average
              </h3>
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-bold">Standard</span>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">
              {formatCurrency(estimates.average.totalEstimatedValue)}
            </p>
            <p className="text-sm text-blue-700 mb-4">Expected package</p>
            
            {expandedCard === 'avg' ? (
              <div className="space-y-3 max-h-96 md:max-h-[500px] overflow-y-auto">
                {Object.entries(estimates.average.categories).map(([categoryName, items]) => 
                  (items as any[]).map((item, index) => (
                    <div key={`${categoryName}-${index}`} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-blue-600 mt-1 text-lg">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-charcoal mb-1">{item.item}</div>
                        <div className="text-sm text-blue-600 font-medium leading-relaxed">{item.average}</div>
                        <div className="text-xs text-blue-500 mt-1">Priority: {item.priority}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-sm text-blue-600 cursor-pointer hover:underline">
                Click to see details →
              </p>
            )}
          </div>
        </div>

        {/* Maximum Estimate */}
        <div className="result-card result-card-maximum" onClick={() => setExpandedCard(expandedCard === 'max' ? null : 'max')}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-purple-800 flex items-center gap-2">
                <span className="text-2xl">💎</span>
                Maximum
              </h3>
              <span className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-bold">Premium</span>
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-2">
              {formatCurrency(estimates.maximum.totalEstimatedValue)}
            </p>
            <p className="text-sm text-purple-700 mb-4">Luxury expectations</p>
            
            {expandedCard === 'max' ? (
              <div className="space-y-3 max-h-96 md:max-h-[500px] overflow-y-auto">
                {Object.entries(estimates.maximum.categories).map(([categoryName, items]) => 
                  (items as any[]).map((item, index) => (
                    <div key={`${categoryName}-${index}`} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-purple-600 mt-1 text-lg">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-charcoal mb-1">{item.item}</div>
                        <div className="text-sm text-purple-600 font-medium leading-relaxed">{item.maximum}</div>
                        <div className="text-xs text-purple-500 mt-1">Priority: {item.priority}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-sm text-purple-600 cursor-pointer hover:underline">
                Click to see details →
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cultural Commentary */}
      <div className="bg-gradient-to-r from-gold-50 to-coral-50 border-l-4 border-gold-400 rounded-r-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 text-6xl opacity-10">🎭</div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🎭</span>
            <h3 className="text-xl font-bold text-gold-800">
              Cultural Commentary
              <span className="urdu-text text-base block">ثقافتی تبصرہ</span>
            </h3>
          </div>
          <blockquote className="text-gold-800 italic text-lg leading-relaxed border-l-4 border-gold-300 pl-4">
            &ldquo;{estimates.average.culturalNote}&rdquo;
          </blockquote>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button onClick={onPrev} className="btn-outline">
          <span className="mr-2">←</span>
          Edit Profile
        </button>
        
        <button onClick={shareResults} className="btn-coral">
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </button>
        
        <button className="btn-outline">
          <Download className="w-4 h-4 mr-2" />
          Download CV
        </button>
        
        <button onClick={onReset} className="btn-primary">
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
          <span className="ml-2">🔄</span>
        </button>
      </div>

      {/* Fun Statistics */}
      <div className="desi-card">
        <div className="desi-card-header">
          <h3 className="section-title">
            <span className="text-2xl">📈</span>
            Fun Statistics
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-cream-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">{Math.round(estimates.average.totalEstimatedValue / 100000)}L</div>
            <div className="text-sm text-charcoal/70">Worth in Lakh</div>
          </div>
          <div className="p-4 bg-cream-50 rounded-lg">
            <div className="text-2xl font-bold text-gold-600">{scoreBreakdown.totalScore}%</div>
            <div className="text-sm text-charcoal/70">Rishta Score</div>
          </div>
          <div className="p-4 bg-cream-50 rounded-lg">
            <div className="text-2xl font-bold text-coral-600">{Object.values(estimates.average.categories).flat().length}</div>
            <div className="text-sm text-charcoal/70">Items Expected</div>
          </div>
          <div className="p-4 bg-cream-50 rounded-lg">
            <div className="text-2xl font-bold text-primary-600">
              {scoreBreakdown.totalScore >= 80 ? '�' : scoreBreakdown.totalScore >= 60 ? '🛵' : '🚲'}
            </div>
            <div className="text-sm text-charcoal/70">Transport Level</div>
          </div>
        </div>
      </div>
    </div>
  )
}
