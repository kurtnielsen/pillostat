'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  bookings,
  guests,
  messages,
  transactions,
  formatCurrency,
  formatDate,
  getRelativeTime,
  calculateRevenue,
} from '@/lib/mockData';
import { Booking, BookingStatus } from '@/lib/types';

// Calculate stats
function getStats() {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Active bookings (checked-in or confirmed with start date in range)
  const activeBookings = bookings.filter(
    (b) => b.status === 'checked-in' || b.status === 'confirmed'
  );

  // Pending bookings
  const pendingBookings = bookings.filter((b) => b.status === 'pending');

  // Unread messages
  const unreadMessages = messages.filter((m) => !m.read && m.sender === 'guest');

  // Revenue this month
  const monthlyRevenue = calculateRevenue(
    startOfMonth.toISOString().split('T')[0],
    endOfMonth.toISOString().split('T')[0]
  );

  // Occupancy calculation (simplified for demo)
  const occupancyRate = 78; // Would calculate from availability data

  return {
    occupancyRate,
    monthlyRevenue,
    activeBookings: activeBookings.length,
    pendingInquiries: pendingBookings.length,
    unreadMessages: unreadMessages.length,
  };
}

const revenueData = [
  { month: 'Sep', value: 65 },
  { month: 'Oct', value: 80 },
  { month: 'Nov', value: 72 },
  { month: 'Dec', value: 90 },
  { month: 'Jan', value: 85 },
  { month: 'Feb', value: 95 },
];

type ActivityType = 'booking' | 'message' | 'payment' | 'review';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
}

function getRecentActivity(): Activity[] {
  const activities: Activity[] = [];

  // Add recent bookings
  bookings
    .filter((b) => b.status !== 'cancelled')
    .slice(0, 3)
    .forEach((b) => {
      const guest = guests.find((g) => g.id === b.guestId);
      activities.push({
        id: `booking-${b.id}`,
        type: 'booking',
        title: b.status === 'pending' ? 'New booking request' : 'Booking confirmed',
        description: `${guest?.firstName} ${guest?.lastName} - ${formatDate(b.startDate)}`,
        timestamp: b.createdAt,
      });
    });

  // Add recent messages
  messages
    .filter((m) => m.sender === 'guest')
    .slice(0, 3)
    .forEach((m) => {
      const guest = guests.find((g) => g.id === m.guestId);
      activities.push({
        id: `message-${m.id}`,
        type: 'message',
        title: m.read ? 'Message' : 'New message',
        description: `${guest?.firstName}: ${m.content.substring(0, 50)}...`,
        timestamp: m.createdAt,
      });
    });

  // Add recent payments
  transactions
    .filter((t) => t.type === 'payment' || t.type === 'deposit')
    .slice(0, 3)
    .forEach((t) => {
      const booking = bookings.find((b) => b.id === t.bookingId);
      const guest = guests.find((g) => g.id === booking?.guestId);
      activities.push({
        id: `payment-${t.id}`,
        type: 'payment',
        title: 'Payment received',
        description: `${formatCurrency(t.amount)} from ${guest?.firstName} ${guest?.lastName}`,
        timestamp: t.createdAt,
      });
    });

  // Sort by timestamp and return top 8
  return activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8);
}

const activityIcons: Record<ActivityType, JSX.Element> = {
  booking: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  message: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  payment: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  review: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
};

const activityColors: Record<ActivityType, string> = {
  booking: 'bg-blue-100 text-blue-600',
  message: 'bg-purple-100 text-purple-600',
  payment: 'bg-green-100 text-green-600',
  review: 'bg-orange-100 text-orange-600',
};

