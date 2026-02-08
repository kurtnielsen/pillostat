'use client';

import { Unit } from '@/lib/units';

interface UnitFloorPlanProps {
  unitId: string;
  compact?: boolean;
}

// Room icons as simple SVG components
const BedIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18M3 12v6m0-6V9a3 3 0 013-3h12a3 3 0 013 3v3m-18 6h18m-18 0v2m18-2v2M5 6h14" />
  </svg>
);

const BathIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7h8" />
  </svg>
);

const KitchenIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11V9a2 2 0 00-2-2H7a2 2 0 00-2 2v2m14 0v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8m14 0H5m7 4v4" />
  </svg>
);

const LivingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const DeckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
  </svg>
);

const EntryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>
);

// Studio Suite Floor Plan - 450 sqft
const StudioSuiteFloorPlan = ({ compact }: { compact: boolean }) => (
  <div className={`relative ${compact ? 'w-full aspect-[4/3]' : 'w-full max-w-md mx-auto aspect-[4/3]'}`}>
    {/* Main container - the apartment outline */}
    <div className="absolute inset-0 border-2 border-primary-600 rounded-lg bg-primary-50/30">
      {/* Grid layout for rooms */}
      <div className="absolute inset-2 grid grid-cols-3 grid-rows-3 gap-1">

        {/* Private Entrance + Patio - top left */}
        <div className="col-span-1 row-span-1 bg-amber-100 border border-amber-300 rounded flex flex-col items-center justify-center p-1">
          <EntryIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-amber-700 font-medium mt-0.5 text-center leading-tight`}>
            Private Entry
          </span>
          {!compact && <span className="text-[8px] text-amber-600">+ Patio</span>}
        </div>

        {/* Living/Sleeping Area - top center and right */}
        <div className="col-span-2 row-span-2 bg-primary-100 border border-primary-300 rounded flex flex-col items-center justify-center p-1 relative">
          <BedIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-xs'} text-primary-700 font-medium mt-0.5`}>Studio</span>
          {!compact && (
            <>
              <span className="text-[8px] text-primary-600">Living + Sleep</span>
              <span className="text-[9px] text-primary-500 mt-1">18' x 15'</span>
            </>
          )}
        </div>

        {/* Kitchen - middle left */}
        <div className="col-span-1 row-span-1 bg-emerald-100 border border-emerald-300 rounded flex flex-col items-center justify-center p-1">
          <KitchenIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-emerald-700 font-medium mt-0.5`}>Kitchen</span>
          {!compact && <span className="text-[8px] text-emerald-600">Full</span>}
        </div>

        {/* Bathroom - bottom left */}
        <div className="col-span-1 row-span-1 bg-blue-100 border border-blue-300 rounded flex flex-col items-center justify-center p-1">
          <BathIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-blue-700 font-medium mt-0.5`}>Bath</span>
          {!compact && <span className="text-[8px] text-blue-600">8' x 6'</span>}
        </div>

        {/* Closet/Storage - bottom center */}
        <div className="col-span-1 row-span-1 bg-neutral-100 border border-neutral-300 rounded flex flex-col items-center justify-center p-1">
          <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-neutral-600 font-medium mt-0.5`}>W/D</span>
        </div>

        {/* Closet - bottom right */}
        <div className="col-span-1 row-span-1 bg-neutral-100 border border-neutral-300 rounded flex flex-col items-center justify-center p-1">
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-neutral-600 font-medium`}>Closet</span>
        </div>
      </div>
    </div>

    {/* Dimensions label */}
    {!compact && (
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-neutral-500 font-medium">
        450 sqft total
      </div>
    )}
  </div>
);

