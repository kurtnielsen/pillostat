import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="mb-6 inline-block">
              <Logo darkText={false} />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Professional housing for traveling nurses and healthcare professionals.
              Located on Liberty Bay in charming Poulsbo, WA.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:info@pillostat.com"
                className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href="tel:+15551234567"
                className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#units" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-500" />
                  View Units
                </a>
              </li>
              <li>
                <a href="#highlights" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-500" />
                  Property Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-500" />
                  Pricing
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-500" />
                  Location
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-500" />
                  Reviews
                </a>
              </li>
              <li>
                <a href="#apply" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-500" />
                  Apply Now
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#faq" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-500" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-500" />
                  How It Works
                </a>
              </li>
              <li>
                <a href="/house-rules" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-500" />
                  House Rules
                </a>
              </li>
              <li>
                <a href="#virtual-tour" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary-500" />
                  Virtual Tour
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="block text-neutral-500 text-xs uppercase tracking-wider mb-1">Email</span>
                <a href="mailto:info@pillostat.com" className="text-white hover:text-primary-400 transition-colors">
                  info@pillostat.com
                </a>
              </li>
              <li>
                <span className="block text-neutral-500 text-xs uppercase tracking-wider mb-1">Phone</span>
                <a href="tel:+15551234567" className="text-white hover:text-primary-400 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li>
                <span className="block text-neutral-500 text-xs uppercase tracking-wider mb-1">Location</span>
                <span className="text-white">
                  Liberty Bay Waterfront<br />
                  Poulsbo, WA 98370
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Nearby Hospitals Banner */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <span className="text-neutral-500">Nearby Hospitals:</span>
            <span className="text-white">St. Michael Medical Center</span>
            <span className="text-neutral-600">|</span>
            <span className="text-white">Harrison Medical Center</span>
            <span className="text-neutral-600">|</span>
            <span className="text-white">Virginia Mason Franciscan</span>
            <span className="text-neutral-600">|</span>
            <span className="text-white">Seattle via Ferry</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              &copy; {new Date().getFullYear()} pillowSTAT. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/house-rules" className="hover:text-white transition-colors">House Rules</a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-neutral-500">Secured by Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
