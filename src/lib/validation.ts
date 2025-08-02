import { UserProfile } from '@/types';

export interface ValidationError {
  field: string;
  message: string;
}

export class FormValidator {
  static validatePersonalInfo(data: Partial<UserProfile>): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data.fullName?.trim()) {
      errors.push({ field: 'fullName', message: 'Full name is required' });
    }

    if (!data.age || data.age < 18 || data.age > 65) {
      errors.push({ field: 'age', message: 'Age must be between 18 and 65' });
    }

    if (!data.province) {
      errors.push({ field: 'province', message: 'Province is required' });
    }

    if (!data.city?.trim()) {
      errors.push({ field: 'city', message: 'City is required' });
    }

    if (!data.areaType) {
      errors.push({ field: 'areaType', message: 'Area type is required' });
    }

    if (!data.caste) {
      errors.push({ field: 'caste', message: 'Caste/Biradari is required' });
    }

    return errors;
  }

  static validatePhysicalProfile(data: Partial<UserProfile>): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data.height || data.height < 4.5 || data.height > 7.0) {
      errors.push({ field: 'height', message: 'Height must be between 4.5 and 7.0 feet' });
    }

    if (!data.weight || data.weight < 40 || data.weight > 200) {
      errors.push({ field: 'weight', message: 'Weight must be between 40 and 200 kg' });
    }

    if (!data.complexion) {
      errors.push({ field: 'complexion', message: 'Complexion is required' });
    }

    if (!data.grooming) {
      errors.push({ field: 'grooming', message: 'Grooming style is required' });
    }

    if (!data.beard) {
      errors.push({ field: 'beard', message: 'Beard preference is required' });
    }

    if (!data.fitnessLevel) {
      errors.push({ field: 'fitnessLevel', message: 'Fitness level is required' });
    }

    if (!data.hairlineStatus) {
      errors.push({ field: 'hairlineStatus', message: 'Hairline status is required' });
    }

    return errors;
  }

  static validateEducation(data: Partial<UserProfile>): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data.highestDegree) {
      errors.push({ field: 'highestDegree', message: 'Highest degree is required' });
    }

    if (!data.institutionTier) {
      errors.push({ field: 'institutionTier', message: 'Institution tier is required' });
    }

    if (!data.englishFluency) {
      errors.push({ field: 'englishFluency', message: 'English fluency level is required' });
    }

    if (!data.religiousKnowledge) {
      errors.push({ field: 'religiousKnowledge', message: 'Religious knowledge level is required' });
    }

    return errors;
  }

  static validateCareer(data: Partial<UserProfile>): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data.jobRole?.trim()) {
      errors.push({ field: 'jobRole', message: 'Job role is required' });
    }

    if (!data.employmentType) {
      errors.push({ field: 'employmentType', message: 'Employment type is required' });
    }

    if (!data.monthlyIncome || data.monthlyIncome < 0) {
      errors.push({ field: 'monthlyIncome', message: 'Monthly income is required' });
    }

    if (!data.jobLocation) {
      errors.push({ field: 'jobLocation', message: 'Job location is required' });
    }

    if (!data.homeOwnership) {
      errors.push({ field: 'homeOwnership', message: 'Home ownership status is required' });
    }

    if (!data.taxStatus) {
      errors.push({ field: 'taxStatus', message: 'Tax status is required' });
    }

    return errors;
  }

  static validateSocial(data: Partial<UserProfile>): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!data.familyBackground) {
      errors.push({ field: 'familyBackground', message: 'Family background is required' });
    }

    if (!data.fatherProfession?.trim()) {
      errors.push({ field: 'fatherProfession', message: 'Father\'s profession is required' });
    }

    if (!data.motherEducation) {
      errors.push({ field: 'motherEducation', message: 'Mother\'s education is required' });
    }

    if (!data.familyReputation) {
      errors.push({ field: 'familyReputation', message: 'Family reputation is required' });
    }

    if (!data.familyType) {
      errors.push({ field: 'familyType', message: 'Family type is required' });
    }

    if (data.numberOfSiblings === undefined || data.numberOfSiblings < 0) {
      errors.push({ field: 'numberOfSiblings', message: 'Number of siblings is required' });
    }

    if (!data.birthOrder) {
      errors.push({ field: 'birthOrder', message: 'Birth order is required' });
    }

    if (!data.religiousInclination) {
      errors.push({ field: 'religiousInclination', message: 'Religious inclination is required' });
    }

    if (!data.lifestylePreference) {
      errors.push({ field: 'lifestylePreference', message: 'Lifestyle preference is required' });
    }

    return errors;
  }

  static validateComplete(data: Partial<UserProfile>): boolean {
    const allErrors = [
      ...this.validatePersonalInfo(data),
      ...this.validatePhysicalProfile(data),
      ...this.validateEducation(data),
      ...this.validateCareer(data),
      ...this.validateSocial(data)
    ];

    return allErrors.length === 0;
  }
}
