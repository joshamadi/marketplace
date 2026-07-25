'use client';

import Link from 'next/link';
import { Star, Clock, MapPin } from 'lucide-react';
import { restaurants } from '@/data/restaurants';

const featured = restaurants.filter((r) => r.isFeatured);

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
      <span className="text-sm font-medium text-gray-700 ml-1">{rating}</span>
    </div>
  );
}

export default function PopularRestaurants() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Popular restaurants
            </h2>
            <p className="text-lg text-gray-600">
              Top-rated spots loved by our customers
            </p>
          </div>
          <Link
            href="/restaurants"
            className="text-[#E23E3E] font-semibold hover:underline hidden sm:inline-block"
          >
            View all →
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {featured.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/restaurants/${restaurant.id}`}
              className="flex-shrink-0 w-72 snap-start group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group-hover:-translate-y-1">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
                  {restaurant.promoCode && (
                    <span className="absolute top-3 left-3 z-20 bg-[#E23E3E] text-white text-xs font-bold px-3 py-1 rounded-full">
                      PROMO
                    </span>
                  )}
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-red-100 to-orange-50">
                    🍽️
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#E23E3E] transition-colors">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                    {restaurant.description}
                  </p>
                  <RatingStars rating={restaurant.rating} />
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate max-w-[140px]">{restaurant.areaId.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/restaurants"
            className="text-[#E23E3E] font-semibold hover:underline"
          >
            View all restaurants →
          </Link>
        </div>
      </div>
    </section>
  );
}
