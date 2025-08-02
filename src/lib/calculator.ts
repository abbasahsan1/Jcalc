import { UserProfile, JahezEstimate, CalculationResult, JahezItem, DEIBreakdown } from '../types';

/*
 * ENHANCED JAHEZ CALCULATOR - LOGIC ENGINE REWORK
 * 
 * Features:
 * ✅ 150+ item comprehensive dowry dictionary
 * ✅ 17-factor Dowry Expectation Index (DEI) scoring
 * ✅ Regional awareness with cultural preferences
 * ✅ Caste-sensitive calculations (respectful)
 * ✅ Dynamic variance for realistic results (5-15%)
 * ✅ TayaBot AI satirical commentary
 * ✅ Tier-based scaling (Basic → Ultra-Elite)
 * ✅ Location-aware multipliers (Gulf, UK/USA, Europe)
 * ✅ Professional prestige factors
 * ✅ Age-based urgency calculations
 * ✅ Family background impact
 * ✅ City-specific cost adjustments
 * 
 * Satire Mode: Educational tool with cultural humor
 * Disclaimer: For entertainment and social commentary only
 */

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

// Enhanced Regional multipliers for cultural context with variance
const REGIONAL_MULTIPLIERS = {
  'Punjab': { 
    electronics: 1.1, 
    furniture: 1.3, 
    vehicles: 1.0, 
    gold: 1.1,
    realEstate: 1.2,
    preference: 'Traditional furniture with modern electronics',
    culturalNote: 'Lahori families love designer furniture!'
  },
  'Sindh': { 
    electronics: 1.2, 
    furniture: 1.0, 
    vehicles: 1.1, 
    gold: 1.0,
    realEstate: 1.4,
    preference: 'Urban apartments over rural land',
    culturalNote: 'Karachi means apartment expectations!'
  },
  'KPK': { 
    electronics: 0.9, 
    furniture: 1.0, 
    vehicles: 0.9, 
    gold: 1.4,
    realEstate: 0.8,
    preference: 'Gold jewelry over modern gadgets',
    culturalNote: 'Tola calculations peak in Peshawar!'
  },
  'Balochistan': { 
    electronics: 0.8, 
    furniture: 0.9, 
    vehicles: 0.8, 
    gold: 1.5,
    realEstate: 0.7,
    preference: 'Traditional gold and livestock',
    culturalNote: 'Simple living, rich traditions!'
  },
  'GB': { 
    electronics: 0.9, 
    furniture: 0.9, 
    vehicles: 0.8, 
    gold: 1.2,
    realEstate: 0.9,
    preference: 'Practical items for mountain life',
    culturalNote: 'Mountain living = practical thinking!'
  },
  'AJK': { 
    electronics: 1.0, 
    furniture: 1.0, 
    vehicles: 0.9, 
    gold: 1.2,
    realEstate: 1.0,
    preference: 'Balanced traditional-modern mix',
    culturalNote: 'Best of both worlds approach!'
  }
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
  basic: { min: 0, max: 20 },
  modest: { min: 21, max: 35 },
  premium: { min: 36, max: 55 },
  elite: { min: 56, max: 75 },
  ultraElite: { min: 76, max: 120 }
};

