export const translations = {
  en: {
    title: "Jahez Calculator",
    subtitle: "Jahez ka Andaaza",
    tagline: "Rishta Market ki Science par Mabni",
    steps: {
      personal: "Personal Info",
      physical: "Physical Profile", 
      education: "Education",
      career: "Career",
      social: "Social Background",
      results: "Results"
    },
    culturalNotes: {
      gulf: "Gulf mai job? Prepare for Fortuner + 10 Tolas Gold expectations! 🤝",
      overseas: "Overseas kamai ka matlab hai DHA flat + luxury setup expectations!",
      local: "Local job hai? Thoda modest expectations rakhiye.",
      height: "Boss, with this profile, you're in good territory.",
      education: "Foreign degree definitely adds premium value.",
      family: "Family background plays important role in expectations."
    }
  },
  ur: {
    title: "جہیز کیلکولیٹر",
    subtitle: "Jahez ka Andaaza",
    tagline: "Rishta Market ki Science par Mabni",
    steps: {
      personal: "Shaksi Maloomat",
      physical: "Jismani Profile",
      education: "Taleem",
      career: "Karobar",
      social: "Khandani Background", 
      results: "Nataij"
    },
    culturalNotes: {
      gulf: "Gulf mai job? Fortuner aur 10 tola sona ki umeed rakhiye! 🤝",
      overseas: "Bahar ki kamai ka matlab DHA flat aur luxury setup!",
      local: "Local job hai? Thoda sa modest expectations rakhiye.",
      height: "Boss, is profile ke saath aap achi category mai hain.",
      education: "Foreign degree bilkul premium value add karti hai.",
      family: "Family background expectations mai buhat ahem hai."
    }
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
