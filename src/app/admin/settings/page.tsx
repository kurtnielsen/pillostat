'use client';

import { useState } from 'react';

const tabs = [
  { id: 'general', name: 'General' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'units', name: 'Units & Pricing' },
  { id: 'policies', name: 'Policies' },
  { id: 'integrations', name: 'Integrations' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-500">Manage your property and account settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-neutral-200">
        {activeTab === 'general' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Property Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Property Name</label>
                  <input
                    type="text"
                    defaultValue="pillowSTAT"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Property Type</label>
                  <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Single Family Home</option>
                    <option>Multi-Unit Property</option>
                    <option>Apartment Complex</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Address</label>
                  <input
                    type="text"
                    defaultValue="123 Nurse Lane, Healthcare City, HC 12345"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    defaultValue="host@nursebnb.com"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    defaultValue="(555) 123-4567"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <hr className="border-neutral-200" />

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Account Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Your Name</label>
                  <input
                    type="text"
                    defaultValue="Kurt Nielsen"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Your Email</label>
                  <input
                    type="email"
                    defaultValue="kurt@nursebnb.com"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {[
                  { id: 'new-booking', label: 'New booking requests', description: 'Get notified when a guest requests a booking', checked: true },
                  { id: 'booking-confirmed', label: 'Booking confirmations', description: 'When a booking is confirmed or paid', checked: true },
                  { id: 'new-message', label: 'New messages', description: 'When a guest sends you a message', checked: true },
                  { id: 'payment-received', label: 'Payment received', description: 'When a payment is successfully processed', checked: true },
                  { id: 'checkout-reminder', label: 'Check-out reminders', description: 'Day before a guest checks out', checked: false },
                  { id: 'review-received', label: 'New reviews', description: 'When a guest leaves a review', checked: true },
                ].map((notification) => (
                  <div key={notification.id} className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="font-medium text-neutral-900">{notification.label}</p>
                      <p className="text-sm text-neutral-500">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={notification.checked} className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-neutral-200" />

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">SMS Notifications</h3>
              <div className="space-y-4">
                {[
                  { id: 'sms-urgent', label: 'Urgent alerts only', description: 'Same-day check-ins and critical issues', checked: true },
                  { id: 'sms-messages', label: 'New messages', description: 'Text when guests message you', checked: false },
                ].map((notification) => (
                  <div key={notification.id} className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="font-medium text-neutral-900">{notification.label}</p>
                      <p className="text-sm text-neutral-500">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={notification.checked} className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'units' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">Your Units</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Unit
              </button>
            </div>

            <div className="space-y-4">
              {[
                { id: 'studio-suite', name: 'Studio Suite', price: 2200, available: true },
                { id: 'garden-suite', name: 'Garden Suite', price: 1650, available: true },
                { id: 'upper-retreat', name: 'Upper Retreat', price: 2100, available: false },
              ].map((unit) => (
                <div key={unit.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{unit.name}</p>
                      <p className="text-sm text-neutral-500">${unit.price}/month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      unit.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {unit.available ? 'Available' : 'Occupied'}
                    </span>
                    <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-neutral-200" />

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Contract Length Discounts</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">8 Weeks</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue="0"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-center"
                    />
                    <span className="text-neutral-500">%</span>
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">13 Weeks</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue="5"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-center"
                    />
                    <span className="text-neutral-500">%</span>
                  </div>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">26 Weeks</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue="10"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-center"
                    />
                    <span className="text-neutral-500">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Cancellation Policy</h3>
              <div className="space-y-3">
                {[
                  { id: 'flexible', name: 'Flexible', description: 'Full refund up to 24 hours before check-in' },
                  { id: 'moderate', name: 'Moderate', description: 'Full refund up to 5 days before check-in', selected: true },
                  { id: 'strict', name: 'Strict', description: '50% refund up to 7 days before check-in, no refund after' },
                ].map((policy) => (
                  <label
                    key={policy.id}
                    className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                      policy.selected
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="cancellation"
                      defaultChecked={policy.selected}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium text-neutral-900">{policy.name}</p>
                      <p className="text-sm text-neutral-500">{policy.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-neutral-200" />

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">House Rules</h3>
              <textarea
                rows={6}
                defaultValue={`- Quiet hours: 10pm - 8am
- No smoking anywhere on the property
- Pets allowed with prior approval and $200 pet deposit
- Maximum 2 guests per unit
- Please respect shared spaces
- No parties or events`}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Check-in / Check-out Times</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Check-in Time</label>
                  <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>2:00 PM</option>
                    <option selected>3:00 PM</option>
                    <option>4:00 PM</option>
                    <option>5:00 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Check-out Time</label>
                  <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>10:00 AM</option>
                    <option selected>11:00 AM</option>
                    <option>12:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Payment Processing</h3>
              <div className="p-4 bg-neutral-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                    <svg className="w-8 h-8" viewBox="0 0 28 28" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.04 3.06c-.71.49-1.18 1.24-1.18 2.12 0 .88.47 1.63 1.18 2.12-.71-.49-1.57-.8-2.49-.8-2.4 0-4.35 2.02-4.35 4.5s1.95 4.5 4.35 4.5c.92 0 1.78-.31 2.49-.8-.71.49-1.18 1.24-1.18 2.12 0 1.44 1.12 2.62 2.49 2.62 1.38 0 2.5-1.18 2.5-2.62 0-.88-.47-1.63-1.18-2.12.71.49 1.56.8 2.48.8 2.4 0 4.35-2.02 4.35-4.5s-1.95-4.5-4.35-4.5c-.92 0-1.77.31-2.48.8.71-.49 1.18-1.24 1.18-2.12C16.49 1.18 15.37 0 14 0c-1.38 0-2.5 1.18-2.5 2.62 0 .18.02.35.05.52-.01-.03-.01-.05-.01-.08z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Stripe</p>
                    <p className="text-sm text-green-600">Connected</p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors text-sm">
                  Manage
                </button>
              </div>
            </div>

            <hr className="border-neutral-200" />

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Calendar Sync</h3>
              <div className="space-y-3">
                <div className="p-4 bg-neutral-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Google Calendar</p>
                      <p className="text-sm text-neutral-500">Not connected</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                    Connect
                  </button>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>
                        <path d="M12 8l-4 4h3v4h2v-4h3z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Airbnb iCal</p>
                      <p className="text-sm text-neutral-500">Import/export availability</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors text-sm">
                    Setup
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-neutral-200" />

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Smart Home</h3>
              <div className="p-4 bg-neutral-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Smart Locks</p>
                    <p className="text-sm text-neutral-500">Auto-generate access codes for guests</p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-100 transition-colors text-sm">
                  Configure
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
