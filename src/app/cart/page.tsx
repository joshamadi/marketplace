'use client';

import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import CartItemRow from '@/components/cart/CartItemRow';
import CartSummary from '@/components/cart/CartSummary';
import useCartStore from '@/store/useCartStore';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const restaurantName = useCartStore((s) => s.restaurantName);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
          <ShoppingBag size={40} className="text-gray-300" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mb-8 max-w-sm text-center text-gray-500">
          Looks like you haven&apos;t added anything to your cart yet. Browse our restaurants and find something delicious.
        </p>
        <Link
          href="/store"
          className="rounded-xl bg-[#E23E3E] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow active:scale-95"
        >
          Start Ordering
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Link
            href="/store"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#E23E3E] transition-colors"
          >
            <ArrowLeft size={16} />
            Continue shopping
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Your Cart
          {restaurantName && (
            <span className="text-base font-normal text-gray-500 ml-2">from {restaurantName}</span>
          )}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
