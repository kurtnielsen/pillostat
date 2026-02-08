import Image from 'next/image';

interface Highlight {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stat?: string;
  statLabel?: string;
}

const highlights: Highlight[] = [
  {
    id: '1',
    title: 'Waterfront on Liberty Bay',
    description: 'Wake up to serene water views. Our property sits directly on Liberty Bay with 75 feet of private waterfront access.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stat: '75 ft',
    statLabel: 'waterfront',
  },
  {
    id: '2',
    title: 'Olympic Mountain Views',
    description: 'The deck offers stunning views of the Olympic Mountain range. Perfect for morning coffee or evening relaxation after shifts.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: '3',
    title: 'Downtown Poulsbo Walkable',
    description: 'Stroll to "Little Norway" in 10 minutes. Enjoy Scandinavian bakeries, waterfront dining, boutique shops, and the marina.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    stat: '0.5 mi',
    statLabel: 'to downtown',
  },
  {
    id: '4',
    title: 'Close to St. Michael Medical',
    description: 'Your commute is just 15 minutes to St. Michael Medical Center. Harrison and Virginia Mason hospitals are also nearby.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    stat: '15 min',
    statLabel: 'to hospital',
  },
  {
    id: '5',
    title: 'Recently Updated Home',
    description: 'Built in 2003 and recently renovated with modern finishes. New appliances, fresh paint, updated bathrooms, and cozy touches throughout.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    stat: '2003',
    statLabel: 'built',
  },
  {
    id: '6',
    title: 'Private Half-Acre Lot',
    description: 'Enjoy peace and privacy on our spacious 0.5-acre property. Mature trees, a manicured lawn, and space to breathe.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    stat: '0.5',
    statLabel: 'acre lot',
  },
];

export default function PropertyHighlights() {
  return (
    <section id="highlights" className="py-20 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Why pillowSTAT
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            A Waterfront Retreat on Liberty Bay
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            More than just a place to sleep between shifts. This is a home where you can truly relax and recharge.
          </p>
        </div>

        {/* Hero Image Banner */}
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-16">
          <Image
            src="https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=1400&h=600&fit=crop"
            alt="Panoramic view of Liberty Bay with Olympic Mountains in background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 via-primary-900/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-lg ml-8 md:ml-16">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Your Peaceful Escape
              </h3>
              <p className="text-white/90 text-lg">
                Located in charming Poulsbo, WA - known as "Little Norway" - where Scandinavian heritage meets Pacific Northwest beauty.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-neutral-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {highlight.icon}
                </div>
                {highlight.stat && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{highlight.stat}</div>
                    <div className="text-xs text-neutral-500 uppercase tracking-wide">{highlight.statLabel}</div>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                {highlight.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info Cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Designed for Healthcare Workers
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Quiet neighborhood for day sleepers
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Blackout curtains in all bedrooms
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Flexible lease terms matching contracts
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No long-term commitment required
              </li>
            </ul>
          </div>

          <div className="bg-neutral-900 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Nearby Conveniences
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-neutral-400">Groceries</span>
                <p className="text-white">Safeway - 0.8 mi</p>
              </div>
              <div>
                <span className="text-neutral-400">Pharmacy</span>
                <p className="text-white">Walgreens - 0.5 mi</p>
              </div>
              <div>
                <span className="text-neutral-400">Coffee</span>
                <p className="text-white">Starbucks - 0.4 mi</p>
              </div>
              <div>
                <span className="text-neutral-400">Gym</span>
                <p className="text-white">Planet Fitness - 1.2 mi</p>
              </div>
              <div>
                <span className="text-neutral-400">Ferry Terminal</span>
                <p className="text-white">Bainbridge - 12 mi</p>
              </div>
              <div>
                <span className="text-neutral-400">Seattle</span>
                <p className="text-white">35 min by ferry</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#units"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-lg"
          >
            Explore Available Units
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
