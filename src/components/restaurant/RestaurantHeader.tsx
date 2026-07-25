'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  Clock,
  Bike,
  MapPin,
  Share2,
  Heart,
  ChevronLeft,
  Tag,
  ShoppingBag,
  Car,
} from 'lucide-react';
import type { Restaurant } from '@/types';
import { formatPrice, cn } from '@/lib/utils';

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

type OrderType = 'delivery' | 'pickup';

export default function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('delivery');

  return (
    <div className="relative">
      <div className="relative h-56 overflow-hidden bg-gray-200 sm:h-72 md:h-80">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.coverImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute left-4 top-4 z-10">
          <Link
            href="/restaurants"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur transition-colors hover:bg-white"
          >
            <ChevronLeft size={20} />
          </Link>
        </div>

        <div className="absolute right-4 top-4 z-10 flex gap-2">
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-sm backdrop-blur transition-colors hover:bg-white"
            aria-label="Share restaurant"
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full shadow-sm backdrop-blur transition-colors',
              isFavorited ? 'bg-[#E23E3E] text-white' : 'bg-white/90 text-gray-700 hover:bg-white'
            )}
            aria-label="Favorite restaurant"
          >
            <Heart size={18} className={isFavorited ? 'fill-white' : ''} />
          </button>
        </div>

        {!restaurant.isOpen && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
            <div className="rounded-xl bg-white/95 px-8 py-4 text-center shadow-xl backdrop-blur">
              <p className="text-lg font-bold text-gray-800">Currently Closed</p>
              <p className="mt-1 text-sm text-gray-500">Opening hours: 8:00 AM – 10:00 PM</p>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-4xl px-4">
        <div className="relative -mt-12 rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-gray-900">{restaurant.name}</h1>
                {restaurant.isPromoted && (
                  <span className="rounded-md bg-[#E23E3E] px-2 py-0.5 text-xs font-bold text-white">
                    Promoted
                  </span>
                )}
                <span
                  className={cn(
                    'rounded-md px-2 py-0.5 text-xs font-bold',
                    restaurant.isOpen
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  )}
                >
                  {restaurant.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-gray-700">{restaurant.rating}</span>
                  <span>({restaurant.reviewCount.toLocaleString()} reviews)</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {restaurant.deliveryTime}
                </span>
                <span className="flex items-center gap-1">
                  <Bike size={16} />
                  {restaurant.deliveryFee === 0 ? 'Free delivery' : `Delivery: ${formatPrice(restaurant.deliveryFee)}`}
                </span>
                <span className="text-gray-400">
                  Min. order: {formatPrice(restaurant.minOrder)}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {restaurant.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-600"
                  >
                    {cat.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin size={14} className="text-gray-400" />
                {restaurant.address}
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <div className="inline-flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                <button
                  onClick={() => setOrderType('delivery')}
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors',
                    orderType === 'delivery'
                      ? 'bg-[#E23E3E] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <Car size={16} />
                  Delivery
                </button>
                <button
                  onClick={() => setOrderType('pickup')}
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors',
                    orderType === 'pickup'
                      ? 'bg-[#E23E3E] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <ShoppingBag size={16} />
                  Pickup
                </button>
              </div>
            </div>
          </div>

          {restaurant.promoCode && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-[#E23E3E]/40 bg-[#E23E3E]/5 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E23E3E]/10">
                <Tag size={20} className="text-[#E23E3E]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#E23E3E]">
                  Use code{' '}
                  <span className="rounded bg-[#E23E3E]/10 px-1.5 py-0.5">
                    {restaurant.promoCode}
                  </span>
                </p>
                {restaurant.promoDiscount && (
                  <p className="text-xs text-gray-500">
                    Get {restaurant.promoDiscount}% off your order
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
