'use client';

import { useState, useMemo } from 'react';
import { Search, Star, MoreVertical, CheckCircle, XCircle, Bike, Car, Zap } from 'lucide-react';
import riders from '@/data/riders';
import type { Rider } from '@/types';

const VEHICLE_ICONS: Record<string, typeof Bike> = {
  bicycle: Zap,
  motorcycle: Bike,
  car: Car,
};

export default function AdminRidersPage() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'unavailable'>('all');
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

  const cities = useMemo(() => [...new Set(riders.map((r) => r.cityId))], []);

  const filtered = useMemo(() => {
    return riders.filter((r) => {
      const matchSearch =
        !search ||
        r.firstName.toLowerCase().includes(search.toLowerCase()) ||
        r.lastName.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.phone.includes(search);
      const matchCity = cityFilter === 'all' || r.cityId === cityFilter;
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'available' && r.isAvailable) ||
        (statusFilter === 'unavailable' && !r.isAvailable);
      return matchSearch && matchCity && matchStatus;
    });
  }, [search, cityFilter, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Riders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} rider{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-[#E23E3E] focus-within:bg-white dark:border-gray-700 dark:bg-gray-800">
            <Search size={16} className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search riders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-40 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-white sm:w-56"
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
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Rider</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Vehicle</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">City</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Rating</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Deliveries</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Earnings</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="px-5 py-3.5 font-medium text-gray-500 dark:text-gray-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filtered.map((rider) => {
              const VehicleIcon = VEHICLE_ICONS[rider.vehicleType] || Bike;
              return (
                <tr
                  key={rider.id}
                  className="cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  onClick={() => setSelectedRider(rider)}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E23E3E]/10 text-sm font-bold text-[#E23E3E]">
                        {rider.firstName[0]}{rider.lastName[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {rider.firstName} {rider.lastName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{rider.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <VehicleIcon size={16} className="text-gray-400" />
                      <div>
                        <p className="capitalize text-gray-700 dark:text-gray-300">{rider.vehicleType}</p>
                        {rider.vehiclePlate && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">{rider.vehiclePlate}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 capitalize text-gray-700 dark:text-gray-300">
                    {rider.cityId}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="font-medium text-gray-900 dark:text-white">{rider.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                    {rider.totalDeliveries.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                    ₦{rider.totalEarnings.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    {rider.isAvailable ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        <CheckCircle size={12} />
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        <XCircle size={12} />
                        Offline
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">
            No riders found matching your criteria.
          </div>
        )}
      </div>

      {/* Rider Detail Modal */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedRider(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Rider Details</h2>
              <button onClick={() => setSelectedRider(null)} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E23E3E]/10 text-xl font-bold text-[#E23E3E]">
                  {selectedRider.firstName[0]}{selectedRider.lastName[0]}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedRider.firstName} {selectedRider.lastName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{selectedRider.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRider.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">City</p>
                  <p className="text-sm font-medium capitalize text-gray-900 dark:text-white">{selectedRider.cityId}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Vehicle</p>
                  <p className="text-sm font-medium capitalize text-gray-900 dark:text-white">
                    {selectedRider.vehicleType}
                    {selectedRider.vehiclePlate && ` - ${selectedRider.vehiclePlate}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRider.rating}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Deliveries</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedRider.totalDeliveries.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Earnings</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">₦{selectedRider.totalEarnings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Joined</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(selectedRider.joinedAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                  <p className={`text-sm font-medium ${selectedRider.isAvailable ? 'text-green-600' : 'text-gray-500'}`}>
                    {selectedRider.isAvailable ? 'Available' : 'Offline'}
                  </p>
                </div>
              </div>

              {selectedRider.bankName && (
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Bank Details</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedRider.bankName} - {selectedRider.bankAccountNumber}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                  Suspend Rider
                </button>
                <button className="flex-1 rounded-lg bg-[#E23E3E] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#d33232]">
                  View Deliveries
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
