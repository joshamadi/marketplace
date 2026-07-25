'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { promos } from '@/data/promos';

export default function PromoCodeInput() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { applyPromoCode, promoCode, removePromoCode } = useCartStore();

  const handleApply = () => {
    if (!code.trim()) {
      setMessage({ type: 'error', text: 'Please enter a promo code' });
      return;
    }

    const promo = promos.find(
      (p) => p.code.toLowerCase() === code.toLowerCase() && p.isActive
    );

    if (promo) {
      applyPromoCode(promo.code);
      setMessage({ type: 'success', text: `Promo "${promo.code}" applied!` });
      setCode('');
    } else {
      setMessage({ type: 'error', text: 'Invalid or expired promo code' });
    }
  };

  if (promoCode) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
        <div>
          <p className="font-medium text-green-800">{promoCode}</p>
          <p className="text-sm text-green-600">
            Discount applied
          </p>
        </div>
        <button
          onClick={removePromoCode}
          className="text-green-600 hover:text-green-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setMessage(null);
          }}
          placeholder="Enter promo code"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E23E3E]"
        />
        <button
          onClick={handleApply}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Apply
        </button>
      </div>
      {message && (
        <p
          className={`text-sm mt-2 ${
            message.type === 'success' ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
