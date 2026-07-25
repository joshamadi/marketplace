'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Phone, Package } from 'lucide-react';
import OrderTracker from '@/components/order/OrderTracker';
import RatingModal from '@/components/order/RatingModal';
import OrderStatusBadge from '@/components/order/OrderStatusBadge';
import useOrderStore from '@/store/useOrderStore';
import type { Order } from '@/types';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const getOrderById = useOrderStore((s) => s.getOrderById);
  const rateOrder = useOrderStore((s) => s.rateOrder);

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      const found = await getOrderById(params.id);
      setOrder(found);
      setLoading(false);
    }
    fetchOrder();
  }, [params.id, getOrderById]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#E23E3E]" />
          <p className="text-sm text-gray-500">Loading order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 px-4">
        <Package size={48} className="mb-4 text-gray-300" />
        <h2 className="mb-2 text-xl font-bold text-gray-900">Order not found</h2>
        <p className="mb-6 text-center text-gray-500">
          We couldn&apos;t find this order. It may have been removed.
        </p>
        <Link
          href="/orders"
          className="rounded-xl bg-[#E23E3E] px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
        >
          View All Orders
        </Link>
      </div>
    );
  }

  const isActive = ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'on_the_way'].includes(order.status);
  const isDelivered = order.status === 'delivered';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#E23E3E] transition-colors"
          >
            <ArrowLeft size={16} />
            All Orders
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order {order.id}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(order.createdAt).toLocaleDateString('en-NG', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <OrderStatusBadge status={order.status} size="md" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {isActive && <OrderTracker order={order} />}

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                      <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.menuItem.image || ''})` }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{item.menuItem.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.quantity}x ₦{item.menuItem.price.toLocaleString()}
                          </p>
                        </div>
                        <span className="font-semibold text-gray-900">
                          ₦{(item.menuItem.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {order.riderName && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Rider</h2>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E23E3E]/10 text-sm font-bold text-[#E23E3E]">
                    {order.riderName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{order.riderName}</p>
                    <p className="text-sm text-gray-500">Your delivery rider</p>
                  </div>
                  {order.riderPhone && (
                    <a
                      href={`tel:${order.riderPhone}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E23E3E] text-white transition-colors hover:bg-red-700"
                    >
                      <Phone size={18} />
                    </a>
                  )}
                </div>
              </div>
            )}

            {isDelivered && (
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                {order.rating ? (
                  <div className="text-center py-4">
                    <div className="flex justify-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={24}
                          className={
                            i < order.rating!
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">You rated this order</p>
                    {order.review && (
                      <p className="mt-2 text-sm text-gray-500 italic">&quot;{order.review}&quot;</p>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setShowRatingModal(true)}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 py-4 text-sm font-semibold text-gray-500 transition-all hover:border-[#E23E3E]/40 hover:text-[#E23E3E]"
                  >
                    <Star size={18} />
                    Rate This Order
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Restaurant</span>
                  <span className="font-medium text-gray-900">{order.restaurantName}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery to</span>
                  <span className="font-medium text-gray-900 text-right truncate max-w-[180px]">
                    {order.deliveryAddress}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Payment</span>
                  <span className="font-medium text-gray-900 capitalize">{order.paymentMethod}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₦{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{order.deliveryFee === 0 ? 'Free' : `₦${order.deliveryFee.toLocaleString()}`}</span>
                </div>
                {order.serviceFee > 0 && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Service Fee</span>
                    <span>₦{order.serviceFee.toLocaleString()}</span>
                  </div>
                )}
                {order.discount && order.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₦{order.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-2 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₦{order.total.toLocaleString()}</span>
                </div>
              </div>

              {order.estimatedDelivery && isActive && (
                <div className="mt-4 rounded-xl bg-[#E23E3E]/5 p-3 text-center">
                  <p className="text-xs text-gray-500">Estimated delivery</p>
                  <p className="text-sm font-bold text-[#E23E3E]">
                    {new Date(order.estimatedDelivery).toLocaleTimeString('en-NG', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showRatingModal && (
        <RatingModal
          orderId={order.id}
          restaurantName={order.restaurantName}
          onSubmit={(rating, review) => {
            rateOrder(order.id, rating, review);
            setShowRatingModal(false);
            setOrder((prev) => (prev ? { ...prev, rating, review } : prev));
          }}
        />
      )}
    </div>
  );
}
