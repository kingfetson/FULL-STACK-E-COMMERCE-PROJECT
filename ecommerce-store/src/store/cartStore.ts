import { create } from "zustand"
import { persist } from "zustand/middleware"
import { CartItem } from "../types/cart"
import { Product } from "../types/product"

interface CartState {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  increaseQty: (id: number) => void
  decreaseQty: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.id === product.id
          )

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }

          return {
            items: [...state.items, { ...product, quantity: 1 }],
          }
        }),

      removeFromCart: (id: string | number) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== String(id)),
        })),

      increaseQty: (id: string | number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === String(id)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseQty: (id: string | number) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === String(id)
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
)
