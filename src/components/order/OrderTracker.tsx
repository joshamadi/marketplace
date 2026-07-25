'use client';

import { Phone, Package, Truck, CheckCircle } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import type { Order, OrderStatus } from '@/types';

interface OrderTrackerProps {
  order: Order;
}

const steps = [
  { status: 'pending', label: 'Pending', icon: Package },
  { status: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { status: 'preparing', label: 'Preparing', icon: Package },
  { status: 'ready', label: 'Ready', icon: Package },
  { status: 'picked_up', label: 'Picked Up', icon: Package },
  { status: 'on_the_way', label: 'On the Way', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: CheckCircle },
];

const statusOrder = steps.map((s) => s.status);

export default function OrderTracker({ order }: OrderTrackerProps) {
  const currentIndex = statusOrder.indexOf(order.status);
  const trackingSteps = order.tracking?.steps || [];

  function getTimestamp(stepStatus: string): string | null {
    const trackStep = trackingSteps.find((s) => s.status === stepStatus);
    return trackStep?.timestamp || null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Order Tracking</h2>
        <OrderStatusBadge status={order.status} size="md" />
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isPending = index > currentIndex;
            const timestamp = getTimestamp(step.status);

            return (
              <div key={step.status} className="relative flex items-start gap-4">
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-[#E23E3E] text-white'
                      : isCurrent
                      ? 'bg-[#E23E3E] text-white animate-pulse'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                  {isCompleted && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 pt-2">
                  <p
                    className={`font-medium ${
                      isPending ? 'text-gray-400' : 'text-gray-900'
                    }`}
                  >
                    {step.label}
                  </p>
                  {isCompleted && timestamp && (
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(timestamp).toLocaleTimeString('en-NG', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  )}
                  {isCurrent && (
                    <p className="text-sm text-[#E23E3E] mt-1 font-medium">
                      Current step
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 bg-gray-100 rounded-lg h-48 flex items-center justify-center">
        <p className="text-gray-500">Live tracking map</p>
      </div>

      {order.riderName && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            {order.riderImage ? (
              <img
                src={order.riderImage}
                alt={order.riderName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#E23E3E] text-white font-bold">
                {order.riderName.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{order.riderName}</p>
            <p className="text-sm text-gray-500">Your delivery rider</p>
          </div>
          {order.riderPhone && (
            <a
              href={`tel:${order.riderPhone}`}
              className="w-10 h-10 bg-[#E23E3E] rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
