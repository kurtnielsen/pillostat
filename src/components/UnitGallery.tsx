'use client';

import { useState } from 'react';
import { units } from '@/lib/units';
import UnitFloorPlan from './UnitFloorPlan';
import UnitDetailModal from './UnitDetailModal';
import { Unit } from '@/lib/units';

const tierColors = {
  'premium': { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300', accent: 'bg-amber-500' },
  'economy': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', accent: 'bg-green-500' },
  'spacious-premium': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', accent: 'bg-blue-500' },
};

const tierLabels = {
  'premium': 'Premium',
  'economy': 'Best Value',
  'spacious-premium': 'Most Space',
};

interface UnitGalleryCardProps {
  unit: Unit;
  onViewDetails: (unit: Unit) => void;
}

function UnitGalleryCard({ unit, onViewDetails }: UnitGalleryCardProps) {
  const tier = tierColors[unit.tier];

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-primary-300 transition-all duration-300">
      {/* Floor Plan Visual */}
      <div className="relative p-6 bg-gradient-to-br from-neutral-50 to-primary-50/30 min-h-[220px] flex items-center justify-center">
        {/* Tier Badge */}
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${tier.bg} ${tier.text}`}>
          {tierLabels[unit.tier]}
        </span>

        {/* Sqft Badge */}
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 text-neutral-700 shadow-sm">
          {unit.sqft} sqft
        </span>

        {/* Availability Overlay */}
        {!unit.available && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
            <span className="bg-white px-4 py-2 rounded-full text-sm font-medium text-neutral-700 shadow-lg">
              Available {unit.availableDate}
            </span>
          </div>
        )}

        {/* Floor Plan */}
        <div className="w-full max-w-[280px]">
          <UnitFloorPlan unitId={unit.id} compact={true} />
        </div>

        {/* View Details Overlay */}
        <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onViewDetails(unit)}
            className="bg-white text-primary-700 px-4 py-2 rounded-full font-medium shadow-lg hover:bg-primary-50 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            View Floor Plan
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-neutral-900">{unit.name}</h3>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary-600">${unit.monthlyPrice.toLocaleString()}</span>
            <span className="text-neutral-500 text-sm">/mo</span>
          </div>
        </div>

        <p className="text-primary-600 font-medium text-sm mb-3">{unit.tagline}</p>

        {/* Quick Stats Row */}
        <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {unit.bedrooms === 0 ? 'Studio' : `${unit.bedrooms} Bed`}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3" />
            </svg>
            {unit.bathrooms} Bath
          </span>
          <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
            unit.privacyLevel === 'Full Privacy'
              ? 'bg-primary-100 text-primary-700'
              : unit.privacyLevel === 'Shared Laundry Only'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-neutral-100 text-neutral-600'
          }`}>
            {unit.privacyLevel}
          </span>
        </div>

        {/* Key Rooms Preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {unit.features.slice(0, 4).map((feature) => (
            <span key={feature} className="text-xs text-neutral-500 bg-neutral-50 px-2 py-1 rounded">
              {feature}
            </span>
          ))}
          {unit.features.length > 4 && (
            <span className="text-xs text-primary-600 px-2 py-1">
              +{unit.features.length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(unit)}
            className="flex-1 py-2.5 px-4 border border-primary-300 text-primary-700 rounded-lg font-medium hover:bg-primary-50 transition-colors text-sm"
          >
            View Details
          </button>
          <a
            href={`#apply?unit=${unit.id}`}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors text-sm text-center ${
              unit.available
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {unit.available ? 'Apply Now' : 'Join Waitlist'}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function UnitGallery() {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  return (
    <>
      <section id="gallery" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
              Floor Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Explore Our Spaces
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Browse our thoughtfully designed units with interactive floor plans.
              Each space is optimized for traveling healthcare professionals.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-primary-100 border border-primary-300"></div>
              <span className="text-neutral-600">Bedroom</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
              <span className="text-neutral-600">Bathroom</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-100 border border-emerald-300"></div>
              <span className="text-neutral-600">Kitchen</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300"></div>
              <span className="text-neutral-600">Living/Entry</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-sky-100 border border-sky-300"></div>
              <span className="text-neutral-600">Outdoor</span>
            </div>
          </div>

          {/* Unit Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {units.map((unit) => (
              <UnitGalleryCard
                key={unit.id}
                unit={unit}
                onViewDetails={setSelectedUnit}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-neutral-500 text-sm mb-3">
              Can&apos;t decide? We&apos;re here to help!
            </p>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact us for personalized recommendations
            </a>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedUnit && (
        <UnitDetailModal
          unit={selectedUnit}
          isOpen={!!selectedUnit}
          onClose={() => setSelectedUnit(null)}
        />
      )}
    </>
  );
}