// EXPANDED DOWRY ITEM DICTIONARY (150+ ITEMS)
const DOWRY_DICTIONARY = {
  household: {
    bedroom: {
      basic: [
        'Single wooden bed set', 'Basic mattress', 'Pillows (2)', 'Bedsheet sets (2)', 
        'Small wardrobe', 'Side table (1)', 'Table lamp'
      ],
      modest: [
        'Double bed with headboard', 'Medium-quality mattress', 'Bedsheet sets (4)', 
        'Dressing table with mirror', 'Wardrobe (3-door)', 'Side tables (2)', 
        'Curtains', 'Prayer mat', 'Wall clock'
      ],
      premium: [
        'King-size designer bed', 'Imported spring mattress', 'Luxury bedding collection (6 sets)',
        'Full vanity setup with lights', 'Walk-in wardrobe', 'LED bedroom lighting',
        'Carpet', 'Dressing chair', 'Full-length mirror', 'Bedside lamps'
      ],
      elite: [
        'Turkish wooden bed with storage', 'Memory foam mattress', 'Designer bedding collection',
        'Marble-top vanity', 'Custom wardrobe with lights', 'Smart lighting system',
        'Premium carpet', 'Ottoman', 'Wall art', 'Air purifier'
      ],
      ultraElite: [
        'Custom Italian bedroom suite', 'Smart adjustable bed', 'Egyptian cotton bedding',
        'Smart mirror vanity', 'Climate-controlled walk-in closet', 'Automated lighting',
        'Persian rugs', 'Luxury seating area', 'Home theater corner', 'Smart home integration'
      ]
    },
    living: {
      basic: [
        '4-seater plastic sofa set', 'Small center table', 'Basic curtains',
        'Wall clock', 'Shoe rack', 'Floor mat'
      ],
      modest: [
        '6-seater velvet sofa', 'Wooden center table', 'Side tables (2)', 
        'Designer curtains', 'TV trolley', 'Carpet', 'Wall décor', 'Corner stand'
      ],
      premium: [
        'L-shaped sectional sofa', 'Marble center table', 'Glass side tables',
        'TV console unit', 'Premium curtains', 'Persian carpet', 'Wall art collection',
        'Decorative lighting', 'Plant stands'
      ],
      elite: [
        'Luxury leather sectional', 'Imported marble coffee table', 'Glass furniture set',
        'Entertainment center', 'Custom curtains', 'Handwoven carpet', 'Art pieces',
        'Ambient lighting', 'Display cabinets'
      ],
      ultraElite: [
        'Custom Italian furniture suite', 'Smart coffee table', 'Designer lighting system',
        'Built-in entertainment wall', 'Motorized curtains', 'Antique rugs',
        'Original art collection', 'Smart home theater', 'Indoor plants with auto-watering'
      ]
    },
    dining: {
      basic: [
        '4-seater plastic dining set', 'Basic crockery (melamine)', 'Cutlery set',
        'Water jug', 'Serving trays (2)'
      ],
      modest: [
        '6-seater wooden dining set', 'Ceramic crockery set', 'Steel cutlery',
        'Glass set', 'Serving dishes', 'Table cloth', 'Centerpiece'
      ],
      premium: [
        '8-seater marble dining table', 'Bone china crockery', 'Silver-plated cutlery',
        'Crystal glasses', 'Complete serving set', 'Dining room lighting',
        'Buffet cabinet'
      ],
      elite: [
        'Custom dining suite', 'Noritake crockery collection', 'Silver cutlery set',
        'Crystal collection', 'Complete formal dining set', 'Chandelier',
        'China cabinet', 'Wine storage'
      ],
      ultraElite: [
        'Designer dining room suite', 'Royal Albert collection', 'Sterling silver set',
        'Waterford crystal', 'Complete formal service', 'Smart lighting',
        'Temperature-controlled wine cellar', 'Butler pantry setup'
      ]
    },
    kitchen: {
      basic: [
        'Basic utensil set', 'Blender', 'Electric kettle', 'Pressure cooker',
        'Non-stick pan set', 'Storage containers', 'Dish rack'
      ],
      modest: [
        'Kenwood appliance pack', 'Microwave oven', 'Toaster', 'Food chopper',
        'Complete cookware set', 'Crockery set', 'Spice rack', 'Kitchen trolley'
      ],
      premium: [
        'Complete kitchen appliance suite', 'Convection microwave', 'Food processor',
        'Bone china dinner set', 'Professional cookware', 'Spice organizer',
        'Kitchen island trolley', 'Water filter system'
      ],
      elite: [
        'Premium brand appliances', 'Built-in oven', 'Espresso machine',
        'Noritake serving set', 'Chef-grade cookware', 'Smart storage solutions',
        'Kitchen automation', 'RO plant with dispenser'
      ],
      ultraElite: [
        'Smart kitchen ecosystem', 'Steam oven combo', 'Wine refrigerator',
        'Crystal serving collection', 'Professional-grade equipment', 'Automated pantry',
        'Smart appliances with AI', 'Water treatment system'
      ]
    },
    electronics: {
      basic: [
        '32" LED TV', 'Basic sound system', 'Table fans (2)', 'Iron',
        'Radio/CD player', 'Extension boards'
      ],
      modest: [
        '40" Smart LED TV', 'Sound bar', 'Inverter AC (1)', 'UPS',
        'Washing machine', 'Microwave', 'Hair dryer', 'Steam iron'
      ],
      premium: [
        '55" UHD Smart TV', 'Home theater system', 'Split ACs (2)',
        'Generator (5KW)', 'Automatic washing machine', 'Refrigerator (inverter)',
        'Vacuum cleaner', 'Electric oven'
      ],
      elite: [
        '65" OLED TV', 'Premium surround sound', 'Central AC system',
        'Solar power system', 'Smart appliances', 'Side-by-side refrigerator',
        'Robot vacuum', 'Smart home devices'
      ],
      ultraElite: [
        '75" 8K QLED TV', 'Dolby Atmos theater', 'Smart climate control',
        'Complete solar setup with battery', 'AI-powered appliances',
        'Smart refrigerator with screens', 'Home automation system',
        'Integrated smart home ecosystem'
      ]
    },
    utilities: {
      basic: [
        'Gas cylinder with stove', 'Water cooler', 'Electric heater',
        'Basic lighting', 'Fans (ceiling + table)'
      ],
      modest: [
        'Gas connection with range', 'Water dispenser', 'Room heater',
        'LED lighting', 'Exhaust fans', 'Geyser (electric)'
      ],
      premium: [
        'Built-in gas range', 'Water filtration system', 'Split AC units',
        'Designer lighting', 'Ventilation system', 'Instant geyser'
      ],
      elite: [
        'Modular kitchen with gas', 'RO water system', 'Central AC',
        'Smart lighting controls', 'Whole-house ventilation', 'Solar water heating'
      ],
      ultraElite: [
        'Smart kitchen automation', 'Water treatment plant', 'Climate control',
        'Automated lighting', 'Smart ventilation', 'Renewable energy systems'
      ]
    }
  },
  transport: {
    basic: ['Bicycle (Atlas/Sohrab)', 'Motorcycle (CD70)', 'Public transport allowance'],
    modest: ['Motorcycle (YBR125/CB150F)', 'Suzuki Alto', 'Fuel monthly allowance'],
    premium: ['Suzuki Cultus/Swift', 'Toyota Corolla XLi', 'Car maintenance package'],
    elite: ['Toyota Corolla GLi', 'Honda Civic', 'Honda BRV', 'Insurance included'],
    ultraElite: ['Toyota Fortuner', 'Honda CR-V', 'BMW 3 Series', 'Luxury SUV options', 'Full service package']
  },
  jewelry: {
    basic: { 
      gold: '2-3 tolas', 
      accessories: ['Basic jewelry set', 'Wedding ring', 'Simple earrings', 'Chain'] 
    },
    modest: { 
      gold: '4-6 tolas', 
      accessories: ['Bridal jewelry set', 'Watch (Citizen/Casio)', 'Perfume set', 'Bangles', 'Necklace set'] 
    },
    premium: { 
      gold: '6-10 tolas', 
      accessories: ['Complete jewelry collection', 'Designer watch (Tissot)', 'Branded perfumes', 'Diamond earrings', 'Gold chain set'] 
    },
    elite: { 
      gold: '10-15 tolas', 
      accessories: ['Diamond jewelry set', 'Luxury watch (Rolex/Omega)', 'Designer perfumes (Chanel/Dior)', 'Precious stone jewelry', 'Platinum pieces'] 
    },
    ultraElite: { 
      gold: '15-25+ tolas', 
      accessories: ['Platinum & diamond collection', 'Swiss luxury watches', 'Exclusive perfume collection', 'Rare gemstone jewelry', 'Designer accessories'] 
    }
  },
  realEstate: {
    basic: [] as string[],
    modest: ['Room renovation contribution', 'Furniture setup allowance'],
    premium: ['Plot contribution (3-5 marla)', 'House down payment'],
    elite: ['Apartment in good location', 'Commercial plot contribution'],
    ultraElite: ['DHA/Bahria house', 'Commercial property', 'Investment property portfolio']
  },
  digital: {
    basic: ['Feature phone', 'Basic laptop/tablet'],
    modest: ['Smartphone (mid-range)', 'Laptop (HP/Dell)', 'Internet package'],
    premium: ['iPhone/Samsung flagship', 'Gaming laptop', 'Smart home starter kit'],
    elite: ['Latest iPhone Pro', 'MacBook Pro', 'Smart home ecosystem'],
    ultraElite: ['Complete tech ecosystem', 'Professional workstation', 'Smart home automation']
  },
  clothing: {
    basic: ['Basic wardrobe', 'Wedding outfit', 'Everyday clothes'],
    modest: ['Designer wardrobe', 'Formal suits', 'Seasonal clothing'],
    premium: ['Branded clothing collection', 'Custom tailoring', 'Accessories'],
    elite: ['Luxury brand wardrobe', 'Designer suits', 'Premium accessories'],
    ultraElite: ['Haute couture collection', 'Custom designer pieces', 'Luxury accessories']
  },
  symbolic: {
    basic: ['Holy Quran (simple)', 'Prayer mat', 'Tasbeeh'],
    modest: ['Quran (decorated)', 'Prayer rug set', 'Islamic wall art'],
    premium: ['Quran (gold-edged)', 'Premium prayer setup', 'Calligraphy collection'],
    elite: ['Handwritten Quran', 'Marble prayer corner', 'Antique Islamic art'],
    ultraElite: ['Rare manuscript collection', 'Custom prayer room', 'Museum-quality Islamic art']
  },
  miscellaneous: {
    basic: ['Sewing machine', 'Iron box', 'Basic tools'],
    modest: ['Home appliances', 'Tool kit', 'Emergency supplies'],
    premium: ['Workshop setup', 'Hobby equipment', 'Lifestyle accessories'],
    elite: ['Professional equipment', 'Luxury hobby items', 'Collection pieces'],
    ultraElite: ['Specialized collections', 'Professional studios', 'Investment pieces']
  }
};

