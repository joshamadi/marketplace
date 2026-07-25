'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Truck, Store } from 'lucide-react';
import type { GroceryStore } from '@/types';
import { formatPrice } from '@/lib/utils';

interface GroceryStoreCardProps {
  store: GroceryStore;
}

export default function GroceryStoreCard({ store }: GroceryStoreCardProps) {
  return (
    <Link
      href={`/grocery/${store.id}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-200 hover:shadow-md hover:ring-gray-200 dark:bg-gray-900 dark:ring-gray-800 dark:hover:ring-gray-700"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Image
          src={store.image}
          alt={store.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {store.name}
          </h3>
          <span className="flex items-center gap-1 rounded-md bg-green-50 px-2 py-0.5 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <Store size={14} />
            Open
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {store.categories?.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {store.deliveryTime}
          </span>
          <span className="flex items-center gap-1">
            <Truck size={14} />
            {store.deliveryFee === 0
              ? 'Free delivery'
              : `Delivery ${formatPrice(store.deliveryFee)}`}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1">
          <div className="flex items-center gap-1 rounded-md bg-yellow-50 px-2 py-0.5 text-sm font-semibold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            ★ {store.rating.toFixed(1)}
          </div>
        </div>
      </div>
    </Link>
  );
}
