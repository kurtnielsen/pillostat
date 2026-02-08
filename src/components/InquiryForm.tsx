'use client';

import { useState } from 'react';
import { units, contractLengths } from '@/lib/units';

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    unitId: '',
    contractLength: 13,
    startDate: '',
    employer: '',
    hospital: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="apply" className="py-16 bg-primary-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card py-12">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-3">Inquiry Received!</h3>
            <p className="text-neutral-600 max-w-md mx-auto">
              Thank you for your interest. We'll review your request and get back to you within 24 hours with availability and next steps.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="py-16 bg-primary-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Check Availability</h2>
          <p className="text-neutral-600">Tell us about your upcoming contract and we'll confirm availability.</p>
        </div>

        <form onSubmit={handleSubmit} className="card">
          <div className="grid md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            {/* Unit Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Preferred Unit *
              </label>
              <select
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={formData.unitId}
                onChange={(e) => setFormData({ ...formData, unitId: e.target.value })}
              >
                <option value="">Select a unit...</option>
                {units.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} - ${unit.monthlyPrice}/mo
                  </option>
                ))}
              </select>
            </div>

            {/* Contract Length */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Contract Length *
              </label>
              <select
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={formData.contractLength}
                onChange={(e) => setFormData({ ...formData, contractLength: Number(e.target.value) })}
              >
                {contractLengths.map((length) => (
                  <option key={length.weeks} value={length.weeks}>
                    {length.label} {length.discount > 0 && `(${length.discount}% discount)`}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Desired Start Date *
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            {/* Employer */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Staffing Agency / Employer
              </label>
              <input
                type="text"
                placeholder="e.g., Aya Healthcare"
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={formData.employer}
                onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
              />
            </div>

            {/* Hospital */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Contract Hospital / Facility
              </label>
              <input
                type="text"
                placeholder="e.g., Regional Medical Center"
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={formData.hospital}
                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
              />
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Additional Information
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your schedule, any special requirements, or questions..."
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Inquiry'}
          </button>

          <p className="text-center text-sm text-neutral-500 mt-4">
            We'll respond within 24 hours. No commitment required.
          </p>
        </form>
      </div>
    </section>
  );
}
