'use client';

import Link from 'next/link';
import { Star, Clock, Bike } from 'lucide-react';
import type { Restaurant } from '@/types';
import { formatPrice, cn } from '@/lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <div
        className={cn(
          'group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
          !restaurant.isOpen && 'opacity-75'
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="h-full w-full bg-gray-200 bg-cover bg-center transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: `url(${restaurant.image})` }} />

          {!restaurant.isOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-gray-800">
                Currently Closed
              </span>
            </div>
          )}

          {restaurant.isPromoted && (
            <span className="absolute left-3 top-3 rounded-md bg-[#E23E3E] px-2.5 py-1 text-xs font-bold text-white shadow-md">
              Promoted
            </span>
          )}

          {restaurant.promoCode && (
            <span className="absolute right-3 top-3 rounded-md bg-green-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
              {restaurant.promoDiscount ? `${restaurant.promoDiscount}% OFF` : 'PROMO'}
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="truncate text-base font-bold text-gray-900">{restaurant.name}</h3>
            <span className="shrink-0 rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
              {restaurant.cuisine}
            </span>
          </div>

          <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-gray-700">{restaurant.rating}</span>
              <span>({restaurant.reviewCount.toLocaleString()})</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {restaurant.deliveryTime}
            </span>
            <span className="flex items-center gap-1">
              <Bike size={14} />
              {restaurant.deliveryFee === 0 ? 'Free' : formatPrice(restaurant.deliveryFee)}
            </span>
          </div>

          {restaurant.promoCode && (
            <div className="rounded-lg border border-dashed border-[#E23E3E]/30 bg-[#E23E3E]/5 px-3 py-1.5">
              <p className="text-xs font-medium text-[#E23E3E]">
                Use code <span className="font-bold">{restaurant.promoCode}</span> for a discount
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
