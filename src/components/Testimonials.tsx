'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  hospital: string;
  avatar: string;
  rating: number;
  date: string;
  unit: string;
  stayLength: string;
  text: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'ICU Nurse',
    hospital: 'St. Michael Medical Center',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    date: 'November 2024',
    unit: 'Upper Retreat',
    stayLength: '13-week contract',
    text: 'This was exactly what I needed after long shifts at St. Michael. The water views from the deck helped me decompress, and having my own full kitchen meant I could meal prep properly. Kurt was responsive and professional. The location is perfect - close enough to the hospital but feels like a peaceful retreat.',
    verified: true,
  },
  {
    id: '2',
    name: 'Michael T.',
    role: 'ER Nurse',
    hospital: 'Harrison Medical Center',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    date: 'September 2024',
    unit: 'Studio Suite',
    stayLength: '26-week contract',
    text: 'After trying various travel nurse housing options, this place stands out. Complete privacy with my own entrance, quiet neighborhood, and the high-speed WiFi was crucial for my telehealth side gig. The ferry to Seattle is convenient for day trips. Would absolutely book again.',
    verified: true,
  },
  {
    id: '3',
    name: 'Jennifer L.',
    role: 'Labor & Delivery Nurse',
    hospital: 'St. Michael Medical Center',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    date: 'August 2024',
    unit: 'Garden Suite',
    stayLength: '13-week contract',
    text: 'Great value for the price. Yes, the kitchen is shared, but I barely crossed paths with the other tenant since we had different schedules. The bed was comfortable (crucial after 12-hour shifts!), and downtown Poulsbo is walkable with cute shops and restaurants. The Scandinavian bakery became my morning ritual.',
    verified: true,
  },
  {
    id: '4',
    name: 'David R.',
    role: 'Surgical Nurse',
    hospital: 'Virginia Mason Franciscan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    rating: 4,
    date: 'July 2024',
    unit: 'Upper Retreat',
    stayLength: '8-week contract',
    text: 'Solid choice for a travel assignment. The upper floor layout gave me plenty of space to spread out. Kitchen was well-stocked, and the washer/dryer situation was fine even though it\'s shared. The Olympic Mountain views on clear days are incredible. Only reason for 4 stars is I wish there was a gym on-site, but Planet Fitness is nearby.',
    verified: true,
  },
  {
    id: '5',
    name: 'Amanda K.',
    role: 'NICU Nurse',
    hospital: 'Seattle Children\'s (Bellevue)',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    date: 'May 2024',
    unit: 'Studio Suite',
    stayLength: '13-week contract',
    text: 'I was nervous about being on the peninsula and commuting to Bellevue, but the ferry commute actually became my favorite part of the day - beautiful scenery and time to decompress. The studio was spotless, modern, and had everything I needed. Kurt even had a welcome basket with local treats. Such a thoughtful touch!',
    verified: true,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-amber-400' : 'text-neutral-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.9 Average Rating
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            What Travel Nurses Say
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Hear from healthcare professionals who have called pillowSTAT home during their contracts.
          </p>
        </div>

        {/* Featured Review */}
        <div className="bg-gradient-to-br from-primary-50 via-white to-neutral-50 rounded-3xl p-8 md:p-12 mb-12 border border-primary-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="relative w-24 h-24 mx-auto md:mx-0 mb-4">
                  <Image
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-cover rounded-full ring-4 ring-white shadow-lg"
                  />
                  {testimonials[activeIndex].verified && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center ring-2 ring-white">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-xl text-neutral-900">{testimonials[activeIndex].name}</h3>
                <p className="text-primary-600 font-medium">{testimonials[activeIndex].role}</p>
                <p className="text-sm text-neutral-500 mt-1">{testimonials[activeIndex].hospital}</p>
                <div className="mt-3">
                  {renderStars(testimonials[activeIndex].rating)}
                </div>
              </div>
              <div className="md:col-span-2">
                <svg className="w-12 h-12 text-primary-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6">
                  {testimonials[activeIndex].text}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="bg-white px-4 py-2 rounded-full border border-neutral-200 text-neutral-600">
                    Stayed in: <span className="font-medium text-neutral-900">{testimonials[activeIndex].unit}</span>
                  </span>
                  <span className="bg-white px-4 py-2 rounded-full border border-neutral-200 text-neutral-600">
                    Duration: <span className="font-medium text-neutral-900">{testimonials[activeIndex].stayLength}</span>
                  </span>
                  <span className="bg-white px-4 py-2 rounded-full border border-neutral-200 text-neutral-600">
                    {testimonials[activeIndex].date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Selector */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              className={`relative w-14 h-14 rounded-full overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? 'ring-4 ring-primary-500 scale-110'
                  : 'opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-neutral-50 rounded-xl">
            <div className="text-4xl font-bold text-primary-600 mb-1">50+</div>
            <div className="text-sm text-neutral-600">Happy Guests</div>
          </div>
          <div className="text-center p-6 bg-neutral-50 rounded-xl">
            <div className="text-4xl font-bold text-primary-600 mb-1">4.9</div>
            <div className="text-sm text-neutral-600">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-neutral-50 rounded-xl">
            <div className="text-4xl font-bold text-primary-600 mb-1">85%</div>
            <div className="text-sm text-neutral-600">Extend Stays</div>
          </div>
          <div className="text-center p-6 bg-neutral-50 rounded-xl">
            <div className="text-4xl font-bold text-primary-600 mb-1">100%</div>
            <div className="text-sm text-neutral-600">Verified Reviews</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-neutral-600 mb-4">Ready to experience it yourself?</p>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Check Availability
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
