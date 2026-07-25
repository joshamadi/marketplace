'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import type { GroceryProduct } from '@/types';
import useCartStore from '@/store/useCartStore';
import { formatPrice, cn } from '@/lib/utils';

interface GroceryProductCardProps {
  product: GroceryProduct;
  storeName: string;
}

export default function GroceryProductCard({ product, storeName }: GroceryProductCardProps) {
  const [quantity, setQuantity] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  function handleAdd() {
    if (!product.inStock) return;

    addItem({
      id: product.id,
      menuItem: {
        id: product.id,
        restaurantId: product.storeId,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        isAvailable: product.isAvailable,
        isPopular: false,
        isVegetarian: false,
      },
      selectedAddOns: [],
      restaurantId: product.storeId,
      restaurantName: storeName,
    });
    setQuantity((q) => q + 1);
  }

  function handleIncrement() {
    const next = quantity + 1;
    setQuantity(next);
    updateQuantity(product.id, next);
  }

  function handleDecrement() {
    if (quantity <= 1) {
      setQuantity(0);
      useCartStore.getState().removeItem(product.id);
    } else {
      setQuantity((q) => q - 1);
      updateQuantity(product.id, quantity - 1);
    }
  }

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-200 hover:shadow-md dark:bg-gray-900 dark:ring-gray-800',
        !product.inStock && 'pointer-events-none'
      )}
    >
      {!product.inStock && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          <span className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg">
            Out of Stock
          </span>
        </div>
      )}

      {hasDiscount && (
        <span className="absolute left-2 top-2 z-10 rounded-md bg-[#E23E3E] px-2 py-0.5 text-xs font-bold text-white">
          -{discountPct}%
        </span>
      )}

      <div className="relative aspect-square w-full bg-gray-50 dark:bg-gray-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h4 className="line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h4>
        <p className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
          {product.description}
        </p>
        <p className="mt-1 text-xs font-medium text-gray-400 dark:text-gray-500">
          {product.unit}
        </p>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-base font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>

          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              disabled={!product.inStock}
              className="flex items-center gap-1 rounded-lg bg-[#E23E3E] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#c73535] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart size={14} />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-2 py-1 dark:bg-gray-800">
              <button
                onClick={handleDecrement}
                className="rounded-md bg-white p-0.5 text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="min-w-[1.25rem] text-center text-sm font-semibold text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="rounded-md bg-[#E23E3E] p-0.5 text-white shadow-sm transition-colors hover:bg-[#c73535]"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
