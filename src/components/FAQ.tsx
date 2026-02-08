'use client';

import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    id: '1',
    category: 'Booking',
    question: 'How does the booking process work?',
    answer: 'Simply fill out our inquiry form with your preferred unit, dates, and contract length. We\'ll review your application within 24 hours and send you a rental agreement if approved. Once signed, you\'ll receive a secure Stripe payment link for your deposit and first month\'s rent. Keys are provided on your move-in date via lockbox.',
  },
  {
    id: '2',
    category: 'Booking',
    question: 'How far in advance should I book?',
    answer: 'We recommend booking 2-4 weeks before your contract start date. However, we often have last-minute availability. Reach out even if your start date is soon - we\'ll do our best to accommodate you.',
  },
  {
    id: '3',
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and ACH bank transfers through Stripe. All payments are securely processed with bank-level encryption. You\'ll receive a digital receipt for every transaction.',
  },
  {
    id: '4',
    category: 'Payments',
    question: 'What is the deposit and when do I get it back?',
    answer: 'The security deposit equals one month\'s rent and is fully refundable. We conduct a walkthrough inspection at checkout, and if there\'s no damage beyond normal wear, your deposit is returned within 14 days via the original payment method.',
  },
  {
    id: '5',
    category: 'Lease',
    question: 'What contract lengths do you offer?',
    answer: 'We offer 8-week, 13-week, and 26-week contracts to match standard nursing contract lengths. Longer stays get better rates: 13 weeks saves 5%, and 26 weeks saves 10%. Extensions are easy to arrange if your contract gets extended.',
  },
  {
    id: '6',
    category: 'Lease',
    question: 'Can I extend my stay if my contract gets extended?',
    answer: 'Absolutely! Just let us know at least 2 weeks before your original end date. Extensions are subject to availability, but current guests get priority. We\'ll pro-rate any pricing changes if your total stay qualifies for a longer-term discount.',
  },
  {
    id: '7',
    category: 'Amenities',
    question: 'What amenities are included?',
    answer: 'All units include: fully furnished living spaces, premium bedding, high-speed WiFi (100+ Mbps), smart TV with streaming apps, fully equipped kitchen, washer/dryer access, dedicated parking, and basic toiletries to get you started. Specific amenities vary by unit - check each listing for details.',
  },
  {
    id: '8',
    category: 'Amenities',
    question: 'Is WiFi fast enough for telehealth and streaming?',
    answer: 'Yes! We have fiber internet with speeds over 100 Mbps - plenty for video calls, telehealth appointments, streaming 4K content, and online charting. The connection is reliable and each unit has its own router for dedicated bandwidth.',
  },
  {
    id: '9',
    category: 'Utilities',
    question: 'Are utilities included in the rent?',
    answer: 'Yes, all utilities are included: electricity, water, gas, garbage, and high-speed internet. There are no surprise bills. We ask that you be mindful of usage (no crypto mining!), but normal household use is always covered.',
  },
  {
    id: '10',
    category: 'Cancellation',
    question: 'What is your cancellation policy?',
    answer: 'Cancel more than 30 days before move-in for a full refund. Cancel 14-30 days out for a 50% refund. Within 14 days, the first month is non-refundable. If your nursing contract gets cancelled, we offer flexible options - just show documentation from your agency.',
  },
  {
    id: '11',
    category: 'Pets',
    question: 'Are pets allowed?',
    answer: 'We love pets but currently cannot accommodate them due to allergies of some guests. We understand this is difficult for pet parents - we\'re exploring a pet-friendly unit in the future. Service animals are always welcome with documentation.',
  },
  {
    id: '12',
    category: 'Parking',
    question: 'Is parking available?',
    answer: 'Yes! The Studio Suite and Upper Retreat include dedicated off-street parking. The Garden Suite has street parking available. The neighborhood is quiet with easy parking. Additional vehicle? Just let us know and we\'ll work it out.',
  },
  {
    id: '13',
    category: 'Check-in',
    question: 'What is the check-in process?',
    answer: 'We use a self-check-in system with a secure lockbox. You\'ll receive a detailed arrival guide with the door code, WiFi password, and local tips 48 hours before your move-in date. Check-in is available anytime after 3 PM, and we\'re always available by text if you need help.',
  },
  {
    id: '14',
    category: 'Check-in',
    question: 'What time is check-in and check-out?',
    answer: 'Standard check-in is 3 PM and check-out is 11 AM. Need early check-in or late check-out? Just ask - we can often accommodate if there\'s no same-day turnover. For long-term guests, we\'re extra flexible.',
  },
];

const categories = ['All', 'Booking', 'Payments', 'Lease', 'Amenities', 'Utilities', 'Cancellation', 'Pets', 'Parking', 'Check-in'];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>(['1']);
  const [activeCategory, setActiveCategory] = useState('All');

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredItems = activeCategory === 'All'
    ? faqItems
    : faqItems.filter((item) => item.category === activeCategory);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
            Everything you need to know about staying at pillowSTAT. Can't find an answer? <a href="#apply" className="text-primary-600 hover:underline">Contact us</a>.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                openItems.includes(item.id)
                  ? 'border-primary-200 bg-primary-50/50 shadow-sm'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    openItems.includes(item.id)
                      ? 'bg-primary-200 text-primary-700'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    {item.category}
                  </span>
                  <span className={`font-medium ${
                    openItems.includes(item.id) ? 'text-primary-900' : 'text-neutral-900'
                  }`}>
                    {item.question}
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                    openItems.includes(item.id)
                      ? 'rotate-180 text-primary-600'
                      : 'text-neutral-400'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openItems.includes(item.id) ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 pt-0">
                  <p className="text-neutral-600 leading-relaxed pl-[calc(0.5rem+0.75rem+0.75rem)] border-l-2 border-primary-200 ml-1">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-8 bg-gradient-to-br from-neutral-50 to-primary-50 rounded-2xl border border-neutral-200">
          <h3 className="text-xl font-semibold text-neutral-900 mb-2">Still have questions?</h3>
          <p className="text-neutral-600 mb-6">
            We're here to help. Reach out and we'll get back to you within a few hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:info@pillostat.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-neutral-700 px-6 py-3 rounded-lg font-medium border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </a>
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Send a Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
