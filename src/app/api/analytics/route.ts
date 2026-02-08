import { NextRequest, NextResponse } from 'next/server';
import {
  bookingStore,
  transactionStore,
  availabilityStore,
  calculateOccupancyRate,
  guestStore,
  reviewStore,
} from '@/lib/mockData';
import { AnalyticsData, BookingStatus } from '@/lib/types';
import { units } from '@/lib/units';

// Helper to get first day of month
function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

// Helper to get last day of month
function getLastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Helper to format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get period (default: last 90 days)
    const endDateParam = searchParams.get('endDate');
    const startDateParam = searchParams.get('startDate');
    const periodDays = parseInt(searchParams.get('days') || '90', 10);

    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(endDate.getTime() - periodDays * 24 * 60 * 60 * 1000);

    const startDateStr = formatDate(startDate);
    const endDateStr = formatDate(endDate);

    // ==================== OCCUPANCY STATS ====================
    const occupancy = units.map(unit => {
      const availability = availabilityStore.getByUnitAndDateRange(
        unit.id,
        startDateStr,
        endDateStr
      );

      const bookedDays = availability.filter(a => a.status === 'booked').length;
      const totalDays = availability.length;
      const occupancyRate = totalDays > 0 ? Math.round((bookedDays / totalDays) * 100) : 0;

      return {
        unitId: unit.id,
        unitName: unit.name,
        occupancyRate,
        bookedDays,
        totalDays,
      };
    });

    // ==================== REVENUE STATS ====================
    const allTransactions = transactionStore.getAll();

    // Filter transactions in period
    const periodTransactions = allTransactions.filter(t => {
      const txnDate = new Date(t.createdAt);
      return txnDate >= startDate && txnDate <= endDate;
    });

    // Calculate total revenue (payments + deposits - refunds)
    const totalRevenue = periodTransactions.reduce((sum, t) => {
      if (t.status !== 'completed') return sum;
      if (t.type === 'refund') return sum - t.amount;
      if (t.type === 'payment' || t.type === 'deposit') return sum + t.amount;
      return sum;
    }, 0);

    // Monthly revenue (current month)
    const currentMonth = getFirstDayOfMonth(new Date());
    const monthlyTransactions = allTransactions.filter(t => {
      const txnDate = new Date(t.createdAt);
      return txnDate >= currentMonth && t.status === 'completed';
    });

    const monthlyRevenue = monthlyTransactions.reduce((sum, t) => {
      if (t.type === 'refund') return sum - t.amount;
      if (t.type === 'payment' || t.type === 'deposit') return sum + t.amount;
      return sum;
    }, 0);

    // Revenue by unit
    const revenueByUnit = units.map(unit => {
      const unitBookings = bookingStore.filter(b => b.unitId === unit.id);
      const unitBookingIds = new Set(unitBookings.map(b => b.id));

      const unitRevenue = periodTransactions
        .filter(t => unitBookingIds.has(t.bookingId) && t.status === 'completed')
        .reduce((sum, t) => {
          if (t.type === 'refund') return sum - t.amount;
          if (t.type === 'payment' || t.type === 'deposit') return sum + t.amount;
          return sum;
        }, 0);

      return {
        unitId: unit.id,
        unitName: unit.name,
        revenue: unitRevenue,
      };
    });

    // Revenue by month (last 6 months)
    const revenueByMonth: { month: string; revenue: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date();
      monthDate.setMonth(monthDate.getMonth() - i);
      const monthStart = getFirstDayOfMonth(monthDate);
      const monthEnd = getLastDayOfMonth(monthDate);

      const monthTransactions = allTransactions.filter(t => {
        const txnDate = new Date(t.createdAt);
        return txnDate >= monthStart && txnDate <= monthEnd && t.status === 'completed';
      });

      const monthRevenue = monthTransactions.reduce((sum, t) => {
        if (t.type === 'refund') return sum - t.amount;
        if (t.type === 'payment' || t.type === 'deposit') return sum + t.amount;
        return sum;
      }, 0);

      revenueByMonth.push({
        month: monthDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        revenue: monthRevenue,
      });
    }

    // Average booking value
    const completedBookings = bookingStore.filter(b =>
      b.status === 'checked-out' || b.status === 'checked-in'
    );
    const averageBookingValue = completedBookings.length > 0
      ? Math.round(completedBookings.reduce((sum, b) => sum + b.totalAmount, 0) / completedBookings.length)
      : 0;

    // ==================== BOOKING TRENDS ====================
    const allBookings = bookingStore.getAll();

    // Bookings this month
    const thisMonth = getFirstDayOfMonth(new Date());
    const bookingsThisMonth = allBookings.filter(b => new Date(b.createdAt) >= thisMonth).length;

    // Bookings last month
    const lastMonth = new Date(thisMonth);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const bookingsLastMonth = allBookings.filter(b => {
      const created = new Date(b.createdAt);
      return created >= lastMonth && created < thisMonth;
    }).length;

    // Average stay length (in days)
    const stayLengths = completedBookings.map(b => {
      const start = new Date(b.startDate);
      const end = new Date(b.endDate);
      return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    });
    const averageStayLength = stayLengths.length > 0
      ? Math.round(stayLengths.reduce((a, b) => a + b, 0) / stayLengths.length)
      : 0;

    // Status breakdown
    const statuses: BookingStatus[] = ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'];
    const statusBreakdown = statuses.map(status => ({
      status,
      count: allBookings.filter(b => b.status === status).length,
    }));

    // ==================== ADDITIONAL METRICS ====================
    const totalGuests = guestStore.count();
    const repeatGuests = guestStore.filter(g => (g.bookings?.length || 0) > 1).length;
    const averageRating = (() => {
      const allReviews = reviewStore.getAll();
      if (allReviews.length === 0) return 0;
      const sum = allReviews.reduce((acc, r) => acc + r.rating, 0);
      return Math.round((sum / allReviews.length) * 10) / 10;
    })();

    // ==================== COMPILE RESPONSE ====================
    const analyticsData: AnalyticsData & {
      additionalMetrics: {
        totalGuests: number;
        repeatGuests: number;
        repeatGuestRate: number;
        averageRating: number;
        totalReviews: number;
      };
    } = {
      occupancy,
      revenue: {
        totalRevenue,
        monthlyRevenue,
        averageBookingValue,
        revenueByUnit,
        revenueByMonth,
      },
      bookingTrends: {
        totalBookings: allBookings.length,
        bookingsThisMonth,
        bookingsLastMonth,
        averageStayLength,
        statusBreakdown,
      },
      period: {
        start: startDateStr,
        end: endDateStr,
      },
      additionalMetrics: {
        totalGuests,
        repeatGuests,
        repeatGuestRate: totalGuests > 0 ? Math.round((repeatGuests / totalGuests) * 100) : 0,
        averageRating,
        totalReviews: reviewStore.count(),
      },
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
