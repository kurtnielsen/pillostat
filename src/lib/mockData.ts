// Mock data for pillowSTAT Application
// Structured for easy database migration

import {
  Booking as TypesBooking,
  Guest as TypesGuest,
  Message,
  Transaction,
  Availability,
  Review,
  BookingStatus,
  PaymentStatus,
  AvailabilityStatus,
} from './types';

// Helper function to generate dates
const daysFromNow = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

// ==================== GUESTS ====================
export const guests: TypesGuest[] = [
  {
    id: 'guest-1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    employer: 'TravelNurse Inc',
    hospital: 'Regional Medical Center',
    profileImage: '/avatars/sarah.jpg',
    createdAt: '2024-01-15T10:30:00Z',
    bookings: ['booking-1', 'booking-7'],
  },
  {
    id: 'guest-2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@healthcare.com',
    phone: '(555) 987-6543',
    employer: 'Aya Healthcare',
    hospital: 'University Hospital',
    profileImage: '/avatars/michael.jpg',
    createdAt: '2024-01-20T14:15:00Z',
    bookings: ['booking-2', 'booking-11'],
  },
  {
    id: 'guest-3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.r@nursestaffing.com',
    phone: '(555) 456-7890',
    employer: 'Cross Country Nurses',
    hospital: 'St. Mary\'s Hospital',
    profileImage: '/avatars/emily.jpg',
    createdAt: '2024-02-01T09:00:00Z',
    bookings: ['booking-3', 'booking-8'],
  },
  {
    id: 'guest-4',
    firstName: 'James',
    lastName: 'Williams',
    email: 'jwilliams@medpro.com',
    phone: '(555) 234-5678',
    employer: 'MedPro Staffing',
    hospital: 'General Hospital',
    profileImage: '/avatars/james.jpg',
    createdAt: '2024-02-05T11:30:00Z',
    bookings: ['booking-4'],
  },
  {
    id: 'guest-5',
    firstName: 'Amanda',
    lastName: 'Thompson',
    email: 'athompson@nursefly.com',
    phone: '(555) 345-6789',
    employer: 'NurseFly',
    hospital: 'Children\'s Medical Center',
    createdAt: '2024-02-10T08:45:00Z',
    bookings: ['booking-5', 'booking-12'],
  },
  {
    id: 'guest-6',
    firstName: 'David',
    lastName: 'Martinez',
    email: 'david.m@flexcare.com',
    phone: '(555) 567-8901',
    employer: 'FlexCare Medical',
    hospital: 'Valley Medical Center',
    createdAt: '2024-02-15T16:00:00Z',
    bookings: ['booking-6'],
  },
  {
    id: 'guest-7',
    firstName: 'Jessica',
    lastName: 'Brown',
    email: 'jbrown@trustaff.com',
    phone: '(555) 678-9012',
    employer: 'Trustaff',
    hospital: 'Memorial Hospital',
    createdAt: '2024-02-20T13:20:00Z',
    bookings: ['booking-9'],
  },
  {
    id: 'guest-8',
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'rtaylor@healthtrust.com',
    phone: '(555) 789-0123',
    employer: 'HealthTrust Workforce',
    hospital: 'Mercy Hospital',
    createdAt: '2024-02-25T10:00:00Z',
    bookings: ['booking-10'],
  },
];

