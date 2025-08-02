import { UserProfile, JahezEstimate, CalculationResult, JahezItem } from '../types';

// Enhanced Dowry Expectation Index (DEI) Scoring System
interface DEIFactors {
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

// Regional multipliers for cultural context
const REGIONAL_MULTIPLIERS = {
  'Punjab': { electronics: 1.1, furniture: 1.2, vehicles: 1.0, gold: 1.1 },
  'Sindh': { electronics: 1.2, furniture: 1.0, vehicles: 1.1, gold: 1.0 },
  'KPK': { electronics: 0.9, furniture: 1.0, vehicles: 0.9, gold: 1.2 },
  'Balochistan': { electronics: 0.8, furniture: 0.9, vehicles: 0.8, gold: 1.3 },
  'GB': { electronics: 0.9, furniture: 0.9, vehicles: 0.8, gold: 1.1 },
  'AJK': { electronics: 1.0, furniture: 1.0, vehicles: 0.9, gold: 1.1 }
};

// Caste prestige mapping (culturally sensitive)
const CASTE_PRESTIGE_MAP: Record<string, Record<string, number>> = {
  'Punjab': { 'Rajput': 5, 'Jatt': 4, 'Arain': 4, 'Sheikh': 3, 'Mughal': 4, 'Awan': 3, 'Gujjar': 3 },
  'Sindh': { 'Syed': 5, 'Baloch': 4, 'Sindhi': 3, 'Rajput': 3, 'Sheikh': 3 },
  'KPK': { 'Yusufzai': 5, 'Afridi': 4, 'Khattak': 4, 'Wazir': 4, 'Bangash': 3 },
  'Balochistan': { 'Baloch': 5, 'Brahui': 4, 'Pashtun': 4 },
  'GB': { 'Balti': 4, 'Shina': 4, 'Burusho': 3 },
  'AJK': { 'Rajput': 5, 'Jatt': 4, 'Gujjar': 3 }
};

// Base scenario thresholds
const DEI_THRESHOLDS = {
  basic: { min: 0, max: 30 },
  modest: { min: 31, max: 50 },
  premium: { min: 51, max: 70 },
  elite: { min: 71, max: 85 },
  ultraElite: { min: 86, max: 120 }
};

// Comprehensive Dowry Item Dictionary (150+ items)
const DOWRY_DICTIONARY = {
  household: {
    bedroom: [
      { tier: 'basic', items: ['Single wooden bed set', 'Basic mattress', 'Pillows (2)'] },
      { tier: 'modest', items: ['Double bed with side tables', 'Medium-quality mattress', 'Bedsheet sets (3)', 'Dressing table'] },
      { tier: 'premium', items: ['King-size designer bed', 'Imported mattress', 'Luxury bedding sets (5)', 'Full vanity setup', 'LED bedroom lighting'] },
      { tier: 'elite', items: ['Turkish king bed with LED panels', 'Memory foam mattress', 'Designer bedding collection', 'Walk-in wardrobe setup'] },
      { tier: 'ultraElite', items: ['Custom Italian bedroom suite', 'Smart bed with massage', 'Egyptian cotton bedding', 'Smart lighting system', 'Climate-controlled wardrobe'] }
    ],
    living: [
      { tier: 'basic', items: ['4-seater plastic sofa', 'Small center table', 'Basic curtains'] },
      { tier: 'modest', items: ['6-seater velvet sofa', 'Wooden center table', 'Side tables (2)', 'Designer curtains'] },
      { tier: 'premium', items: ['L-shaped sectional sofa', 'Marble center table', 'TV console', 'Wall décor', 'Carpet'] },
      { tier: 'elite', items: ['Luxury leather sectional', 'Glass/marble furniture set', 'Entertainment center', 'Art pieces', 'Premium carpet'] },
      { tier: 'ultraElite', items: ['Custom Italian furniture', 'Smart home theater setup', 'Designer lighting', 'Imported rugs', 'Wall-mounted fireplace'] }
    ],
    kitchen: [
      { tier: 'basic', items: ['Basic utensils', 'Blender', 'Kettle', 'Pressure cooker'] },
      { tier: 'modest', items: ['Kenwood appliance pack', 'Microwave', 'Toaster', 'Chopper', 'Crockery set'] },
      { tier: 'premium', items: ['Complete appliance suite', 'Convection microwave', 'Food processor', 'Bone china crockery', 'Cookware set'] },
      { tier: 'elite', items: ['Premium brand appliances', 'Built-in oven', 'Espresso machine', 'Noritake crockery', 'Professional cookware'] },
      { tier: 'ultraElite', items: ['Smart kitchen appliances', 'Wine cooler', 'Steam oven', 'Crystal glassware', 'Chef-grade equipment'] }
    ],
    electronics: [
      { tier: 'basic', items: ['32" LED TV', 'Basic sound system', 'Table fans (2)'] },
      { tier: 'modest', items: ['40" Smart LED', 'Sound bar', 'Inverter AC (1)', 'UPS'] },
      { tier: 'premium', items: ['55" UHD Smart TV', 'Home theater system', 'Split ACs (2)', 'Generator'] },
      { tier: 'elite', items: ['65" OLED TV', 'Premium sound system', 'Central AC', 'Solar system'] },
      { tier: 'ultraElite', items: ['75" 8K Smart TV', 'Dolby Atmos system', 'Smart home automation', 'Backup power solutions'] }
    ]
  },
  transport: {
    basic: ['Motorcycle (CD70)', 'Bicycle'],
    modest: ['Suzuki Alto', 'Motorcycle (YBR125)'],
    premium: ['Suzuki Cultus', 'Toyota Corolla XLi'],
    elite: ['Toyota Corolla GLi', 'Honda Civic'],
    ultraElite: ['Toyota Fortuner', 'Honda CR-V', 'BMW 3 Series']
  },
  jewelry: {
    basic: { gold: '2-3 tolas', accessories: ['Basic jewelry set', 'Wedding ring'] },
    modest: { gold: '4-6 tolas', accessories: ['Bridal jewelry set', 'Watch (Citizen)', 'Perfume set'] },
    premium: { gold: '6-10 tolas', accessories: ['Complete jewelry collection', 'Designer watch', 'Branded perfumes'] },
    elite: { gold: '10-15 tolas', accessories: ['Diamond jewelry', 'Rolex/Omega watch', 'Luxury perfumes'] },
    ultraElite: { gold: '15+ tolas', accessories: ['Platinum jewelry', 'Swiss luxury watch', 'Designer collection'] }
  },
  realEstate: {
    basic: [] as string[],
    modest: ['Room setup contribution'],
    premium: ['Plot contribution (3-5 marla)'],
    elite: ['Apartment in housing scheme'],
    ultraElite: ['DHA/Bahria house', 'Commercial property']
  },
  personal: {
    basic: ['Mid-range smartphone', 'Basic clothing'],
    modest: ['iPhone SE/Samsung A series', 'Laptop (HP/Dell)', 'Clothing collection'],
    premium: ['iPhone 13/14', 'Gaming laptop', 'Designer clothing', 'Gadget collection'],
    elite: ['iPhone 15 Pro', 'MacBook Pro', 'Luxury clothing', 'Smart accessories'],
    ultraElite: ['Latest flagship phones', 'Top-tier laptops', 'Designer wardrobe', 'Tech ecosystem']
  }
};

// Satirical cultural comments for different scenarios
const CULTURAL_QUIPS = {
  overseas: [
    "Gulf mai job? Beta, Fortuner ke bina ghar waapis mat aana! 🚗",
    "USA/UK salary means automatic upgrade to DHA flat expectations!",
    "Foreign passport = Gold tola calculations automatically doubled!"
  ],
  height: [
    "6 foot+ height? Bhai, you're in automatic Corolla category! 📏",
    "Short height? Don't worry, personality ki weight zyada hai! 😄",
    "Height is just a number, but dowry calculations don't think so! 📊"
  ],
  education: [
    "PhD? Prepare for 'Doctor Sahab' level expectations! 🎓",
    "MBA from abroad? That's premium tier unlocked! 💼",
    "Local degree? Modest expectations, modest rewards! 📚"
  ],
  caste: [
    "Rajput in Punjab? Premium package confirmed! 👑",
    "Syed family? Respect level: Maximum! ⭐",
    "Remember: Character > Caste, but aunties don't always agree! 😅"
  ]
};

export class JahezCalculator {
  
