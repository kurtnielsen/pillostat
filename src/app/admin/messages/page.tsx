'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { messages, guests, bookings, formatDate, getRelativeTime } from '@/lib/mockData';
import { Message } from '@/lib/types';

// Quick reply templates
const quickReplies = [
  {
    id: 'qr1',
    title: 'Welcome Message',
    content: 'Welcome to pillowSTAT! We are so glad to have you. If you have any questions during your stay, please do not hesitate to reach out. Enjoy your time here!',
  },
  {
    id: 'qr2',
    title: 'Check-in Instructions',
    content: 'Check-in is anytime after 3pm. Your lockbox code is [CODE]. The key is inside. WiFi password is pillowSTAT2024. Let me know if you need anything!',
  },
  {
    id: 'qr3',
    title: 'Check-out Reminder',
    content: 'Just a friendly reminder that check-out is by 11am tomorrow. Please leave the key in the lockbox. Thank you for staying with us!',
  },
  {
    id: 'qr4',
    title: 'Deposit Request',
    content: 'Thank you for your booking request! To confirm your reservation, we require a 50% deposit. You can pay via the link I will send shortly.',
  },
  {
    id: 'qr5',
    title: 'Thank You',
    content: 'Thank you for your message! I will get back to you as soon as possible, usually within a few hours.',
  },
];

interface MessageThread {
  guestId: string;
  guestName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
  bookingId?: string;
}

export default function MessagesPage() {
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [isLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Group messages by guest
  const threads: MessageThread[] = useMemo(() => {
    const threadMap = new Map<string, MessageThread>();

    // Sort messages by time first
    const sortedMessages = [...messages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    sortedMessages.forEach((msg) => {
      const guest = guests.find((g) => g.id === msg.guestId);
      const guestName = guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown Guest';

      if (!threadMap.has(msg.guestId)) {
        threadMap.set(msg.guestId, {
          guestId: msg.guestId,
          guestName,
          lastMessage: msg.content,
          lastMessageTime: msg.createdAt,
          unreadCount: 0,
          messages: [],
          bookingId: msg.bookingId,
        });
      }

      const thread = threadMap.get(msg.guestId)!;
      thread.messages.push(msg);
      if (!msg.read && msg.sender === 'guest') {
        thread.unreadCount++;
      }
    });

    // Sort messages within each thread chronologically
    threadMap.forEach((thread) => {
      thread.messages.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });

    return Array.from(threadMap.values()).sort(
      (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );
  }, []);

  const filteredThreads = useMemo(() => {
    if (!searchQuery) return threads;
    return threads.filter(
      (t) =>
        t.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [threads, searchQuery]);

  const totalUnread = useMemo(() => {
    return threads.reduce((sum, t) => sum + t.unreadCount, 0);
  }, [threads]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedThread]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedThread) return;
    // In a real app, this would send to API
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleQuickReply = (content: string) => {
    setNewMessage(content);
    setShowQuickReplies(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Messages</h1>
          <p className="text-neutral-500">
            {totalUnread > 0 ? `${totalUnread} unread messages` : 'All caught up!'}
          </p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden h-[calc(100vh-220px)] flex">
        {/* Thread List */}
        <div className="w-80 border-r border-neutral-200 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-neutral-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Thread List */}
          <div className="flex-1 overflow-y-auto">
            {filteredThreads.length === 0 ? (
              <div className="p-8 text-center text-neutral-500">
                <svg className="w-12 h-12 mx-auto text-neutral-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p>No messages found</p>
              </div>
            ) : (
              filteredThreads.map((thread) => (
                <div
                  key={thread.guestId}
                  className={`p-4 border-b border-neutral-100 cursor-pointer transition-colors ${
                    selectedThread?.guestId === thread.guestId
                      ? 'bg-primary-50'
                      : 'hover:bg-neutral-50'
                  }`}
                  onClick={() => setSelectedThread(thread)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                      {thread.guestName.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-neutral-900 truncate">{thread.guestName}</span>
                        <span className="text-xs text-neutral-500 flex-shrink-0">
                          {getRelativeTime(thread.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-500 truncate mt-0.5">{thread.lastMessage}</p>
                    </div>
                    {thread.unreadCount > 0 && (
                      <span className="bg-primary-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Thread */}
        {selectedThread ? (
          <div className="flex-1 flex flex-col">
            {/* Thread Header */}
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-semibold">
                  {selectedThread.guestName.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-900">{selectedThread.guestName}</h3>
                  {selectedThread.bookingId && (
                    <p className="text-sm text-neutral-500">
                      Booking: {selectedThread.bookingId}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors" title="Mark as unread">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                  </svg>
                </button>
                <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors" title="View guest profile">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedThread.messages.map((msg, index) => {
                const showDate =
                  index === 0 ||
                  new Date(msg.createdAt).toDateString() !==
                    new Date(selectedThread.messages[index - 1].createdAt).toDateString();

                return (
                  <div key={msg.id}>
                    {showDate && (
                      <div className="text-center my-4">
                        <span className="text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                          {formatDate(msg.createdAt)}
                        </span>
                      </div>
                    )}
                    <div
                      className={`flex ${msg.sender === 'host' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.sender === 'host'
                            ? 'bg-primary-600 text-white rounded-br-md'
                            : 'bg-neutral-100 text-neutral-900 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === 'host' ? 'text-primary-200' : 'text-neutral-500'
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-neutral-200">
              {/* Quick Replies */}
              {showQuickReplies && (
                <div className="mb-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-neutral-700">Quick Replies</span>
                    <button
                      onClick={() => setShowQuickReplies(false)}
                      className="text-neutral-400 hover:text-neutral-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr.id}
                        onClick={() => handleQuickReply(qr.content)}
                        className="px-3 py-1.5 bg-white border border-neutral-300 rounded-full text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
                      >
                        {qr.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-end gap-3">
                <button
                  onClick={() => setShowQuickReplies(!showQuickReplies)}
                  className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                  title="Quick replies"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <svg className="w-16 h-16 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 className="text-lg font-medium text-neutral-900 mb-1">Select a conversation</h3>
              <p className="text-neutral-500">Choose a guest from the list to view messages</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