// ==================== BOOKINGS ====================
export const bookings: TypesBooking[] = [
  {
    id: 'booking-1',
    guestId: 'guest-1',
    unitId: 'studio-suite',
    startDate: daysAgo(60),
    endDate: daysAgo(30),
    status: 'checked-out',
    totalAmount: 4400,
    paymentStatus: 'paid',
    createdAt: daysAgo(75) + 'T10:30:00Z',
    notes: 'Excellent guest. Very quiet and respectful.',
  },
  {
    id: 'booking-2',
    guestId: 'guest-2',
    unitId: 'garden-suite',
    startDate: daysAgo(45),
    endDate: daysFromNow(45),
    status: 'checked-in',
    totalAmount: 4950,
    paymentStatus: 'paid',
    createdAt: daysAgo(60) + 'T14:15:00Z',
    notes: '13-week contract. ICU nurse.',
  },
  {
    id: 'booking-3',
    guestId: 'guest-3',
    unitId: 'upper-retreat',
    startDate: daysFromNow(7),
    endDate: daysFromNow(97),
    status: 'confirmed',
    totalAmount: 6300,
    paymentStatus: 'paid',
    createdAt: daysAgo(14) + 'T09:00:00Z',
    notes: '13-week contract starting next week.',
  },
  {
    id: 'booking-4',
    guestId: 'guest-4',
    unitId: 'studio-suite',
    startDate: daysFromNow(14),
    endDate: daysFromNow(104),
    status: 'confirmed',
    totalAmount: 6600,
    paymentStatus: 'partial',
    createdAt: daysAgo(7) + 'T11:30:00Z',
    notes: 'First deposit received. Balance due at check-in.',
  },
  {
    id: 'booking-5',
    guestId: 'guest-5',
    unitId: 'garden-suite',
    startDate: daysFromNow(60),
    endDate: daysFromNow(150),
    status: 'pending',
    totalAmount: 4950,
    paymentStatus: 'pending',
    createdAt: daysAgo(3) + 'T08:45:00Z',
    notes: 'Awaiting contract confirmation from hospital.',
  },
  {
    id: 'booking-6',
    guestId: 'guest-6',
    unitId: 'upper-retreat',
    startDate: daysAgo(20),
    endDate: daysAgo(5),
    status: 'cancelled',
    totalAmount: 0,
    paymentStatus: 'refunded',
    createdAt: daysAgo(35) + 'T16:00:00Z',
    notes: 'Contract cancelled by hospital. Full refund processed.',
  },
  {
    id: 'booking-7',
    guestId: 'guest-1',
    unitId: 'upper-retreat',
    startDate: daysFromNow(120),
    endDate: daysFromNow(210),
    status: 'pending',
    totalAmount: 6300,
    paymentStatus: 'pending',
    createdAt: daysAgo(2) + 'T10:30:00Z',
    notes: 'Repeat guest! Extending for another contract.',
  },
  {
    id: 'booking-8',
    guestId: 'guest-3',
    unitId: 'studio-suite',
    startDate: daysAgo(150),
    endDate: daysAgo(60),
    status: 'checked-out',
    totalAmount: 6600,
    paymentStatus: 'paid',
    createdAt: daysAgo(165) + 'T09:00:00Z',
    notes: 'Great guest. Left unit in perfect condition.',
  },
  {
    id: 'booking-9',
    guestId: 'guest-7',
    unitId: 'garden-suite',
    startDate: daysFromNow(30),
    endDate: daysFromNow(85),
    status: 'confirmed',
    totalAmount: 3300,
    paymentStatus: 'paid',
    createdAt: daysAgo(10) + 'T13:20:00Z',
    notes: '8-week contract. ER nurse.',
  },
  {
    id: 'booking-10',
    guestId: 'guest-8',
    unitId: 'studio-suite',
    startDate: daysAgo(90),
    endDate: daysAgo(1),
    status: 'checked-out',
    totalAmount: 6600,
    paymentStatus: 'paid',
    createdAt: daysAgo(105) + 'T10:00:00Z',
    notes: 'Checked out yesterday. 13-week contract.',
  },
  {
    id: 'booking-11',
    guestId: 'guest-2',
    unitId: 'studio-suite',
    startDate: daysAgo(200),
    endDate: daysAgo(110),
    status: 'checked-out',
    totalAmount: 6600,
    paymentStatus: 'paid',
    createdAt: daysAgo(215) + 'T14:15:00Z',
    notes: 'Previous stay. Returning guest.',
  },
  {
    id: 'booking-12',
    guestId: 'guest-5',
    unitId: 'upper-retreat',
    startDate: daysFromNow(200),
    endDate: daysFromNow(290),
    status: 'pending',
    totalAmount: 6300,
    paymentStatus: 'pending',
    createdAt: daysAgo(1) + 'T08:45:00Z',
    notes: 'Future booking inquiry.',
  },
];

