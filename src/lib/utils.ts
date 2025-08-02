import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatHeight(height: number): string {
  const feet = Math.floor(height)
  const inches = Math.round((height - feet) * 12)
  return `${feet}'${inches}"`
}

export const PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Islamabad Capital Territory',
  'Gilgit-Baltistan',
  'Azad Kashmir'
]

export const CASTES = [
  'Syed',
  'Jutt',
  'Rajput',
  'Pathan',
  'Gujjar',
  'Arain',
  'Sheikh',
  'Malik',
  'Awan',
  'Butt',
  'Chaudhry',
  'Other'
]

export const JOB_ROLES = [
  'Doctor',
  'Engineer',
  'IT Professional',
  'Teacher',
  'Businessman',
  'Civil Servant',
  'Banker',
  'Lawyer',
  'Pilot',
  'Armed Forces',
  'Other'
]

export const PROFESSIONAL_CERTIFICATIONS = [
  'MBBS',
  'ACCA',
  'CFA',
  'PMP',
  'CISSP',
  'AWS Certified',
  'Microsoft Certified',
  'Google Certified',
  'Cisco Certified',
  'Oracle Certified',
  'Other'
]
