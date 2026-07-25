'use client';

import { useMemo } from 'react';
import {
  Users,
  Bike,
  Package,
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Clock,
  CheckCircle,
} from 'lucide-react';
import consumers from '@/data/consumers';
import riders from '@/data/riders';
import relayDeliveries from '@/data/relay';

const STATS = [
  {
    label: 'Total Consumers',
    value: consumers.length.toString(),
    change: '+12%',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    label: 'Active Riders',
    value: riders.filter((r) => r.isAvailable).length.toString(),
    change: '+8%',
    icon: Bike,
    color: 'bg-green-500',
  },
  {
    label: 'Relay Deliveries',
    value: relayDeliveries.length.toString(),
    change: '+23%',
    icon: Package,
    color: 'bg-purple-500',
  },
  {
    label: 'Total Revenue',
    value: '₦12.4M',
    change: '+18%',
    icon: DollarSign,
    color: 'bg-amber-500',
  },
];

const RECENT_ORDERS = [
  { id: 'ORD-7821', customer: 'Chidinma Okafor', amount: 4500, status: 'delivered', time: '2 min ago' },
  { id: 'ORD-7820', customer: 'Emeka Nwosu', amount: 8200, status: 'in_transit', time: '8 min ago' },
  { id: 'ORD-7819', customer: 'Fatima Abubakar', amount: 3100, status: 'preparing', time: '12 min ago' },
  { id: 'ORD-7818', customer: 'Adebayo Johnson', amount: 6700, status: 'delivered', time: '18 min ago' },
  { id: 'ORD-7817', customer: 'Sade Ogundimu', amount: 5400, status: 'confirmed', time: '25 min ago' },
];



function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    delivered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    in_transit: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    preparing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    confirmed: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    pending: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status] || colors.pending}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

export default function AdminDashboard() {
  const relayStats = useMemo(() => ({
    pending: relayDeliveries.filter((r) => r.status === 'pending').length,
    inTransit: relayDeliveries.filter((r) => r.status === 'in_transit' || r.status === 'picked_up').length,
    delivered: relayDeliveries.filter((r) => r.status === 'delivered').length,
    totalFee: relayDeliveries.reduce((sum, r) => sum + r.fee, 0),
  }), []);

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}/10`}>
                  <Icon size={22} className={`${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs">
                <TrendingUp size={14} className="text-green-500" />
                <span className="font-medium text-green-600">{stat.change}</span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="lg:col-span-2 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
            <Clock size={16} className="text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Customer</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 font-medium text-gray-900 dark:text-white">{order.id}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">{order.customer}</td>
                    <td className="py-3 font-medium text-gray-900 dark:text-white">₦{order.amount.toLocaleString()}</td>
                    <td className="py-3"><StatusBadge status={order.status} /></td>
                    <td className="py-3 text-gray-500 dark:text-gray-400">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Relay Summary */}
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Relay Summary</h2>
            <Package size={16} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3 dark:bg-amber-950/20">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-amber-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Pending</span>
              </div>
              <span className="text-lg font-bold text-amber-600">{relayStats.pending}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-950/20">
              <div className="flex items-center gap-2">
                <Bike size={16} className="text-blue-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">In Transit</span>
              </div>
              <span className="text-lg font-bold text-blue-600">{relayStats.inTransit}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-950/20">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Delivered</span>
              </div>
              <span className="text-lg font-bold text-green-600">{relayStats.delivered}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Total Fees</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">₦{relayStats.totalFee.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <ShoppingCart size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Orders Today</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">247</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
              <DollarSign size={20} className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Revenue Today</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">₦1.8M</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Users size={20} className="text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">New Users Today</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">38</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