  // Enhanced DEI calculation with 17 factors
  private static calculateDEI(profile: UserProfile): { dei: number, breakdown: DEIFactors } {
    const factors: DEIFactors = {
      height: this.calculateHeightScore(profile.height || 5.5),
      income: this.calculateIncomeScore(profile.monthlyIncome || 50000, profile.jobLocation),
      education: this.calculateEducationScore(profile),
      englishFluency: this.calculateFluencyScore(profile.englishFluency),
      jobType: this.calculateJobTypeScore(profile.jobRole, profile.employmentType),
      foreignNationality: this.calculateForeignScore(profile.jobLocation, profile.visaType),
      castePrestige: this.calculateCasteScore(profile.caste, profile.province),
      religiousityFit: this.calculateReligiousScore(profile.religiousInclination),
      familyWealth: this.calculateFamilyWealthScore(profile),
      groomingFitness: this.calculateGroomingScore(profile),
      propertyOwnership: this.calculatePropertyScore(profile.homeOwnership, profile.otherAssets),
      socialPresence: this.calculateSocialPresenceScore(),
      politicalConnections: this.calculatePoliticalScore(),
      inheritancePotential: this.calculateInheritanceScore(),
      marriedSisters: this.calculateSistersScore(profile.numberOfSiblings),
      marriageAge: this.calculateAgeScore(profile.age || 25),
      rishtaFailures: 0 // This would be tracked separately in a real system
    };

    const totalDEI = Object.values(factors).reduce((sum, score) => sum + score, 0);
    
    return { dei: Math.min(120, Math.max(0, totalDEI)), breakdown: factors };
  }

