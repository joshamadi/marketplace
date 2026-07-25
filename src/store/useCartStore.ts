import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, CartStore } from '@/types';

const SERVICE_FEE_RATE = 0.05;
const DELIVERY_FEE = 500;

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      restaurantName: '',
      subtotal: 0,
      deliveryFee: DELIVERY_FEE,
      serviceFee: 0,
      discount: 0,
      total: 0,
      promoCode: null,
      promoDiscount: 0,

      addItem: (item: Omit<CartItem, 'quantity'>) => {
        const state = get();
        if (state.restaurantId && state.restaurantId !== item.restaurantId) {
          const confirmed = window.confirm(
            `Your cart contains items from "${state.restaurantName}". Adding items from "${item.restaurantName}" will clear your current cart. Continue?`
          );
          if (!confirmed) return;
          set({
            items: [],
            restaurantId: null,
            restaurantName: '',
            promoCode: null,
            promoDiscount: 0,
            discount: 0,
          });
        }

        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
          set((state) => ({
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            restaurantId: item.restaurantId,
            restaurantName: item.restaurantName,
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
            restaurantId: item.restaurantId,
            restaurantName: item.restaurantName,
          }));
        }
        get().recalculateTotals();
      },

      removeItem: (itemId: string) => {
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== itemId);
          return {
            items: newItems,
            restaurantId: newItems.length === 0 ? null : state.restaurantId,
            restaurantName: newItems.length === 0 ? '' : state.restaurantName,
          };
        });
        get().recalculateTotals();
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        }));
        get().recalculateTotals();
      },

      clearCart: () => {
        set({
          items: [],
          restaurantId: null,
          restaurantName: '',
          subtotal: 0,
          deliveryFee: DELIVERY_FEE,
          serviceFee: 0,
          discount: 0,
          total: 0,
          promoCode: null,
          promoDiscount: 0,
        });
      },

      applyPromoCode: (code: string) => {
        const promos: Record<string, number> = {
          CHOW10: 10,
          CHOW20: 20,
          FIRSTORDER: 30,
          FREEDEL: 500,
        };
        const discount = promos[code.toUpperCase()];
        if (discount) {
          set({ promoCode: code.toUpperCase(), promoDiscount: discount });
          get().recalculateTotals();
          return true;
        }
        return false;
      },

      removePromoCode: () => {
        set({ promoCode: null, promoDiscount: 0, discount: 0 });
        get().recalculateTotals();
      },

      recalculateTotals: () => {
        const state = get();
        const subtotal = state.items.reduce(
          (sum, item) => sum + item.menuItem.price * item.quantity,
          0
        );
        const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);
        const deliveryFee = subtotal >= 2000 ? 0 : DELIVERY_FEE;
        const discount =
          state.promoCode === 'FREEDEL'
            ? deliveryFee
            : state.promoDiscount > 0
            ? Math.round((subtotal * state.promoDiscount) / 100)
            : 0;
        const total = subtotal + serviceFee + deliveryFee - discount;
        set({ subtotal, serviceFee, deliveryFee, discount, total: Math.max(total, 0) });
      },
    }),
    {
      name: 'chowdeck-cart',
    }
  )
);

export default useCartStore;
export { useCartStore };
