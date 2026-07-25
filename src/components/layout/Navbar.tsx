'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useLocationStore } from '@/store/useLocationStore';
import Sidebar from './Sidebar';

const NAV_LINKS = [
  { label: 'Customers', href: '/customers' },
  { label: 'Chowpass', href: '/chowpass' },
  { label: 'Relay', href: '/relay' },
  { label: 'Vendors', href: '/vendors' },
  { label: 'Riders', href: '/riders' },
  { label: 'Chowstore', href: '/chowstore' },
  { label: 'Ads', href: '/ads' },
];

const CITIES = ['Lagos', 'Abuja', 'Accra', 'Ibadan', 'Port Harcourt'];

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const cartCount = useCartStore((s) => s.items.reduce((sum, item) => sum + item.quantity, 0));
  const { selectedCity: city, setCity } = useLocationStore();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          {/* Left: Logo + Nav Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-[#E23E3E]">
              chowdeck
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-[#E23E3E]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: City, Search, Cart, User */}
          <div className="flex items-center gap-3">
            {/* City Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-[#E23E3E] hover:text-[#E23E3E]"
              >
                <MapPin size={16} className="text-[#E23E3E]" />
                <span>{city}</span>
                <ChevronDown size={14} />
              </button>

              {cityDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCity(c);
                        setCityDropdownOpen(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-red-50 hover:text-[#E23E3E] ${
                        c === city ? 'font-semibold text-[#E23E3E]' : 'text-gray-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <div className="hidden items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 transition-colors focus-within:border-[#E23E3E] focus-within:bg-white sm:flex">
              <Search size={16} className="mr-2 text-gray-400" />
              <input
                type="text"
                placeholder="Search food, restaurants..."
                className="w-40 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 lg:w-56"
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 sm:hidden"
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#E23E3E] text-[10px] font-bold text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            <Link
              href="/login"
              className="hidden items-center gap-2 rounded-lg bg-[#E23E3E] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 md:flex"
            >
              <User size={16} />
              Login
            </Link>

            {/* Admin */}
            <Link
              href="/admin/login"
              className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-[#E23E3E] hover:text-[#E23E3E] md:flex"
            >
              Admin
            </Link>

            {/* Mobile User Icon */}
            <Link href="/login" className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 md:hidden">
              <User size={20} />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="border-t border-gray-100 px-4 py-3 sm:hidden">
            <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-[#E23E3E] focus-within:bg-white">
              <Search size={16} className="mr-2 text-gray-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search food, restaurants..."
                className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
              <button onClick={() => setMobileSearchOpen(false)} className="ml-2 text-gray-400">
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}
    </>
  );
}
