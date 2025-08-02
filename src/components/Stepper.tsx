interface Step {
  id: number
  title: string
  description: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

// Desi step names
const DESI_STEP_NAMES = [
  '👤 Pehli Nazar',
  '💪 Sehat-o-Soorat', 
  '📚 Taleem',
  '💼 Karobar',
  '👨‍👩‍👧‍👦 Khandan',
  '💎 Natija'
]

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="desi-stepper">
      {/* Progress bar */}
      <div className="mb-6 md:mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-charcoal">Progress</span>
          <span className="text-sm font-medium text-primary-600">
            {Math.round((currentStep / steps.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-cream-100 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-gold-500 rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Steps - Mobile Optimized */}
      <div className="flex items-center justify-between overflow-x-auto pb-4 gap-2 md:gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div className={`
                w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-3 flex items-center justify-center text-xs md:text-sm font-bold
                transition-all duration-300 relative overflow-hidden
                ${currentStep === step.id 
                  ? 'bg-gradient-to-br from-primary-500 to-gold-500 border-primary-500 text-white shadow-lg transform scale-110' 
                  : currentStep > step.id 
                  ? 'bg-gradient-to-br from-green-500 to-green-600 border-green-500 text-white shadow-md' 
                  : 'bg-cream-50 border-gold-300 text-gold-600'
                }
              `}>
                {currentStep > step.id ? (
                  <span className="text-sm md:text-lg">✓</span>
                ) : (
                  <span>{step.id}</span>
                )}
                
                {/* Sparkle effect for current step */}
                {currentStep === step.id && (
                  <div className="absolute inset-0 bg-white/20 animate-ping rounded-full"></div>
                )}
              </div>
              
              {/* Step Label - Mobile Optimized */}
              <div className="mt-2 md:mt-3 text-center max-w-16 md:max-w-24">
                <div className={`text-xs font-bold mb-1 leading-tight ${
                  currentStep === step.id 
                    ? 'text-primary-600' 
                    : currentStep > step.id 
                    ? 'text-green-600' 
                    : 'text-gold-600'
                }`}>
                  <span className="hidden md:inline">{DESI_STEP_NAMES[index] || step.title}</span>
                  <span className="md:hidden text-xs">{step.title.split(' ')[0]}</span>
                </div>
              </div>
            </div>
            
            {/* Connector Line - Hidden on mobile */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 md:mx-4 hidden lg:block">
                <div className={`h-1 rounded-full transition-all duration-500 ${
                  currentStep > step.id 
                    ? 'bg-gradient-to-r from-green-500 to-primary-500' 
                    : 'bg-gold-200'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Current Step Info - Mobile Optimized */}
      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-cream-50 rounded-lg border-l-4 border-primary-500">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="text-xl md:text-2xl">
            {currentStep === 1 && '👋'}
            {currentStep === 2 && '💪'}
            {currentStep === 3 && '🎓'}
            {currentStep === 4 && '💼'}
            {currentStep === 5 && '👨‍👩‍👧‍👦'}
            {currentStep === 6 && '🎉'}
          </span>
          <div>
            <h3 className="font-semibold text-charcoal text-sm md:text-base">
              {DESI_STEP_NAMES[currentStep - 1] || steps[currentStep - 1]?.title}
            </h3>
            <p className="text-xs md:text-sm text-charcoal/70">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
