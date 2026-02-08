'use client';

import { useState, useMemo } from 'react';
import { transactions, legacyBookings as bookings, guests, formatCurrency, formatDate, calculateRevenue } from '@/lib/mockData';
import { Transaction } from '@/lib/types';

const typeColors: Record<string, string> = {
  payment: 'bg-green-100 text-green-800',
  deposit: 'bg-blue-100 text-blue-800',
  refund: 'bg-red-100 text-red-800',
  fee: 'bg-yellow-100 text-yellow-800',
};

const statusColors: Record<string, string> = {
  completed: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-neutral-100 text-neutral-800',
};

export default function FinancialsPage() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'all' | '30' | '90' | '365'>('90');
  const [isLoading] = useState(false);

  const transactionsWithDetails = useMemo(() => {
    return transactions.map((txn) => {
      const booking = bookings.find((b) => b.id === txn.bookingId);
      const guest = guests.find((g) => g.id === booking?.guestId);
      return {
        ...txn,
        guestName: booking?.guestName || (guest ? `${guest.firstName} ${guest.lastName}` : 'Unknown'),
        unitName: booking?.unitName || 'Unknown Unit',
      };
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, []);

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    let filtered = transactionsWithDetails;

    // Date filter
    if (dateRange !== 'all') {
      const daysAgo = parseInt(dateRange);
      const cutoff = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((t) => new Date(t.createdAt) >= cutoff);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((t) => t.type === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    return filtered;
  }, [transactionsWithDetails, dateRange, typeFilter, statusFilter]);

  const stats = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Calculate monthly revenue
    const thisMonthRevenue = calculateRevenue(
      startOfMonth.toISOString().split('T')[0],
      now.toISOString().split('T')[0]
    );

    const lastMonthRevenue = calculateRevenue(
      startOfLastMonth.toISOString().split('T')[0],
      endOfLastMonth.toISOString().split('T')[0]
    );

    // Total revenue
    const totalRevenue = calculateRevenue();

    // Pending payments
    const pendingPayments = bookings
      .filter((b) => b.status !== 'cancelled' && b.status !== 'checked-out')
      .reduce((sum, b) => {
        const paid = transactionsWithDetails
          .filter((t) => t.bookingId === b.id && t.status === 'completed' && (t.type === 'payment' || t.type === 'deposit'))
          .reduce((s, t) => s + t.amount, 0);
        return sum + Math.max(0, b.totalAmount - paid);
      }, 0);

    // Refunds
    const totalRefunds = transactionsWithDetails
      .filter((t) => t.type === 'refund' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalRevenue,
      thisMonthRevenue,
      lastMonthRevenue,
      pendingPayments,
      totalRefunds,
      monthlyGrowth: lastMonthRevenue > 0
        ? Math.round(((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
        : 0,
    };
  }, [transactionsWithDetails]);

  const handleExportCSV = () => {
    const headers = ['Date', 'Type', 'Guest', 'Unit', 'Amount', 'Status', 'Description'];
    const rows = filteredTransactions.map((t) => [
      formatDate(t.createdAt),
      t.type,
      t.guestName,
      t.unitName,
      t.amount,
      t.status,
      t.description || '',
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nursebnb-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
          <h1 className="text-2xl font-bold text-neutral-900">Financials</h1>
          <p className="text-neutral-500">Track revenue, payments, and transactions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Record Payment
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-neutral-900">{formatCurrency(stats.totalRevenue)}</h3>
            <p className="text-sm text-neutral-500 mt-1">Total Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className={`text-sm font-medium ${stats.monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.monthlyGrowth >= 0 ? '+' : ''}{stats.monthlyGrowth}%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-neutral-900">{formatCurrency(stats.thisMonthRevenue)}</h3>
            <p className="text-sm text-neutral-500 mt-1">This Month</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-yellow-600">{formatCurrency(stats.pendingPayments)}</h3>
            <p className="text-sm text-neutral-500 mt-1">Pending Payments</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-red-600">{formatCurrency(stats.totalRefunds)}</h3>
            <p className="text-sm text-neutral-500 mt-1">Total Refunds</p>
          </div>
        </div>
      </div>

      {/* Stripe Integration Placeholder */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-8 h-8" viewBox="0 0 28 28" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.04 3.06c-.71.49-1.18 1.24-1.18 2.12 0 .88.47 1.63 1.18 2.12-.71-.49-1.57-.8-2.49-.8-2.4 0-4.35 2.02-4.35 4.5s1.95 4.5 4.35 4.5c.92 0 1.78-.31 2.49-.8-.71.49-1.18 1.24-1.18 2.12 0 .88.47 1.63 1.18 2.12-.71-.49-1.57-.8-2.49-.8-2.4 0-4.35 2.02-4.35 4.5s1.95 4.5 4.35 4.5c.92 0 1.78-.31 2.49-.8-.71.49-1.18 1.24-1.18 2.12 0 1.44 1.12 2.62 2.49 2.62 1.38 0 2.5-1.18 2.5-2.62 0-.88-.47-1.63-1.18-2.12.71.49 1.56.8 2.48.8 2.4 0 4.35-2.02 4.35-4.5s-1.95-4.5-4.35-4.5c-.92 0-1.77.31-2.48.8.71-.49 1.18-1.24 1.18-2.12 0-.88-.47-1.63-1.18-2.12.71.49 1.56.8 2.48.8 2.4 0 4.35-2.02 4.35-4.5s-1.95-4.5-4.35-4.5c-.92 0-1.77.31-2.48.8.71-.49 1.18-1.24 1.18-2.12C16.49 1.18 15.37 0 14 0c-1.38 0-2.5 1.18-2.5 2.62 0 .18.02.35.05.52-.01-.03-.01-.05-.01-.08z"/>
              </svg>
              <span className="text-xl font-bold">Stripe Connected</span>
            </div>
            <p className="text-purple-100">Accept payments, manage payouts, and track transactions securely</p>
          </div>
          <button className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
            View Dashboard
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg border border-neutral-200">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value as typeof dateRange)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
          <option value="all">All time</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Types</option>
          <option value="payment">Payments</option>
          <option value="deposit">Deposits</option>
          <option value="refund">Refunds</option>
          <option value="fee">Fees</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <div className="flex-1"></div>
        <span className="text-sm text-neutral-500">
          {filteredTransactions.length} transactions
        </span>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">No transactions found</h3>
            <p className="text-neutral-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Guest</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Unit</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-neutral-900">
                      {formatDate(txn.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[txn.type]}`}>
                        {txn.type.charAt(0).toUpperCase() + txn.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-900">
                      {txn.guestName}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      {txn.unitName}
                    </td>
                    <td className={`px-6 py-4 text-sm font-medium text-right ${
                      txn.type === 'refund' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {txn.type === 'refund' ? '-' : '+'}{formatCurrency(txn.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[txn.status]}`}>
                        {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500 max-w-xs truncate">
                      {txn.description || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