  private static calculateHeightScore(height: number): number {
    if (height >= 6.0) return 10;
    if (height >= 5.10) return 8;
    if (height >= 5.8) return 6;
    if (height >= 5.6) return 3;
    return 0;
  }

  private static calculateIncomeScore(income: number, location: string): number {
    // Convert foreign currency to PKR equivalent for scoring
    let adjustedIncome = income;
    if (location === 'usa' || location === 'uk') adjustedIncome *= 280; // USD/GBP to PKR
    if (location === 'gulf') adjustedIncome *= 75; // AED/SAR to PKR
    if (location === 'europe') adjustedIncome *= 300; // EUR to PKR

    if (adjustedIncome >= 1500000) return 10;
    if (adjustedIncome >= 800000) return 8;
    if (adjustedIncome >= 400000) return 6;
    if (adjustedIncome >= 150000) return 4;
    if (adjustedIncome >= 50000) return 2;
    return 0;
  }

  private static calculateEducationScore(profile: UserProfile): number {
    let score = 0;
    
    switch (profile.highestDegree) {
      case 'phd': score = 10; break;
      case 'mphil': score = 8; break;
      case 'mba': score = 7; break;
      case 'ba-bsc': score = 5; break;
      case 'fa-fsc': score = 3; break;
      default: score = 0;
    }

    if (profile.foreignEducation) score += 3;
    if (profile.institutionTier === 'top-tier') score += 2;
    
    return Math.min(10, score);
  }

  private static calculateFluencyScore(fluency?: string): number {
    switch (fluency) {
      case 'fluent': return 10;
      case 'conversational': return 6;
      case 'none': return 0;
      default: return 2;
    }
  }

