'use client';

import type { Restaurant } from '@/types';
import RestaurantCard from './RestaurantCard';
import { UtensilsCrossed } from 'lucide-react';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  loading: boolean;
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <div className="aspect-[4/3] animate-pulse bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="flex gap-3">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function RestaurantGrid({ restaurants, loading }: RestaurantGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 py-20 text-center">
        <UtensilsCrossed size={48} className="mb-4 text-gray-300" />
        <h3 className="mb-1 text-lg font-semibold text-gray-700">No restaurants found</h3>
        <p className="max-w-sm text-sm text-gray-500">
          We couldn&apos;t find any restaurants matching your criteria. Try adjusting your filters or search in a different area.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