export default function AdminDashboard() {
  const [isLoading] = useState(false);
  const stats = useMemo(() => getStats(), []);
  const activities = useMemo(() => getRecentActivity(), []);

  // Get upcoming check-ins and check-outs
  const upcomingCheckins = useMemo(() => {
    const now = new Date();
    return bookings
      .filter((b) => (b.status === 'confirmed' || b.status === 'pending') && new Date(b.startDate) > now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 3)
      .map((b) => {
        const guest = guests.find((g) => g.id === b.guestId);
        return { ...b, guestName: `${guest?.firstName} ${guest?.lastName}` };
      });
  }, []);

  const upcomingCheckouts = useMemo(() => {
    const now = new Date();
    return bookings
      .filter((b) => b.status === 'checked-in' && new Date(b.endDate) > now)
      .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
      .slice(0, 3)
      .map((b) => {
        const guest = guests.find((g) => g.id === b.guestId);
        return { ...b, guestName: `${guest?.firstName} ${guest?.lastName}` };
      });
  }, []);

  const pendingBookings = bookings.filter((b) => b.status === 'pending');

  const statCards = [
    {
      name: 'Occupancy Rate',
      value: `${stats.occupancyRate}%`,
      change: '+12%',
      changeType: 'positive' as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      color: 'bg-primary-500',
    },
    {
      name: 'Revenue This Month',
      value: formatCurrency(stats.monthlyRevenue),
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-500',
    },
    {
      name: 'Active Bookings',
      value: stats.activeBookings.toString(),
      change: `${upcomingCheckins.length} arriving soon`,
      changeType: 'neutral' as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      name: 'Pending Inquiries',
      value: stats.pendingInquiries.toString(),
      change: stats.unreadMessages > 0 ? `${stats.unreadMessages} unread` : 'All caught up',
      changeType: stats.unreadMessages > 0 ? ('warning' as const) : ('positive' as const),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      ),
      color: 'bg-yellow-500',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : stat.changeType === 'warning'
                    ? 'text-yellow-600'
                    : 'text-neutral-500'
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-neutral-900">{stat.value}</h3>
              <p className="text-sm text-neutral-500 mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Revenue Overview</h2>
              <p className="text-sm text-neutral-500">Monthly revenue for the past 6 months</p>
            </div>
            <select className="text-sm border border-neutral-300 rounded-lg px-3 py-1.5">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>This year</option>
            </select>
          </div>

          {/* CSS-based bar chart */}
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {revenueData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary-500 rounded-t-lg transition-all duration-500 hover:bg-primary-600"
                  style={{ height: `${data.value * 2}px` }}
                ></div>
                <span className="text-xs text-neutral-500 font-medium">{data.month}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-neutral-500">Total Revenue</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(calculateRevenue())}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Average/Month</p>
              <p className="text-xl font-bold text-neutral-900">{formatCurrency(Math.round(calculateRevenue() / 6))}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-500">Projected</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(Math.round(calculateRevenue() * 1.1))}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900">Recent Activity</h2>
            <Link href="/admin/bookings" className="text-sm text-primary-600 hover:text-primary-700">
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${activityColors[activity.type]}`}>
                  {activityIcons[activity.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">{activity.title}</p>
                  <p className="text-xs text-neutral-500 truncate">{activity.description}</p>
                  <p className="text-xs text-neutral-400 mt-1">{getRelativeTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Check-ins */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900">Upcoming Check-ins</h2>
            <Link href="/admin/calendar" className="text-sm text-primary-600 hover:text-primary-700">
              View calendar
            </Link>
          </div>

          {upcomingCheckins.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 mx-auto text-neutral-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-neutral-500">No upcoming check-ins</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingCheckins.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">{booking.guestName}</p>
                    <p className="text-sm text-neutral-500">{booking.unitId.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-900">{formatDate(booking.startDate)}</p>
                    <p className={`text-xs ${booking.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {booking.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Check-outs */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900">Upcoming Check-outs</h2>
            <Link href="/admin/calendar" className="text-sm text-primary-600 hover:text-primary-700">
              View calendar
            </Link>
          </div>

          {upcomingCheckouts.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-12 h-12 mx-auto text-neutral-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-neutral-500">No upcoming check-outs</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingCheckouts.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">{booking.guestName}</p>
                    <p className="text-sm text-neutral-500">{booking.unitId.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-900">{formatDate(booking.endDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-6">Quick Actions</h2>

          <div className="space-y-3">
            <Link
              href="/admin/bookings"
              className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-neutral-900">Add New Booking</p>
                <p className="text-xs text-neutral-500">Create a manual booking</p>
              </div>
            </Link>

            <Link
              href="/admin/calendar"
              className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-neutral-900">Block Dates</p>
                <p className="text-xs text-neutral-500">Make dates unavailable</p>
              </div>
            </Link>

            <Link
              href="/admin/messages"
              className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-neutral-900">Send Message</p>
                <p className="text-xs text-neutral-500">Contact a guest</p>
              </div>
            </Link>

            <Link
              href="/admin/financials"
              className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-neutral-900">Generate Invoice</p>
                <p className="text-xs text-neutral-500">Create a payment request</p>
              </div>
            </Link>
          </div>

          {pendingBookings.length > 0 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-medium">{pendingBookings.length} pending bookings</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">Review and confirm pending reservations</p>
              <Link
                href="/admin/bookings?status=pending"
                className="inline-block mt-3 text-sm font-medium text-yellow-800 hover:text-yellow-900"
              >
                Review now &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
