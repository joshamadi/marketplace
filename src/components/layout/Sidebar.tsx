'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, MapPin, Home, Search, ClipboardList, ShoppingBag, Phone, HelpCircle, FileText, Shield } from 'lucide-react';
import { useLocationStore } from '@/store/useLocationStore';

const CITIES = ['Lagos', 'Abuja', 'Accra', 'Ibadan', 'Port Harcourt'];

const NAV_LINKS = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'Orders', href: '/orders', icon: ClipboardList },
  { label: 'Chowstore', href: '/chowstore', icon: ShoppingBag },
  { label: 'Contact Us', href: '/contact', icon: Phone },
  { label: 'FAQ', href: '/faq', icon: HelpCircle },
  { label: 'Terms', href: '/terms', icon: FileText },
  { label: 'Admin Panel', href: '/admin/login', icon: Shield },
];

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { selectedCity: city, setCity } = useLocationStore();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <span className="text-xl font-extrabold text-[#E23E3E]">chowdeck</span>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="border-b border-gray-100 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E23E3E]/10 text-[#E23E3E]">
              <span className="text-lg font-bold">G</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Guest User</p>
              <Link
                href="/login"
                onClick={onClose}
                className="text-xs font-medium text-[#E23E3E] hover:underline"
              >
                Login / Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* City Selector */}
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <MapPin size={14} />
            Select City
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <button
                key={c}
                onClick={() => setCity(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  c === city
                    ? 'border-[#E23E3E] bg-[#E23E3E] text-white'
                    : 'border-gray-200 text-gray-600 hover:border-[#E23E3E] hover:text-[#E23E3E]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-red-50 text-[#E23E3E]'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Chowdeck
          </p>
        </div>
      </div>
    </div>
  );
}
