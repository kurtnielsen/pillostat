'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Hotspot {
  id: string;
  name: string;
  x: number;
  y: number;
  description: string;
}

const hotspots: Hotspot[] = [
  { id: '1', name: 'Living Room', x: 25, y: 45, description: 'Spacious living area with water views' },
  { id: '2', name: 'Kitchen', x: 55, y: 35, description: 'Modern fully-equipped kitchen' },
  { id: '3', name: 'Master Bedroom', x: 75, y: 55, description: 'Quiet bedroom with premium bedding' },
  { id: '4', name: 'Deck', x: 15, y: 65, description: 'Private deck overlooking Liberty Bay' },
  { id: '5', name: 'Bathroom', x: 65, y: 70, description: 'Clean, modern bathroom' },
];

export default function VirtualTour() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="virtual-tour" className="py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Interactive Experience
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-3">Explore the Property</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Take a virtual walk through our waterfront home. Click on hotspots to learn more about each space.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video/360 Tour Area */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 aspect-video">
              {!showVideo ? (
                <>
                  {/* Placeholder image with hotspots */}
                  <Image
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=675&fit=crop"
                    alt="Virtual tour of waterfront property"
                    fill
                    className="object-cover opacity-90"
                  />

                  {/* Interactive Hotspots */}
                  {hotspots.map((hotspot) => (
                    <button
                      key={hotspot.id}
                      className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        activeHotspot?.id === hotspot.id ? 'scale-125' : 'hover:scale-110'
                      }`}
                      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                      onMouseEnter={() => setActiveHotspot(hotspot)}
                      onMouseLeave={() => setActiveHotspot(null)}
                      onClick={() => setActiveHotspot(hotspot)}
                    >
                      <span className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-40" />
                      <span className="relative block w-full h-full bg-primary-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </span>
                    </button>
                  ))}

                  {/* Hotspot tooltip */}
                  {activeHotspot && (
                    <div
                      className="absolute bg-white rounded-lg shadow-xl p-4 max-w-xs z-10 transition-all duration-300"
                      style={{
                        left: `${Math.min(activeHotspot.x + 5, 70)}%`,
                        top: `${Math.min(activeHotspot.y + 5, 75)}%`,
                      }}
                    >
                      <h4 className="font-semibold text-neutral-900 mb-1">{activeHotspot.name}</h4>
                      <p className="text-sm text-neutral-600">{activeHotspot.description}</p>
                    </div>
                  )}

                  {/* Play button overlay */}
                  <button
                    onClick={() => setShowVideo(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
                  >
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>

                  {/* 360 Coming Soon Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                    <svg className="w-5 h-5 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    360 Tour Coming Soon
                  </div>
                </>
              ) : (
                <>
                  {/* Video placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4 mx-auto" />
                      <p className="text-lg font-medium">Video Tour Loading...</p>
                      <p className="text-sm text-white/70 mt-2">Full video walkthrough coming soon</p>
                      <button
                        onClick={() => setShowVideo(false)}
                        className="mt-6 text-sm text-white/80 hover:text-white underline"
                      >
                        Back to interactive view
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Tour controls */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowVideo(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !showVideo
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Interactive
                  </span>
                </button>
                <button
                  onClick={() => setShowVideo(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    showVideo
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Video Tour
                  </span>
                </button>
              </div>
              <span className="text-sm text-neutral-500">
                Click hotspots to explore
              </span>
            </div>
          </div>

          {/* Tour Info Panel */}
          <div className="space-y-6">
            {/* Room List */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Tour Stops
              </h3>
              <ul className="space-y-2">
                {hotspots.map((hotspot) => (
                  <li key={hotspot.id}>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeHotspot?.id === hotspot.id
                          ? 'bg-primary-50 border-primary-200 border'
                          : 'bg-neutral-50 hover:bg-neutral-100'
                      }`}
                      onMouseEnter={() => setActiveHotspot(hotspot)}
                      onMouseLeave={() => setActiveHotspot(null)}
                    >
                      <span className="font-medium text-neutral-900">{hotspot.name}</span>
                      <p className="text-sm text-neutral-500 mt-0.5">{hotspot.description}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule Tour CTA */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">Want to see it in person?</h3>
              <p className="text-primary-100 text-sm mb-4">
                Schedule a video call or in-person tour with our property manager.
              </p>
              <a
                href="#apply"
                className="block w-full text-center bg-white text-primary-700 font-medium py-3 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Schedule a Tour
              </a>
            </div>

            {/* Virtual Tour Features */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-4">Coming Soon</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-neutral-600">
                  <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </span>
                  Full 360-degree panoramic views
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-600">
                  <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </span>
                  Detailed floor plan overlay
                </li>
                <li className="flex items-center gap-3 text-sm text-neutral-600">
                  <span className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                    </svg>
                  </span>
                  Day and night viewing modes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
