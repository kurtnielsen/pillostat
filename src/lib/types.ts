// Core types for pillowSTAT application

export type BookingStatus = 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'partial' | 'refunded' | 'failed';
export type AvailabilityStatus = 'available' | 'booked' | 'blocked' | 'maintenance';
export type MessageSender = 'guest' | 'host';
export type TransactionType = 'payment' | 'refund' | 'deposit' | 'fee';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Booking {
  id: string;
  guestId: string;
  unitId: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  createdAt: string;
  notes?: string;
}

export interface Guest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employer?: string;
  hospital?: string;
  profileImage?: string;
  createdAt: string;
  bookings?: string[]; // Array of booking IDs
}

export interface Message {
  id: string;
  bookingId: string;
  guestId: string;
  content: string;
  sender: MessageSender;
  createdAt: string;
  read: boolean;
}

export interface Transaction {
  id: string;
  bookingId: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  stripeId?: string;
  createdAt: string;
  description?: string;
}

export interface Availability {
  unitId: string;
  date: string;
  status: AvailabilityStatus;
  bookingId?: string;
  note?: string;
}

export interface Review {
  id: string;
  guestId: string;
  unitId: string;
  bookingId?: string;
  rating: number; // 1-5
  content: string;
  createdAt: string;
  response?: string; // Host response
  responseDate?: string;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  error: string;
  message?: string;
  code?: string;
}

// Analytics types
export interface OccupancyStats {
  unitId: string;
  unitName: string;
  occupancyRate: number;
  bookedDays: number;
  totalDays: number;
}

export interface RevenueStats {
  totalRevenue: number;
  monthlyRevenue: number;
  averageBookingValue: number;
  revenueByUnit: { unitId: string; unitName: string; revenue: number }[];
  revenueByMonth: { month: string; revenue: number }[];
}

export interface BookingTrends {
  totalBookings: number;
  bookingsThisMonth: number;
  bookingsLastMonth: number;
  averageStayLength: number;
  statusBreakdown: { status: BookingStatus; count: number }[];
}

export interface AnalyticsData {
  occupancy: OccupancyStats[];
  revenue: RevenueStats;
  bookingTrends: BookingTrends;
  period: {
    start: string;
    end: string;
  };
}

// Stripe types (for future integration)
export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded' | 'canceled';
  bookingId: string;
  createdAt: string;
}

// Filter types for API queries
export interface BookingFilters {
  status?: BookingStatus;
  unitId?: string;
  guestId?: string;
  startDate?: string;
  endDate?: string;
  paymentStatus?: PaymentStatus;
}

export interface MessageFilters {
  bookingId?: string;
  guestId?: string;
  unreadOnly?: boolean;
}

export interface AvailabilityQuery {
  unitId?: string;
  startDate: string;
  endDate: string;
}
