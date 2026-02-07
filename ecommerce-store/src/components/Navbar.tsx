"use client"

import Link from "next/link"
import { useCartStore } from "@/store/cartStore"
import { useHydrated } from "@/hooks/useHydrated"

export default function Navbar() {
  const hydrated = useHydrated()
  const items = useCartStore(state => state.items)

  if (!hydrated) return null

  return (
    <nav className="flex justify-between p-4 border-b">
      <Link href="/">Shop</Link>
      <Link href="/cart">Cart ({items.length})</Link>
    </nav>
  )
}
