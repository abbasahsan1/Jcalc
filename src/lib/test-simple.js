const { JahezCalculator } = require('./calculator.js');

// Test profile for verification
const testProfile = {
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
console.log("🧠 Testing Enhanced Jahez Calculator Logic Engine...\n");

try {
  const result = JahezCalculator.calculateJahez(testProfile);
  
  console.log("📊 RESULTS:");
  console.log("=".repeat(50));
  console.log(`👤 Profile: ${testProfile.fullName}`);
  console.log(`🏆 DEI Tier: ${result.scoreBreakdown.tier}`);
  console.log(`📈 Total DEI Score: ${result.scoreBreakdown.totalScore}/120`);
  console.log("");
  
  console.log("💰 ESTIMATED VALUES:");
  console.log(`📉 Minimum: PKR ${result.estimates.minimum.totalEstimatedValue.toLocaleString()}`);
  console.log(`📊 Average: PKR ${result.estimates.average.totalEstimatedValue.toLocaleString()}`);
  console.log(`📈 Maximum: PKR ${result.estimates.maximum.totalEstimatedValue.toLocaleString()}`);
  console.log("");
  
  console.log("🎭 CULTURAL NOTE:");
  console.log(`"${result.estimates.average.culturalNote}"`);
  console.log("");
  
  console.log("📋 SAMPLE ITEMS (Average Tier):");
  result.estimates.average.categories.householdSetup.forEach(item => {
    console.log(`• ${item.category}: ${item.average}`);
  });
  
  console.log("\n✅ Enhanced Logic Engine Test Successful!");
  
} catch (error) {
  console.error("❌ Test Failed:", error.message);
}

module.exports = { testProfile };
