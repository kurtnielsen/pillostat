import { NextRequest, NextResponse } from 'next/server';
import { availabilityStore, bookingStore } from '@/lib/mockData';
import { AvailabilityStatus } from '@/lib/types';
import { units } from '@/lib/units';

// GET /api/availability - Get availability for date range
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Required params
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Optional params
    const unitId = searchParams.get('unitId');

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate and endDate are required' },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    if (end < start) {
      return NextResponse.json(
        { error: 'endDate must be after startDate' },
        { status: 400 }
      );
    }

    // Limit range to 365 days
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (daysDiff > 365) {
      return NextResponse.json(
        { error: 'Date range cannot exceed 365 days' },
        { status: 400 }
      );
    }

    // Get availability
    const availability = availabilityStore.getByUnitAndDateRange(
      unitId,
      startDate,
      endDate
    );

    // Group by unit if no specific unit requested
    if (!unitId) {
      const byUnit: Record<string, typeof availability> = {};

      for (const unit of units) {
        byUnit[unit.id] = availability.filter(a => a.unitId === unit.id);
      }

      // Calculate summary for each unit
      const summary = units.map(unit => {
        const unitAvail = byUnit[unit.id] || [];
        const available = unitAvail.filter(a => a.status === 'available').length;
        const booked = unitAvail.filter(a => a.status === 'booked').length;
        const blocked = unitAvail.filter(a => a.status === 'blocked').length;
        const maintenance = unitAvail.filter(a => a.status === 'maintenance').length;
        const total = unitAvail.length;

        return {
          unitId: unit.id,
          unitName: unit.name,
          available,
          booked,
          blocked,
          maintenance,
          total,
          occupancyRate: total > 0 ? Math.round((booked / total) * 100) : 0,
        };
      });

      return NextResponse.json({
        period: { startDate, endDate },
        summary,
        availability: byUnit,
      });
    }

    // Single unit response
    const unit = units.find(u => u.id === unitId);
    if (!unit) {
      return NextResponse.json(
        { error: 'Unit not found' },
        { status: 404 }
      );
    }

    const available = availability.filter(a => a.status === 'available').length;
    const booked = availability.filter(a => a.status === 'booked').length;

    return NextResponse.json({
      unitId,
      unitName: unit.name,
      period: { startDate, endDate },
      summary: {
        available,
        booked,
        blocked: availability.filter(a => a.status === 'blocked').length,
        maintenance: availability.filter(a => a.status === 'maintenance').length,
        total: availability.length,
        occupancyRate: availability.length > 0
          ? Math.round((booked / availability.length) * 100)
          : 0,
      },
      availability,
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}

// POST /api/availability - Block or unblock dates
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { unitId, startDate, endDate, status, note } = body;

    if (!unitId || !startDate || !endDate || !status) {
      return NextResponse.json(
        { error: 'unitId, startDate, endDate, and status are required' },
        { status: 400 }
      );
    }

    // Validate unit exists
    const unit = units.find(u => u.id === unitId);
    if (!unit) {
      return NextResponse.json(
        { error: 'Unit not found' },
        { status: 404 }
      );
    }

    // Validate status
    const validStatuses: AvailabilityStatus[] = ['available', 'blocked', 'maintenance'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}. Use bookings API to set 'booked' status.` },
        { status: 400 }
      );
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 }
      );
    }

    if (end < start) {
      return NextResponse.json(
        { error: 'endDate must be after startDate' },
        { status: 400 }
      );
    }

    // Check for existing bookings if blocking dates
    if (status === 'blocked' || status === 'maintenance') {
      const existingBookings = bookingStore.filter(b =>
        b.unitId === unitId &&
        b.status !== 'cancelled' &&
        !(new Date(b.endDate) <= start || new Date(b.startDate) >= end)
      );

      if (existingBookings.length > 0) {
        return NextResponse.json(
          {
            error: 'Cannot block dates with existing bookings',
            conflictingBookings: existingBookings.map(b => ({
              id: b.id,
              startDate: b.startDate,
              endDate: b.endDate,
            })),
          },
          { status: 409 }
        );
      }
    }

    // Update availability for the date range
    const updates: Partial<{ status: AvailabilityStatus; note?: string; bookingId?: string }> = {
      status,
    };

    if (note !== undefined) {
      updates.note = note;
    }

    // If setting to available, clear any booking reference
    if (status === 'available') {
      updates.bookingId = undefined;
    }

    const updated = availabilityStore.bulkUpdate(unitId, startDate, endDate, updates);

    return NextResponse.json({
      message: `Updated ${updated.length} days`,
      unitId,
      unitName: unit.name,
      period: { startDate, endDate },
      status,
      updatedDates: updated.map(a => a.date),
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    return NextResponse.json(
      { error: 'Failed to update availability' },
      { status: 500 }
    );
  }
}