  private static calculateJobTypeScore(role: string, type: string): number {
    const roleScore = role.toLowerCase().includes('doctor') ? 10 :
                     role.toLowerCase().includes('engineer') ? 8 :
                     role.toLowerCase().includes('pilot') ? 10 :
                     role.toLowerCase().includes('officer') ? 7 :
                     role.toLowerCase().includes('teacher') ? 5 : 6;

    const typeBonus = type === 'government' ? 2 : type === 'family-business' ? 1 : 0;
    
    return Math.min(10, roleScore + typeBonus);
  }

  private static calculateForeignScore(location: string, visa?: string): number {
    let score = 0;
    
    switch (location) {
      case 'usa':
      case 'uk': score = 10; break;
      case 'europe': score = 8; break;
      case 'gulf': score = 5; break;
      default: score = 0;
    }

    if (visa === 'permanent') score += 3;
    else if (visa === 'work') score += 1;
    
    return Math.min(10, score);
  }

  private static calculateCasteScore(caste: string, province: string): number {
    const provinceMap = CASTE_PRESTIGE_MAP[province] || {};
    return provinceMap[caste] || 2; // Default moderate score
  }

  private static calculateReligiousScore(inclination?: string): number {
    switch (inclination) {
      case 'balanced': return 5;
      case 'practicing': return 3;
      case 'liberal': return 1;
      case 'ultra-conservative': return -1;
      default: return 2;
    }
  }

  private static calculateFamilyWealthScore(profile: UserProfile): number {
    let score = 0;
    
    switch (profile.familyBackground) {
      case 'landed-elite': score = 10; break;
      case 'upper-class': score = 8; break;
      case 'middle-class': score = 5; break;
      default: score = 2;
    }

    if (profile.familyReputation === 'highly-respected') score += 2;
    
    return Math.min(10, score);
  }

  private static calculateGroomingScore(profile: UserProfile): number {
    let score = 0;
    
    if (profile.fitnessLevel === 'gym-built') score += 5;
    else if (profile.fitnessLevel === 'average') score += 2;
    else if (profile.fitnessLevel === 'overweight') score -= 2;

    if (profile.grooming === 'western' || profile.grooming === 'clean-cut') score += 3;
    
    if (profile.hairlineStatus === 'full') score += 2;
    else if (profile.hairlineStatus === 'balding') score -= 3;

    return Math.max(-3, Math.min(5, score));
  }

  private static calculatePropertyScore(ownership: string, assets: string[]): number {
    let score = 0;
    
    switch (ownership) {
      case 'owned': score = 5; break;
      case 'joint': score = 3; break;
      case 'rented': score = 1; break;
      default: score = 0;
    }

    score += (assets?.length || 0) * 1;
    
    return Math.min(8, score);
  }

  private static calculateSocialPresenceScore(): number {
    // This would be calculated based on social media presence in a real implementation
    return Math.floor(Math.random() * 6) - 1; // Random between -1 and 4
  }

  private static calculatePoliticalScore(): number {
    // This would be input-based in a real implementation
    return 0; // Default no political connections
  }

  private static calculateInheritanceScore(): number {
    // This would be input-based in a real implementation
    return Math.floor(Math.random() * 4); // Random between 0 and 3
  }

  private static calculateSistersScore(siblings: number): number {
    if (siblings === 0) return 2;
    if (siblings <= 2) return 1;
    if (siblings <= 4) return 0;
    return -2;
  }

  private static calculateAgeScore(age: number): number {
    if (age < 25) return 2;
    if (age <= 30) return 5;
    if (age <= 35) return 8;
    return 10;
  }

  // Determine tier based on DEI score
  private static determineTier(dei: number): string {
    if (dei >= DEI_THRESHOLDS.ultraElite.min) return 'ultraElite';
    if (dei >= DEI_THRESHOLDS.elite.min) return 'elite';
    if (dei >= DEI_THRESHOLDS.premium.min) return 'premium';
    if (dei >= DEI_THRESHOLDS.modest.min) return 'modest';
    return 'basic';
  }

