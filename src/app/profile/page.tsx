'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  MapPin,
  Plus,
  Trash2,
  Edit3,
  Copy,
  Check,
  Tag,
  User,
  Save,
  X,
} from 'lucide-react';
import ProfileMenu from '@/components/profile/ProfileMenu';
import AddressForm from '@/components/profile/AddressForm';
import PaymentMethods from '@/components/profile/PaymentMethods';
import OrderCard from '@/components/order/OrderCard';
import useAuthStore from '@/store/useAuthStore';
import useOrderStore from '@/store/useOrderStore';
import { cn } from '@/lib/utils';
import type { Address } from '@/types';

const MOCK_ADDRESSES: Address[] = [
  {
    id: 'addr_1',
    label: 'Home',
    address: '15 Admiralty Way, Lekki Phase 1, Lagos',
    latitude: 6.4475,
    longitude: 3.4364,
    isDefault: true,
    cityId: 'lagos',
    areaId: 'lekki',
  },
  {
    id: 'addr_2',
    label: 'Work',
    address: '22 Allen Avenue, Ikeja, Lagos',
    latitude: 6.6002,
    longitude: 3.3547,
    isDefault: false,
    cityId: 'lagos',
    areaId: 'ikeja',
  },
];

const MOCK_PROMOS = [
  {
    code: 'CHOW10',
    description: '10% off your next order',
    discount: '10%',
    minOrder: '₦2,000',
    expires: 'Dec 31, 2026',
    isActive: true,
  },
  {
    code: 'FREEDEL',
    description: 'Free delivery on orders above ₦2,000',
    discount: '₦500',
    minOrder: '₦2,000',
    expires: 'Aug 15, 2026',
    isActive: true,
  },
  {
    code: 'FIRSTORDER',
    description: '30% off your first order (max ₦2,000)',
    discount: '30%',
    minOrder: '₦1,500',
    expires: 'Sep 30, 2026',
    isActive: true,
  },
];

