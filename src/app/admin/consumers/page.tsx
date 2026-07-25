'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, MoreVertical, Eye, Ban, CheckCircle, XCircle } from 'lucide-react';
import consumers from '@/data/consumers';
import type { Consumer } from '@/types';

export default function AdminConsumersPage() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [selectedConsumer, setSelectedConsumer] = useState<Consumer | null>(null);

  const cities = useMemo(() => [...new Set(consumers.map((c) => c.cityId))], []);

  const filtered = useMemo(() => {
    return consumers.filter((c) => {
      const matchSearch =
        !search ||
        c.firstName.toLowerCase().includes(search.toLowerCase()) ||
        c.lastName.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search);
      const matchCity = cityFilter === 'all' || c.cityId === cityFilter;
      return matchSearch && matchCity;
    });
  }, [search, cityFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Consumers</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} consumer{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-[#E23E3E] focus-within:bg-white dark:border-gray-700 dark:bg-gray-800">
            <Search size={16} className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search consumers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-48 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-white sm:w-64"
            />
          </div>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city.charAt(0).toUpperCase() + city.slice(1)}
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
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Consumer</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Contact</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">City</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Orders</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Spent</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Joined</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filtered.map((consumer) => (
              <tr
                key={consumer.id}
                className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                onClick={() => setSelectedConsumer(consumer)}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E23E3E]/10 text-sm font-bold text-[#E23E3E]">
                      {consumer.firstName[0]}{consumer.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {consumer.firstName} {consumer.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{consumer.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <p className="text-gray-700 dark:text-gray-300">{consumer.email}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{consumer.phone}</p>
                </td>
                <td className="px-5 py-4 capitalize text-gray-700 dark:text-gray-300">
                  {consumer.cityId}
                </td>
                <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                  {consumer.totalOrders}
                </td>
                <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                  ₦{consumer.totalSpent.toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  {consumer.isVerified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      <CheckCircle size={12} />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                      <XCircle size={12} />
                      Unverified
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-gray-500 dark:text-gray-400">
                  {new Date(consumer.joinedAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-4">
                  <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
            No consumers found matching your criteria.
          </div>
        )}
      </div>

      {/* Consumer Detail Modal */}
      {selectedConsumer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedConsumer(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Consumer Details</h2>
              <button onClick={() => setSelectedConsumer(null)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E23E3E]/10 text-xl font-bold text-[#E23E3E]">
                  {selectedConsumer.firstName[0]}{selectedConsumer.lastName[0]}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedConsumer.firstName} {selectedConsumer.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedConsumer.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedConsumer.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">City</p>
                  <p className="text-sm font-medium capitalize text-gray-900 dark:text-white">{selectedConsumer.cityId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Orders</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedConsumer.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Spent</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">₦{selectedConsumer.totalSpent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(selectedConsumer.joinedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                  <p className={`text-sm font-medium ${selectedConsumer.isVerified ? 'text-green-600' : 'text-amber-600'}`}>
                    {selectedConsumer.isVerified ? 'Verified' : 'Unverified'}
                  </p>
                </div>
              </div>

              {selectedConsumer.defaultAddress && (
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Default Address</p>
                  <p className="text-sm text-gray-900 dark:text-white">{selectedConsumer.defaultAddress}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  <Ban size={16} className="mr-1.5 inline" />
                  Ban User
                </button>
                <button className="flex-1 rounded-lg bg-[#E23E3E] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#d33232]">
                  <Eye size={16} className="mr-1.5 inline" />
                  View Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
