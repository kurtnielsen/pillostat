'use client';

import { useState } from 'react';
import { units, contractLengths } from '@/lib/units';

interface BookingWidgetProps {
  sticky?: boolean;
  unitId?: string;
}

export default function BookingWidget({ sticky = true, unitId }: BookingWidgetProps) {
  const [selectedUnit, setSelectedUnit] = useState(unitId || '');
  const [moveInDate, setMoveInDate] = useState('');
  const [contractLength, setContractLength] = useState('13');
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedUnitData = units.find((u) => u.id === selectedUnit);
  const selectedContract = contractLengths.find((c) => c.weeks.toString() === contractLength);
  const discountedPrice = selectedUnitData && selectedContract
    ? Math.round(selectedUnitData.monthlyPrice * (1 - selectedContract.discount / 100))
    : null;

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinDate = () => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 3); // Allow booking at least 3 days out
    return minDate.toISOString().split('T')[0];
  };

  const wrapperClasses = sticky
    ? 'lg:sticky lg:top-24 bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden'
    : 'bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden';

  return (
    <div className={wrapperClasses}>
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary-100 text-sm">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">$1,650</span>
              <span className="text-primary-200">/month</span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              3 units available
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-5 space-y-4">
        {/* Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Select Unit
          </label>
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-white"
          >
            <option value="">Choose a unit...</option>
            {units.map((unit) => (
              <option key={unit.id} value={unit.id} disabled={!unit.available}>
                {unit.name} - ${unit.monthlyPrice.toLocaleString()}/mo
                {!unit.available ? ` (Available ${unit.availableDate})` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Move-in Date */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Move-in Date
          </label>
          <input
            type="date"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            min={getMinDate()}
            className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          />
        </div>

        {/* Contract Length */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Contract Length
          </label>
          <div className="grid grid-cols-3 gap-2">
            {contractLengths.map((length) => (
              <button
                key={length.weeks}
                onClick={() => setContractLength(length.weeks.toString())}
                className={`py-3 px-2 rounded-lg border-2 text-center transition-all ${
                  contractLength === length.weeks.toString()
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="font-medium">{length.weeks} wks</div>
                {length.discount > 0 && (
                  <div className="text-xs text-green-600 font-medium">{length.discount}% off</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        {selectedUnitData && discountedPrice && (
          <div
            className="bg-neutral-50 rounded-lg p-4 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-neutral-900">Your Monthly Rate</span>
              <div className="text-right">
                {selectedContract && selectedContract.discount > 0 && (
                  <span className="text-sm text-neutral-400 line-through mr-2">
                    ${selectedUnitData.monthlyPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xl font-bold text-primary-600">
                  ${discountedPrice.toLocaleString()}
                </span>
              </div>
            </div>
            {isExpanded && (
              <div className="mt-4 pt-4 border-t border-neutral-200 space-y-2 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Base rate</span>
                  <span>${selectedUnitData.monthlyPrice.toLocaleString()}/mo</span>
                </div>
                {selectedContract && selectedContract.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>{selectedContract.label} discount ({selectedContract.discount}%)</span>
                    <span>-${(selectedUnitData.monthlyPrice - discountedPrice).toLocaleString()}/mo</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Security deposit (refundable)</span>
                  <span>${discountedPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Cleaning fee (one-time)</span>
                  <span>$150</span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between font-medium text-neutral-900">
                  <span>Due at move-in</span>
                  <span>${(discountedPrice * 2 + 150).toLocaleString()}</span>
                </div>
              </div>
            )}
            <div className="flex items-center justify-center mt-2">
              <svg
                className={`w-4 h-4 text-neutral-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <a
          href={`#apply${selectedUnit ? `?unit=${selectedUnit}` : ''}`}
          className="block w-full text-center bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-lg shadow-lg shadow-primary-600/20"
        >
          Check Availability
        </a>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Secure Checkout
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Instant Response
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-5 py-3 border-t border-amber-100">
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-amber-800">
            <strong>High demand:</strong> 3 inquiries this week
          </span>
        </div>
      </div>
    </div>
  );
}
