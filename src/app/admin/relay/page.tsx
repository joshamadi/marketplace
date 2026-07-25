'use client';

import { useState, useMemo } from 'react';
import { Search, Package, Clock, Truck, CheckCircle, XCircle, MapPin } from 'lucide-react';
import relayDeliveries from '@/data/relay';
import type { Relay, RelayStatus } from '@/types';

const STATUS_CONFIG: Record<RelayStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: 'text-amber-700', bg: 'bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400' },
  accepted: { label: 'Accepted', color: 'text-blue-700', bg: 'bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' },
  picked_up: { label: 'Picked Up', color: 'text-purple-700', bg: 'bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400' },
  in_transit: { label: 'In Transit', color: 'text-indigo-700', bg: 'bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400' },
  delivered: { label: 'Delivered', color: 'text-green-700', bg: 'bg-green-100 dark:bg-green-900/30 dark:text-green-400' },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bg: 'bg-red-100 dark:bg-red-900/30 dark:text-red-400' },
};

const STATUS_ICONS: Record<RelayStatus, typeof Clock> = {
  pending: Clock,
  accepted: CheckCircle,
  picked_up: Package,
  in_transit: Truck,
  delivered: CheckCircle,
  cancelled: XCircle,
};

export default function AdminRelayPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | RelayStatus>('all');
  const [selectedRelay, setSelectedRelay] = useState<Relay | null>(null);

  const stats = useMemo(() => ({
    total: relayDeliveries.length,
    pending: relayDeliveries.filter((r) => r.status === 'pending').length,
    active: relayDeliveries.filter((r) => ['accepted', 'picked_up', 'in_transit'].includes(r.status)).length,
    delivered: relayDeliveries.filter((r) => r.status === 'delivered').length,
    totalRevenue: relayDeliveries.reduce((sum, r) => sum + r.fee, 0),
  }), []);

  const filtered = useMemo(() => {
    return relayDeliveries.filter((r) => {
      const matchSearch =
        !search ||
        r.senderName.toLowerCase().includes(search.toLowerCase()) ||
        r.receiverName.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase()) ||
        r.itemDescription.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Active</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">{stats.active}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Delivered</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{stats.delivered}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Revenue</p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">₦{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Relay Deliveries</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-[#E23E3E] focus-within:bg-white dark:border-gray-700 dark:bg-gray-800">
            <Search size={16} className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search relay..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-white sm:w-56"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Status</option>
            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">ID</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Sender</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Receiver</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Item</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Distance</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Fee</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Rider</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filtered.map((relay) => {
              const statusConfig = STATUS_CONFIG[relay.status];
              return (
                <tr
                  key={relay.id}
                  className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  onClick={() => setSelectedRelay(relay)}
                >
                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{relay.id}</td>
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">{relay.senderName}</td>
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">{relay.receiverName}</td>
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">{relay.itemDescription}</td>
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">{relay.distance > 0 ? `${relay.distance} km` : '-'}</td>
                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                    {relay.fee > 0 ? `₦${relay.fee.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                    {relay.riderName || '-'}
                  </td>
                  <td className="px-5 py-4">
                    <MapPin size={16} className="text-gray-400" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
            No relay deliveries found matching your criteria.
          </div>
        )}
      </div>

      {/* Relay Detail Modal */}
      {selectedRelay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedRelay(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Relay Details</h2>
              <button onClick={() => setSelectedRelay(null)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{selectedRelay.id}</span>
                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CONFIG[selectedRelay.status].bg} ${STATUS_CONFIG[selectedRelay.status].color}`}>
                  {STATUS_CONFIG[selectedRelay.status].label}
                </span>
              </div>

              {/* Route */}
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex flex-col items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="h-8 w-0.5 bg-gray-300 dark:bg-gray-600" />
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-xs font-medium text-green-600">Pickup</p>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedRelay.pickupAddress}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{selectedRelay.senderName} - {selectedRelay.senderPhone}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-red-600">Drop-off</p>
                      <p className="text-sm text-gray-900 dark:text-white">{selectedRelay.dropoffAddress}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{selectedRelay.receiverName} - {selectedRelay.receiverPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item Details */}
              <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Item</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRelay.itemDescription}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Item Value</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">₦{selectedRelay.itemValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Distance</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRelay.distance > 0 ? `${selectedRelay.distance} km` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Delivery Fee</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRelay.fee > 0 ? `₦${selectedRelay.fee.toLocaleString()}` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Created</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(selectedRelay.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Est. Delivery</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(selectedRelay.estimatedDelivery).toLocaleString()}</p>
                </div>
              </div>

              {selectedRelay.riderName && (
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Assigned Rider</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRelay.riderName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{selectedRelay.riderPhone}</p>
                </div>
              )}

              {selectedRelay.notes && (
                <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950/20">
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-400">Notes</p>
                  <p className="text-sm text-amber-800 dark:text-amber-300">{selectedRelay.notes}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  Reassign Rider
                </button>
                <button className="flex-1 rounded-lg bg-[#E23E3E] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#d33232]">
                  Track Delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
