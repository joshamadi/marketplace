'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import RestaurantHeader from '@/components/restaurant/RestaurantHeader';
import CategoryFilter from '@/components/restaurant/CategoryFilter';
import MenuItemCard from '@/components/restaurant/MenuItemCard';
import RestaurantReviews from '@/components/restaurant/RestaurantReviews';
import { restaurants } from '@/data/restaurants';
import { menuItems } from '@/data/menu';
import useCartStore from '@/store/useCartStore';

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = restaurants.find((r) => r.id === params.id);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);

  const restaurantMenuItems = useMemo(
    () => menuItems.filter((item) => item.restaurantId === params.id),
    [params.id]
  );

  const menuCategories = useMemo(
    () => ['All', ...Array.from(new Set(restaurantMenuItems.map((item) => item.category)))],
    [restaurantMenuItems]
  );

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = useMemo(
    () =>
      selectedCategory === 'All'
        ? restaurantMenuItems
        : restaurantMenuItems.filter((item) => item.category === selectedCategory),
    [restaurantMenuItems, selectedCategory]
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <p className="text-lg font-semibold text-gray-900 mb-2">Restaurant not found</p>
        <p className="text-gray-500 mb-6">The restaurant you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/store"
          className="rounded-xl bg-[#E23E3E] px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantHeader restaurant={restaurant} />

      <CategoryFilter
        categories={menuCategories}
        activeCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            {selectedCategory === 'All' ? 'Full Menu' : selectedCategory}
          </h2>
          <p className="text-sm text-gray-500">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-500">No items in this category.</p>
          </div>
        )}
      </div>

      <RestaurantReviews restaurantId={restaurant.id} />

      {itemCount > 0 && (
        <div className="fixed bottom-20 lg:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg">
          <Link
            href="/cart"
            className="flex items-center justify-between rounded-2xl bg-[#E23E3E] px-6 py-4 text-white shadow-xl shadow-red-900/20 transition-all hover:bg-[#d63535] hover:shadow-2xl active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-[#E23E3E]">
                {itemCount}
              </span>
              <span className="font-semibold">View Cart</span>
            </div>
            <span className="font-bold">₦{subtotal.toLocaleString()}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
