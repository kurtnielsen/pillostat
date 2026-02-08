export default function LocalAttractions() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary-600 font-medium text-sm uppercase tracking-wide">Life in Poulsbo</span>
          <h2 className="text-3xl font-bold text-neutral-900 mt-2 mb-3">More Than Just a Place to Sleep</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            "Little Norway" offers craft breweries, waterfront dining, and Olympic National Park in your backyard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Craft Beer */}
          <div className="card group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">5 Craft Breweries</h3>
            <p className="text-sm text-neutral-600 mb-3">
              Valholl Brewing, Western Red, Rainy Daze, and more. Viking-inspired brews with bay views.
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">Valholl</span>
              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">The Sip</span>
              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">Western Red</span>
            </div>
          </div>

          {/* Outdoor */}
          <div className="card group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Olympic National Park</h3>
            <p className="text-sm text-neutral-600 mb-3">
              Hurricane Ridge, Hoh Rainforest, and Sol Duc Falls just 1hr 20min away. 16 local parks.
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">Hiking</span>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">Kayaking</span>
              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">Trails</span>
            </div>
          </div>

          {/* Downtown */}
          <div className="card group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">"Little Norway" Downtown</h3>
            <p className="text-sm text-neutral-600 mb-3">
              Norwegian heritage, Sluys Bakery's famous donuts, waterfront shops, and Liberty Bay views.
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Viking Fest</span>
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Julefest</span>
              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Bakery</span>
            </div>
          </div>

          {/* Seattle Access */}
          <div className="card group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Seattle Day Trips</h3>
            <p className="text-sm text-neutral-600 mb-3">
              30-min scenic ferry to downtown Seattle. Big city amenities when you want them.
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">Ferry</span>
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">Walk-on</span>
              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">$11 RT</span>
            </div>
          </div>
        </div>

        {/* Dining Highlights */}
        <div className="mt-12 card bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Local Dining Favorites</h3>
              <p className="text-sm text-neutral-600">
                From waterfront Italian at Dalla Baia to classic fish-and-chips at J.J.'s Fish House.
                The Green Light Diner serves breakfast all day - perfect for night shift schedules.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-white text-neutral-700 px-3 py-1.5 rounded-full shadow-sm">Dalla Baia</span>
              <span className="text-xs bg-white text-neutral-700 px-3 py-1.5 rounded-full shadow-sm">Sogno di Vino</span>
              <span className="text-xs bg-white text-neutral-700 px-3 py-1.5 rounded-full shadow-sm">J.J.'s Fish House</span>
              <span className="text-xs bg-white text-neutral-700 px-3 py-1.5 rounded-full shadow-sm">Green Light Diner</span>
              <span className="text-xs bg-white text-neutral-700 px-3 py-1.5 rounded-full shadow-sm">Tizley's EuroPub</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
