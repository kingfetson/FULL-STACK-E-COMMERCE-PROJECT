"use client"

import { useRouter } from "next/navigation"
import { useCartStore } from "../../store/cartStore"
import { useHydrated } from "../../hooks/useHydrated"

export default function CartPage() {
  const router = useRouter()
  const hydrated = useHydrated()
  const items = useCartStore((state) => state.items)

  if (!hydrated) return null

  return (
    <div className="p-6">
      {/* cart items UI */}

      <button
        onClick={() => router.push("/checkout")}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Proceed to Checkout
      </button>
    </div>
  )
}