// Enhanced satirical cultural comments with TayaBot AI
const CULTURAL_QUIPS = {
  overseas: [
    "Gulf mai job? Beta, Fortuner ke bina ghar waapis mat aana! 🚗",
    "USA/UK salary means automatic upgrade to DHA flat expectations!",
    "Foreign passport = Gold tola calculations automatically doubled!",
    "TayaBot says: 'Bahar ka paisa, andar ka jahaiz - double combo!' 💰",
    "Dubai mai engineer? Aunties already planning the Fortuner shopping! 🏜️",
    "London se MBA? Get ready for DHA phase expectations! 🏘️"
  ],
  height: [
    "6 foot+ height? Bhai, you're in automatic Corolla category! 📏",
    "Short height? Don't worry, personality ki weight zyada hai! 😄",
    "Height is just a number, but dowry calculations don't think so! 📊",
    "TayaBot calculates: +1 inch = +1 tola gold! Simple math! 📐",
    "5'6\"? Perfect for motorcycle category, beta! 🏍️",
    "6'2\"? Time to upgrade from Mehran to Civic expectations! 🚗"
  ],
  education: [
    "PhD? Prepare for 'Doctor Sahab' level expectations! 🎓",
    "MBA from abroad? That's premium tier unlocked! 💼",
    "Local degree? Modest expectations, modest rewards! 📚",
    "TayaBot wisdom: 'Higher degree = Higher jahaiz degree!' 🎓",
    "IBA/LUMS? Beta, you're in branded furniture category now! 🏫",
    "Matric pass? Don't worry, personality PhD kar sakte hain! 😊"
  ],
  caste: [
    "Rajput in Punjab? Premium package confirmed! 👑",
    "Syed family? Respect level: Maximum! ⭐",
    "Remember: Character > Caste, but aunties don't always agree! 😅",
    "TayaBot reminder: 'Caste is cultural context, not character measure!' 🤝",
    "Awan boy? Solid middle-tier expectations activated! 💪",
    "Sheikh family? Time for the respectable dowry package! 🕌"
  ],
  regional: [
    "Lahore? Expect designer furniture over gold preference! 🛋️",
    "Karachi? Apartment over agriculture land, beta! 🏢",
    "Peshawar? Gold tolas trump everything else! ✨",
    "Multan? Traditional values with modern appliances! 🏺",
    "Islamabad? Government officer vibes = steady expectations! 🏛️"
  ],
  income: [
    "50k salary? Basic tier but honest earning! 💼",
    "500k+? Welcome to Corolla expectations club! 🚗",
    "Government job? Stable income = stable dowry planning! 🏢",
    "Family business? Assets calculations get complicated! 📊",
    "TayaBot says: 'Salary slip dekho, jahaiz list banao!' 💰"
  ],
  age: [
    "25 saal? Perfect timing for modest expectations! ⏰",
    "30+? Time pressure = premium package boost! ⏳",
    "35+? Aunties will compromise on some items! 😅",
    "TayaBot logic: 'Age se patience, patience se negotiation!' 🧓"
  ],
  fitness: [
    "Gym jaate ho? Extra points for grooming category! 💪",
    "Dad bod? Personality compensation package available! 😄",
    "6-pack? Prepare for upgraded wardrobe expectations! 👕",
    "TayaBot fitness: 'Body building = dowry building!' 🏋️"
  ],
  family: [
    "Joint family? More room furniture needed! 🏠",
    "Nuclear? Smart appliances over quantity! 🔧",
    "4 sisters? Previous dowry experience considered! 👥",
    "Only child? Full family resources available! 👑"
  ],
  disclaimer: [
    "Remember: This is satire - real relationships are built on love and compatibility! ❤️",
    "TayaBot disclaimer: 'Calculator for fun, not for fundamentals!' 🤖",
    "Dowry culture is outdated - this tool is purely educational! 📚",
    "Real worth = Character + Compatibility, not cash! 💝"
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
      case 'upper-middle-class': score = 7; break;
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

  // Generate household items based on tier with variance and regional preferences
  private static generateHouseholdItems(tier: string, regionalMultiplier: any): JahezItem[] {
    const items: JahezItem[] = [];
    const dictionary = DOWRY_DICTIONARY.household;

    // Apply tier-specific selection with variance
    const getTierItems = (category: any, tierName: string) => {
      const tierItems = category[tierName] || category.basic;
      // Add 5-10% variance for realism
      const variance = Math.random() * 0.1 + 0.05; // 5-15% variance
      const itemCount = Math.floor(tierItems.length * (1 + (Math.random() - 0.5) * variance));
      return tierItems.slice(0, Math.max(3, Math.min(tierItems.length, itemCount)));
    };

    // Bedroom items - tier-specific
    items.push({
      category: 'Bedroom',
      item: 'Complete Bedroom Setup',
      minimum: getTierItems(dictionary.bedroom, 'basic').join(', '),
      average: getTierItems(dictionary.bedroom, tier).join(', '),
      maximum: getTierItems(dictionary.bedroom, 'ultraElite').join(', '),
      priority: 'essential'
    });

    // Living room items - tier-specific with regional preference
    const livingItems = getTierItems(dictionary.living, tier);
    if (regionalMultiplier.furniture > 1.2) {
      livingItems.push('Premium regional furniture pieces');
    }
    items.push({
      category: 'Living Room',
      item: 'Drawing Room & Guest Area',
      minimum: getTierItems(dictionary.living, 'basic').join(', '),
      average: livingItems.join(', '),
      maximum: getTierItems(dictionary.living, 'ultraElite').join(', '),
      priority: 'essential'
    });

    // Dining room items
    items.push({
      category: 'Dining Room',
      item: 'Dining Setup & Crockery',
      minimum: getTierItems(dictionary.dining, 'basic').join(', '),
      average: getTierItems(dictionary.dining, tier).join(', '),
      maximum: getTierItems(dictionary.dining, 'ultraElite').join(', '),
      priority: tier === 'basic' ? 'important' : 'essential'
    });

    // Kitchen items - essential for all tiers
    const kitchenItems = getTierItems(dictionary.kitchen, tier);
    items.push({
      category: 'Kitchen',
      item: 'Complete Kitchen Setup',
      minimum: getTierItems(dictionary.kitchen, 'basic').join(', '),
      average: kitchenItems.join(', '),
      maximum: getTierItems(dictionary.kitchen, 'ultraElite').join(', '),
      priority: 'essential'
    });

    // Electronics - regional preference applied
    const electronicsItems = getTierItems(dictionary.electronics, tier);
    if (regionalMultiplier.electronics > 1.1) {
      electronicsItems.push('Additional smart devices', 'Premium entertainment system');
    }
    items.push({
      category: 'Electronics & Appliances',
      item: 'Home Electronics Package',
      minimum: getTierItems(dictionary.electronics, 'basic').join(', '),
      average: electronicsItems.join(', '),
      maximum: getTierItems(dictionary.electronics, 'ultraElite').join(', '),
      priority: 'important'
    });

    // Utilities - infrastructure items
    items.push({
      category: 'Utilities & Infrastructure',
      item: 'Home Utilities Setup',
      minimum: getTierItems(dictionary.utilities, 'basic').join(', '),
      average: getTierItems(dictionary.utilities, tier).join(', '),
      maximum: getTierItems(dictionary.utilities, 'ultraElite').join(', '),
      priority: 'essential'
    });

    return items;
  }

  // Generate transport items with enhanced logic and special cases
  private static generateTransportItems(tier: string, profile: UserProfile, dei: number): JahezItem[] {
    const items: JahezItem[] = [];
    const transportOptions = DOWRY_DICTIONARY.transport;

    // Special overseas cases with enhanced logic
    if (profile.jobLocation === 'gulf' && dei > 70) {
      items.push({
        category: 'Transport',
        item: 'Vehicle Package (Gulf Special)',
        minimum: 'Motorcycle (150cc) + maintenance',
        average: 'Suzuki Alto + motorcycle combo',
        maximum: 'Toyota Hilux Vigo + fuel card (Gulf Special)',
        priority: 'essential'
      });
    } else if ((profile.jobLocation === 'usa' || profile.jobLocation === 'uk') && dei > 75) {
      items.push({
        category: 'Transport',
        item: 'Vehicle Package (UK/USA Premium)',
        minimum: 'Cash equivalent for overseas purchase',
        average: 'Car down payment + insurance',
        maximum: 'BMW/Audi down payment + full package',
        priority: 'essential'
      });
    } else {
      // Local transport based on tier with variance
      const getTransportVariance = (baseOptions: string[]) => {
        const variance = Math.random() * 0.2; // 20% variance
        if (variance > 0.15) {
          return [...baseOptions, 'Plus maintenance package'];
        } else if (variance < 0.05) {
          return baseOptions.slice(0, -1); // Remove last item
        }
        return baseOptions;
      };

      // Professional enhancement for certain careers
      let enhancedOptions = [...transportOptions[tier as keyof typeof transportOptions]];
      if (profile.jobRole.toLowerCase().includes('doctor') && tier !== 'basic') {
        enhancedOptions = enhancedOptions.map(option => 
          option.includes('Corolla') ? 'Toyota Corolla (Doctor Special)' : option
        );
      }
      if (profile.jobRole.toLowerCase().includes('engineer') && dei > 60) {
        enhancedOptions.push('Professional car loan facilitation');
      }

      items.push({
        category: 'Transport',
        item: 'Vehicle & Transportation',
        minimum: transportOptions.basic[0] || 'Motorcycle',
        average: getTransportVariance(enhancedOptions)[0] || 'Suzuki Alto',
        maximum: transportOptions.ultraElite[0] || 'Toyota Fortuner',
        priority: dei > 70 ? 'essential' : 'important'
      });
    }

    // Additional transport considerations based on family type
    if (profile.familyType === 'joint' && tier !== 'basic') {
      items.push({
        category: 'Additional Transport',
        item: 'Family Transport Solution',
        minimum: 'Motorcycle for daily use',
        average: 'Second vehicle or motorcycle',
        maximum: '7-seater family vehicle',
        priority: 'luxury'
      });
    }

    return items;
  }

  // Generate jewelry items with enhanced regional and cultural logic
  private static generateJewelryItems(tier: string, regionalMultiplier: any, profile: UserProfile): JahezItem[] {
    const items: JahezItem[] = [];
    const jewelryData = DOWRY_DICTIONARY.jewelry;

    // Calculate enhanced gold requirements based on multiple factors
    const calculateGoldTolas = (baseTier: string) => {
      const baseMap = {
        basic: { min: 2, max: 3 },
        modest: { min: 4, max: 6 },
        premium: { min: 6, max: 10 },
        elite: { min: 10, max: 15 },
        ultraElite: { min: 15, max: 25 }
      };

      let tolas = baseMap[baseTier as keyof typeof baseMap] || baseMap.basic;
      
      // Regional preference for gold
      if (regionalMultiplier.gold > 1.3) {
        tolas.min += 2;
        tolas.max += 3;
      } else if (regionalMultiplier.gold > 1.1) {
        tolas.min += 1;
        tolas.max += 2;
      }

      // Height bonus (traditional preference)
      if ((profile.height || 0) >= 6.0) {
        tolas.min += 1;
        tolas.max += 2;
      }

      // Foreign location bonus
      if (profile.jobLocation === 'gulf') {
        tolas.min += 2;
        tolas.max += 3;
      } else if (profile.jobLocation === 'usa' || profile.jobLocation === 'uk') {
        tolas.min += 3;
        tolas.max += 5;
      }

      // Family prestige bonus
      if (profile.familyBackground === 'landed-elite') {
        tolas.min += 2;
        tolas.max += 4;
      }

      return `${tolas.min}-${tolas.max} tolas`;
    };

    // Gold jewelry with enhanced calculations
    items.push({
      category: 'Gold Jewelry',
      item: 'Bridal Gold Collection',
      minimum: calculateGoldTolas('basic'),
      average: calculateGoldTolas(tier),
      maximum: calculateGoldTolas('ultraElite'),
      priority: 'essential'
    });

    // Accessories with tier-specific enhancements
    const getAccessories = (tierLevel: string) => {
      const baseAccessories = jewelryData[tierLevel as keyof typeof jewelryData]?.accessories || jewelryData.basic.accessories;
      const enhanced = [...baseAccessories];

      // Add regional preferences
      if (profile.province === 'KPK' || profile.province === 'Balochistan') {
        enhanced.push('Traditional tribal jewelry pieces');
      } else if (profile.province === 'Sindh') {
        enhanced.push('Sindhi cultural jewelry');
      } else if (profile.province === 'Punjab') {
        enhanced.push('Punjabi traditional sets');
      }

      // Professional enhancements
      if (profile.jobRole.toLowerCase().includes('doctor')) {
        enhanced.push('Professional watch upgrade');
      }
      if (profile.jobLocation === 'gulf' || profile.jobLocation === 'usa' || profile.jobLocation === 'uk') {
        enhanced.push('International brand preferences');
      }

      return enhanced.slice(0, Math.min(enhanced.length, tierLevel === 'ultraElite' ? 8 : 6));
    };

    items.push({
      category: 'Accessories & Personal Items',
      item: 'Complete Accessories Package',
      minimum: getAccessories('basic').join(', '),
      average: getAccessories(tier).join(', '),
      maximum: getAccessories('ultraElite').join(', '),
      priority: 'important'
    });

    // Special cultural addition for high-tier families
    if (tier === 'elite' || tier === 'ultraElite') {
      items.push({
        category: 'Precious Items',
        item: 'Heirloom & Investment Pieces',
        minimum: 'Basic investment jewelry',
        average: 'Diamond sets + precious stones',
        maximum: 'Rare gems + platinum collection + family heirlooms',
        priority: 'luxury'
      });
    }

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

    // Digital & Tech items
    items.push({
      category: 'Digital & Technology',
      item: 'Tech & Gadgets',
      minimum: DOWRY_DICTIONARY.digital.basic.join(', '),
      average: DOWRY_DICTIONARY.digital.modest.join(', '),
      maximum: DOWRY_DICTIONARY.digital.ultraElite.join(', '),
      priority: 'important'
    });

    // Clothing & Fashion
    items.push({
      category: 'Clothing & Fashion',
      item: 'Wardrobe & Accessories',
      minimum: DOWRY_DICTIONARY.clothing.basic.join(', '),
      average: DOWRY_DICTIONARY.clothing.modest.join(', '),
      maximum: DOWRY_DICTIONARY.clothing.ultraElite.join(', '),
      priority: 'important'
    });

    // Symbolic & Religious items
    items.push({
      category: 'Religious & Symbolic',
      item: 'Islamic & Cultural Items',
      minimum: DOWRY_DICTIONARY.symbolic.basic.join(', '),
      average: DOWRY_DICTIONARY.symbolic.modest.join(', '),
      maximum: DOWRY_DICTIONARY.symbolic.ultraElite.join(', '),
      priority: 'essential'
    });

    // Miscellaneous items
    items.push({
      category: 'Miscellaneous',
      item: 'Additional Items',
      minimum: DOWRY_DICTIONARY.miscellaneous.basic.join(', '),
      average: DOWRY_DICTIONARY.miscellaneous.modest.join(', '),
      maximum: DOWRY_DICTIONARY.miscellaneous.ultraElite.join(', '),
      priority: 'luxury'
    });

    return items;
  }

  // Calculate total estimated value with enhanced variance and regional factors
  private static calculateTotalValue(tier: string, dei: number, profile: UserProfile): number {
    const baseValues = {
      basic: 350000,
      modest: 850000,
      premium: 1800000,
      elite: 3500000,
      ultraElite: 7000000
    };

    let baseValue = baseValues[tier as keyof typeof baseValues] || baseValues.basic;

    // Apply location multipliers with enhanced logic
    if (profile.jobLocation === 'usa' || profile.jobLocation === 'uk') {
      baseValue *= 2.2; // Increased for Western locations
    } else if (profile.jobLocation === 'gulf') {
      baseValue *= 1.6; // Enhanced Gulf premium
    } else if (profile.jobLocation === 'europe') {
      baseValue *= 1.9; // European premium
    }

    // Regional cost variations
    const regionalData = REGIONAL_MULTIPLIERS[profile.province as keyof typeof REGIONAL_MULTIPLIERS];
    if (regionalData) {
      // Apply regional multipliers
      const avgMultiplier = (regionalData.electronics + regionalData.furniture + 
                           regionalData.vehicles + regionalData.gold) / 4;
      baseValue *= avgMultiplier;
    }

    // City-specific adjustments
    const cityMultipliers: Record<string, number> = {
      'karachi': 1.3,
      'lahore': 1.2,
      'islamabad': 1.25,
      'rawalpindi': 1.15,
      'faisalabad': 1.1,
      'multan': 1.05,
      'peshawar': 1.0,
      'quetta': 0.9
    };
    
    const cityKey = profile.city?.toLowerCase() || '';
    if (cityMultipliers[cityKey]) {
      baseValue *= cityMultipliers[cityKey];
    }

    // Family background impact
    switch (profile.familyBackground) {
      case 'landed-elite':
        baseValue *= 1.4;
        break;
      case 'upper-class':
        baseValue *= 1.2;
        break;
      case 'upper-middle-class':
        baseValue *= 1.15;
        break;
      case 'middle-class':
        baseValue *= 1.0;
        break;
      default:
        baseValue *= 0.8;
    }

    // Professional prestige multipliers
    const jobMultipliers: Record<string, number> = {
      'doctor': 1.3,
      'engineer': 1.2,
      'pilot': 1.4,
      'banker': 1.15,
      'teacher': 0.95,
      'government': 1.1
    };

    for (const [job, multiplier] of Object.entries(jobMultipliers)) {
      if (profile.jobRole.toLowerCase().includes(job)) {
        baseValue *= multiplier;
        break;
      }
    }

    // Age factor (urgency pricing)
    const age = profile.age || 25;
    if (age >= 35) {
      baseValue *= 1.2; // Urgency premium
    } else if (age >= 30) {
      baseValue *= 1.1;
    } else if (age < 23) {
      baseValue *= 0.9; // Young age discount
    }

    // DEI-based fine-tuning
    const deiMultiplier = 0.8 + (dei / 100) * 0.4; // Range: 0.8 to 1.2
    baseValue *= deiMultiplier;

    // Add realistic variance (±15%)
    const variance = (Math.random() - 0.5) * 0.3; // -15% to +15%
    baseValue *= (1 + variance);

    // Seasonal/market variance (±5%)
    const marketVariance = (Math.random() - 0.5) * 0.1;
    baseValue *= (1 + marketVariance);

    return Math.max(100000, baseValue); // Minimum threshold
  }

  // Generate enhanced cultural note with TayaBot AI and regional context
  private static generateCulturalNote(profile: UserProfile, dei: number, tier: string): string {
    const quips: string[] = [];
    const selectedQuips: string[] = [];

    // Location-based commentary with regional context
    if (profile.jobLocation === 'gulf') {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.overseas.slice(0, 2)));
    } else if (profile.jobLocation === 'usa' || profile.jobLocation === 'uk') {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.overseas.slice(2, 4)));
    }

    // Regional preference commentary
    const regionalData = REGIONAL_MULTIPLIERS[profile.province as keyof typeof REGIONAL_MULTIPLIERS];
    if (regionalData) {
      const regionalQuip = CULTURAL_QUIPS.regional.find(q => q.toLowerCase().includes(profile.city?.toLowerCase() || profile.province.toLowerCase()));
      if (regionalQuip) selectedQuips.push(regionalQuip);
      else selectedQuips.push(`${profile.province} preference: ${regionalData.preference}`);
    }

    // Height-based commentary
    if ((profile.height || 0) >= 6.0) {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.height.slice(0, 1)));
    } else if ((profile.height || 0) < 5.6) {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.height.slice(1, 2)));
    } else {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.height.slice(3, 5)));
    }

    // Income-based commentary
    const adjustedIncome = this.getAdjustedIncome(profile.monthlyIncome || 50000, profile.jobLocation);
    if (adjustedIncome >= 500000) {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.income.slice(1, 2)));
    } else if (adjustedIncome >= 100000) {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.income.slice(2, 4)));
    } else {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.income.slice(0, 1)));
    }

    // Education-based commentary
    if (profile.highestDegree === 'phd') {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.education.slice(0, 1)));
    } else if (profile.foreignEducation) {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.education.slice(1, 2)));
    } else if (profile.institutionTier === 'top-tier') {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.education.slice(4, 5)));
    }

    // Age-based commentary
    const age = profile.age || 25;
    if (age >= 35) {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.age.slice(2, 3)));
    } else if (age >= 30) {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.age.slice(1, 2)));
    } else {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.age.slice(0, 1)));
    }

    // Fitness-based commentary
    if (profile.fitnessLevel === 'gym-built') {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.fitness.slice(0, 1)));
    } else if (profile.fitnessLevel === 'overweight') {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.fitness.slice(1, 2)));
    }

    // Family structure commentary
    if (profile.familyType === 'joint') {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.family.slice(0, 1)));
    } else if (profile.familyType === 'nuclear') {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.family.slice(1, 2)));
    }

    // Caste-based commentary (culturally sensitive)
    if (profile.caste === 'Rajput' && profile.province === 'Punjab') {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.caste.slice(0, 1)));
    } else if (profile.caste === 'Syed') {
      selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.caste.slice(1, 2)));
    }

    // Tier-specific TayaBot commentary
    const tierComments = {
      basic: [
        "TayaBot calculates: Character > Cash in basic tier! 💝",
        "Modest expectations, beta. Real gold is in the heart! ❤️",
        "Basic tier doesn't mean basic character! 🌟"
      ],
      modest: [
        "TayaBot approves: Solid middle-class calculations! 👍",
        "Aunties will nod approvingly at these numbers! �",
        "Perfect balance of tradition and practicality! ⚖️"
      ],
      premium: [
        "TayaBot upgrade: Premium package unlocked! 🔓",
        "You're in Corolla territory now, congratulations! 🚗",
        "Premium tier = Premium treatment expected! ✨"
      ],
      elite: [
        "TayaBot elite mode: Fortuner + DHA expectations! 🏠",
        "Elite level achieved! Time for luxury calculations! 💎",
        "Even the pickiest aunties will be impressed! 👑"
      ],
      ultraElite: [
        "TayaBot maximum: Ultra-elite status confirmed! 🚀",
        "You've broken the dowry calculator, beta! 🤖",
        "This level makes aunties plan investment portfolios! �"
      ]
    };

    selectedQuips.push(this.getRandomFromArray(tierComments[tier as keyof typeof tierComments]));

    // Add DEI-based variance commentary
    if (dei >= 90) {
      selectedQuips.push("TayaBot says: 'Calculator overload! Off the charts!' 📊");
    } else if (dei <= 20) {
      selectedQuips.push("TayaBot wisdom: 'Low score, high potential!' 🌱");
    }

    // Random TayaBot quip
    const randomTayaBotQuips = [
      "TayaBot reminder: 'This is scientific satire, not marriage science!' 🧪",
      "TayaBot calculates love as: Undefined variable! ❤️",
      "TayaBot wisdom: 'Compatibility.exe > Dowry.exe' 💻",
      "TayaBot says: 'Real relationships need emotional RAM, not material ROM!' 🧠"
    ];
    selectedQuips.push(this.getRandomFromArray(randomTayaBotQuips));

    // Always add disclaimer
    selectedQuips.push(this.getRandomFromArray(CULTURAL_QUIPS.disclaimer));

    // Remove duplicates and return 3-4 random quips
    const uniqueQuips = Array.from(new Set(selectedQuips));
    const finalQuips = this.shuffleArray(uniqueQuips).slice(0, Math.min(4, uniqueQuips.length));
    
    return finalQuips.join('\n\n');
  }

  // Helper method to get random item from array
  private static getRandomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Helper method to shuffle array
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Helper method to get adjusted income for calculations
  private static getAdjustedIncome(income: number, location: string): number {
    let adjustedIncome = income;
    if (location === 'usa' || location === 'uk') adjustedIncome *= 280;
    if (location === 'gulf') adjustedIncome *= 75;
    if (location === 'europe') adjustedIncome *= 300;
    return adjustedIncome;
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
    const tier = this.determineTier(dei);

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
        deiBreakdown: breakdown,
        tier: tier.charAt(0).toUpperCase() + tier.slice(1) // Capitalize first letter
      },
    };
  }
}
