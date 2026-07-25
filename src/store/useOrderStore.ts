import { create } from 'zustand';
import type { Order, OrderStatus, OrderStore, CartItem, MenuItem } from '@/types';
import { generateOrderId } from '@/lib/utils';

const TRACKING_STATUSES: OrderStatus[] = [
  'confirmed',
  'preparing',
  'ready',
  'picked_up',
  'on_the_way',
  'delivered',
];

function makeItem(overrides: Partial<CartItem> & { name: string; price: number; image: string; restaurantId: string; restaurantName: string }): CartItem {
  const menuItem: MenuItem = {
    id: overrides.id || 'mi_' + Math.random().toString(36).slice(2, 8),
    restaurantId: overrides.restaurantId,
    name: overrides.name,
    description: '',
    price: overrides.price,
    image: overrides.image,
    category: '',
    isAvailable: true,
    isPopular: false,
    isVegetarian: false,
  };
  return {
    id: overrides.id || 'ci_' + Math.random().toString(36).slice(2, 8),
    menuItem,
    quantity: overrides.quantity ?? 1,
    selectedAddOns: overrides.selectedAddOns ?? [],
    specialInstructions: overrides.specialInstructions,
    restaurantId: overrides.restaurantId,
    restaurantName: overrides.restaurantName,
  };
}

function createMockOrder(
  items: CartItem[],
  address: string,
  paymentMethod: string,
  restaurantName: string,
  total: number
): Order {
  return {
    id: generateOrderId(),
    items: items.map((item) => ({ ...item })),
    restaurantId: items[0]?.restaurantId || 'rest_unknown',
    restaurantName,
    restaurantImage: '',
    deliveryAddress: address,
    paymentMethod,
    status: 'confirmed' as OrderStatus,
    orderType: 'delivery',
    discount: 0,
    promoCode: null,
    subtotal: items.reduce((s, i) => s + i.menuItem.price * i.quantity, 0),
    deliveryFee: 500,
    serviceFee: 0,
    total,
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(),
    rating: undefined,
    review: undefined,
    tracking: {
      currentStep: 0,
      steps: TRACKING_STATUSES.map((status, index) => ({
        status,
        label: status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        timestamp: index === 0 ? new Date().toISOString() : null,
        description:
          index === 0
            ? 'Your order has been confirmed by the restaurant.'
            : undefined,
      })),
      riderName: 'Emeka K.',
      riderPhone: '+234 812 345 6789',
      riderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rider1',
      riderLocation: { lat: 6.4281, lng: 3.4219 },
    },
  };
}

const mockActiveOrder: Order = {
  id: generateOrderId(),
  items: [
    makeItem({
      id: 'item_1',
      name: 'Jollof Rice Special',
      price: 2500,
      quantity: 2,
      image: '/images/jollof.jpg',
      restaurantId: 'rest_1',
      restaurantName: 'Mama Cass',
    }),
  ],
  restaurantId: 'rest_1',
  restaurantName: 'Mama Cass',
  restaurantImage: '',
  deliveryAddress: '12 Admiralty Way, Lekki Phase 1, Lagos',
  paymentMethod: 'card',
  status: 'on_the_way',
  orderType: 'delivery',
  discount: 0,
  promoCode: null,
  subtotal: 5000,
  deliveryFee: 0,
  serviceFee: 250,
  total: 5250,
  createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
  estimatedDelivery: new Date(Date.now() + 20 * 60000).toISOString(),
  rating: undefined,
  review: undefined,
  tracking: {
    currentStep: 4,
    steps: TRACKING_STATUSES.map((status, index) => ({
      status,
      label: status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      timestamp:
        index <= 4
          ? new Date(Date.now() - (4 - index) * 10 * 60000).toISOString()
          : null,
      description: undefined,
    })),
    riderName: 'Emeka K.',
    riderPhone: '+234 812 345 6789',
    riderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rider1',
    riderLocation: { lat: 6.435, lng: 3.428 },
  },
};

