'use client';

import { useEffect, useRef } from 'react';
import { Unit } from '@/lib/units';
import UnitFloorPlan from './UnitFloorPlan';

interface UnitDetailModalProps {
  unit: Unit;
  isOpen: boolean;
  onClose: () => void;
}

// Room breakdown data for each unit
const unitRoomDetails: Record<string, { rooms: { name: string; size: string; icon: string; features: string[] }[] }> = {
  'studio-suite': {
    rooms: [
      {
        name: 'Living/Sleeping Area',
        size: '270 sqft',
        icon: 'bed',
        features: ['Queen bed', 'Sofa', 'Work desk', 'Smart TV']
      },
      {
        name: 'Full Kitchen',
        size: '80 sqft',
        icon: 'kitchen',
        features: ['Full-size fridge', 'Stove/oven', 'Microwave', 'Dishwasher']
      },
      {
        name: 'Full Bathroom',
        size: '48 sqft',
        icon: 'bath',
        features: ['Shower/tub combo', 'Vanity', 'Storage']
      },
      {
        name: 'Private Patio',
        size: '50 sqft',
        icon: 'outdoor',
        features: ['Outdoor seating', 'Private entrance']
      }
    ]
  },
  'garden-suite': {
    rooms: [
      {
        name: 'Private Bedroom',
        size: '168 sqft',
        icon: 'bed',
        features: ['Queen bed', 'Wardrobe', 'Work desk', 'Smart TV']
      },
      {
        name: 'Private Bathroom',
        size: '60 sqft',
        icon: 'bath',
        features: ['Walk-in shower', 'Vanity', 'Locking door']
      },
      {
        name: 'Shared Kitchen',
        size: 'Access',
        icon: 'kitchen',
        features: ['Full appliances', 'Shared with 1 unit', 'Designated storage']
      },
      {
        name: 'Ground Floor',
        size: 'Easy Access',
        icon: 'access',
        features: ['No stairs', 'Garden view', 'Street parking']
      }
    ]
  },
  'upper-retreat': {
    rooms: [
      {
        name: 'Master Bedroom',
        size: '224 sqft',
        icon: 'bed',
        features: ['King bed', 'Walk-in closet', 'Ensuite bath access']
      },
      {
        name: 'Living Room',
        size: '240 sqft',
        icon: 'living',
        features: ['Sofa', 'Entertainment center', 'Natural light']
      },
      {
        name: 'Full Kitchen',
        size: '120 sqft',
        icon: 'kitchen',
        features: ['Full-size appliances', 'Breakfast bar', 'Pantry']
      },
      {
        name: 'Den/Office',
        size: '100 sqft',
        icon: 'office',
        features: ['Desk space', 'Quiet area', 'Storage']
      },
      {
        name: 'Full Bathroom',
        size: '72 sqft',
        icon: 'bath',
        features: ['Shower/tub', 'Double vanity', 'Linen closet']
      },
      {
        name: 'Private Deck',
        size: '80 sqft',
        icon: 'outdoor',
        features: ['Water view', 'Outdoor seating', 'Morning sun']
      }
    ]
  }
};

const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'bed':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18M3 12v6m0-6V9a3 3 0 013-3h12a3 3 0 013 3v3m-18 6h18m-18 0v2m18-2v2M5 6h14" />
        </svg>
      );
    case 'bath':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7h8" />
        </svg>
      );
    case 'kitchen':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2m14 0v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8m14 0H5m7 4v4" />
        </svg>
      );
    case 'living':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    case 'outdoor':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        </svg>
      );
    case 'office':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'access':
      return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    default:
      return null;
  }
};

const tierColors = {
  'premium': { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' },
  'economy': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  'spacious-premium': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
};

const tierLabels = {
  'premium': 'Premium',
  'economy': 'Best Value',
  'spacious-premium': 'Most Space',
};

export default function UnitDetailModal({ unit, isOpen, onClose }: UnitDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const roomDetails = unitRoomDetails[unit.id];
  const tier = tierColors[unit.tier];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-neutral-100 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-neutral-900">{unit.name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${tier.bg} ${tier.text}`}>
                {tierLabels[unit.tier]}
              </span>
            </div>
            <p className="text-primary-600 font-medium">{unit.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Size</p>
                <p className="font-semibold text-neutral-900">{unit.sqft} sqft</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Bedrooms</p>
                <p className="font-semibold text-neutral-900">{unit.bedrooms === 0 ? 'Studio' : unit.bedrooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Bathrooms</p>
                <p className="font-semibold text-neutral-900">{unit.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Privacy</p>
                <p className="font-semibold text-neutral-900">{unit.privacyLevel}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <div className="text-right">
                <p className="text-sm text-neutral-500">Monthly Rate</p>
                <p className="text-2xl font-bold text-primary-600">${unit.monthlyPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Floor Plan Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Floor Plan Layout
            </h3>
            <div className="bg-neutral-50 rounded-xl p-6 mb-4">
              <UnitFloorPlan unitId={unit.id} compact={false} />
            </div>
            <p className="text-sm text-neutral-500 text-center italic">
              Layout is approximate. Actual dimensions may vary slightly.
            </p>
          </div>

          {/* Room by Room Breakdown */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Room-by-Room Breakdown
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {roomDetails?.rooms.map((room, index) => (
                <div
                  key={index}
                  className="bg-white border border-neutral-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 flex-shrink-0">
                      {getIcon(room.icon)}
                    </div>
                    <div>
                      <h4 className="font-medium text-neutral-900">{room.name}</h4>
                      <p className="text-sm text-primary-600 font-medium">{room.size}</p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {room.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-neutral-600">
                        <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* All Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              All Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {unit.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`#apply?unit=${unit.id}`}
              onClick={onClose}
              className={`flex-1 text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                unit.available
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {unit.available ? 'Check Availability' : 'Join Waitlist'}
            </a>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-6 py-3 border border-neutral-300 rounded-lg font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