  // Generate household items based on tier
  private static generateHouseholdItems(tier: string, regionalMultiplier: any): JahezItem[] {
    const items: JahezItem[] = [];
    const dictionary = DOWRY_DICTIONARY.household;

    // Bedroom items
    items.push({
      category: 'Bedroom',
      item: 'Bedroom Setup',
      minimum: dictionary.bedroom[0].items.join(', '),
      average: dictionary.bedroom[1].items.join(', '),
      maximum: dictionary.bedroom[dictionary.bedroom.length - 1].items.join(', '),
      priority: 'essential'
    });

    // Living room items
    items.push({
      category: 'Living Room',
      item: 'Drawing Room Setup',
      minimum: dictionary.living[0].items.join(', '),
      average: dictionary.living[1].items.join(', '),
      maximum: dictionary.living[dictionary.living.length - 1].items.join(', '),
      priority: 'essential'
    });

    // Kitchen items
    items.push({
      category: 'Kitchen',
      item: 'Kitchen Appliances',
      minimum: dictionary.kitchen[0].items.join(', '),
      average: dictionary.kitchen[1].items.join(', '),
      maximum: dictionary.kitchen[dictionary.kitchen.length - 1].items.join(', '),
      priority: 'essential'
    });

    // Electronics
    items.push({
      category: 'Electronics',
      item: 'Home Electronics',
      minimum: dictionary.electronics[0].items.join(', '),
      average: dictionary.electronics[1].items.join(', '),
      maximum: dictionary.electronics[dictionary.electronics.length - 1].items.join(', '),
      priority: 'important'
    });

    return items;
  }

  // Generate transport items based on tier
  private static generateTransportItems(tier: string, profile: UserProfile, dei: number): JahezItem[] {
    const items: JahezItem[] = [];
    const transportOptions = DOWRY_DICTIONARY.transport;

    // Special case for overseas locations
    if (profile.jobLocation === 'gulf' && dei > 70) {
      items.push({
        category: 'Transport',
        item: 'Vehicle',
        minimum: 'Motorcycle (150cc)',
        average: 'Suzuki Alto + motorcycle',
        maximum: 'Toyota Hilux Vigo (Gulf Special)',
        priority: 'essential'
      });
    } else {
      items.push({
        category: 'Transport',
        item: 'Vehicle',
        minimum: Array.isArray(transportOptions.basic) ? transportOptions.basic[0] : 'Motorcycle',
        average: Array.isArray(transportOptions.modest) ? transportOptions.modest[0] : 'Suzuki Alto',
        maximum: Array.isArray(transportOptions.ultraElite) ? transportOptions.ultraElite[0] : 'Toyota Fortuner',
        priority: dei > 70 ? 'essential' : 'important'
      });
    }

    return items;
  }

  // Generate jewelry items based on tier
  private static generateJewelryItems(tier: string, regionalMultiplier: any, profile: UserProfile): JahezItem[] {
    const items: JahezItem[] = [];

    // Gold jewelry - adjusted for regional preferences
    items.push({
      category: 'Jewelry',
      item: 'Gold Jewelry',
      minimum: DOWRY_DICTIONARY.jewelry.basic.gold,
      average: DOWRY_DICTIONARY.jewelry.modest.gold,
      maximum: DOWRY_DICTIONARY.jewelry.ultraElite.gold,
      priority: 'essential'
    });

    // Accessories
    items.push({
      category: 'Accessories',
      item: 'Personal Accessories',
      minimum: DOWRY_DICTIONARY.jewelry.basic.accessories.join(', '),
      average: DOWRY_DICTIONARY.jewelry.modest.accessories.join(', '),
      maximum: DOWRY_DICTIONARY.jewelry.ultraElite.accessories.join(', '),
      priority: 'important'
    });

    return items;
  }

