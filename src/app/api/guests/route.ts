import { NextRequest, NextResponse } from 'next/server';
import { guestStore, bookingStore, generateId } from '@/lib/mockData';
import { Guest, PaginatedResponse } from '@/lib/types';

// GET /api/guests - List all guests with optional search and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination params
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    // Search/filter params
    const search = searchParams.get('search');
    const hospital = searchParams.get('hospital');
    const employer = searchParams.get('employer');

    // Get all guests
    let guests = guestStore.getAll();

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      guests = guests.filter(g =>
        g.firstName.toLowerCase().includes(searchLower) ||
        g.lastName.toLowerCase().includes(searchLower) ||
        g.email.toLowerCase().includes(searchLower) ||
        g.phone.includes(search)
      );
    }

    // Apply hospital filter
    if (hospital) {
      guests = guests.filter(g =>
        g.hospital?.toLowerCase().includes(hospital.toLowerCase())
      );
    }

    // Apply employer filter
    if (employer) {
      guests = guests.filter(g =>
        g.employer?.toLowerCase().includes(employer.toLowerCase())
      );
    }

    // Sort by createdAt descending
    guests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Calculate pagination
    const total = guests.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedGuests = guests.slice(offset, offset + limit);

    // Enrich with booking stats
    const enrichedGuests = paginatedGuests.map(guest => {
      const guestBookings = bookingStore.filter(b => b.guestId === guest.id);
      const completedBookings = guestBookings.filter(b =>
        b.status === 'checked-out' || b.status === 'checked-in'
      );
      const totalSpent = completedBookings.reduce((sum, b) => sum + b.totalAmount, 0);
      const lastBooking = guestBookings
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

      return {
        ...guest,
        stats: {
          totalBookings: guestBookings.length,
          completedBookings: completedBookings.length,
          totalSpent,
          lastStay: lastBooking?.endDate,
        },
      };
    });

    const response: PaginatedResponse<typeof enrichedGuests[0]> = {
      data: enrichedGuests,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching guests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guests' },
      { status: 500 }
    );
  }
}

// POST /api/guests - Create a new guest
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingGuest = guestStore.filter(g =>
      g.email.toLowerCase() === body.email.toLowerCase()
    );
    if (existingGuest.length > 0) {
      return NextResponse.json(
        { error: 'A guest with this email already exists' },
        { status: 409 }
      );
    }

    // Create new guest
    const newGuest: Guest = {
      id: generateId('guest'),
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone.trim(),
      employer: body.employer?.trim(),
      hospital: body.hospital?.trim(),
      profileImage: body.profileImage,
      createdAt: new Date().toISOString(),
      bookings: [],
    };

    const created = guestStore.create(newGuest);

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Error creating guest:', error);
    return NextResponse.json(
      { error: 'Failed to create guest' },
      { status: 500 }
    );
  }
}

// PATCH /api/guests - Update a guest (using query param for ID)
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Guest ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const existingGuest = guestStore.getById(id);
    if (!existingGuest) {
      return NextResponse.json(
        { error: 'Guest not found' },
        { status: 404 }
      );
    }

    // If email is being changed, validate it
    if (body.email && body.email !== existingGuest.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }

      // Check for duplicate email
      const duplicateGuest = guestStore.filter(g =>
        g.email.toLowerCase() === body.email.toLowerCase() && g.id !== id
      );
      if (duplicateGuest.length > 0) {
        return NextResponse.json(
          { error: 'A guest with this email already exists' },
          { status: 409 }
        );
      }
    }

    // Only allow certain fields to be updated
    const allowedUpdates: (keyof Guest)[] = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'employer',
      'hospital',
      'profileImage',
    ];

    const updates: Partial<Guest> = {};
    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updates[key] = typeof body[key] === 'string' ? body[key].trim() : body[key];
      }
    }

    const updated = guestStore.update(id, updates);

    if (!updated) {
      return NextResponse.json(
        { error: 'Failed to update guest' },
        { status: 500 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating guest:', error);
    return NextResponse.json(
      { error: 'Failed to update guest' },
      { status: 500 }
    );
  }
}
