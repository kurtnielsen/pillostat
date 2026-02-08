export interface Unit {
  id: string;
  name: string;
  tier: 'premium' | 'economy' | 'spacious-premium';
  tagline: string;
  description: string;
  monthlyPrice: number;
  features: string[];
  privacyLevel: 'Full Privacy' | 'Shared Kitchen' | 'Shared Laundry Only';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  available: boolean;
  availableDate?: string;
  perfectFor: string;
}

export const units: Unit[] = [
  {
    id: 'studio-suite',
    name: 'Studio Suite',
    tier: 'premium',
    tagline: 'Complete privacy with waterfront living.',
    description: 'A fully private 450 sqft studio apartment with its own entrance at ground level. Step out onto your private deck for partial bay views while enjoying morning coffee. Modern full kitchen, comfortable queen bed, dedicated work desk, and in-unit washer/dryer make this ideal for professionals who value complete independence. Perfect for day sleepers with blackout curtains and a quiet, private setting.',
    monthlyPrice: 2100,
    features: [
      'Private entrance (ground level)',
      'Private deck with partial bay views',
      'Full kitchen with modern appliances',
      'Queen bed with premium linens',
      'Dedicated work desk with ergonomic chair',
      'In-unit washer/dryer',
      'Blackout curtains (ideal for night shift)',
      'High-speed WiFi (100+ Mbps)',
      'Smart TV with streaming',
      'Dedicated parking spot',
      'Climate control (heating/AC)'
    ],
    privacyLevel: 'Full Privacy',
    bedrooms: 0,
    bathrooms: 1,
    sqft: 450,
    image: '/studio-suite.jpg',
    available: true,
    availableDate: '2024-03-01',
    perfectFor: 'Solo travel nurses, day sleepers, those who value complete privacy'
  },
  {
    id: 'garden-suite',
    name: 'Garden Suite',
    tier: 'economy',
    tagline: 'Comfortable living at a smart price.',
    description: 'A cozy 280 sqft private bedroom and bathroom on the ground floor garden level. Share a well-equipped full kitchen with just one other unit (Upper Retreat). Your private space includes a comfortable queen bed, wardrobe, and desk area. Enjoy access to the shared outdoor garden space. An excellent choice for budget-conscious nurses who appreciate community while maintaining personal privacy.',
    monthlyPrice: 1750,
    features: [
      'Private bedroom (280 sqft)',
      'Private bathroom',
      'Shared full kitchen (with Upper Retreat only)',
      'Queen bed with quality linens',
      'Wardrobe and desk area',
      'Access to shared garden space',
      'Ground floor convenience',
      'High-speed WiFi (100+ Mbps)',
      'Smart TV with streaming',
      'Street parking available',
      'Climate control (heating/AC)'
    ],
    privacyLevel: 'Shared Kitchen',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 280,
    image: '/garden-suite.jpg',
    available: true,
    availableDate: '2024-02-15',
    perfectFor: 'Budget-conscious nurses, social professionals, those who enjoy community'
  },
  {
    id: 'upper-retreat',
    name: 'Upper Retreat',
    tier: 'spacious-premium',
    tagline: 'Expansive living with stunning bay views.',
    description: 'The entire 850 sqft upper level is your private retreat. Wake up to breathtaking views of Liberty Bay and the Olympic Mountains from your master bedroom. Enjoy a full kitchen, spacious living room, and cozy den for work or relaxation. Step out onto your private deck overlooking the water. Only laundry is shared. Ideal for nurses who want room to spread out, or couples on assignment together.',
    monthlyPrice: 2200,
    features: [
      'Entire upper floor (850 sqft)',
      'Master bedroom with bay views',
      'Views of Olympic Mountains',
      'Full kitchen',
      'Living room and den',
      'Private deck overlooking Liberty Bay',
      'Shared laundry only',
      'High-speed WiFi (100+ Mbps)',
      'Smart TV with streaming',
      'Dedicated parking spot',
      'Climate control (heating/AC)',
      'Abundant natural light'
    ],
    privacyLevel: 'Shared Laundry Only',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 850,
    image: '/upper-retreat.jpg',
    available: false,
    availableDate: '2024-04-01',
    perfectFor: 'Nurses wanting space, couples on assignment, those who love waterfront views'
  }
];

export const contractLengths = [
  { weeks: 8, label: '8 weeks', discount: 0, description: 'Standard contract' },
  { weeks: 13, label: '13 weeks', discount: 5, description: '5% discount' },
  { weeks: 26, label: '26 weeks', discount: 10, description: '10% discount' },
];

export const fees = {
  securityDeposit: 'One month rent',
  cleaningFee: 175,
};

export function calculateMonthlyRate(basePrice: number, discountPercent: number): number {
  return Math.round(basePrice * (1 - discountPercent / 100));
}

export function calculateTotalCost(
  monthlyPrice: number,
  weeks: number,
  discountPercent: number
): { monthlyRate: number; totalRent: number; securityDeposit: number; cleaningFee: number; total: number } {
  const monthlyRate = calculateMonthlyRate(monthlyPrice, discountPercent);
  const months = weeks / 4;
  const totalRent = Math.round(monthlyRate * months);
  const securityDeposit = monthlyRate;
  const cleaningFee = fees.cleaningFee;

  return {
    monthlyRate,
    totalRent,
    securityDeposit,
    cleaningFee,
    total: totalRent + securityDeposit + cleaningFee
  };
}