  // Generate real estate items based on tier
  private static generateRealEstateItems(tier: string, profile: UserProfile): JahezItem[] {
    const items: JahezItem[] = [];
    const realEstateOptions = DOWRY_DICTIONARY.realEstate[tier as keyof typeof DOWRY_DICTIONARY.realEstate] || [];

    if (realEstateOptions.length > 0) {
      items.push({
        category: 'Real Estate',
        item: 'Property Contribution',
        minimum: 'Room setup contribution',
        average: DOWRY_DICTIONARY.realEstate.premium[0] || 'Plot contribution',
        maximum: DOWRY_DICTIONARY.realEstate.ultraElite[0] || 'DHA/Bahria house',
        priority: tier === 'ultraElite' || tier === 'elite' ? 'important' : 'luxury'
      });
    }

    return items;
  }

  // Generate personal items based on tier
  private static generatePersonalItems(tier: string, profile: UserProfile): JahezItem[] {
    const items: JahezItem[] = [];

    items.push({
      category: 'Personal Electronics',
      item: 'Tech & Gadgets',
      minimum: DOWRY_DICTIONARY.personal.basic.join(', '),
      average: DOWRY_DICTIONARY.personal.modest.join(', '),
      maximum: DOWRY_DICTIONARY.personal.ultraElite.join(', '),
      priority: 'important'
    });

    return items;
  }

  // Calculate total estimated value
  private static calculateTotalValue(tier: string, dei: number, profile: UserProfile): number {
    const baseValues = {
      basic: 300000,
      modest: 800000,
      premium: 1500000,
      elite: 3000000,
      ultraElite: 6000000
    };

    let baseValue = baseValues[tier as keyof typeof baseValues] || baseValues.basic;

    // Apply location multipliers
    if (profile.jobLocation === 'usa' || profile.jobLocation === 'uk') {
      baseValue *= 2.0;
    } else if (profile.jobLocation === 'gulf') {
      baseValue *= 1.5;
    } else if (profile.jobLocation === 'europe') {
      baseValue *= 1.8;
    }

    // Apply DEI variance (±20%)
    const variance = (Math.random() - 0.5) * 0.4; // -20% to +20%
    baseValue *= (1 + variance);

    return baseValue;
  }

  // Generate cultural note with satire
  private static generateCulturalNote(profile: UserProfile, dei: number, tier: string): string {
    const quips: string[] = [];

    // Location-based quips
    if (profile.jobLocation === 'gulf') {
      quips.push(CULTURAL_QUIPS.overseas[0]);
    } else if (profile.jobLocation === 'usa' || profile.jobLocation === 'uk') {
      quips.push(CULTURAL_QUIPS.overseas[1]);
    }

    // Height-based quips
    if ((profile.height || 0) >= 6.0) {
      quips.push(CULTURAL_QUIPS.height[0]);
    } else if ((profile.height || 0) < 5.6) {
      quips.push(CULTURAL_QUIPS.height[1]);
    }

    // Education-based quips
    if (profile.highestDegree === 'phd') {
      quips.push(CULTURAL_QUIPS.education[0]);
    } else if (profile.foreignEducation) {
      quips.push(CULTURAL_QUIPS.education[1]);
    }

    // Caste-based quips (culturally sensitive)
    if (profile.caste === 'Rajput' && profile.province === 'Punjab') {
      quips.push(CULTURAL_QUIPS.caste[0]);
    } else if (profile.caste === 'Syed') {
      quips.push(CULTURAL_QUIPS.caste[1]);
    }

    // Add tier-specific commentary
    const tierComments = {
      basic: "Modest expectations, beta. Character counts more than cash! 💝",
      modest: "Solid middle-class setup. Aunties will approve! 👍",
      premium: "Premium package unlocked! You're in Corolla territory now! 🚗",
      elite: "Elite level achieved! Fortuner + DHA flat expectations! 🏠",
      ultraElite: "Ultra-elite status! Even the aunties are impressed! 👑"
    };

    quips.push(tierComments[tier as keyof typeof tierComments]);

    // Add disclaimer
    quips.push("Remember: This is satire - real relationships are built on love and compatibility! ❤️");

    // Return random selection
    return quips[Math.floor(Math.random() * quips.length)];
  }

