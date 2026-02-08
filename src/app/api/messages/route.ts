import { NextRequest, NextResponse } from 'next/server';
import { messageStore, guestStore, bookingStore, generateId } from '@/lib/mockData';
import { Message, PaginatedResponse } from '@/lib/types';

// Interface for message threads
interface MessageThread {
  guestId: string;
  guestName: string;
  guestEmail: string;
  bookingId: string;
  lastMessage: Message;
  unreadCount: number;
  messageCount: number;
}

// GET /api/messages - List messages or message threads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Params
    const view = searchParams.get('view') || 'threads'; // 'threads' or 'messages'
    const bookingId = searchParams.get('bookingId');
    const guestId = searchParams.get('guestId');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    // Get all messages
    let messages = messageStore.getAll();

    // Apply filters
    if (bookingId) {
      messages = messages.filter(m => m.bookingId === bookingId);
    }

    if (guestId) {
      messages = messages.filter(m => m.guestId === guestId);
    }

    if (unreadOnly) {
      messages = messages.filter(m => !m.read && m.sender === 'guest');
    }

    // Sort by createdAt
    messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // If view is 'threads', group messages by booking
    if (view === 'threads') {
      const threadMap = new Map<string, MessageThread>();

      for (const message of messages) {
        const key = message.bookingId;

        if (!threadMap.has(key)) {
          const guest = guestStore.getById(message.guestId);
          const guestName = guest
            ? `${guest.firstName} ${guest.lastName}`
            : 'Unknown Guest';

          threadMap.set(key, {
            guestId: message.guestId,
            guestName,
            guestEmail: guest?.email || '',
            bookingId: message.bookingId,
            lastMessage: message,
            unreadCount: 0,
            messageCount: 0,
          });
        }

        const thread = threadMap.get(key)!;
        thread.messageCount++;

        if (!message.read && message.sender === 'guest') {
          thread.unreadCount++;
        }

        // Update last message if this one is newer
        if (new Date(message.createdAt) > new Date(thread.lastMessage.createdAt)) {
          thread.lastMessage = message;
        }
      }

      // Convert to array and sort by last message time
      let threads = Array.from(threadMap.values());
      threads.sort((a, b) =>
        new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
      );

      // Pagination
      const total = threads.length;
      const totalPages = Math.ceil(total / limit);
      const offset = (page - 1) * limit;
      threads = threads.slice(offset, offset + limit);

      return NextResponse.json({
        data: threads,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
        summary: {
          totalUnread: Array.from(threadMap.values()).reduce((sum, t) => sum + t.unreadCount, 0),
          totalThreads: threadMap.size,
        },
      });
    }

    // Return individual messages with pagination
    const total = messages.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedMessages = messages.slice(offset, offset + limit);

    // Enrich messages with guest info
    const enrichedMessages = paginatedMessages.map(msg => {
      const guest = guestStore.getById(msg.guestId);
      return {
        ...msg,
        guestName: guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown',
      };
    });

    const response: PaginatedResponse<typeof enrichedMessages[0]> = {
      data: enrichedMessages,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST /api/messages - Send a new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['bookingId', 'content', 'sender'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate sender
    if (!['guest', 'host'].includes(body.sender)) {
      return NextResponse.json(
        { error: 'Sender must be either "guest" or "host"' },
        { status: 400 }
      );
    }

    // Validate booking exists
    const booking = bookingStore.getById(body.bookingId);
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Get guestId from booking if not provided
    const guestId = body.guestId || booking.guestId;

    // Create new message
    const newMessage: Message = {
      id: generateId('msg'),
      bookingId: body.bookingId,
      guestId,
      content: body.content.trim(),
      sender: body.sender,
      createdAt: new Date().toISOString(),
      read: body.sender === 'host', // Host messages are marked as read by default
    };

    const created = messageStore.create(newMessage);

    // Enrich with guest info
    const guest = guestStore.getById(guestId);
    const enrichedMessage = {
      ...created,
      guestName: guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown',
    };

    return NextResponse.json(enrichedMessage, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

// PATCH /api/messages - Mark messages as read
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    // Can mark single message or all messages for a booking
    const { messageId, bookingId, markAllRead } = body;

    if (!messageId && !bookingId) {
      return NextResponse.json(
        { error: 'Either messageId or bookingId is required' },
        { status: 400 }
      );
    }

    let updatedCount = 0;

    if (messageId) {
      // Mark single message as read
      const updated = messageStore.update(messageId, { read: true });
      if (updated) {
        updatedCount = 1;
      }
    } else if (bookingId && markAllRead) {
      // Mark all messages for booking as read
      const bookingMessages = messageStore.filter(m =>
        m.bookingId === bookingId && !m.read
      );

      for (const msg of bookingMessages) {
        messageStore.update(msg.id, { read: true });
        updatedCount++;
      }
    }

    return NextResponse.json({
      message: `Marked ${updatedCount} message(s) as read`,
      updatedCount,
    });
  } catch (error) {
    console.error('Error updating messages:', error);
    return NextResponse.json(
      { error: 'Failed to update messages' },
      { status: 500 }
    );
  }
}
