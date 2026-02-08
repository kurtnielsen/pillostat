'use client';

import { useState, useMemo } from 'react';
import { legacyGuests as guests, legacyBookings as bookings, LegacyGuest, formatCurrency, formatDate, getRelativeTime } from '@/lib/mockData';

// Use LegacyGuest type for this page
type Guest = LegacyGuest;

export default function GuestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'recent' | 'bookings' | 'spent'>('recent');
  const [isLoading] = useState(false);

  const filteredGuests = useMemo(() => {
    let filtered = guests.filter((guest) => {
      const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
      const query = searchQuery.toLowerCase();
      return (
        fullName.includes(query) ||
        guest.email.toLowerCase().includes(query) ||
        guest.phone.includes(query)
      );
    });

    // Sort
    switch (sortBy) {
      case 'name':
        filtered = filtered.sort((a, b) =>
          `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
        );
        break;
      case 'recent':
        filtered = filtered.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'bookings':
        filtered = filtered.sort((a, b) => b.totalBookings - a.totalBookings);
        break;
      case 'spent':
        filtered = filtered.sort((a, b) => b.totalSpent - a.totalSpent);
        break;
    }

    return filtered;
  }, [searchQuery, sortBy]);

  const getGuestBookings = (guestId: string) => {
    return bookings.filter((b) => b.guestId === guestId);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-neutral-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Guests</h1>
          <p className="text-neutral-500">Manage your guest database and history</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Guest
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <div className="text-2xl font-bold text-neutral-900">{guests.length}</div>
          <div className="text-sm text-neutral-500">Total Guests</div>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <div className="text-2xl font-bold text-green-600">
            {guests.filter((g) => g.totalBookings > 1).length}
          </div>
          <div className="text-sm text-neutral-500">Repeat Guests</div>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <div className="text-2xl font-bold text-primary-600">
            {(guests.reduce((sum, g) => sum + g.rating, 0) / guests.length).toFixed(1)}
          </div>
          <div className="text-sm text-neutral-500">Average Rating</div>
        </div>
        <div className="bg-white rounded-lg border border-neutral-200 p-4">
          <div className="text-2xl font-bold text-neutral-900">
            {formatCurrency(guests.reduce((sum, g) => sum + g.totalSpent, 0))}
          </div>
          <div className="text-sm text-neutral-500">Total Revenue</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg border border-neutral-200">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="recent">Most Recent</option>
          <option value="name">Name A-Z</option>
          <option value="bookings">Most Bookings</option>
          <option value="spent">Highest Spent</option>
        </select>
      </div>

      {/* Guests Grid */}
      {filteredGuests.length === 0 ? (
        <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
          <svg className="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="text-lg font-medium text-neutral-900 mb-1">No guests found</h3>
          <p className="text-neutral-500">Try adjusting your search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuests.map((guest) => (
            <div
              key={guest.id}
              className="bg-white rounded-lg border border-neutral-200 p-6 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedGuest(guest)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold text-lg">
                    {guest.firstName[0]}{guest.lastName[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {guest.firstName} {guest.lastName}
                    </h3>
                    <div className="flex items-center gap-1">
                      {renderStars(guest.rating)}
                    </div>
                  </div>
                </div>
                {guest.totalBookings > 1 && (
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                    Repeat
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-neutral-600">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {guest.email}
                </div>
                <div className="flex items-center gap-2 text-neutral-600">
                  <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {guest.phone}
                </div>
                {guest.employer && (
                  <div className="flex items-center gap-2 text-neutral-600">
                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {guest.employer}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-sm text-neutral-500">Total Spent</span>
                  <p className="font-semibold text-neutral-900">{formatCurrency(guest.totalSpent)}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-neutral-500">Bookings</span>
                  <p className="font-semibold text-neutral-900">{guest.totalBookings}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Guest Detail Modal */}
      {selectedGuest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedGuest(null)}>
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-2xl">
                    {selectedGuest.firstName[0]}{selectedGuest.lastName[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-neutral-900">
                      {selectedGuest.firstName} {selectedGuest.lastName}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-0.5">{renderStars(selectedGuest.rating)}</div>
                      <span className="text-sm text-neutral-500">({selectedGuest.rating}/5)</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGuest(null)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Actions */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${selectedGuest.email}`}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </a>
                <a
                  href={`tel:${selectedGuest.phone}`}
                  className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </a>
                <button className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Message
                </button>
              </div>

              {/* Contact Info */}
              <div className="bg-neutral-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <p className="font-medium text-neutral-900">{selectedGuest.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Phone</p>
                    <p className="font-medium text-neutral-900">{selectedGuest.phone}</p>
                  </div>
                  {selectedGuest.employer && (
                    <div>
                      <p className="text-sm text-neutral-500">Employer</p>
                      <p className="font-medium text-neutral-900">{selectedGuest.employer}</p>
                    </div>
                  )}
                  {selectedGuest.hospital && (
                    <div>
                      <p className="text-sm text-neutral-500">Hospital</p>
                      <p className="font-medium text-neutral-900">{selectedGuest.hospital}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-neutral-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-neutral-900">{selectedGuest.totalBookings}</p>
                  <p className="text-sm text-neutral-500">Total Bookings</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(selectedGuest.totalSpent)}</p>
                  <p className="text-sm text-neutral-500">Total Spent</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-neutral-900">
                    {selectedGuest.lastStay ? formatDate(selectedGuest.lastStay) : 'N/A'}
                  </p>
                  <p className="text-sm text-neutral-500">Last Stay</p>
                </div>
              </div>

              {/* Booking History */}
              <div>
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-3">Booking History</h3>
                <div className="space-y-3">
                  {getGuestBookings(selectedGuest.id).length === 0 ? (
                    <p className="text-neutral-500 text-center py-4">No bookings yet</p>
                  ) : (
                    getGuestBookings(selectedGuest.id).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                        <div>
                          <p className="font-medium text-neutral-900">{booking.unitName}</p>
                          <p className="text-sm text-neutral-500">
                            {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-neutral-900">{formatCurrency(booking.totalAmount)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-3">Notes</h3>
                <textarea
                  rows={4}
                  defaultValue={selectedGuest.notes || ''}
                  placeholder="Add notes about this guest..."
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Meta Info */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-sm text-neutral-500">
                <span>Guest since {formatDate(selectedGuest.createdAt)}</span>
                <span>ID: {selectedGuest.id}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