// ==================== MESSAGES ====================
export const messages: Message[] = [
  // Conversation with guest-1 (Sarah) - past booking
  {
    id: 'msg-1',
    bookingId: 'booking-1',
    guestId: 'guest-1',
    content: 'Hi! I just wanted to confirm my check-in time for next week. Is 3pm still good?',
    sender: 'guest',
    createdAt: daysAgo(61) + 'T09:00:00Z',
    read: true,
  },
  {
    id: 'msg-2',
    bookingId: 'booking-1',
    guestId: 'guest-1',
    content: 'Yes, 3pm works perfectly! I\'ll have everything ready for you. Do you need directions?',
    sender: 'host',
    createdAt: daysAgo(61) + 'T09:30:00Z',
    read: true,
  },
  {
    id: 'msg-3',
    bookingId: 'booking-1',
    guestId: 'guest-1',
    content: 'That would be great, thank you! I\'m coming from the airport.',
    sender: 'guest',
    createdAt: daysAgo(61) + 'T10:00:00Z',
    read: true,
  },
  // Conversation with guest-2 (Michael) - current stay
  {
    id: 'msg-4',
    bookingId: 'booking-2',
    guestId: 'guest-2',
    content: 'Quick question - is it okay if I have a quiet guest over for dinner this weekend?',
    sender: 'guest',
    createdAt: daysAgo(5) + 'T18:00:00Z',
    read: true,
  },
  {
    id: 'msg-5',
    bookingId: 'booking-2',
    guestId: 'guest-2',
    content: 'Of course! Just please keep noise levels down after 10pm. Enjoy your dinner!',
    sender: 'host',
    createdAt: daysAgo(5) + 'T18:30:00Z',
    read: true,
  },
  {
    id: 'msg-6',
    bookingId: 'booking-2',
    guestId: 'guest-2',
    content: 'Absolutely, thank you so much!',
    sender: 'guest',
    createdAt: daysAgo(5) + 'T18:45:00Z',
    read: true,
  },
  // Conversation with guest-3 (Emily) - upcoming stay
  {
    id: 'msg-7',
    bookingId: 'booking-3',
    guestId: 'guest-3',
    content: 'Hi! I\'m so excited for my upcoming stay. Just wanted to ask about parking - is there a dedicated spot?',
    sender: 'guest',
    createdAt: daysAgo(3) + 'T14:00:00Z',
    read: true,
  },
  {
    id: 'msg-8',
    bookingId: 'booking-3',
    guestId: 'guest-3',
    content: 'Yes! You\'ll have a dedicated parking spot right in front of the unit. I\'ll send you the access code the day before check-in.',
    sender: 'host',
    createdAt: daysAgo(3) + 'T14:30:00Z',
    read: true,
  },
  // Conversation with guest-4 (James) - payment related
  {
    id: 'msg-9',
    bookingId: 'booking-4',
    guestId: 'guest-4',
    content: 'I\'ve sent the first deposit. When is the remaining balance due?',
    sender: 'guest',
    createdAt: daysAgo(6) + 'T11:00:00Z',
    read: true,
  },
  {
    id: 'msg-10',
    bookingId: 'booking-4',
    guestId: 'guest-4',
    content: 'Got it, thank you! The remaining balance is due 3 days before check-in. I\'ll send a reminder.',
    sender: 'host',
    createdAt: daysAgo(6) + 'T11:30:00Z',
    read: true,
  },
  // Unread messages from guest-5 (Amanda)
  {
    id: 'msg-11',
    bookingId: 'booking-5',
    guestId: 'guest-5',
    content: 'Hi! My hospital just confirmed my contract. Can we proceed with the booking?',
    sender: 'guest',
    createdAt: daysAgo(1) + 'T08:00:00Z',
    read: false,
  },
  {
    id: 'msg-12',
    bookingId: 'booking-5',
    guestId: 'guest-5',
    content: 'Also, I work in the NICU and sometimes have early shifts. Is there flexible check-in available?',
    sender: 'guest',
    createdAt: daysAgo(1) + 'T08:15:00Z',
    read: false,
  },
  // Conversation about cancelled booking
  {
    id: 'msg-13',
    bookingId: 'booking-6',
    guestId: 'guest-6',
    content: 'Unfortunately my contract was cancelled. I need to cancel my reservation.',
    sender: 'guest',
    createdAt: daysAgo(25) + 'T10:00:00Z',
    read: true,
  },
  {
    id: 'msg-14',
    bookingId: 'booking-6',
    guestId: 'guest-6',
    content: 'I\'m sorry to hear that. I\'ve processed a full refund. Please let me know if you get another contract in the area!',
    sender: 'host',
    createdAt: daysAgo(25) + 'T10:30:00Z',
    read: true,
  },
  // Recent message from returning guest
  {
    id: 'msg-15',
    bookingId: 'booking-7',
    guestId: 'guest-1',
    content: 'I loved my last stay so much I wanted to book again! I got extended for another 13-week contract.',
    sender: 'guest',
    createdAt: daysAgo(2) + 'T09:00:00Z',
    read: true,
  },
  {
    id: 'msg-16',
    bookingId: 'booking-7',
    guestId: 'guest-1',
    content: 'Welcome back, Sarah! So happy to have you again. I\'ve reserved the Upper Retreat for you this time since you mentioned wanting more space.',
    sender: 'host',
    createdAt: daysAgo(2) + 'T09:30:00Z',
    read: true,
  },
];

