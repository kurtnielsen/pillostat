'use client';

import { useState, useMemo } from 'react';
import { legacyBookings as bookings, legacyGuests as guests, formatCurrency, formatDate, LegacyBooking } from '@/lib/mockData';
import { BookingStatus } from '@/lib/types';

// Use LegacyBooking type for this page
type Booking = LegacyBooking;

const statusColors: Record<BookingStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  'checked-in': 'bg-blue-100 text-blue-800',
  'checked-out': 'bg-neutral-100 text-neutral-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-green-100 text-green-800',
};

const statusIcons: Record<BookingStatus, JSX.Element> = {
  pending: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  confirmed: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  'checked-in': (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  ),
  'checked-out': (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  cancelled: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  completed: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const unitNames: Record<string, string> = {
  'studio-suite': 'Studio Suite',
  'garden-suite': 'Garden Suite',
  'upper-retreat': 'Upper Retreat',
};

interface BookingWithGuest extends Booking {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [unitFilter, setUnitFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<BookingWithGuest | null>(null);
  const [isLoading] = useState(false);

  const bookingsWithGuests: BookingWithGuest[] = useMemo(() => {
    return bookings.map((booking) => {
      const guest = guests.find((g) => g.id === booking.guestId);
      return {
        ...booking,
        guestName: guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown Guest',
        guestEmail: guest?.email || '',
        guestPhone: guest?.phone || '',
      };
    });
  }, []);

  const units = useMemo(() => {
    const uniqueUnits = new Set(bookings.map((b) => b.unitId));
    return Array.from(uniqueUnits);
  }, []);

  const filteredBookings = useMemo(() => {
    return bookingsWithGuests.filter((booking) => {
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchesUnit = unitFilter === 'all' || booking.unitId === unitFilter;
      const matchesSearch =
        searchQuery === '' ||
        booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.guestEmail.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesUnit && matchesSearch;
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [bookingsWithGuests, statusFilter, unitFilter, searchQuery]);

  const stats = useMemo(() => ({
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    checkedIn: bookings.filter((b) => b.status === 'checked-in').length,
    checkedOut: bookings.filter((b) => b.status === 'checked-out').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  }), []);

  const getContractWeeks = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.round(diffDays / 7);
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
          <h1 className="text-2xl font-bold text-neutral-900">Bookings</h1>
          <p className="text-neutral-500">Manage all reservations and bookings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <button
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-lg border transition-colors ${
            statusFilter === 'all' ? 'border-primary-500 bg-primary-50' : 'border-neutral-200 bg-white hover:border-neutral-300'
          }`}
        >
          <div className="text-2xl font-bold text-neutral-900">{stats.total}</div>
          <div className="text-sm text-neutral-500">Total</div>
        </button>
        <button
          onClick={() => setStatusFilter('pending')}
          className={`p-4 rounded-lg border transition-colors ${
            statusFilter === 'pending' ? 'border-yellow-500 bg-yellow-50' : 'border-neutral-200 bg-white hover:border-neutral-300'
          }`}
        >
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-neutral-500">Pending</div>
        </button>
        <button
          onClick={() => setStatusFilter('confirmed')}
          className={`p-4 rounded-lg border transition-colors ${
            statusFilter === 'confirmed' ? 'border-green-500 bg-green-50' : 'border-neutral-200 bg-white hover:border-neutral-300'
          }`}
        >
          <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
          <div className="text-sm text-neutral-500">Confirmed</div>
        </button>
        <button
          onClick={() => setStatusFilter('checked-in')}
          className={`p-4 rounded-lg border transition-colors ${
            statusFilter === 'checked-in' ? 'border-blue-500 bg-blue-50' : 'border-neutral-200 bg-white hover:border-neutral-300'
          }`}
        >
          <div className="text-2xl font-bold text-blue-600">{stats.checkedIn}</div>
          <div className="text-sm text-neutral-500">Checked In</div>
        </button>
        <button
          onClick={() => setStatusFilter('checked-out')}
          className={`p-4 rounded-lg border transition-colors ${
            statusFilter === 'checked-out' ? 'border-neutral-500 bg-neutral-100' : 'border-neutral-200 bg-white hover:border-neutral-300'
          }`}
        >
          <div className="text-2xl font-bold text-neutral-600">{stats.checkedOut}</div>
          <div className="text-sm text-neutral-500">Checked Out</div>
        </button>
        <button
          onClick={() => setStatusFilter('cancelled')}
          className={`p-4 rounded-lg border transition-colors ${
            statusFilter === 'cancelled' ? 'border-red-500 bg-red-50' : 'border-neutral-200 bg-white hover:border-neutral-300'
          }`}
        >
          <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
          <div className="text-sm text-neutral-500">Cancelled</div>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg border border-neutral-200">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by guest name or email..."
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
          value={unitFilter}
          onChange={(e) => setUnitFilter(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Units</option>
          {units.map((unit) => (
            <option key={unit} value={unit}>{unitNames[unit] || unit}</option>
          ))}
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50">
          <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Date Range
        </button>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">No bookings found</h3>
            <p className="text-neutral-500">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Guest</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Unit</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Dates</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-neutral-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-neutral-900">{booking.guestName}</p>
                        <p className="text-sm text-neutral-500">{booking.guestEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-neutral-900">{unitNames[booking.unitId] || booking.unitId}</p>
                      <p className="text-sm text-neutral-500">{getContractWeeks(booking.startDate, booking.endDate)} weeks</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-neutral-900">{formatDate(booking.startDate)}</p>
                      <p className="text-sm text-neutral-500">to {formatDate(booking.endDate)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-neutral-900">{formatCurrency(booking.totalAmount)}</p>
                      {booking.paymentStatus === 'partial' && (
                        <p className="text-sm text-yellow-600">Partial payment</p>
                      )}
                      {booking.paymentStatus === 'pending' && (
                        <p className="text-sm text-yellow-600">Payment pending</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                        {statusIcons[booking.status]}
                        {booking.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <button className="p-2 text-neutral-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="View Details">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-2 text-neutral-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Send Message">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        </button>
                        <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors" title="More Actions">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Booking Details</h2>
                  <p className="text-neutral-500">ID: {selectedBooking.id}</p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusColors[selectedBooking.status]}`}>
                  {statusIcons[selectedBooking.status]}
                  {selectedBooking.status.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </span>
                <div className="flex gap-2">
                  {selectedBooking.status === 'pending' && (
                    <>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                        Decline
                      </button>
                    </>
                  )}
                  {selectedBooking.status === 'confirmed' && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Check In
                    </button>
                  )}
                  {selectedBooking.status === 'checked-in' && (
                    <button className="px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors text-sm font-medium">
                      Check Out
                    </button>
                  )}
                </div>
              </div>

              {/* Guest Info */}
              <div className="bg-neutral-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-3">Guest Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Name</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.guestName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.guestEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Phone</p>
                    <p className="font-medium text-neutral-900">{selectedBooking.guestPhone}</p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="bg-neutral-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-3">Reservation Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Unit</p>
                    <p className="font-medium text-neutral-900">{unitNames[selectedBooking.unitId] || selectedBooking.unitId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Contract Length</p>
                    <p className="font-medium text-neutral-900">{getContractWeeks(selectedBooking.startDate, selectedBooking.endDate)} weeks</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Check-in</p>
                    <p className="font-medium text-neutral-900">{formatDate(selectedBooking.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Check-out</p>
                    <p className="font-medium text-neutral-900">{formatDate(selectedBooking.endDate)}</p>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-neutral-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-3">Payment</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Total Amount</span>
                    <span className="font-medium text-neutral-900">{formatCurrency(selectedBooking.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Payment Status</span>
                    <span className={`font-medium ${
                      selectedBooking.paymentStatus === 'paid' ? 'text-green-600' :
                      selectedBooking.paymentStatus === 'partial' ? 'text-yellow-600' :
                      selectedBooking.paymentStatus === 'refunded' ? 'text-blue-600' :
                      'text-red-600'
                    }`}>
                      {selectedBooking.paymentStatus.charAt(0).toUpperCase() + selectedBooking.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <div className="bg-neutral-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-neutral-500 uppercase tracking-wide mb-2">Notes</h3>
                  <p className="text-neutral-700">{selectedBooking.notes}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-200">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Send Message
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Invoice
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
