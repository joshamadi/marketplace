'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, RotateCcw, MapPin } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import type { Order } from '@/types';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const itemsSummary = order.items
    .slice(0, 2)
    .map((item) => item.menuItem.name)
    .join(', ');
  const remainingCount = order.items.length - 2;

  const isActive = ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'on_the_way'].includes(order.status);
  const isDelivered = order.status === 'delivered';

  return (
    <Link href={`/orders/${order.id}`}>
      <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex gap-4">
          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={order.restaurantImage}
              alt={order.restaurantName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900 truncate">
                {order.restaurantName}
              </h3>
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>

            <p className="text-sm text-gray-500 mt-1">
              {order.items.length} items - {itemsSummary}
              {remainingCount > 0 && ` +${remainingCount} more`}
            </p>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{order.deliveryAddress}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <div>
            <OrderStatusBadge status={order.status} size="sm" />
            <p className="text-sm text-gray-500 mt-1">
              {new Date(order.createdAt).toLocaleDateString('en-NG', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-900">
              ₦{order.total.toLocaleString()}
            </span>
            {isActive && (
              <span className="text-[#E23E3E] font-medium text-sm flex items-center gap-1">
                Track Order <MapPin className="w-4 h-4" />
              </span>
            )}
            {isDelivered && (
              <span className="text-[#E23E3E] font-medium text-sm flex items-center gap-1">
                Reorder <RotateCcw className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