// ==================== TRANSACTIONS ====================
export const transactions: Transaction[] = [
  // Booking 1 - completed
  {
    id: 'txn-1',
    bookingId: 'booking-1',
    amount: 2200,
    type: 'deposit',
    status: 'completed',
    stripeId: 'pi_1234567890_deposit_1',
    createdAt: daysAgo(75) + 'T10:30:00Z',
    description: 'Initial deposit - 50%',
  },
  {
    id: 'txn-2',
    bookingId: 'booking-1',
    amount: 2200,
    type: 'payment',
    status: 'completed',
    stripeId: 'pi_1234567890_final_1',
    createdAt: daysAgo(61) + 'T14:00:00Z',
    description: 'Final payment at check-in',
  },
  // Booking 2 - current
  {
    id: 'txn-3',
    bookingId: 'booking-2',
    amount: 4950,
    type: 'payment',
    status: 'completed',
    stripeId: 'pi_1234567891',
    createdAt: daysAgo(50) + 'T14:15:00Z',
    description: 'Full payment - 13 week stay',
  },
  // Booking 3 - upcoming
  {
    id: 'txn-4',
    bookingId: 'booking-3',
    amount: 6300,
    type: 'payment',
    status: 'completed',
    stripeId: 'pi_1234567892',
    createdAt: daysAgo(14) + 'T09:00:00Z',
    description: 'Full payment - Upper Retreat 13 weeks',
  },
  // Booking 4 - partial payment
  {
    id: 'txn-5',
    bookingId: 'booking-4',
    amount: 3300,
    type: 'deposit',
    status: 'completed',
    stripeId: 'pi_1234567893_deposit',
    createdAt: daysAgo(7) + 'T11:30:00Z',
    description: 'Initial deposit - 50%',
  },
  // Booking 6 - refunded
  {
    id: 'txn-6',
    bookingId: 'booking-6',
    amount: 3150,
    type: 'deposit',
    status: 'completed',
    stripeId: 'pi_1234567894_deposit',
    createdAt: daysAgo(35) + 'T16:00:00Z',
    description: 'Initial deposit - cancelled',
  },
  {
    id: 'txn-7',
    bookingId: 'booking-6',
    amount: 3150,
    type: 'refund',
    status: 'completed',
    stripeId: 'pi_1234567894_refund',
    createdAt: daysAgo(25) + 'T11:00:00Z',
    description: 'Full refund - contract cancelled',
  },
  // Booking 8 - past completed
  {
    id: 'txn-8',
    bookingId: 'booking-8',
    amount: 6600,
    type: 'payment',
    status: 'completed',
    stripeId: 'pi_1234567895',
    createdAt: daysAgo(165) + 'T09:00:00Z',
    description: 'Full payment - 13 week stay',
  },
  // Booking 9 - confirmed
  {
    id: 'txn-9',
    bookingId: 'booking-9',
    amount: 3300,
    type: 'payment',
    status: 'completed',
    stripeId: 'pi_1234567896',
    createdAt: daysAgo(10) + 'T13:20:00Z',
    description: 'Full payment - 8 week stay',
  },
  // Booking 10 - checked out
  {
    id: 'txn-10',
    bookingId: 'booking-10',
    amount: 6600,
    type: 'payment',
    status: 'completed',
    stripeId: 'pi_1234567897',
    createdAt: daysAgo(105) + 'T10:00:00Z',
    description: 'Full payment - 13 week stay',
  },
  // Booking 11 - past
  {
    id: 'txn-11',
    bookingId: 'booking-11',
    amount: 6600,
    type: 'payment',
    status: 'completed',
    stripeId: 'pi_1234567898',
    createdAt: daysAgo(215) + 'T14:15:00Z',
    description: 'Full payment - returning guest',
  },
  // Service fee example
  {
    id: 'txn-12',
    bookingId: 'booking-3',
    amount: 150,
    type: 'fee',
    status: 'completed',
    stripeId: 'pi_fee_001',
    createdAt: daysAgo(14) + 'T09:05:00Z',
    description: 'Late booking fee',
  },
];

