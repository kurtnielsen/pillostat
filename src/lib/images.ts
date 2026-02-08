// Property image configuration
// Uses local images from /public/images/ when available, falls back to Unsplash placeholders

export interface PropertyImage {
  id: string;
  src: string;
  alt: string;
  category: 'exterior' | 'interior' | 'kitchen' | 'bedroom' | 'bathroom' | 'outdoor' | 'view';
  featured?: boolean;
}

// Main property images - using real photos from the property
export const propertyImages: PropertyImage[] = [
  {
    id: 'hero',
    src: '/images/property/hero.jpg',
    alt: 'Craftsman waterfront home with curved balcony in Poulsbo WA',
    category: 'exterior',
    featured: true,
  },
  {
    id: 'exterior',
    src: '/images/property/exterior-1.jpg',
    alt: 'Property view from driveway surrounded by evergreens',
    category: 'exterior',
  },
  {
    id: 'living-room',
    src: '/images/property/living-room.jpg',
    alt: 'Living room with stone fireplace and hardwood floors',
    category: 'interior',
  },
  {
    id: 'dining',
    src: '/images/property/dining.jpg',
    alt: 'Dining room with panoramic bay windows and water views',
    category: 'interior',
  },
  {
    id: 'kitchen',
    src: '/images/property/kitchen.jpg',
    alt: 'Kitchen with stainless appliances and stained glass accent',
    category: 'kitchen',
  },
  {
    id: 'bedroom',
    src: '/images/property/bedroom-1.jpg',
    alt: 'Master bedroom with elegant headboard and bay views',
    category: 'bedroom',
  },
  {
    id: 'bathroom',
    src: '/images/property/bathroom-1.jpg',
    alt: 'Spa bathroom with teal tile and soaking tub',
    category: 'bathroom',
  },
  {
    id: 'deck',
    src: '/images/property/deck.jpg',
    alt: 'Deck with folding glass doors opening to water views',
    category: 'outdoor',
  },
  {
    id: 'view',
    src: '/images/property/view.jpg',
    alt: 'Forest and water views from the property',
    category: 'view',
  },
];

// Fallback Unsplash images (used when local images aren't available)
export const fallbackImages: Record<string, string> = {
  'hero': 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&h=1080&fit=crop',
  'waterfront': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=800&fit=crop',
  'living-room': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
  'kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop',
  'bedroom': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop',
  'bathroom': 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
  'deck': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
  'view': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
  'exterior': 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop',
};

// Unit-specific images - real photos from the property
export const unitImages: Record<string, { src: string; fallback: string; alt: string }[]> = {
  'studio-suite': [
    {
      src: '/images/units/studio-living.jpg',
      fallback: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      alt: 'Cozy sitting area with nautical painting and natural light'
    },
    {
      src: '/images/units/studio-kitchen.jpg',
      fallback: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      alt: 'Fully equipped kitchen with stained glass accent'
    },
    {
      src: '/images/units/studio-bed.jpg',
      fallback: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
      alt: 'Comfortable sleeping area with quality furnishings'
    },
    {
      src: '/images/units/studio-bath.jpg',
      fallback: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      alt: 'Modern bathroom with teal tile and soaking tub'
    },
    {
      src: '/images/units/studio-patio.jpg',
      fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      alt: 'Private balcony with bistro seating and forest views'
    },
  ],
  'garden-suite': [
    {
      src: '/images/units/garden-bedroom.jpg',
      fallback: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
      alt: 'Quiet bedroom with bay window and sitting area'
    },
    {
      src: '/images/units/garden-bath.jpg',
      fallback: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      alt: 'Private bathroom with modern fixtures'
    },
    {
      src: '/images/units/garden-shared-kitchen.jpg',
      fallback: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      alt: 'Access to fully-equipped shared kitchen'
    },
  ],
  'upper-retreat': [
    {
      src: '/images/units/upper-living.jpg',
      fallback: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
      alt: 'Spacious living room with French doors to balcony'
    },
    {
      src: '/images/units/upper-kitchen.jpg',
      fallback: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
      alt: 'Full kitchen with stainless appliances'
    },
    {
      src: '/images/units/upper-bedroom.jpg',
      fallback: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
      alt: 'Master bedroom with elegant carved headboard'
    },
    {
      src: '/images/units/upper-deck.jpg',
      fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      alt: 'Private balcony with bistro set and treetop views'
    },
    {
      src: '/images/units/upper-view.jpg',
      fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Serene views of forest and Liberty Bay'
    },
  ],
};

// Gallery images for the main property gallery
export const galleryImages = [
  {
    id: 1,
    src: '/images/property/hero.jpg',
    fallback: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=800&fit=crop',
    alt: 'Waterfront home exterior',
    category: 'Exterior',
  },
  {
    id: 2,
    src: '/images/property/exterior-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop',
    alt: 'Property from driveway',
    category: 'Exterior',
  },
  {
    id: 3,
    src: '/images/property/living-room.jpg',
    fallback: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
    alt: 'Living room with stone fireplace',
    category: 'Living Room',
  },
  {
    id: 4,
    src: '/images/property/dining.jpg',
    fallback: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&h=800&fit=crop',
    alt: 'Dining room with bay windows',
    category: 'Dining',
  },
  {
    id: 5,
    src: '/images/property/kitchen.jpg',
    fallback: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop',
    alt: 'Modern kitchen with stainless appliances',
    category: 'Kitchen',
  },
  {
    id: 6,
    src: '/images/property/bedroom-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop',
    alt: 'Master bedroom',
    category: 'Bedroom',
  },
  {
    id: 7,
    src: '/images/property/bathroom-1.jpg',
    fallback: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop',
    alt: 'Spa bathroom with soaking tub',
    category: 'Bathroom',
  },
  {
    id: 8,
    src: '/images/property/deck.jpg',
    fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
    alt: 'Deck with folding glass doors',
    category: 'Deck',
  },
  {
    id: 9,
    src: '/images/property/view.jpg',
    fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    alt: 'Water and forest views',
    category: 'View',
  },
];

// Helper to get image with fallback
export function getImageSrc(localPath: string, fallbackUrl: string): string {
  // In production, you'd check if local file exists
  // For now, we'll use a client-side approach with onError
  return localPath;
}
