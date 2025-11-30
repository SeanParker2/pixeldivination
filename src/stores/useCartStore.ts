import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  decreaseItem: (productId: number) => void; // New method
  clearCart: () => void;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId) => {
        const { items } = get();
        const existingItem = items.find((i) => i.productId === productId);
        if (existingItem) {
          set({
            items: items.map((i) =>
              i.productId === productId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...items, { productId, quantity: 1 }] });
        }
      },
      removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter((i) => i.productId !== productId) });
      },
      decreaseItem: (productId) => {
        const { items } = get();
        const existingItem = items.find((i) => i.productId === productId);
        if (existingItem) {
          if (existingItem.quantity > 1) {
             set({
               items: items.map((i) =>
                 i.productId === productId
                   ? { ...i, quantity: i.quantity - 1 }
                   : i
               ),
             });
          } else {
             set({ items: items.filter((i) => i.productId !== productId) });
          }
        }
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'pixel-cart-storage',
    }
  )
);