// ==================== AVAILABILITY ====================
// Generate availability for 120 days (past 30 + future 90)
const generateAvailability = (): Availability[] => {
  const availability: Availability[] = [];
  const unitIds = ['studio-suite', 'garden-suite', 'upper-retreat'];

  for (const unitId of unitIds) {
    for (let i = -30; i <= 90; i++) {
      const date = daysFromNow(i);
      let status: AvailabilityStatus = 'available';
      let bookingId: string | undefined;
      let note: string | undefined;

      // Match with actual bookings
      for (const booking of bookings) {
        if (booking.unitId === unitId && booking.status !== 'cancelled') {
          const start = new Date(booking.startDate);
          const end = new Date(booking.endDate);
          const current = new Date(date);

          if (current >= start && current <= end) {
            status = 'booked';
            bookingId = booking.id;
            break;
          }
        }
      }

      // Add some maintenance and blocked periods
      if (status === 'available') {
        if (unitId === 'studio-suite' && i >= 5 && i <= 7) {
          status = 'maintenance';
          note = 'Deep cleaning scheduled';
        }
        if (unitId === 'garden-suite' && i >= 88 && i <= 90) {
          status = 'blocked';
          note = 'Owner personal use';
        }
      }

      availability.push({ unitId, date, status, bookingId, note });
    }
  }

  return availability;
};

export const availability: Availability[] = generateAvailability();

// ==================== REVIEWS ====================
export const reviews: Review[] = [
  {
    id: 'review-1',
    guestId: 'guest-1',
    unitId: 'studio-suite',
    bookingId: 'booking-1',
    rating: 5,
    content: 'Absolutely perfect for my 8-week assignment! The private entrance was amazing for my night shift schedule. Super quiet neighborhood and the kitchen had everything I needed. Kurt was very responsive and helpful. Will definitely book again!',
    createdAt: daysAgo(28) + 'T10:00:00Z',
    response: 'Thank you so much, Sarah! It was a pleasure having you. Looking forward to your next stay!',
    responseDate: daysAgo(27) + 'T09:00:00Z',
  },
  {
    id: 'review-2',
    guestId: 'guest-3',
    unitId: 'studio-suite',
    bookingId: 'booking-8',
    rating: 5,
    content: 'This was my second stay at pillowSTAT and it was just as wonderful as the first. The location is perfect - only 10 minutes from the hospital. The WiFi is fast and reliable which is important for my online classes. Highly recommend!',
    createdAt: daysAgo(58) + 'T14:00:00Z',
    response: 'We love having repeat guests! Thank you for the kind words, Emily. See you next time!',
    responseDate: daysAgo(57) + 'T10:00:00Z',
  },
  {
    id: 'review-3',
    guestId: 'guest-2',
    unitId: 'studio-suite',
    bookingId: 'booking-11',
    rating: 4,
    content: 'Great space and location. Kitchen was well-equipped and the bed was comfortable. Only minor issue was the water pressure in the shower but it was still fine. Would definitely stay again.',
    createdAt: daysAgo(108) + 'T16:00:00Z',
    response: 'Thanks Michael! We\'ve since upgraded the shower head - hope you notice the improvement on your current stay!',
    responseDate: daysAgo(107) + 'T11:00:00Z',
  },
  {
    id: 'review-4',
    guestId: 'guest-8',
    unitId: 'studio-suite',
    bookingId: 'booking-10',
    rating: 5,
    content: 'Best travel nurse housing I\'ve ever had! The private patio is perfect for morning coffee before shifts. Everything is clean, modern, and well-maintained. Kurt clearly understands what nurses need.',
    createdAt: daysAgo(2) + 'T08:00:00Z',
  },
  {
    id: 'review-5',
    guestId: 'guest-7',
    unitId: 'garden-suite',
    bookingId: 'booking-9',
    rating: 5,
    content: 'Such a cozy and affordable option! Yes, the kitchen is shared but I rarely saw the other tenant. Perfect for nurses on a budget who still want a nice place. The garden area is lovely!',
    createdAt: daysAgo(5) + 'T12:00:00Z',
    response: 'Thank you Jessica! So glad you enjoyed the garden space. Have a great rest of your assignment!',
    responseDate: daysAgo(4) + 'T09:00:00Z',
  },
  {
    id: 'review-6',
    guestId: 'guest-4',
    unitId: 'upper-retreat',
    rating: 5,
    content: 'The Upper Retreat is incredible - so much space! The water view from the deck helped me decompress after long ICU shifts. Worth every penny. Already planning to book again for my next contract.',
    createdAt: daysAgo(180) + 'T10:00:00Z',
  },
];

