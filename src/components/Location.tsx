export default function Location() {
  return (
    <section id="location" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Prime Kitsap Peninsula Location</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Located in Poulsbo, WA - "Little Norway" on Liberty Bay. Easy access to local hospitals and Seattle via ferry.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map placeholder */}
          <div className="h-80 lg:h-[500px] bg-gradient-to-br from-primary-100 to-blue-100 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-blue-300 rounded-full blur-xl"></div>
              <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-primary-300 rounded-full blur-xl"></div>
            </div>
            <div className="text-center text-neutral-600 relative z-10">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="font-medium text-neutral-700">Poulsbo, WA 98370</p>
              <p className="text-sm text-neutral-500 mt-1">Kitsap County, Washington</p>
              <p className="text-xs text-neutral-400 mt-4">Interactive map coming soon</p>
            </div>
          </div>

          {/* Location details */}
          <div className="space-y-6">
            {/* Hospital Commutes */}
            <div className="card">
              <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Hospital Commutes
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'St. Michael Medical Center', location: 'Silverdale', time: '15 min', distance: '12 mi', badge: 'Primary', badgeColor: 'bg-primary-100 text-primary-700' },
                  { name: 'Naval Hospital Bremerton', location: 'Bremerton', time: '24 min', distance: '19 mi', badge: 'Military/VA', badgeColor: 'bg-blue-100 text-blue-700' },
                  { name: 'Harborview Medical Center', location: 'Seattle (Ferry)', time: '65-80 min', distance: 'Ferry', badge: 'Level I Trauma', badgeColor: 'bg-amber-100 text-amber-700' },
                  { name: 'Swedish First Hill', location: 'Seattle (Ferry)', time: '60-75 min', distance: 'Ferry', badge: '114 Travel Positions', badgeColor: 'bg-green-100 text-green-700' },
                ].map((location) => (
                  <div key={location.name} className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-0">
                    <div>
                      <span className="text-neutral-700 font-medium">{location.name}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-neutral-400 text-xs">{location.location}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${location.badgeColor}`}>{location.badge}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-primary-600">{location.time}</span>
                      <span className="text-neutral-400 text-xs ml-1">({location.distance})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ferry Info */}
            <div className="card bg-blue-50 border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Seattle via Bainbridge Ferry
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-700">Crossing Time:</span>
                  <span className="text-blue-900 font-medium ml-1">34 min</span>
                </div>
                <div>
                  <span className="text-blue-700">Monthly Pass:</span>
                  <span className="text-blue-900 font-medium ml-1">$120</span>
                </div>
                <div>
                  <span className="text-blue-700">Walk-on (RT):</span>
                  <span className="text-blue-900 font-medium ml-1">$11.05</span>
                </div>
                <div>
                  <span className="text-blue-700">Schedule:</span>
                  <span className="text-blue-900 font-medium ml-1">12:55am-11:30pm</span>
                </div>
              </div>
              <p className="text-xs text-blue-600 mt-3">Walk-on passengers ride FREE from Bainbridge to Seattle</p>
            </div>

            {/* Quick Amenities */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card text-center py-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h4 className="font-medium text-neutral-900 text-sm">Safeway & Town & Country</h4>
                <p className="text-xs text-neutral-500">Groceries 5 min</p>
              </div>

              <div className="card text-center py-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-medium text-neutral-900 text-sm">Snap Fitness</h4>
                <p className="text-xs text-neutral-500">24/7 gym access</p>
              </div>

              <div className="card text-center py-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <h4 className="font-medium text-neutral-900 text-sm">Denny's 24hr</h4>
                <p className="text-xs text-neutral-500">Night shift friendly</p>
              </div>

              <div className="card text-center py-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-medium text-neutral-900 text-sm">Quiet & Safe</h4>
                <p className="text-xs text-neutral-500">Day sleeper friendly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
