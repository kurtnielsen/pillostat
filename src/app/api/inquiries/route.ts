import { NextRequest, NextResponse } from 'next/server';
import { addInquiry, getInquiries, updateInquiry } from '@/lib/inquiries';
import { units } from '@/lib/units';

export async function GET() {
  const inquiries = getInquiries();
  return NextResponse.json(inquiries);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const unit = units.find((u) => u.id === body.unitId);
    if (!unit) {
      return NextResponse.json({ error: 'Invalid unit' }, { status: 400 });
    }

    const inquiry = addInquiry({
      ...body,
      unitName: unit.name,
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Failed to create inquiry' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const updated = updateInquiry(id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}
