# 🧠 Enhanced Jahez Calculator Logic Engine

## 🎯 Overview

The Jahez Calculator has been completely rewritten with an advanced **Dowry Expectation Index (DEI)** system that provides nuanced, culturally-aware, and satirically-accurate dowry calculations based on 17 comprehensive factors.

## ✨ Key Features

### 🔢 Advanced DEI Scoring System
- **17 comprehensive factors** contribute to the final score
- **Region-aware calculations** with province-specific multipliers
- **Caste-sensitive scoring** with cultural context
- **Dynamic tier determination** (Basic → Ultra-Elite)
- **Satirical cultural commentary** with location-aware quips

### 📊 Scoring Factors (DEI Components)

| Factor | Score Range | Description |
|--------|-------------|-------------|
| **Height** | 0-10 | 6'+ = 10 pts, Under 5'6" = 0 pts |
| **Income** | 0-10 | PKR-adjusted with foreign currency conversion |
| **Education** | 0-10 | PhD = 10, Foreign degree bonus |
| **English Fluency** | 0-10 | Self-rated proficiency level |
| **Job Type** | 0-10 | Doctor/Pilot = 10, Teacher = 5 |
| **Foreign Nationality** | 0-10 | USA/UK = 10, Gulf = 5, Local = 0 |
| **Caste Prestige** | 0-5 | Province-specific caste rankings |
| **Religiosity Fit** | -3 to +5 | Balanced = +5, Ultra-extreme = -3 |
| **Family Wealth** | 0-10 | Background + reputation scoring |
| **Grooming & Fitness** | -3 to +5 | Gym-built = +5, Balding = -3 |
| **Property Ownership** | 0-8 | Owned = 5, Inherited = 8 |
| **Social Presence** | -5 to +5 | Professional online presence |
| **Political Connections** | 0-5 | Family political influence |
| **Inheritance Potential** | 0-3 | Expected family wealth transfer |
| **Married Sisters** | -2 to +2 | Previous dowry history impact |
| **Marriage Age** | 0-10 | 35+ = 10 (desperation factor) |
| **Rishta Failures** | -5 to 0 | Previous rejection history |

## 🏆 Tier Classification

| DEI Score | Tier | Expected Dowry Level |
|-----------|------|---------------------|
| 0-30 | **Basic** | Modest setup, motorcycle |
| 31-50 | **Modest** | Average middle-class package |
| 51-70 | **Premium** | Corolla + designer furniture |
| 71-85 | **Elite** | Fortuner + DHA apartment |
| 86-120+ | **Ultra-Elite** | BMW + luxury everything |

## 🗺️ Regional Multipliers

Different provinces have varying cultural expectations:

| Province | Electronics | Furniture | Vehicles | Gold |
|----------|------------|-----------|----------|------|
| **Punjab** | 1.1x | 1.2x | 1.0x | 1.1x |
| **Sindh** | 1.2x | 1.0x | 1.1x | 1.0x |
| **KPK** | 0.9x | 1.0x | 0.9x | 1.2x |
| **Balochistan** | 0.8x | 0.9x | 0.8x | 1.3x |

## 📦 Comprehensive Dowry Dictionary (150+ Items)

### 🏠 Household Categories

#### **Bedroom Setup** (5 tiers)
- **Basic**: Single wooden bed, basic mattress
- **Modest**: Double bed with side tables, dressing table
- **Premium**: King-size designer bed, luxury bedding, LED lighting
- **Elite**: Turkish bed with LED panels, memory foam
- **Ultra-Elite**: Italian suite, smart bed, climate-controlled wardrobe

#### **Kitchen Appliances** (5 tiers)
- **Basic**: Blender, kettle, pressure cooker
- **Modest**: Kenwood pack, microwave, crockery set
- **Premium**: Complete appliance suite, bone china
- **Elite**: Premium brands, built-in oven, Noritake crockery
- **Ultra-Elite**: Smart appliances, wine cooler, crystal glassware

### 🚗 Transport Options
- **Basic**: Motorcycle (CD70), Bicycle
- **Modest**: Suzuki Alto, YBR125
- **Premium**: Cultus, Corolla XLi
- **Elite**: Corolla GLi, Honda Civic
- **Ultra-Elite**: Fortuner, BMW 3 Series

### 💍 Jewelry & Accessories
- **Gold amounts**: 2-3 tolas (Basic) → 15+ tolas (Ultra-Elite)
- **Accessories**: Basic sets → Swiss luxury watches
- **Special items**: Diamond jewelry for Elite+ tiers

## 🎭 Cultural Commentary System

### 📍 Location-Based Quips
- **Gulf Jobs**: "Beta, Fortuner ke bina ghar waapis mat aana! 🚗"
- **USA/UK**: "Overseas kamai = DHA flat expectations!"
- **Local**: "Modest expectations, modest rewards! 📚"

### 👑 Status-Based Comments
- **Height 6'+**: "Automatic Corolla category! 📏"
- **PhD**: "Doctor Sahab level expectations! 🎓"
- **Rajput in Punjab**: "Premium package confirmed! 👑"

## 🔧 Technical Implementation

### 🎲 Dynamic Variance
- **±20% randomization** for realistic estimates
- **Scenario adjustments**: Minimum/Maximum shift tiers by ±1
- **Regional preferences** automatically applied

### 🧮 Value Calculations
```typescript
Base Values by Tier:
- Basic: PKR 300,000
- Modest: PKR 800,000  
- Premium: PKR 1,500,000
- Elite: PKR 3,000,000
- Ultra-Elite: PKR 6,000,000

Location Multipliers:
- USA/UK: 2.0x
- Gulf: 1.5x
- Europe: 1.8x
- Local: 1.0x
```

## 🎪 Satire Mode Features

### 😄 Humorous Elements
- **TayaBot Commentary**: AI uncle giving advice
- **Truck Art Styling**: Cultural visual elements
- **Rishta Approval Seals**: Fake certification system
- **Aunty Approval Ratings**: Social validation metrics

### ⚠️ Cultural Sensitivity
- **Educational Disclaimers**: Clear satirical intent
- **Character Focus**: Emphasizes personality over materialism
- **Love Reminder**: "Real relationships are built on compatibility!"

## 🚀 Usage Examples

### 📋 Sample Input Profile
```typescript
const profile = {
  height: 5.9,
  monthlyIncome: 300000,
  jobLocation: "gulf",
  highestDegree: "mba",
  foreignEducation: true,
  caste: "Rajput",
  province: "Punjab",
  familyBackground: "upper-class"
  // ... other fields
};
```

### 📊 Sample Output
```typescript
{
  scoreBreakdown: {
    totalScore: 78, // Elite tier
    tier: "Elite",
    deiBreakdown: { height: 6, income: 8, education: 7, ... }
  },
  estimates: {
    minimum: { totalEstimatedValue: 2400000, ... },
    average: { totalEstimatedValue: 4200000, ... },
    maximum: { totalEstimatedValue: 7800000, ... }
  }
}
```

## 🎯 Future Enhancements

### 🔮 Planned Features
- **AI-Powered Matching**: Compatibility scoring
- **Market Trends**: Real-time dowry market analysis
- **Regional Dialects**: Language-specific commentary
- **Comparison Tool**: Friend vs. friend calculations
- **PDF Export**: Printable "Rishta CV" generation

### 📈 Analytics Integration
- **Usage Patterns**: Popular configurations
- **Regional Trends**: Province-wise expectations
- **Inflation Adjustments**: Economic factor updates

---

*Remember: This tool is designed for satirical and educational purposes to highlight and critique dowry culture. Real relationships should be based on love, compatibility, and mutual respect! ❤️*