type TabId = 'orders' | 'addresses' | 'payment' | 'promos' | 'chowpass' | 'settings' | 'help';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabId>('orders');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'delivered'>('all');

  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const orders = useOrderStore((s) => s.orders);

  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [profileName, setProfileName] = useState(user ? `${user.firstName} ${user.lastName}`.trim() : '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [profileSaved, setProfileSaved] = useState(false);

  const filteredOrders = useMemo(() => {
    if (orderFilter === 'active') {
      return orders.filter((o) =>
        ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'on_the_way'].includes(o.status)
      );
    }
    if (orderFilter === 'delivered') {
      return orders.filter((o) => o.status === 'delivered');
    }
    return orders;
  }, [orders, orderFilter]);

  function handleCopyCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  function handleSaveAddress(address: Omit<Address, 'id'>) {
    if (editingAddress) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingAddress.id ? { ...a, ...address } : a))
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        { ...address, id: 'addr_' + Date.now() },
      ]);
    }
    setShowAddressForm(false);
    setEditingAddress(undefined);
  }

  function handleDeleteAddress(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  function handleSaveProfile() {
    updateProfile({ firstName: profileName, phone: profilePhone });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  }

  function handleTabSelect(id: string) {
    setActiveTab(id as TabId);
    setMobileMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-10">
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300"
          >
            Menu
            <ChevronDown size={16} className={cn('transition-transform', mobileMenuOpen && 'rotate-180')} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mb-4 lg:hidden">
            <ProfileMenu activeItem={activeTab} onSelect={handleTabSelect} />
          </div>
        )}

        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <ProfileMenu activeItem={activeTab} onSelect={handleTabSelect} />
          </aside>

          <main className="min-w-0 flex-1">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Orders</h2>
                <div className="flex gap-2">
                  {(['all', 'active', 'delivered'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setOrderFilter(f)}
                      className={cn(
                        'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                        orderFilter === f
                          ? 'bg-[#E23E3E] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                      )}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
                {filteredOrders.length === 0 ? (
                  <div className="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
                    <Link
                      href="/"
                      className="mt-4 inline-block rounded-lg bg-[#E23E3E] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d33232]"
                    >
                      Order Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredOrders.map((order) => (
                      <OrderCard key={order.id} order={order as any} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Saved Addresses</h2>
                  <button
                    onClick={() => {
                      setEditingAddress(undefined);
                      setShowAddressForm(true);
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-[#E23E3E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#d33232]"
                  >
                    <Plus size={16} />
                    Add Address
                  </button>
                </div>

                {showAddressForm && (
                  <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
                    <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
                      {editingAddress ? 'Edit Address' : 'New Address'}
                    </h3>
                    <AddressForm
                      initialAddress={editingAddress}
                      onSave={handleSaveAddress}
                      onCancel={() => {
                        setShowAddressForm(false);
                        setEditingAddress(undefined);
                      }}
                    />
                  </div>
                )}

                {addresses.length === 0 && !showAddressForm ? (
                  <div className="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center dark:border-gray-700">
                    <MapPin className="mx-auto mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
                    <p className="text-gray-500 dark:text-gray-400">No saved addresses yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={cn(
                          'rounded-xl border p-4 transition-colors',
                          addr.isDefault
                            ? 'border-[#E23E3E]/30 bg-[#E23E3E]/5'
                            : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <MapPin size={18} className="mt-0.5 text-[#E23E3E]" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {addr.label}
                                </span>
                                {addr.isDefault && (
                                  <span className="rounded-full bg-[#E23E3E]/10 px-2 py-0.5 text-xs font-semibold text-[#E23E3E]">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {addr.address}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setEditingAddress(addr);
                                setShowAddressForm(true);
                              }}
                              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'payment' && <PaymentMethods />}

            {activeTab === 'promos' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Promo Codes</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Copy a promo code and apply it at checkout.
                </p>
                <div className="space-y-3">
                  {MOCK_PROMOS.map((promo) => (
                    <div
                      key={promo.code}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E23E3E]/10">
                          <Tag size={18} className="text-[#E23E3E]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-gray-900 dark:text-white">
                              {promo.code}
                            </span>
                            <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              {promo.discount} off
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                            {promo.description}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                            Min. order: {promo.minOrder} · Expires: {promo.expires}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyCode(promo.code)}
                        className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        {copiedCode === promo.code ? (
                          <>
                            <Check size={14} className="text-green-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'chowpass' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Chowpass</h2>
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                      <span className="text-2xl">👑</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      You are not subscribed
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Get unlimited free delivery and exclusive perks.
                    </p>
                    <Link
                      href="/chowpass"
                      className="mt-4 inline-block rounded-lg bg-[#E23E3E] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d33232]"
                    >
                      View Plans
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E23E3E] text-xl font-bold text-white">
                      {(user ? `${user.firstName} ${user.lastName}`.trim().charAt(0) : 'U').toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {user ? `${user.firstName} ${user.lastName}`.trim() || 'User' : 'User'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user?.email || 'user@chowdeck.com'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      />
                      <p className="mt-1 text-xs text-gray-400">Email cannot be changed.</p>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        placeholder="+234 800 000 0000"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 rounded-lg bg-[#E23E3E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#d33232]"
                    >
                      <Save size={16} />
                      {profileSaved ? 'Saved!' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Help & Support</h2>
                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Contact Support</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Available 8am - 10pm daily
                    </p>
                  </div>
                  <div className="space-y-3">
                    <a
                      href="tel:+23480024693325"
                      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        📞
                      </span>
                      +234 800 CHOWDECK
                    </a>
                    <a
                      href="mailto:support@chowdeck.com"
                      className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        ✉️
                      </span>
                      support@chowdeck.com
                    </a>
                  </div>
                  <Link
                    href="/faq"
                    className="inline-block text-sm font-semibold text-[#E23E3E] hover:underline"
                  >
                    Visit FAQ →
                  </Link>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <footer className="mt-auto">
        <Link href="/" className="block">
        </Link>
      </footer>
    </div>
  );
}
