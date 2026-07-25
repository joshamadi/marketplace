'use client';

import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import PromoCodeInput from './PromoCodeInput';

export default function CartSummary() {
  const router = useRouter();
  const {
    restaurantName,
    subtotal,
    deliveryFee,
    serviceFee,
    discount,
    total,
  } = useCartStore();

  const handleProceedToCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{restaurantName}</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span>₦{deliveryFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Service Fee</span>
          <span>₦{serviceFee.toLocaleString()}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₦{discount.toLocaleString()}</span>
          </div>
        )}
      </div>

      <PromoCodeInput />

      <div className="border-t border-gray-200 pt-4 mt-4 mb-6">
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={handleProceedToCheckout}
        className="w-full bg-[#E23E3E] text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
      >
        Proceed to Checkout
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
