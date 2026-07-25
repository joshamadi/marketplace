import { create } from 'zustand';
import type { LocationStore } from '@/types';

const useLocationStore = create<LocationStore>()((set) => ({
  selectedCity: 'Lagos',
  selectedArea: 'Lekki',
  deliveryAddress: null,
  orderType: 'delivery',

  setCity: (city: string) => set({ selectedCity: city, selectedArea: '' }),
  setArea: (area: string) => set({ selectedArea: area }),
  setDeliveryAddress: (address) => set({ deliveryAddress: address }),
  setOrderType: (type: 'delivery' | 'pickup') => set({ orderType: type }),
}));

export default useLocationStore;
export { useLocationStore };
