'use client';

import type { OrderStatus } from '@/types';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<
  OrderStatus,
  { label: string; bgColor: string; textColor: string; dotColor: string }
> = {
  pending: {
    label: 'Pending',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    dotColor: 'bg-yellow-500',
  },
  confirmed: {
    label: 'Confirmed',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    dotColor: 'bg-blue-500',
  },
  preparing: {
    label: 'Preparing',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    dotColor: 'bg-orange-500',
  },
  ready: {
    label: 'Ready',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    dotColor: 'bg-purple-500',
  },
  picked_up: {
    label: 'Picked Up',
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-800',
    dotColor: 'bg-indigo-500',
  },
  on_the_way: {
    label: 'On the Way',
    bgColor: 'bg-cyan-100',
    textColor: 'text-cyan-800',
    dotColor: 'bg-cyan-500',
  },
  delivered: {
    label: 'Delivered',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    dotColor: 'bg-green-500',
  },
  cancelled: {
    label: 'Cancelled',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    dotColor: 'bg-red-500',
  },
};

export default function OrderStatusBadge({
  status,
  size = 'md',
}: OrderStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bgColor} ${config.textColor} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}