const useOrderStore = create<OrderStore>()((set, get) => ({
  orders: [
    {
      id: 'CD-2024-0001',
      items: [
        makeItem({
          id: 'item_5',
          name: 'Pepper Soup',
          price: 1800,
          quantity: 1,
          image: '/images/peppersoup.jpg',
          restaurantId: 'rest_2',
          restaurantName: 'Buka Hut',
        }),
      ],
      restaurantId: 'rest_2',
      restaurantName: 'Buka Hut',
      restaurantImage: '',
      deliveryAddress: '5 Allen Avenue, Ikeja, Lagos',
      paymentMethod: 'wallet',
      status: 'delivered',
      orderType: 'delivery',
      discount: 0,
      promoCode: null,
      subtotal: 1800,
      deliveryFee: 500,
      serviceFee: 90,
      total: 2390,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      estimatedDelivery: new Date(Date.now() - 86400000 + 45 * 60000).toISOString(),
      deliveredAt: new Date(Date.now() - 86400000 + 38 * 60000).toISOString(),
      rating: 4,
      review: 'Delicious! Will order again.',
    },
    {
      id: 'CD-2024-0002',
      items: [
        makeItem({
          id: 'item_8',
          name: 'Fried Rice & Chicken',
          price: 3000,
          quantity: 1,
          image: '/images/friedrice.jpg',
          restaurantId: 'rest_3',
          restaurantName: 'Tastee Fried Rice',
        }),
      ],
      restaurantId: 'rest_3',
      restaurantName: 'Tastee Fried Rice',
      restaurantImage: '',
      deliveryAddress: '22 Bode Thomas, Surulere, Lagos',
      paymentMethod: 'card',
      status: 'delivered',
      orderType: 'delivery',
      discount: 0,
      promoCode: null,
      subtotal: 3000,
      deliveryFee: 500,
      serviceFee: 150,
      total: 3650,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      estimatedDelivery: new Date(Date.now() - 172800000 + 45 * 60000).toISOString(),
      deliveredAt: new Date(Date.now() - 172800000 + 42 * 60000).toISOString(),
      rating: 5,
      review: 'Amazing food, fast delivery!',
    },
  ],
  activeOrder: mockActiveOrder || null,
  isLoading: false,

  placeOrder: async (cart: { items: CartItem[]; total: number; restaurantName: string | null }, address: string, paymentMethod: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 1500));
    const order = createMockOrder(
      cart.items,
      address,
      paymentMethod,
      cart.restaurantName || 'Unknown Restaurant',
      cart.total
    );
    set((state) => ({
      orders: [order, ...state.orders],
      activeOrder: order,
      isLoading: false,
    }));

    let currentStep = 0;
    const interval = setInterval(() => {
      const { activeOrder } = get();
      if (!activeOrder || activeOrder.id !== order.id) {
        clearInterval(interval);
        return;
      }
      currentStep += 1;
      if (currentStep >= TRACKING_STATUSES.length) {
        clearInterval(interval);
        set((state) => ({
          activeOrder:
            state.activeOrder?.id === order.id ? null : state.activeOrder,
          orders: state.orders.map((o) =>
            o.id === order.id
              ? { ...o, status: 'delivered' as OrderStatus, deliveredAt: new Date().toISOString() }
              : o
          ),
        }));
        return;
      }
      const newStatus = TRACKING_STATUSES[currentStep];
      set((state) => ({
        activeOrder:
          state.activeOrder?.id === order.id
            ? {
                ...state.activeOrder,
                status: newStatus,
                tracking: state.activeOrder.tracking
                  ? {
                      ...state.activeOrder.tracking,
                      currentStep,
                      steps: state.activeOrder.tracking.steps.map((s, i) =>
                        i === currentStep
                          ? { ...s, timestamp: new Date().toISOString() }
                          : s
                      ),
                      riderLocation: state.activeOrder.tracking.riderLocation
                        ? {
                            lat: state.activeOrder.tracking.riderLocation!.lat + (Math.random() - 0.5) * 0.005,
                            lng: state.activeOrder.tracking.riderLocation!.lng + (Math.random() - 0.5) * 0.005,
                          }
                        : undefined,
                    }
                  : undefined,
              }
            : state.activeOrder,
        orders: state.orders.map((o) =>
          o.id === order.id ? { ...o, status: newStatus } : o
        ),
      }));
    }, 15000);

    return order;
  },

  getOrders: async () => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 600));
    set({ isLoading: false });
    return get().orders;
  },

  getOrderById: async (orderId: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 400));
    const order = get().orders.find((o) => o.id === orderId) || null;
    set({ isLoading: false });
    return order;
  },

  cancelOrder: async (orderId: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 800));
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status: 'cancelled' as OrderStatus } : o
      ),
      activeOrder:
        state.activeOrder?.id === orderId ? null : state.activeOrder,
      isLoading: false,
    }));
  },

  rateOrder: async (orderId: string, rating: number, review?: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 600));
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, rating, review } : o
      ),
      isLoading: false,
    }));
  },

  trackOrder: async (orderId: string) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 500));
    const order = get().orders.find((o) => o.id === orderId);
    set({ isLoading: false });
    return order?.tracking || null;
  },
}));

export default useOrderStore;
export { useOrderStore };