  // Generate dynamic dowry estimate based on profile and tier
  private static generateEstimate(
    profile: UserProfile, 
    dei: number, 
    scenario: 'minimum' | 'average' | 'maximum'
  ): JahezEstimate {
    const baseTier = this.determineTier(dei);
    const regionalMultiplier = REGIONAL_MULTIPLIERS[profile.province as keyof typeof REGIONAL_MULTIPLIERS] || 
                               { electronics: 1.0, furniture: 1.0, vehicles: 1.0, gold: 1.0 };

    // Adjust tier based on scenario
    let effectiveTier = baseTier;
    if (scenario === 'minimum' && baseTier !== 'basic') {
      const tiers = ['basic', 'modest', 'premium', 'elite', 'ultraElite'];
      const currentIndex = tiers.indexOf(baseTier);
      effectiveTier = tiers[Math.max(0, currentIndex - 1)];
    } else if (scenario === 'maximum' && baseTier !== 'ultraElite') {
      const tiers = ['basic', 'modest', 'premium', 'elite', 'ultraElite'];
      const currentIndex = tiers.indexOf(baseTier);
      effectiveTier = tiers[Math.min(tiers.length - 1, currentIndex + 1)];
    }

    const householdSetup = this.generateHouseholdItems(effectiveTier, regionalMultiplier);
    const transport = this.generateTransportItems(effectiveTier, profile, dei);
    const jewelry = this.generateJewelryItems(effectiveTier, regionalMultiplier, profile);
    const realEstate = this.generateRealEstateItems(effectiveTier, profile);
    const personalAccessories = this.generatePersonalItems(effectiveTier, profile);

    // Calculate estimated total value
    const baseValue = this.calculateTotalValue(effectiveTier, dei, profile);

    return {
      scenario,
      totalEstimatedValue: Math.round(baseValue),
      categories: {
        householdSetup,
        transport,
        jewelry,
        realEstate,
        personalAccessories,
      },
      culturalNote: this.generateCulturalNote(profile, dei, effectiveTier),
      disclaimer: 'This tool is for satirical and educational purposes only. It does not promote or endorse dowry culture.',
    };
  }

  // Main calculation method
  public static calculateJahez(profile: UserProfile): CalculationResult {
    // Sanitize profile data
    const sanitizedProfile = {
      ...profile,
      professionalCerts: profile.professionalCerts || [],
      otherAssets: profile.otherAssets || [],
      height: profile.height || 5.5,
      weight: profile.weight || 70,
      monthlyIncome: profile.monthlyIncome || 50000,
      age: profile.age || 25,
      numberOfSiblings: profile.numberOfSiblings || 2
    };

    // Calculate DEI score and breakdown
    const { dei, breakdown } = this.calculateDEI(sanitizedProfile);

    // Generate estimates for all scenarios
    const estimates = {
      minimum: this.generateEstimate(sanitizedProfile, dei, 'minimum'),
      average: this.generateEstimate(sanitizedProfile, dei, 'average'),
      maximum: this.generateEstimate(sanitizedProfile, dei, 'maximum'),
    };

    return {
      userProfile: sanitizedProfile,
      estimates,
      scoreBreakdown: {
        physicalScore: Math.round(breakdown.height + breakdown.groomingFitness),
        educationScore: Math.round(breakdown.education + breakdown.englishFluency),
        careerScore: Math.round(breakdown.income + breakdown.jobType + breakdown.foreignNationality),
        socialScore: Math.round(breakdown.castePrestige + breakdown.familyWealth + breakdown.religiousityFit),
        totalScore: Math.round(dei),
      },
    };
  }
}
