'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Unit } from '@/lib/units';
import UnitDetailModal from './UnitDetailModal';

interface UnitCardProps {
  unit: Unit;
}

// Unit-specific hero images
const unitImages: Record<string, string> = {
  'studio-suite': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
  'garden-suite': 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop',
  'upper-retreat': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=400&fit=crop',
};

export default function UnitCard({ unit }: UnitCardProps) {
  const [showModal, setShowModal] = useState(false);

  const tierColors = {
    'premium': 'bg-amber-100 text-amber-800',
    'economy': 'bg-green-100 text-green-800',
    'spacious-premium': 'bg-blue-100 text-blue-800',
  };

  const tierLabels = {
    'premium': 'Premium',
    'economy': 'Best Value',
    'spacious-premium': 'Most Space',
  };

  return (
    <>
      <div className="card group hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Image with overlay */}
        <Link
          href={`/unit/${unit.id}`}
          className="relative h-56 -mx-6 -mt-6 mb-5 block overflow-hidden"
        >
          <Image
            src={unitImages[unit.id] || unitImages['studio-suite']}
            alt={`${unit.name} interior`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Tier Badge */}
          <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${tierColors[unit.tier]} shadow-sm`}>
            {tierLabels[unit.tier]}
          </span>

          {/* Sqft Badge */}
          <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium bg-white/95 text-neutral-700 shadow-sm">
            {unit.sqft} sq ft
          </span>

          {/* Availability Overlay */}
          {!unit.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white px-5 py-2.5 rounded-full text-sm font-medium text-neutral-700 shadow-lg">
                Available {unit.availableDate}
              </span>
            </div>
          )}

          {/* Price on image */}
          <div className="absolute bottom-4 left-4">
            <span className="text-2xl font-bold text-white">${unit.monthlyPrice.toLocaleString()}</span>
            <span className="text-white/80 text-sm">/mo</span>
          </div>

          {/* View button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-white text-primary-700 px-5 py-2.5 rounded-full text-sm font-semibold shadow-xl flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <Link href={`/unit/${unit.id}`}>
              <h3 className="text-xl font-semibold text-neutral-900 hover:text-primary-600 transition-colors">
                {unit.name}
              </h3>
            </Link>
          </div>

          <p className="text-primary-600 font-medium text-sm mb-3">{unit.tagline}</p>
          <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{unit.description}</p>

          {/* Quick stats */}
          <div className="flex gap-4 text-sm text-neutral-500 mb-4">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {unit.bedrooms === 0 ? 'Studio' : `${unit.bedrooms} bed`}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
              {unit.bathrooms} bath
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {unit.sqft} sqft
            </span>
          </div>

          {/* Privacy level badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-medium text-neutral-500">Privacy:</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              unit.privacyLevel === 'Full Privacy'
                ? 'bg-primary-100 text-primary-700'
                : unit.privacyLevel === 'Shared Laundry Only'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-neutral-100 text-neutral-600'
            }`}>
              {unit.privacyLevel}
            </span>
          </div>

          {/* Features */}
          <div className="border-t border-neutral-100 pt-4">
            <div className="flex flex-wrap gap-2">
              {unit.features.slice(0, 4).map((feature) => (
                <span key={feature} className="text-xs text-neutral-600 bg-neutral-50 px-2.5 py-1 rounded-full">
                  {feature}
                </span>
              ))}
              {unit.features.length > 4 && (
                <span className="text-xs text-primary-600 font-medium px-2 py-1">
                  +{unit.features.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-auto pt-6 flex gap-3">
            <Link
              href={`/unit/${unit.id}`}
              className="flex-1 py-3 border border-primary-300 text-primary-700 rounded-xl font-medium hover:bg-primary-50 transition-colors text-sm text-center"
            >
              Full Details
            </Link>
            <a
              href={`#apply?unit=${unit.id}`}
              className={`flex-1 block text-center py-3 rounded-xl font-medium transition-colors text-sm ${
                unit.available
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {unit.available ? 'Apply Now' : 'Join Waitlist'}
            </a>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <UnitDetailModal
        unit={unit}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
