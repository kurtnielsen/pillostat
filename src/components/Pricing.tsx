import { units, contractLengths } from '@/lib/units';

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Simple Monthly Pricing</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            No nightly rates. No hidden fees. Just predictable monthly costs so you can focus on your contract.
          </p>
        </div>

        {/* Pricing Philosophy */}
        <div className="card max-w-3xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-neutral-900 mb-1">All-Inclusive</h4>
              <p className="text-sm text-neutral-600">Utilities, WiFi, and furnishings included</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-neutral-900 mb-1">No Surprises</h4>
              <p className="text-sm text-neutral-600">Same rate every month of your stay</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="font-medium text-neutral-900 mb-1">Longer = Less</h4>
              <p className="text-sm text-neutral-600">Discounts for extended contracts</p>
            </div>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-4 px-4 font-medium text-neutral-700">Unit</th>
                {contractLengths.map((length) => (
                  <th key={length.weeks} className="text-center py-4 px-4 font-medium text-neutral-700">
                    {length.label}
                    {length.discount > 0 && (
                      <span className="block text-xs text-primary-600 font-normal">
                        {length.discount}% off
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {units.map((unit) => (
                <tr key={unit.id} className="border-b border-neutral-100">
                  <td className="py-4 px-4">
                    <div className="font-medium text-neutral-900">{unit.name}</div>
                    <div className="text-sm text-neutral-500">{unit.privacyLevel}</div>
                  </td>
                  {contractLengths.map((length) => {
                    const discountedPrice = Math.round(unit.monthlyPrice * (1 - length.discount / 100));
                    return (
                      <td key={length.weeks} className="text-center py-4 px-4">
                        <span className="font-semibold text-neutral-900">
                          ${discountedPrice.toLocaleString()}
                        </span>
                        <span className="text-neutral-500 text-sm">/mo</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Fees */}
        <div className="mt-8 text-center text-sm text-neutral-500">
          <p>One-time fees: Security deposit (one month's rent) + $150 cleaning fee</p>
          <p className="mt-1">Paid via Stripe. Secure payment links sent after approval.</p>
        </div>
      </div>
    </section>
  );
}
