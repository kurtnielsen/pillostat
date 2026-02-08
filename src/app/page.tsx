import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ImageGallery from '@/components/ImageGallery';
import PropertyHighlights from '@/components/PropertyHighlights';
import WhoItsFor from '@/components/WhoItsFor';
import UnitCard from '@/components/UnitCard';
import VirtualTour from '@/components/VirtualTour';
import Location from '@/components/Location';
import LocalAttractions from '@/components/LocalAttractions';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import HowItWorks from '@/components/HowItWorks';
import InquiryForm from '@/components/InquiryForm';
import BookingWidget from '@/components/BookingWidget';
import Footer from '@/components/Footer';
import { units } from '@/lib/units';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      {/* Property Gallery Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">See Your Future Home</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore our waterfront property on Liberty Bay with stunning Olympic Mountain views
            </p>
          </div>
          <ImageGallery compact />
        </div>
      </section>

      <PropertyHighlights />
      <WhoItsFor />

      {/* Units Section */}
      <section id="units" className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              3 Unique Options
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">Choose Your Space</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
              Three thoughtfully designed options to match your privacy needs and budget.
              All include utilities, WiFi, and are move-in ready.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>
        </div>
      </section>

      <VirtualTour />

      {/* Quick Booking Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 via-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Book Your Perfect Space
              </h2>
              <p className="text-neutral-600 text-lg mb-6">
                Finding housing shouldn't add stress to your travel nursing assignment.
                Our simple booking process gets you from inquiry to keys in just a few days.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-semibold">1</span>
                  </span>
                  <div>
                    <span className="font-medium text-neutral-900">Submit your inquiry</span>
                    <p className="text-sm text-neutral-600">Tell us about your contract and preferred dates</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-semibold">2</span>
                  </span>
                  <div>
                    <span className="font-medium text-neutral-900">Get approved within 24 hours</span>
                    <p className="text-sm text-neutral-600">Quick review and personalized response</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-semibold">3</span>
                  </span>
                  <div>
                    <span className="font-medium text-neutral-900">Sign and pay securely</span>
                    <p className="text-sm text-neutral-600">Digital lease and Stripe payment</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-semibold">4</span>
                  </span>
                  <div>
                    <span className="font-medium text-neutral-900">Move in and relax</span>
                    <p className="text-sm text-neutral-600">Self check-in, everything ready for you</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <BookingWidget sticky={false} />
            </div>
          </div>
        </div>
      </section>

      <Location />
      <LocalAttractions />
      <Pricing />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <InquiryForm />
      <Footer />
    </main>
  );
}
