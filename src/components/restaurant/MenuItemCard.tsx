'use client';

import { useState } from 'react';
import { Plus, Minus, Flame, ChevronDown, ChevronUp } from 'lucide-react';
import type { MenuItem, AddOn } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
import useCartStore from '@/store/useCartStore';

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}

export default function MenuItemCard({ item, restaurantId, restaurantName }: MenuItemCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const cartItem = items.find((i) => i.menuItem.id === item.id);
  const quantity = cartItem?.quantity ?? 0;
  const updateQuantity = useCartStore((s) => s.updateQuantity);

  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [instructions, setInstructions] = useState('');
  const [showAddOns, setShowAddOns] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const addOnTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const itemTotal = item.price + addOnTotal;

  function toggleAddOn(addOn: AddOn) {
    setSelectedAddOns((prev) =>
      prev.find((a) => a.id === addOn.id)
        ? prev.filter((a) => a.id !== addOn.id)
        : [...prev, addOn]
    );
  }

  function handleAddToCart() {
    addItem({
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      selectedAddOns,
      specialInstructions: instructions || undefined,
      restaurantId,
      restaurantName,
    });
    setSelectedAddOns([]);
    setInstructions('');
    setShowInstructions(false);
  }

  return (
    <div className="flex gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-200">
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />

        {item.isPopular && (
          <span className="absolute -left-px -top-px flex items-center gap-0.5 rounded-br-lg bg-[#E23E3E] px-1.5 py-0.5 text-[10px] font-bold text-white">
            <Flame size={10} />
            Popular
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="truncate font-bold text-gray-900">{item.name}</h4>
            <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-gray-500">
              {item.description}
            </p>
          </div>
          <span className="shrink-0 whitespace-nowrap text-base font-bold text-[#E23E3E]">
            {formatPrice(item.price)}
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {quantity === 0 ? (
            <>
              {item.addOns && item.addOns.length > 0 && (
                <button
                  onClick={() => setShowAddOns(!showAddOns)}
                  className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  Add-ons {showAddOns ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
              )}
              <button
                onClick={handleAddToCart}
                className="ml-auto rounded-lg bg-[#E23E3E] px-4 py-1.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#d63535] hover:shadow active:scale-95"
              >
                Add to Cart
              </button>
            </>
          ) : (
            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={() => updateQuantity(cartItem!.id, quantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E23E3E] text-[#E23E3E] transition-colors hover:bg-[#E23E3E]/10"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-[1.5rem] text-center text-base font-bold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(cartItem!.id, quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E23E3E] text-white shadow-sm transition-all hover:bg-[#d63535] active:scale-95"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {showAddOns && item.addOns && item.addOns.length > 0 && (
        <div className="col-span-full mt-2 w-full border-t border-gray-100 pt-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Add-ons</p>
          <div className="flex flex-wrap gap-2">
            {item.addOns.map((addOn) => {
              const selected = selectedAddOns.some((a) => a.id === addOn.id);
              return (
                <button
                  key={addOn.id}
                  onClick={() => toggleAddOn(addOn)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
                    selected
                      ? 'border-[#E23E3E] bg-[#E23E3E]/10 text-[#E23E3E]'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  )}
                >
                  {addOn.name}
                  <span className="text-gray-400">+{formatPrice(addOn.price)}</span>
                </button>
              );
            })}
          </div>
          {selectedAddOns.length > 0 && (
            <p className="mt-1.5 text-xs text-gray-500">
              Total: <span className="font-bold text-[#E23E3E]">{formatPrice(itemTotal)}</span>
            </p>
          )}
        </div>
      )}

      {showInstructions && (
        <div className="col-span-full mt-2 w-full border-t border-gray-100 pt-3">
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Special instructions (e.g. no onions, extra spicy)..."
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E]"
            rows={2}
          />
        </div>
      )}

      {quantity > 0 && (
        <div className="col-span-full w-full">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-[#E23E3E]"
          >
            {showInstructions ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {instructions ? 'Edit instructions' : 'Add special instructions'}
          </button>
        </div>
      )}
    </div>
  );
}
