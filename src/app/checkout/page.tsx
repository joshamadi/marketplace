'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  CreditCard,
  Banknote,
  Tag,
  X,
  Check,
  ShoppingCart,
  ArrowLeft,
  Truck,
  Store as StoreIcon,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import useCartStore from '@/store/useCartStore';
import useOrderStore from '@/store/useOrderStore';
import useLocationStore from '@/store/useLocationStore';
import { formatPrice, cn } from '@/lib/utils';
import Footer from '@/components/layout/Footer';
import type { Address } from '@/types';

const SAVED_ADDRESSES: Address[] = [
  {
    id: 'addr_1',
    label: 'Home',
    address: '15 Admiralty Way, Lekki Phase 1, Lagos',
    latitude: 6.4475,
    longitude: 3.4364,
    isDefault: true,
    cityId: 'lagos',
    areaId: 'lekki',
  },
  {
    id: 'addr_2',
    label: 'Work',
    address: '22 Allen Avenue, Ikeja, Lagos',
    latitude: 6.6002,
    longitude: 3.3547,
    isDefault: false,
    cityId: 'lagos',
    areaId: 'ikeja',
  },
];

type OrderType = 'delivery' | 'pickup';
type PaymentMethod = 'card' | 'pay_on_delivery';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal);
  const deliveryFee = useCartStore((s) => s.deliveryFee);
  const serviceFee = useCartStore((s) => s.serviceFee);
  const discount = useCartStore((s) => s.discount);
  const total = useCartStore((s) => s.total);
  const promoCode = useCartStore((s) => s.promoCode);
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const removePromoCode = useCartStore((s) => s.removePromoCode);
  const clearCart = useCartStore((s) => s.clearCart);
  const restaurantName = useCartStore((s) => s.restaurantName);
  const placeOrder = useOrderStore((s) => s.placeOrder);
  const isPlacingOrder = useOrderStore((s) => s.isLoading);

  const [selectedAddressId, setSelectedAddressId] = useState(
    SAVED_ADDRESSES.find((a) => a.isDefault)?.id || SAVED_ADDRESSES[0]?.id || ''
  );
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const selectedAddress = SAVED_ADDRESSES.find((a) => a.id === selectedAddressId);

  function handleApplyPromo() {
    setPromoError('');
    setPromoSuccess('');
    if (!promoInput.trim()) return;
    const success = applyPromoCode(promoInput.trim());
    if (success) {
      setPromoSuccess('Promo code applied!');
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code.');
    }
  }

  async function handlePlaceOrder() {
    if (items.length === 0) return;

    setIsOrderPlaced(true);
    const address = orderType === 'delivery'
      ? selectedAddress?.address || 'No address selected'
      : 'Pickup from restaurant';

    const order = await placeOrder(
      { items, total, restaurantName },
      address,
      paymentMethod
    );
    clearCart();
    setTimeout(() => {
      router.push(`/orders/${order.id}`);
    }, 1500);
  }

  if (items.length === 0 && !isOrderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Your cart is empty</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Add some items before checking out.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-[#E23E3E] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#d33232]"
          >
            Browse Restaurants
          </Link>
        </div>
      </div>
    );
  }

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Order Placed!</h2>
          <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
            Your order has been placed successfully. Redirecting to order tracking...
          </p>
          <Loader2 size={24} className="mx-auto animate-spin text-[#E23E3E]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-6 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Checkout</h1>
        </div>

        <div className="flex gap-8">
          {/* Main Form */}
          <div className="min-w-0 flex-1 space-y-6">
            {/* Order Type */}
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Order Type
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setOrderType('delivery')}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border-2 p-4 text-left transition',
                    orderType === 'delivery'
                      ? 'border-[#E23E3E] bg-[#E23E3E]/5'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                  )}
                >
                  <Truck
                    size={20}
                    className={cn(
                      orderType === 'delivery' ? 'text-[#E23E3E]' : 'text-gray-400'
                    )}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Delivery</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">To your door</p>
                  </div>
                  {orderType === 'delivery' && (
                    <Check size={16} className="ml-auto text-[#E23E3E]" />
                  )}
                </button>
                <button
                  onClick={() => setOrderType('pickup')}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border-2 p-4 text-left transition',
                    orderType === 'pickup'
                      ? 'border-[#E23E3E] bg-[#E23E3E]/5'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                  )}
                >
                  <StoreIcon
                    size={20}
                    className={cn(
                      orderType === 'pickup' ? 'text-[#E23E3E]' : 'text-gray-400'
                    )}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Pickup</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">From restaurant</p>
                  </div>
                  {orderType === 'pickup' && (
                    <Check size={16} className="ml-auto text-[#E23E3E]" />
                  )}
                </button>
              </div>
            </div>

            {/* Delivery Address */}
            {orderType === 'delivery' && (
              <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Delivery Address
                </h2>
                <div className="space-y-2">
                  {SAVED_ADDRESSES.map((addr) => (
                    <button
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition',
                        selectedAddressId === addr.id
                          ? 'border-[#E23E3E] bg-[#E23E3E]/5'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                      )}
                    >
                      <MapPin
                        size={18}
                        className={cn(
                          selectedAddressId === addr.id ? 'text-[#E23E3E]' : 'text-gray-400'
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {addr.label}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                          {addr.address}
                        </p>
                      </div>
                      {selectedAddressId === addr.id && (
                        <Check size={16} className="shrink-0 text-[#E23E3E]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Payment Method
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition',
                    paymentMethod === 'card'
                      ? 'border-[#E23E3E] bg-[#E23E3E]/5'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                  )}
                >
                  <CreditCard
                    size={18}
                    className={cn(paymentMethod === 'card' ? 'text-[#E23E3E]' : 'text-gray-400')}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Card Payment
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Visa, Mastercard, Verve
                    </p>
                  </div>
                  {paymentMethod === 'card' && <Check size={16} className="text-[#E23E3E]" />}
                </button>
                <button
                  onClick={() => setPaymentMethod('pay_on_delivery')}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition',
                    paymentMethod === 'pay_on_delivery'
                      ? 'border-[#E23E3E] bg-[#E23E3E]/5'
                      : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
                  )}
                >
                  <Banknote
                    size={18}
                    className={cn(
                      paymentMethod === 'pay_on_delivery' ? 'text-[#E23E3E]' : 'text-gray-400'
                    )}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Pay on Delivery
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Cash or POS at your doorstep
                    </p>
                  </div>
                  {paymentMethod === 'pay_on_delivery' && (
                    <Check size={16} className="text-[#E23E3E]" />
                  )}
                </button>
              </div>
            </div>

            {/* Promo Code */}
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Promo Code
              </h2>
              {promoCode ? (
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-green-600 dark:text-green-400" />
                    <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                      {promoCode}
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-500">Applied</span>
                  </div>
                  <button
                    onClick={() => {
                      removePromoCode();
                      setPromoSuccess('');
                    }}
                    className="rounded p-1 text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/40"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value.toUpperCase());
                      setPromoError('');
                    }}
                    placeholder="Enter promo code"
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#E23E3E] focus:outline-none focus:ring-1 focus:ring-[#E23E3E] dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && (
                <p className="mt-2 text-xs text-red-500">{promoError}</p>
              )}
              {promoSuccess && (
                <p className="mt-2 text-xs text-green-600">{promoSuccess}</p>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="hidden w-80 shrink-0 lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Order Summary
                </h2>
                <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                  from <span className="font-semibold text-gray-900 dark:text-white">{restaurantName}</span>
                </p>

                <div className="max-h-48 space-y-2 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {item.menuItem.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatPrice(item.menuItem.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Service Fee</span>
                    <span>{formatPrice(serviceFee)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900 dark:border-gray-800 dark:text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder || items.length === 0}
                className="w-full rounded-xl bg-[#E23E3E] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#d33232] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPlacingOrder ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    Placing Order...
                  </span>
                ) : (
                  `Place Order · ${formatPrice(total)}`
                )}
              </button>

              <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                By placing this order you agree to our{' '}
                <span className="text-[#E23E3E]">Terms of Service</span>
              </p>
            </div>
          </aside>
        </div>

        {/* Mobile Order Summary */}
        <div className="mt-6 rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 lg:hidden dark:bg-gray-900 dark:ring-gray-800">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Order Summary
          </h2>
          <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
            from <span className="font-semibold text-gray-900 dark:text-white">{restaurantName}</span>
          </p>

          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {item.menuItem.name} × {item.quantity}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatPrice(item.menuItem.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 dark:border-gray-800">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Service Fee</span>
              <span>{formatPrice(serviceFee)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900 dark:border-gray-800 dark:text-white">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder || items.length === 0}
            className="mt-4 w-full rounded-xl bg-[#E23E3E] py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#d33232] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPlacingOrder ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Placing Order...
              </span>
            ) : (
              `Place Order · ${formatPrice(total)}`
            )}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
