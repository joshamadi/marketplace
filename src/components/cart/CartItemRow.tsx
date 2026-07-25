'use client';

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import type { CartItem } from '@/types';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image
          src={item.menuItem.image}
          alt={item.menuItem.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 truncate">{item.menuItem.name}</h3>
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {item.selectedAddOns && item.selectedAddOns.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            Add-ons: {item.selectedAddOns.map(a => a.name).join(', ')}
          </p>
        )}

        {item.specialInstructions && (
          <p className="text-sm text-gray-500 mt-1 italic">
            &quot;{item.specialInstructions}&quot;
          </p>
        )}

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#E23E3E] transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-medium text-gray-900 w-6 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#E23E3E] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">
              ₦{item.menuItem.price.toLocaleString()} each
            </p>
            <p className="font-semibold text-[#E23E3E]">
              ₦{(item.menuItem.price * item.quantity).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
