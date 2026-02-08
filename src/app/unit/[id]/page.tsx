import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import BookingWidget from '@/components/BookingWidget';
import UnitFloorPlan from '@/components/UnitFloorPlan';
import { units, contractLengths } from '@/lib/units';

interface PageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return units.map((unit) => ({
    id: unit.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const unit = units.find((u) => u.id === params.id);
  if (!unit) {
    return { title: 'Unit Not Found - pillowSTAT' };
  }
  return {
    title: `${unit.name} - pillowSTAT | Travel Nurse Housing in Poulsbo, WA`,
    description: unit.description,
  };
}

// Unit-specific images based on unit type
const unitImages: Record<string, { src: string; alt: string; category: string }[]> = {
  'studio-suite': [
    { src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop', alt: 'Private studio suite entrance', category: 'Entrance' },
    { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop', alt: 'Studio living area with kitchenette', category: 'Living' },
    { src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop', alt: 'Cozy studio bedroom area', category: 'Bedroom' },
    { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop', alt: 'Modern studio bathroom', category: 'Bathroom' },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop', alt: 'Private patio area', category: 'Patio' },
  ],
  'garden-suite': [
    { src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop', alt: 'Garden suite bedroom', category: 'Bedroom' },
    { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop', alt: 'Shared kitchen area', category: 'Kitchen' },
    { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop', alt: 'Private bathroom', category: 'Bathroom' },
    { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', alt: 'Garden view from window', category: 'View' },
  ],
  'upper-retreat': [
    { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop', alt: 'Spacious upper level living room', category: 'Living Room' },
    { src: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=800&fit=crop', alt: 'Water view from the deck', category: 'Deck View' },
    { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop', alt: 'Full kitchen with island', category: 'Kitchen' },
    { src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&h=800&fit=crop', alt: 'Master bedroom with view', category: 'Master Bedroom' },
    { src: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=800&fit=crop', alt: 'Full bathroom', category: 'Bathroom' },
    { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=800&fit=crop', alt: 'Private deck with seating', category: 'Deck' },
  ],
};

// Amenity categories with icons
const amenityCategories = [
  {
    title: 'Kitchen & Dining',
    items: ['Refrigerator', 'Microwave', 'Coffee maker', 'Toaster', 'Dishes & utensils', 'Pots & pans', 'Dishwasher', 'Oven/Stovetop'],
  },
  {
    title: 'Bedroom & Bath',
    items: ['Premium mattress', 'Quality bedding', 'Extra pillows', 'Blackout curtains', 'Towels provided', 'Hair dryer', 'Iron & board'],
  },
  {
    title: 'Entertainment & Work',
    items: ['Smart TV', 'Streaming apps', 'High-speed WiFi (100+ Mbps)', 'Desk workspace', 'Good lighting'],
  },
  {
    title: 'Comfort & Climate',
    items: ['Central heating', 'Ceiling fans', 'Air conditioning', 'Thermostat control'],
  },
  {
    title: 'Outdoor',
    items: ['Private/shared deck', 'Outdoor seating', 'Water views', 'Garden access'],
  },
];

// Similar units logic
function getSimilarUnits(currentId: string) {
  return units.filter((u) => u.id !== currentId).slice(0, 2);
}

// Availability calendar mock data
const getAvailabilityData = (unitId: string) => {
  const today = new Date();
  const months = [];
  for (let i = 0; i < 3; i++) {
    const month = new Date(today.getFullYear(), today.getMonth() + i, 1);
    months.push({
      name: month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      available: i > 0 || unitId !== 'upper-retreat', // Upper retreat not available first month
    });
  }
  return months;
};

export default function UnitDetailPage({ params }: PageProps) {
  const unit = units.find((u) => u.id === params.id);

  if (!unit) {
    notFound();
  }

  const similarUnits = getSimilarUnits(unit.id);
  const availability = getAvailabilityData(unit.id);
  const images = unitImages[unit.id] || unitImages['studio-suite'];

  const tierColors = {
    premium: 'bg-amber-100 text-amber-800',
    economy: 'bg-green-100 text-green-800',
    'spacious-premium': 'bg-blue-100 text-blue-800',
  };

  const tierLabels = {
    premium: 'Premium',
    economy: 'Best Value',
    'spacious-premium': 'Most Space',
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary-600 hover:text-primary-700">
              Home
            </Link>
            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/#units" className="text-primary-600 hover:text-primary-700">
              Units
            </Link>
            <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-neutral-600">{unit.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section with Gallery */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Unit Title */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${tierColors[unit.tier]}`}>
                  {tierLabels[unit.tier]}
                </span>
                <span className="text-sm text-neutral-500">{unit.privacyLevel}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">{unit.name}</h1>
              <p className="text-lg text-primary-600 font-medium mt-1">{unit.tagline}</p>
            </div>
            <div className="mt-4 lg:mt-0 text-right">
              <div className="text-3xl font-bold text-primary-600">
                ${unit.monthlyPrice.toLocaleString()}
                <span className="text-lg text-neutral-500 font-normal">/month</span>
              </div>
              <p className="text-sm text-neutral-500">Longer stays save up to 10%</p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <div className="col-span-2 row-span-2 relative group cursor-pointer">
              <Image
                src={images[0].src}
                alt={images[0].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </div>
            {images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative group cursor-pointer">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <span className="absolute bottom-2 left-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                  {image.category}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-6 p-4 bg-neutral-50 rounded-xl">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span className="font-medium text-neutral-900">{unit.sqft} sq ft</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium text-neutral-900">{unit.bedrooms === 0 ? 'Studio' : `${unit.bedrooms} Bedroom`}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
              <span className="font-medium text-neutral-900">{unit.bathrooms} Bathroom</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium text-neutral-900">Liberty Bay, Poulsbo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">About This Unit</h2>
                <p className="text-neutral-600 text-lg leading-relaxed">{unit.description}</p>
                <p className="text-neutral-600 mt-4 leading-relaxed">
                  Located in a quiet waterfront neighborhood on Liberty Bay, this unit offers the perfect retreat for healthcare professionals.
                  Enjoy stunning views of the Olympic Mountains, easy access to downtown Poulsbo's charming shops and restaurants,
                  and a peaceful environment to recharge between shifts.
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Unit Features</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {unit.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-neutral-200">
                      <svg className="w-5 h-5 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floor Plan */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Floor Plan</h2>
                <div className="bg-white rounded-xl border border-neutral-200 p-6">
                  <div className="max-w-md mx-auto">
                    <UnitFloorPlan unitId={unit.id} />
                  </div>
                </div>
              </div>

              {/* All Amenities */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">All Amenities</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {amenityCategories.map((category) => (
                    <div key={category.title} className="bg-white rounded-xl border border-neutral-200 p-5">
                      <h3 className="font-semibold text-neutral-900 mb-3">{category.title}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-neutral-600">
                            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability Calendar Preview */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Availability</h2>
                <div className="bg-white rounded-xl border border-neutral-200 p-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    {availability.map((month) => (
                      <div
                        key={month.name}
                        className={`p-4 rounded-lg text-center ${
                          month.available
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <div className="font-medium text-neutral-900">{month.name}</div>
                        <div className={`text-sm mt-1 ${month.available ? 'text-green-600' : 'text-red-600'}`}>
                          {month.available ? 'Available' : 'Booked'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-500 mt-4 text-center">
                    Contact us for specific date availability
                  </p>
                </div>
              </div>

              {/* Pricing Table */}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Pricing</h2>
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="text-left py-4 px-6 font-medium text-neutral-700">Contract Length</th>
                        <th className="text-center py-4 px-6 font-medium text-neutral-700">Discount</th>
                        <th className="text-right py-4 px-6 font-medium text-neutral-700">Monthly Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contractLengths.map((length) => {
                        const discountedPrice = Math.round(unit.monthlyPrice * (1 - length.discount / 100));
                        return (
                          <tr key={length.weeks} className="border-t border-neutral-100">
                            <td className="py-4 px-6 font-medium text-neutral-900">{length.label}</td>
                            <td className="py-4 px-6 text-center">
                              {length.discount > 0 ? (
                                <span className="text-green-600 font-medium">{length.discount}% off</span>
                              ) : (
                                <span className="text-neutral-400">-</span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <span className="font-semibold text-primary-600">${discountedPrice.toLocaleString()}</span>
                              <span className="text-neutral-500">/mo</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <BookingWidget sticky unitId={unit.id} />
            </div>
          </div>
        </div>
      </section>

      {/* Similar Units */}
      <section className="py-12 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6">Other Available Units</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {similarUnits.map((similarUnit) => (
              <Link
                key={similarUnit.id}
                href={`/unit/${similarUnit.id}`}
                className="group bg-neutral-50 rounded-xl overflow-hidden border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all"
              >
                <div className="relative h-48">
                  <Image
                    src={unitImages[similarUnit.id]?.[0]?.src || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop'}
                    alt={similarUnit.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${tierColors[similarUnit.tier]}`}>
                    {tierLabels[similarUnit.tier]}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900 group-hover:text-primary-600 transition-colors">
                        {similarUnit.name}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-1">{similarUnit.privacyLevel}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-primary-600">${similarUnit.monthlyPrice.toLocaleString()}</span>
                      <span className="text-neutral-500 text-sm">/mo</span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4 text-sm text-neutral-600">
                    <span>{similarUnit.sqft} sqft</span>
                    <span>{similarUnit.bedrooms === 0 ? 'Studio' : `${similarUnit.bedrooms} bed`}</span>
                    <span>{similarUnit.bathrooms} bath</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Make This Your Home?</h2>
          <p className="text-primary-100 text-lg mb-8">
            Apply now and get a response within 24 hours. Secure your perfect space for your next contract.
          </p>
          <a
            href={`/#apply?unit=${unit.id}`}
            className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-lg"
          >
            Apply for {unit.name}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
