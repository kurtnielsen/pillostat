import { NextRequest, NextResponse } from 'next/server';
import {
  bookingStore,
  guestStore,
  generateId,
} from '@/lib/mockData';
import { Booking, BookingStatus, PaymentStatus, PaginatedResponse } from '@/lib/types';
import { units } from '@/lib/units';

// GET /api/bookings - List all bookings with filters and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination params
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Filter params
    const status = searchParams.get('status') as BookingStatus | null;
    const unitId = searchParams.get('unitId');
    const guestId = searchParams.get('guestId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const paymentStatus = searchParams.get('paymentStatus') as PaymentStatus | null;

    // Get all bookings and apply filters
    let filteredBookings = bookingStore.getAll();

    if (status) {
      filteredBookings = filteredBookings.filter(b => b.status === status);
    }

    if (unitId) {
      filteredBookings = filteredBookings.filter(b => b.unitId === unitId);
    }

    if (guestId) {
      filteredBookings = filteredBookings.filter(b => b.guestId === guestId);
    }

    if (paymentStatus) {
      filteredBookings = filteredBookings.filter(b => b.paymentStatus === paymentStatus);
    }

    if (startDate) {
      filteredBookings = filteredBookings.filter(b => new Date(b.startDate) >= new Date(startDate));
    }

    if (endDate) {
      filteredBookings = filteredBookings.filter(b => new Date(b.endDate) <= new Date(endDate));
    }

    // Sort by createdAt descending (newest first)
    filteredBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Calculate pagination
    const total = filteredBookings.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedBookings = filteredBookings.slice(offset, offset + limit);

    // Enrich with guest and unit names
    const enrichedBookings = paginatedBookings.map(booking => {
      const guest = guestStore.getById(booking.guestId);
      const unit = units.find(u => u.id === booking.unitId);
      return {
        ...booking,
        guestName: guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown',
        guestEmail: guest?.email,
        unitName: unit?.name || 'Unknown',
      };
    });

    const response: PaginatedResponse<typeof enrichedBookings[0]> = {
      data: enrichedBookings,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['guestId', 'unitId', 'startDate', 'endDate', 'totalAmount'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate guest exists
    const guest = guestStore.getById(body.guestId);
    if (!guest) {
      return NextResponse.json(
        { error: 'Guest not found' },
        { status: 404 }
      );
    }

    // Validate unit exists
    const unit = units.find(u => u.id === body.unitId);
    if (!unit) {
      return NextResponse.json(
        { error: 'Unit not found' },
        { status: 404 }
      );
    }

    // Validate dates
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    if (endDate <= startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      );
    }

    // Check for overlapping bookings
    const existingBookings = bookingStore.filter(b =>
      b.unitId === body.unitId &&
      b.status !== 'cancelled' &&
      !(new Date(b.endDate) <= startDate || new Date(b.startDate) >= endDate)
    );

    if (existingBookings.length > 0) {
      return NextResponse.json(
        { error: 'Unit is not available for the selected dates' },
        { status: 409 }
      );
    }

    // Create new booking
    const newBooking: Booking = {
      id: generateId('booking'),
      guestId: body.guestId,
      unitId: body.unitId,
      startDate: body.startDate,
      endDate: body.endDate,
      status: body.status || 'pending',
      totalAmount: body.totalAmount,
      paymentStatus: body.paymentStatus || 'pending',
      createdAt: new Date().toISOString(),
      notes: body.notes,
    };

    const created = bookingStore.create(newBooking);

    // Update guest's bookings array
    const updatedBookings = [...(guest.bookings || []), created.id];
    guestStore.update(guest.id, { bookings: updatedBookings });

    return NextResponse.json(
      {
        ...created,
        guestName: `${guest.firstName} ${guest.lastName}`,
        unitName: unit.name,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
