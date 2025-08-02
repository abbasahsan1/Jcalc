import { JahezCalculator } from './calculator';
import { UserProfile } from '../types';

// Test profile for verification
const testProfile: UserProfile = {
  fullName: "Ahmed Khan",
  age: 28,
  province: "Punjab",
  city: "Lahore",
  areaType: "urban",
  caste: "Rajput",
  
  height: 5.9,
  weight: 75,
  complexion: "fair",
  grooming: "clean-cut",
  beard: "yes",
  fitnessLevel: "gym-built",
  hairlineStatus: "full",
  
  highestDegree: "mba",
  institutionTier: "top-tier",
  foreignEducation: true,
  foreignEducationCountry: "uk",
  professionalCerts: ["PMP", "CFA"],
  englishFluency: "fluent",
  religiousKnowledge: "moderate",
  
  jobRole: "Software Engineer",
  employmentType: "private",
  monthlyIncome: 300000,
  jobLocation: "gulf",
  visaType: "work",
  homeOwnership: "owned",
  otherAssets: ["car", "investments"],
  taxStatus: "filer",
  
  familyBackground: "upper-class",
  fatherProfession: "Doctor",
  motherEducation: "graduate",
  familyReputation: "highly-respected",
  familyType: "nuclear",
  numberOfSiblings: 2,
  birthOrder: "eldest",
  religiousInclination: "balanced",
  lifestylePreference: "modern-conservative"
};

// Test the calculator
console.log("Testing Enhanced Jahez Calculator...");
const result = JahezCalculator.calculateJahez(testProfile);

console.log("DEI Score:", result.scoreBreakdown.totalScore);
console.log("Minimum Estimate:", result.estimates.minimum.totalEstimatedValue);
console.log("Average Estimate:", result.estimates.average.totalEstimatedValue);
console.log("Maximum Estimate:", result.estimates.maximum.totalEstimatedValue);
console.log("Cultural Note:", result.estimates.average.culturalNote);

export { result };
