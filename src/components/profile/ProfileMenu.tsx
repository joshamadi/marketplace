'use client';

import {
  Package,
  MapPin,
  CreditCard,
  Tag,
  Crown,
  Settings,
  HelpCircle,
  LogOut,
  User,
} from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

interface ProfileMenuProps {
  activeItem: string;
  onSelect: (item: string) => void;
}

const MENU_ITEMS = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  { id: 'promos', label: 'Promo Codes', icon: Tag },
  { id: 'chowpass', label: 'Chowpass', icon: Crown },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
] as const;

export default function ProfileMenu({ activeItem, onSelect }: ProfileMenuProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const displayName = user ? `${user.firstName} ${user.lastName}`.trim() || 'Guest' : 'Guest';
  const displayEmail = user?.email || 'guest@chowdeck.com';
  const displayInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
      <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={displayName}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E23E3E] text-xl font-bold text-white">
            {displayInitial}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
            {displayName}
          </h3>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {displayEmail}
          </p>
        </div>
      </div>

      <nav className="space-y-0.5">
        {MENU_ITEMS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              activeItem === id
                ? 'bg-[#E23E3E]/10 text-[#E23E3E]'
                : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            )}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-4 border-t border-gray-100 pt-2 dark:border-gray-800">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
