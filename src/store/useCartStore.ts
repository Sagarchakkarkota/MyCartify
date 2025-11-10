import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
type CartItem = {
  id: number | string;
  title: string;
  price: number;
  qty: number;
  image?: string;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem, qty?: number) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  updateQty: (id: string | number, qty: number) => void;
  total: () => number;
};
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (item, qty = 1) =>
        set(state => {
          const existingItem = state.items.find(i => i.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }

          return { items: [...state.items, { ...item, qty }] };
        }),
      removeFromCart: id =>
        set(({ items }) => ({ items: items.filter(i => i.id !== id) })),
      clearCart: () => set({ items: [] }),
      updateQty: (id, qty) =>
        set(({ items }) => ({
          items: items.map(i => (i.id === id ? { ...i, qty } : i)),
        })),
      total: () =>
        get()?.items?.reduce((sum, item) => sum + item.price * item.qty, 0),
    }),
    {
      name: 'mycartify-cart', // storage key
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