// Garden Suite Floor Plan - 280 sqft
const GardenSuiteFloorPlan = ({ compact }: { compact: boolean }) => (
  <div className={`relative ${compact ? 'w-full aspect-[4/3]' : 'w-full max-w-md mx-auto aspect-[4/3]'}`}>
    {/* Main container */}
    <div className="absolute inset-0 border-2 border-primary-600 rounded-lg bg-primary-50/30">
      <div className="absolute inset-2 grid grid-cols-2 grid-rows-3 gap-1">

        {/* Bedroom - left side, spans 2 rows */}
        <div className="col-span-1 row-span-2 bg-primary-100 border border-primary-300 rounded flex flex-col items-center justify-center p-1">
          <BedIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-xs'} text-primary-700 font-medium mt-0.5`}>Bedroom</span>
          {!compact && (
            <>
              <span className="text-[8px] text-primary-600">Private</span>
              <span className="text-[9px] text-primary-500 mt-1">14' x 12'</span>
            </>
          )}
        </div>

        {/* Bathroom - top right */}
        <div className="col-span-1 row-span-1 bg-blue-100 border border-blue-300 rounded flex flex-col items-center justify-center p-1">
          <BathIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-blue-700 font-medium mt-0.5`}>Bath</span>
          {!compact && <span className="text-[8px] text-blue-600">Private</span>}
        </div>

        {/* Closet - middle right */}
        <div className="col-span-1 row-span-1 bg-neutral-100 border border-neutral-300 rounded flex flex-col items-center justify-center p-1">
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-neutral-600 font-medium`}>Closet</span>
        </div>

        {/* Shared Kitchen indicator - bottom, full width */}
        <div className="col-span-2 row-span-1 bg-emerald-100/50 border border-emerald-300 border-dashed rounded flex flex-col items-center justify-center p-1">
          <KitchenIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-emerald-700 font-medium mt-0.5`}>Shared Kitchen</span>
          {!compact && <span className="text-[8px] text-emerald-600">Ground Floor Access</span>}
        </div>
      </div>
    </div>

    {/* Dimensions label */}
    {!compact && (
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-neutral-500 font-medium">
        280 sqft private space
      </div>
    )}
  </div>
);

// Upper Retreat Floor Plan - 850 sqft
const UpperRetreatFloorPlan = ({ compact }: { compact: boolean }) => (
  <div className={`relative ${compact ? 'w-full aspect-[4/3]' : 'w-full max-w-lg mx-auto aspect-[4/3]'}`}>
    {/* Main container */}
    <div className="absolute inset-0 border-2 border-primary-600 rounded-lg bg-primary-50/30">
      <div className="absolute inset-2 grid grid-cols-4 grid-rows-3 gap-1">

        {/* Master Bedroom - top left, 2x2 */}
        <div className="col-span-2 row-span-2 bg-primary-100 border border-primary-300 rounded flex flex-col items-center justify-center p-1">
          <BedIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-xs'} text-primary-700 font-medium mt-0.5`}>Master Bedroom</span>
          {!compact && (
            <>
              <span className="text-[8px] text-primary-600">Ensuite Bath</span>
              <span className="text-[9px] text-primary-500 mt-1">16' x 14'</span>
            </>
          )}
        </div>

        {/* Living Room - top right, 2x1 */}
        <div className="col-span-2 row-span-1 bg-amber-100 border border-amber-300 rounded flex flex-col items-center justify-center p-1">
          <LivingIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-amber-700 font-medium mt-0.5`}>Living Room</span>
          {!compact && <span className="text-[8px] text-amber-600">20' x 12'</span>}
        </div>

        {/* Kitchen - middle right */}
        <div className="col-span-1 row-span-1 bg-emerald-100 border border-emerald-300 rounded flex flex-col items-center justify-center p-1">
          <KitchenIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-emerald-700 font-medium mt-0.5`}>Kitchen</span>
          {!compact && <span className="text-[8px] text-emerald-600">Full</span>}
        </div>

        {/* Deck - far right, spans 2 rows */}
        <div className="col-span-1 row-span-2 bg-sky-100 border border-sky-300 rounded flex flex-col items-center justify-center p-1">
          <DeckIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-sky-700 font-medium mt-0.5 text-center leading-tight`}>
            Deck
          </span>
          {!compact && <span className="text-[8px] text-sky-600 text-center">Water View</span>}
        </div>

        {/* Bathroom - bottom left */}
        <div className="col-span-1 row-span-1 bg-blue-100 border border-blue-300 rounded flex flex-col items-center justify-center p-1">
          <BathIcon />
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-blue-700 font-medium mt-0.5`}>Bath</span>
        </div>

        {/* Closet - bottom */}
        <div className="col-span-1 row-span-1 bg-neutral-100 border border-neutral-300 rounded flex flex-col items-center justify-center p-1">
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-neutral-600 font-medium`}>Closet</span>
        </div>

        {/* Dining/Den area - bottom middle */}
        <div className="col-span-1 row-span-1 bg-amber-50 border border-amber-200 rounded flex flex-col items-center justify-center p-1">
          <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-amber-600 font-medium`}>Den</span>
        </div>
      </div>
    </div>

    {/* Floor indicator */}
    {!compact && (
      <>
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-neutral-500 font-medium bg-blue-50 px-2 py-0.5 rounded">
          Entire Upper Floor
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-neutral-500 font-medium">
          850 sqft total
        </div>
      </>
    )}
  </div>
);

export default function UnitFloorPlan({ unitId, compact = false }: UnitFloorPlanProps) {
  switch (unitId) {
    case 'studio-suite':
      return <StudioSuiteFloorPlan compact={compact} />;
    case 'garden-suite':
      return <GardenSuiteFloorPlan compact={compact} />;
    case 'upper-retreat':
      return <UpperRetreatFloorPlan compact={compact} />;
    default:
      return null;
  }
}
