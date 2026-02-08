import { NextRequest, NextResponse } from 'next/server';
import { bookingStore, transactionStore, generateId } from '@/lib/mockData';
import { Transaction, PaymentIntent } from '@/lib/types';

// Mock Stripe API for development
// In production, this would integrate with actual Stripe SDK

// POST /api/stripe - Handle Stripe operations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'create-payment-intent':
        return handleCreatePaymentIntent(body);

      case 'confirm-payment':
        return handleConfirmPayment(body);

      case 'create-refund':
        return handleCreateRefund(body);

      case 'webhook':
        return handleWebhook(body);

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Stripe API error:', error);
    return NextResponse.json(
      { error: 'Stripe operation failed' },
      { status: 500 }
    );
  }
}

// Create a payment intent (mock)
async function handleCreatePaymentIntent(body: {
  bookingId: string;
  amount: number;
  description?: string;
}) {
  const { bookingId, amount, description } = body;

  if (!bookingId || !amount) {
    return NextResponse.json(
      { error: 'bookingId and amount are required' },
      { status: 400 }
    );
  }

  // Validate booking exists
  const booking = bookingStore.getById(bookingId);
  if (!booking) {
    return NextResponse.json(
      { error: 'Booking not found' },
      { status: 404 }
    );
  }

  // Validate amount
  if (amount <= 0) {
    return NextResponse.json(
      { error: 'Amount must be greater than 0' },
      { status: 400 }
    );
  }

  // Create mock payment intent
  const paymentIntent: PaymentIntent = {
    id: `pi_mock_${generateId('pi')}`,
    clientSecret: `pi_mock_secret_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    amount,
    currency: 'usd',
    status: 'requires_payment_method',
    bookingId,
    createdAt: new Date().toISOString(),
  };

  // In a real implementation, you would:
  // 1. Call Stripe API to create a PaymentIntent
  // 2. Store the PaymentIntent ID for later reference
  // 3. Return the client secret to the frontend

  return NextResponse.json({
    success: true,
    paymentIntent,
    message: 'Mock payment intent created. In production, this would create a real Stripe PaymentIntent.',
  });
}

// Confirm a payment (mock)
async function handleConfirmPayment(body: {
  paymentIntentId: string;
  bookingId: string;
  amount: number;
}) {
  const { paymentIntentId, bookingId, amount } = body;

  if (!paymentIntentId || !bookingId) {
    return NextResponse.json(
      { error: 'paymentIntentId and bookingId are required' },
      { status: 400 }
    );
  }

  // Validate booking exists
  const booking = bookingStore.getById(bookingId);
  if (!booking) {
    return NextResponse.json(
      { error: 'Booking not found' },
      { status: 404 }
    );
  }

  // Create transaction record
  const transaction: Transaction = {
    id: generateId('txn'),
    bookingId,
    amount: amount || booking.totalAmount,
    type: 'payment',
    status: 'completed',
    stripeId: paymentIntentId,
    createdAt: new Date().toISOString(),
    description: 'Payment confirmed',
  };

  transactionStore.create(transaction);

  // Update booking payment status
  const paidTransactions = transactionStore.filter(t =>
    t.bookingId === bookingId &&
    t.status === 'completed' &&
    (t.type === 'payment' || t.type === 'deposit')
  );

  const totalPaid = paidTransactions.reduce((sum, t) => sum + t.amount, 0);
  const newPaymentStatus = totalPaid >= booking.totalAmount ? 'paid' : 'partial';

  bookingStore.update(bookingId, { paymentStatus: newPaymentStatus });

  return NextResponse.json({
    success: true,
    transaction,
    paymentStatus: newPaymentStatus,
    totalPaid,
    remaining: Math.max(0, booking.totalAmount - totalPaid),
    message: 'Mock payment confirmed. In production, this would be handled by Stripe webhooks.',
  });
}

// Create a refund (mock)
async function handleCreateRefund(body: {
  bookingId: string;
  amount: number;
  reason?: string;
}) {
  const { bookingId, amount, reason } = body;

  if (!bookingId || !amount) {
    return NextResponse.json(
      { error: 'bookingId and amount are required' },
      { status: 400 }
    );
  }

  // Validate booking exists
  const booking = bookingStore.getById(bookingId);
  if (!booking) {
    return NextResponse.json(
      { error: 'Booking not found' },
      { status: 404 }
    );
  }

  // Check if there are payments to refund
  const payments = transactionStore.filter(t =>
    t.bookingId === bookingId &&
    t.status === 'completed' &&
    (t.type === 'payment' || t.type === 'deposit')
  );

  const totalPaid = payments.reduce((sum, t) => sum + t.amount, 0);

  if (amount > totalPaid) {
    return NextResponse.json(
      { error: `Refund amount ($${amount}) exceeds total paid ($${totalPaid})` },
      { status: 400 }
    );
  }

  // Create refund transaction
  const refundTransaction: Transaction = {
    id: generateId('txn'),
    bookingId,
    amount,
    type: 'refund',
    status: 'completed',
    stripeId: `re_mock_${generateId('re')}`,
    createdAt: new Date().toISOString(),
    description: reason || 'Refund processed',
  };

  transactionStore.create(refundTransaction);

  // Update booking payment status
  const newTotalPaid = totalPaid - amount;
  let newPaymentStatus: 'pending' | 'paid' | 'partial' | 'refunded' = 'refunded';

  if (newTotalPaid > 0) {
    newPaymentStatus = newTotalPaid >= booking.totalAmount ? 'paid' : 'partial';
  }

  bookingStore.update(bookingId, { paymentStatus: newPaymentStatus });

  return NextResponse.json({
    success: true,
    refund: refundTransaction,
    paymentStatus: newPaymentStatus,
    totalRefunded: amount,
    remainingPaid: newTotalPaid,
    message: 'Mock refund processed. In production, this would create a real Stripe Refund.',
  });
}

// Handle Stripe webhooks (mock)
async function handleWebhook(body: {
  type: string;
  data: {
    object: {
      id: string;
      amount: number;
      metadata?: {
        bookingId?: string;
      };
    };
  };
}) {
  const { type, data } = body;

  // In production, you would:
  // 1. Verify the webhook signature
  // 2. Handle various event types
  // 3. Update your database accordingly

  const eventHandlers: Record<string, () => NextResponse> = {
    'payment_intent.succeeded': () => {
      console.log('Payment succeeded:', data.object.id);
      return NextResponse.json({
        received: true,
        message: 'Payment intent succeeded event received',
      });
    },

    'payment_intent.payment_failed': () => {
      console.log('Payment failed:', data.object.id);
      return NextResponse.json({
        received: true,
        message: 'Payment failed event received',
      });
    },

    'charge.refunded': () => {
      console.log('Charge refunded:', data.object.id);
      return NextResponse.json({
        received: true,
        message: 'Refund event received',
      });
    },

    'charge.dispute.created': () => {
      console.log('Dispute created:', data.object.id);
      return NextResponse.json({
        received: true,
        message: 'Dispute created event received',
      });
    },
  };

  const handler = eventHandlers[type];
  if (handler) {
    return handler();
  }

  console.log('Unhandled webhook event:', type);
  return NextResponse.json({
    received: true,
    message: `Unhandled event type: ${type}`,
  });
}

// GET /api/stripe - Get payment information
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
      return NextResponse.json(
        { error: 'bookingId is required' },
        { status: 400 }
      );
    }

    // Get booking
    const booking = bookingStore.getById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Get all transactions for this booking
    const transactions = transactionStore.filter(t => t.bookingId === bookingId);

    // Calculate totals
    const payments = transactions.filter(t =>
      t.status === 'completed' && (t.type === 'payment' || t.type === 'deposit')
    );
    const refunds = transactions.filter(t =>
      t.status === 'completed' && t.type === 'refund'
    );

    const totalPaid = payments.reduce((sum, t) => sum + t.amount, 0);
    const totalRefunded = refunds.reduce((sum, t) => sum + t.amount, 0);
    const netPaid = totalPaid - totalRefunded;
    const remaining = Math.max(0, booking.totalAmount - netPaid);

    return NextResponse.json({
      bookingId,
      bookingTotal: booking.totalAmount,
      paymentStatus: booking.paymentStatus,
      summary: {
        totalPaid,
        totalRefunded,
        netPaid,
        remaining,
        isFullyPaid: remaining === 0,
      },
      transactions: transactions.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    });
  } catch (error) {
    console.error('Error fetching payment info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment information' },
      { status: 500 }
    );
  }
}
