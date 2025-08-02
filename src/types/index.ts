export interface UserProfile {
  // Basic Identity
  fullName: string;
  age: number;
  religion?: string;
  sect?: string;
  province: string;
  city: string;
  areaType: 'urban' | 'semi-urban' | 'rural';
  caste: string;

  // Physical Profile
  height: number; // in feet (e.g., 5.7 for 5'7")
  weight: number; // in kg
  complexion: 'very-fair' | 'fair' | 'wheatish' | 'dark' | 'very-dark';
  grooming: 'western' | 'clean-cut' | 'simple' | 'religious';
  beard: 'none' | 'yes' | 'sunnah';
  fitnessLevel: 'gym-built' | 'average' | 'overweight' | 'slim';
  hairlineStatus: 'full' | 'thinning' | 'balding';

  // Education & Intelligence
  highestDegree: 'matric' | 'fa-fsc' | 'ba-bsc' | 'bba' | 'mba' | 'mphil' | 'phd';
  institutionTier: 'top-tier' | 'mid-tier' | 'local';
  foreignEducation: boolean;
  foreignEducationCountry?: string;
  professionalCerts: string[];
  englishFluency: 'none' | 'conversational' | 'fluent';
  religiousKnowledge: 'basic' | 'moderate' | 'hafiz' | 'scholar';

  // Career, Income & Status
  jobRole: string;
  employmentType: 'government' | 'private' | 'freelance' | 'family-business';
  monthlyIncome: number; // in PKR
  jobLocation: 'local' | 'gulf' | 'uk' | 'usa' | 'europe' | 'other';
  visaType?: 'visit' | 'work' | 'permanent';
  homeOwnership: 'owned' | 'rented' | 'joint';
  otherAssets: string[];
  taxStatus: 'filer' | 'non-filer';

  // Social Standing & Family
  familyBackground: 'landed-elite' | 'upper-class' | 'upper-middle-class' | 'middle-class' | 'lower-middle';
  fatherProfession: string;
  motherEducation: 'illiterate' | 'matric' | 'graduate' | 'postgraduate';
  familyReputation: 'highly-respected' | 'average' | 'local-notoriety';
  familyType: 'joint' | 'extended-joint' | 'nuclear';
  numberOfSiblings: number;
  birthOrder: 'eldest' | 'middle' | 'youngest' | 'only-child';
  religiousInclination: 'liberal' | 'balanced' | 'practicing' | 'ultra-conservative';
  lifestylePreference: 'eastern-traditional' | 'modern-conservative' | 'westernized';
}

export interface JahezItem {
  category: string;
  item: string;
  minimum: string;
  average: string;
  maximum: string;
  priority: 'essential' | 'important' | 'luxury';
}

export interface JahezEstimate {
  scenario: 'minimum' | 'average' | 'maximum';
  totalEstimatedValue: number;
  categories: {
    householdSetup: JahezItem[];
    transport: JahezItem[];
    jewelry: JahezItem[];
    realEstate: JahezItem[];
    personalAccessories: JahezItem[];
  };
  culturalNote: string;
  disclaimer: string;
}

export interface DEIBreakdown {
  height: number;
  income: number;
  education: number;
  englishFluency: number;
  jobType: number;
  foreignNationality: number;
  castePrestige: number;
  religiousityFit: number;
  familyWealth: number;
  groomingFitness: number;
  propertyOwnership: number;
  socialPresence: number;
  politicalConnections: number;
  inheritancePotential: number;
  marriedSisters: number;
  marriageAge: number;
  rishtaFailures: number;
}

export interface CalculationResult {
  userProfile: UserProfile;
  estimates: {
    minimum: JahezEstimate;
    average: JahezEstimate;
    maximum: JahezEstimate;
  };
  scoreBreakdown: {
    physicalScore: number;
    educationScore: number;
    careerScore: number;
    socialScore: number;
    totalScore: number;
    deiBreakdown?: DEIBreakdown; // Optional detailed breakdown
    tier?: string; // Basic, Modest, Premium, Elite, Ultra-Elite
  };
}