// ==================== DATA STORE CLASS ====================
// Generic in-memory data store - easy to swap for database later

class DataStore<T extends { id: string }> {
  private data: T[];

  constructor(initialData: T[]) {
    this.data = [...initialData];
  }

  getAll(): T[] {
    return [...this.data];
  }

  getById(id: string): T | undefined {
    return this.data.find(item => item.id === id);
  }

  create(item: T): T {
    this.data.push(item);
    return item;
  }

  update(id: string, updates: Partial<T>): T | undefined {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return undefined;
    this.data[index] = { ...this.data[index], ...updates };
    return this.data[index];
  }

  delete(id: string): boolean {
    const index = this.data.findIndex(item => item.id === id);
    if (index === -1) return false;
    this.data.splice(index, 1);
    return true;
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.data.filter(predicate);
  }

  count(predicate?: (item: T) => boolean): number {
    if (predicate) {
      return this.data.filter(predicate).length;
    }
    return this.data.length;
  }
}

// ==================== AVAILABILITY STORE ====================
// Special store for availability (composite key: unitId + date)

class AvailabilityStore {
  private data: Availability[];

  constructor(initialData: Availability[]) {
    this.data = [...initialData];
  }

  getAll(): Availability[] {
    return [...this.data];
  }

  getByUnitAndDateRange(unitId: string | null, startDate: string, endDate: string): Availability[] {
    return this.data.filter(a => {
      if (unitId && a.unitId !== unitId) return false;
      const date = new Date(a.date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
  }

  getByDate(unitId: string, date: string): Availability | undefined {
    return this.data.find(a => a.unitId === unitId && a.date === date);
  }

  update(unitId: string, date: string, updates: Partial<Availability>): Availability {
    const index = this.data.findIndex(a => a.unitId === unitId && a.date === date);
    if (index === -1) {
      // Create new entry if it doesn't exist
      const newEntry: Availability = { unitId, date, status: 'available', ...updates };
      this.data.push(newEntry);
      return newEntry;
    }
    this.data[index] = { ...this.data[index], ...updates };
    return this.data[index];
  }

  bulkUpdate(unitId: string, startDate: string, endDate: string, updates: Partial<Availability>): Availability[] {
    const updated: Availability[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const result = this.update(unitId, dateStr, updates);
      updated.push(result);
    }

    return updated;
  }
}

// ==================== EXPORT DATA STORES ====================
export const bookingStore = new DataStore(bookings);
export const guestStore = new DataStore(guests);
export const messageStore = new DataStore(messages);
export const transactionStore = new DataStore(transactions);
export const reviewStore = new DataStore(reviews);
export const availabilityStore = new AvailabilityStore(availability);

// ==================== ANALYTICS HELPERS ====================
export function calculateOccupancyRate(unitId: string, startDate: string, endDate: string): number {
  const avail = availabilityStore.getByUnitAndDateRange(unitId, startDate, endDate);
  if (avail.length === 0) return 0;

  const bookedDays = avail.filter(a => a.status === 'booked').length;
  return Math.round((bookedDays / avail.length) * 100);
}

export function calculateRevenue(startDate?: string, endDate?: string): number {
  let total = 0;
  const txns = transactionStore.filter(t => {
    if (t.type === 'refund') return false;
    if (t.status !== 'completed') return false;

    if (startDate && endDate) {
      const txnDate = new Date(t.createdAt);
      return txnDate >= new Date(startDate) && txnDate <= new Date(endDate);
    }
    return true;
  });

  for (const txn of txns) {
    if (txn.type === 'payment' || txn.type === 'deposit') {
      total += txn.amount;
    }
  }

  return total;
}

// ==================== HELPER FUNCTIONS ====================
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

// Generate unique ID
export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== BACKWARD COMPATIBILITY ====================
// Re-export types for backward compatibility with admin pages
// These are local types that extend the core types with computed fields

export interface LegacyGuest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employer?: string;
  hospital?: string;
  profileImage?: string;
  rating: number;
  totalBookings: number;
  totalSpent: number;
  notes?: string;
  createdAt: string;
  lastStay?: string;
  bookings?: string[];
}

export interface LegacyBooking {
  id: string;
  guestId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  unitId: string;
  unitName: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'checked-in' | 'checked-out';
  totalAmount: number;
  paidAmount: number;
  contractLength: number;
  createdAt: string;
  notes?: string;
  // New fields from our types
  startDate: string;
  endDate: string;
  paymentStatus: string;
}

// Type alias for backward compatibility - points to legacy booking
export type Booking = LegacyBooking;
export type Guest = LegacyGuest;

// Unit name mapping
const unitNameMap: Record<string, string> = {
  'studio-suite': 'Studio Suite',
  'garden-suite': 'Garden Suite',
  'upper-retreat': 'Upper Retreat',
};

// Helper to calculate contract weeks
function calculateContractWeeks(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.round(days / 7);
}

// Create legacy-compatible views of the data for the admin pages
export function getLegacyGuests(): LegacyGuest[] {
  return guests.map(guest => {
    const guestBookings = bookings.filter(b => b.guestId === guest.id);
    const completedBookings = guestBookings.filter(b =>
      b.status === 'checked-out' || b.status === 'checked-in'
    );
    const totalSpent = completedBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    const lastBooking = guestBookings
      .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime())[0];

    return {
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName,
      email: guest.email,
      phone: guest.phone,
      employer: guest.employer,
      hospital: guest.hospital,
      profileImage: guest.profileImage,
      rating: 5, // Default rating
      totalBookings: guestBookings.length,
      totalSpent,
      createdAt: guest.createdAt,
      lastStay: lastBooking?.endDate,
      bookings: guest.bookings,
    };
  });
}

export function getLegacyBookings(): LegacyBooking[] {
  return bookings.map(booking => {
    const guest = guestStore.getById(booking.guestId);
    const guestName = guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown Guest';

    // Calculate paid amount from transactions
    const bookingTransactions = transactions.filter(t =>
      t.bookingId === booking.id &&
      t.status === 'completed' &&
      (t.type === 'payment' || t.type === 'deposit')
    );
    const paidAmount = bookingTransactions.reduce((sum, t) => sum + t.amount, 0);

    // Map status - convert checked-out to completed for legacy compatibility
    let legacyStatus = booking.status as LegacyBooking['status'];

    return {
      id: booking.id,
      guestId: booking.guestId,
      guestName,
      guestEmail: guest?.email || '',
      guestPhone: guest?.phone || '',
      unitId: booking.unitId,
      unitName: unitNameMap[booking.unitId] || booking.unitId,
      checkIn: booking.startDate,
      checkOut: booking.endDate,
      status: legacyStatus,
      totalAmount: booking.totalAmount,
      paidAmount,
      contractLength: calculateContractWeeks(booking.startDate, booking.endDate),
      createdAt: booking.createdAt,
      notes: booking.notes,
      // Include new fields for API compatibility
      startDate: booking.startDate,
      endDate: booking.endDate,
      paymentStatus: booking.paymentStatus,
    };
  });
}

// Export legacy-compatible data for direct use in components
// These will be used by the admin pages
export const legacyGuests = getLegacyGuests();
export const legacyBookings = getLegacyBookings();
