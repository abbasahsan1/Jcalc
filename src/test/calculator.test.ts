import { JahezCalculator } from '../lib/calculator';
import { UserProfile } from '../types';

// Test profile for a high-scoring candidate
const testProfile: UserProfile = {
  // Basic Identity
  fullName: "Ahmad Khan",
  age: 28,
  religion: "Islam",
  sect: "Sunni",
  province: "Punjab",
  city: "Lahore",
  areaType: "urban",
  caste: "Syed",

  // Physical Profile
  height: 6.0,
  weight: 75,
  complexion: "fair",
  grooming: "clean-cut",
  beard: "sunnah",
  fitnessLevel: "gym-built",
  hairlineStatus: "full",

  // Education & Intelligence
  highestDegree: "mba",
  institutionTier: "top-tier",
  foreignEducation: true,
  foreignEducationCountry: "usa",
  professionalCerts: ["MBA", "PMP"],
  englishFluency: "fluent",
  religiousKnowledge: "moderate",

  // Career, Income & Status
  jobRole: "IT Professional",
  employmentType: "private",
  monthlyIncome: 800000,
  jobLocation: "gulf",
  visaType: "work",
  homeOwnership: "owned",
  otherAssets: ["Plot", "Car"],
  taxStatus: "filer",

  // Social Standing & Family
  familyBackground: "upper-class",
  fatherProfession: "Doctor",
  motherEducation: "graduate",
  familyReputation: "highly-respected",
  familyType: "nuclear",
  numberOfSiblings: 2,
  birthOrder: "eldest",
  religiousInclination: "balanced",
  lifestylePreference: "modern-conservative",
};

export function testCalculator() {
  console.log("Testing Jahez Calculator with high-scoring profile...");
  
  const result = JahezCalculator.calculateJahez(testProfile);
  
  console.log("Profile:", testProfile.fullName);
  console.log("Score Breakdown:", result.scoreBreakdown);
  console.log("Minimum Estimate:", result.estimates.minimum.totalEstimatedValue.toLocaleString(), "PKR");
  console.log("Average Estimate:", result.estimates.average.totalEstimatedValue.toLocaleString(), "PKR");
  console.log("Maximum Estimate:", result.estimates.maximum.totalEstimatedValue.toLocaleString(), "PKR");
  console.log("Cultural Note:", result.estimates.average.culturalNote);
  
  return result;
}

// Test with low-scoring profile
const lowScoreProfile: UserProfile = {
  ...testProfile,
  height: 5.3,
  complexion: "dark",
  fitnessLevel: "overweight",
  highestDegree: "fa-fsc",
  institutionTier: "local",
  foreignEducation: false,
  monthlyIncome: 40000,
  jobLocation: "local",
  familyBackground: "lower-middle",
  familyReputation: "average",
};

export function testLowScoreCalculator() {
  console.log("Testing Jahez Calculator with low-scoring profile...");
  
  const result = JahezCalculator.calculateJahez(lowScoreProfile);
  
  console.log("Profile:", lowScoreProfile.fullName);
  console.log("Score Breakdown:", result.scoreBreakdown);
  console.log("Minimum Estimate:", result.estimates.minimum.totalEstimatedValue.toLocaleString(), "PKR");
  console.log("Average Estimate:", result.estimates.average.totalEstimatedValue.toLocaleString(), "PKR");
  console.log("Maximum Estimate:", result.estimates.maximum.totalEstimatedValue.toLocaleString(), "PKR");
  
  return result;
}
