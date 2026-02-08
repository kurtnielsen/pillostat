import { NextRequest, NextResponse } from 'next/server';
import { bookingStore, guestStore, availabilityStore } from '@/lib/mockData';
import { BookingStatus, PaymentStatus } from '@/lib/types';
import { units } from '@/lib/units';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/bookings/[id] - Get a single booking by ID
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const booking = bookingStore.getById(id);

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Enrich with guest and unit details
    const guest = guestStore.getById(booking.guestId);
    const unit = units.find(u => u.id === booking.unitId);

    const enrichedBooking = {
      ...booking,
      guest: guest ? {
        id: guest.id,
        name: `${guest.firstName} ${guest.lastName}`,
        email: guest.email,
        phone: guest.phone,
        employer: guest.employer,
        hospital: guest.hospital,
      } : null,
      unit: unit ? {
        id: unit.id,
        name: unit.name,
        tier: unit.tier,
        monthlyPrice: unit.monthlyPrice,
      } : null,
    };

    return NextResponse.json(enrichedBooking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

// PATCH /api/bookings/[id] - Update a booking
export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existingBooking = bookingStore.getById(id);
    if (!existingBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Validate status if provided
    const validStatuses: BookingStatus[] = ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled', 'completed'];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate payment status if provided
    const validPaymentStatuses: PaymentStatus[] = ['pending', 'paid', 'partial', 'refunded', 'failed'];
    if (body.paymentStatus && !validPaymentStatuses.includes(body.paymentStatus)) {
      return NextResponse.json(
        { error: `Invalid payment status. Must be one of: ${validPaymentStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // If dates are being changed, validate them
    if (body.startDate || body.endDate) {
      const newStartDate = new Date(body.startDate || existingBooking.startDate);
      const newEndDate = new Date(body.endDate || existingBooking.endDate);

      if (newEndDate <= newStartDate) {
        return NextResponse.json(
          { error: 'End date must be after start date' },
          { status: 400 }
        );
      }

      // Check for overlapping bookings (excluding current booking)
      const overlapping = bookingStore.filter(b =>
        b.id !== id &&
        b.unitId === existingBooking.unitId &&
        b.status !== 'cancelled' &&
        !(new Date(b.endDate) <= newStartDate || new Date(b.startDate) >= newEndDate)
      );

      if (overlapping.length > 0) {
        return NextResponse.json(
          { error: 'Unit is not available for the selected dates' },
          { status: 409 }
        );
      }
    }

    // Only allow certain fields to be updated
    const allowedUpdates = [
      'status',
      'paymentStatus',
      'notes',
      'startDate',
      'endDate',
      'totalAmount',
    ] as const;

    const updates: Record<string, unknown> = {};
    for (const key of allowedUpdates) {
      if ((body as Record<string, unknown>)[key] !== undefined) {
        updates[key] = (body as Record<string, unknown>)[key];
      }
    }

    const updated = bookingStore.update(id, updates);

    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      );
    }

    // If status changed to cancelled, update availability
    if (body.status === 'cancelled' && existingBooking.status !== 'cancelled') {
      availabilityStore.bulkUpdate(
        existingBooking.unitId,
        existingBooking.startDate,
        existingBooking.endDate,
        { status: 'available', bookingId: undefined }
      );
    }

    // Enrich response with guest and unit info
    const guest = guestStore.getById(updated.guestId);
    const unit = units.find(u => u.id === updated.unitId);

    return NextResponse.json({
      ...updated,
      guestName: guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown',
      unitName: unit?.name || 'Unknown',
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id] - Cancel a booking
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const booking = bookingStore.getById(id);

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Don't allow deletion of checked-in bookings
    if (booking.status === 'checked-in') {
      return NextResponse.json(
        { error: 'Cannot cancel a checked-in booking. Please check out first.' },
        { status: 400 }
      );
    }

    // Instead of hard delete, update status to cancelled
    const updated = bookingStore.update(id, {
      status: 'cancelled',
      notes: booking.notes
        ? `${booking.notes}\n[Cancelled on ${new Date().toISOString()}]`
        : `[Cancelled on ${new Date().toISOString()}]`,
    });

    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to cancel booking' },
        { status: 500 }
      );
    }

    // Update availability
    availabilityStore.bulkUpdate(
      booking.unitId,
      booking.startDate,
      booking.endDate,
      { status: 'available', bookingId: undefined }
    );

    return NextResponse.json({
      message: 'Booking cancelled successfully',
      booking: updated,
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}
