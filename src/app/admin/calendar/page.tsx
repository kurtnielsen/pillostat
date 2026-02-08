'use client';

import { useState, useMemo } from 'react';
import { legacyBookings as bookings, legacyGuests as guests, availability, formatDate } from '@/lib/mockData';
import { BookingStatus } from '@/lib/types';

const units = [
  { id: 'studio-suite', name: 'Studio Suite', color: 'bg-primary-500' },
  { id: 'garden-suite', name: 'Garden Suite', color: 'bg-blue-500' },
  { id: 'upper-retreat', name: 'Upper Retreat', color: 'bg-purple-500' },
];

const statusColors: Record<BookingStatus, string> = {
  confirmed: 'bg-green-500',
  'checked-in': 'bg-blue-500',
  pending: 'bg-yellow-500',
  'checked-out': 'bg-neutral-400',
  cancelled: 'bg-red-300',
  completed: 'bg-green-500',
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isLoading] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const firstDayOfMonth = useMemo(() => {
    return new Date(year, month, 1).getDay();
  }, [year, month]);

  const days = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      arr.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      arr.push(i);
    }
    return arr;
  }, [firstDayOfMonth, daysInMonth]);

  const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });

  const getBookingsForDate = (day: number) => {
    if (!day) return [];
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];

    return bookings
      .filter((booking) => {
        if (booking.status === 'cancelled') return false;
        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);
        const checkDate = new Date(dateStr);
        return checkDate >= startDate && checkDate <= endDate;
      })
      .map((booking) => {
        const guest = guests.find((g) => g.id === booking.guestId);
        return {
          ...booking,
          guestName: guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown',
        };
      });
  };

  const getAvailabilityForDate = (day: number, unitId: string) => {
    if (!day) return null;
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return availability.find((a) => a.unitId === unitId && a.date === dateStr);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (day: number) => {
    if (day) {
      setSelectedDate(new Date(year, month, day));
      setShowBlockModal(true);
    }
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
          <h1 className="text-2xl font-bold text-neutral-900">Calendar</h1>
          <p className="text-neutral-500">View and manage unit availability</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={goToToday}
            className="px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => setShowBlockModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            Block Dates
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-neutral-900">
            {monthName} {year}
          </h2>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-neutral-200">
          {units.map((unit) => (
            <div key={unit.id} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${unit.color}`}></div>
              <span className="text-sm text-neutral-600">{unit.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 ml-4">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-neutral-600">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neutral-400"></div>
            <span className="text-sm text-neutral-600">Blocked/Maintenance</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-neutral-200 rounded-lg overflow-hidden">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="bg-neutral-50 p-3 text-center">
              <span className="text-xs font-medium text-neutral-500 uppercase">{day}</span>
            </div>
          ))}

          {/* Days */}
          {days.map((day, index) => {
            const dayBookings = day ? getBookingsForDate(day) : [];
            const isToday = day && new Date().toDateString() === new Date(year, month, day).toDateString();

            return (
              <div
                key={index}
                className={`bg-white min-h-[100px] p-2 ${
                  day ? 'cursor-pointer hover:bg-neutral-50' : ''
                } transition-colors`}
                onClick={() => day && handleDateClick(day)}
              >
                {day && (
                  <>
                    <div className="flex justify-between items-start mb-1">
                      <span
                        className={`text-sm font-medium ${
                          isToday
                            ? 'bg-primary-600 text-white w-7 h-7 rounded-full flex items-center justify-center'
                            : 'text-neutral-900'
                        }`}
                      >
                        {day}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {dayBookings.slice(0, 3).map((booking) => {
                        const unit = units.find((u) => u.id === booking.unitId);
                        const isCheckIn = new Date(booking.startDate).toDateString() === new Date(year, month, day).toDateString();
                        const isCheckOut = new Date(booking.endDate).toDateString() === new Date(year, month, day).toDateString();

                        return (
                          <div
                            key={booking.id}
                            className={`text-xs px-1.5 py-0.5 rounded text-white truncate ${
                              booking.status === 'pending' ? statusColors.pending :
                              booking.status === 'checked-in' ? statusColors['checked-in'] :
                              unit?.color || 'bg-neutral-400'
                            }`}
                            title={`${booking.guestName} - ${unit?.name}`}
                          >
                            {isCheckIn && (
                              <span className="mr-1">&#10095;</span>
                            )}
                            {booking.guestName.split(' ')[0]}
                            {isCheckOut && (
                              <span className="ml-1">&#10094;</span>
                            )}
                          </div>
                        );
                      })}
                      {dayBookings.length > 3 && (
                        <div className="text-xs text-neutral-500">
                          +{dayBookings.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Unit Availability Timeline */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Monthly Overview</h2>
        <div className="space-y-4">
          {units.map((unit) => {
            const unitBookings = bookings.filter(
              (b) => b.unitId === unit.id && b.status !== 'cancelled'
            ).map((b) => {
              const guest = guests.find((g) => g.id === b.guestId);
              return { ...b, guestName: guest?.firstName || 'Guest' };
            });

            return (
              <div key={unit.id} className="flex items-center gap-4">
                <div className="w-32 flex-shrink-0">
                  <span className="text-sm font-medium text-neutral-900">{unit.name}</span>
                </div>
                <div className="flex-1 relative h-8 bg-neutral-100 rounded-lg overflow-hidden">
                  {unitBookings.map((booking) => {
                    const checkIn = new Date(booking.startDate);
                    const checkOut = new Date(booking.endDate);
                    const monthStart = new Date(year, month, 1);
                    const monthEnd = new Date(year, month + 1, 0);

                    if (checkOut < monthStart || checkIn > monthEnd) return null;

                    const startDay = Math.max(
                      1,
                      checkIn >= monthStart ? checkIn.getDate() : 1
                    );
                    const endDay = Math.min(
                      daysInMonth,
                      checkOut <= monthEnd ? checkOut.getDate() : daysInMonth
                    );

                    const leftPercent = ((startDay - 1) / daysInMonth) * 100;
                    const widthPercent = ((endDay - startDay + 1) / daysInMonth) * 100;

                    return (
                      <div
                        key={booking.id}
                        className={`absolute top-1 bottom-1 rounded ${
                          booking.status === 'pending' ? statusColors.pending :
                          booking.status === 'checked-in' ? statusColors['checked-in'] :
                          unit.color
                        } flex items-center justify-center`}
                        style={{
                          left: `${leftPercent}%`,
                          width: `${widthPercent}%`,
                        }}
                        title={`${booking.guestName}: ${formatDate(booking.startDate)} - ${formatDate(booking.endDate)}`}
                      >
                        <span className="text-xs text-white font-medium truncate px-2">
                          {booking.guestName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Day labels */}
        <div className="flex mt-4 pl-36">
          <div className="flex-1 flex justify-between text-xs text-neutral-500">
            <span>1</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
            <span>25</span>
            <span>{daysInMonth}</span>
          </div>
        </div>
      </div>

      {/* Block Dates Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowBlockModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-neutral-900">Block Dates</h2>
                <button
                  onClick={() => setShowBlockModal(false)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Select Unit</label>
                <select className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option value="">All Units</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    defaultValue={selectedDate?.toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Reason (optional)</label>
                <textarea
                  rows={3}
                  placeholder="e.g., Maintenance, Personal use, Renovation..."
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowBlockModal(false)}
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Block Dates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drag hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-sm font-medium text-blue-900">Tip: Drag to extend bookings</p>
          <p className="text-sm text-blue-700">Click and drag the edge of a booking block to extend or shorten the reservation period.</p>
        </div>
      </div>
    </div>
  );
}
