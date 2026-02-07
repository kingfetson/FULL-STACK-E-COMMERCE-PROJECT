"use client"

import { useCartStore } from "../../store/cartStore"
import { useHydrated } from "../../hooks/useHydrated"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CheckoutPage() {
  const hydrated = useHydrated()
  const router = useRouter()
  const { items, clearCart } = useCartStore()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")

  if (!hydrated) return null

  if (items.length === 0) {
    return (
      <div className="p-6">
        <p>Your cart is empty.</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 underline"
        >
          Go back to shop
        </button>
      </div>
    )
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleSubmit = async () => {
  await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer: { name, email, address },
      items,
    }),
  })
  //const handleSubmit = () => {
    // later: send to backend
    //console.log({
      //customer: { name, email, address },
     // items,
     // total,
    //})

    clearCart()
   router.push(`/orders/${order.id}`)
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      
      {/* CUSTOMER DETAILS */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-3 mt-4 rounded"
        >
          Place Order
        </button>
      </div>

      {/* ORDER SUMMARY */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        {items.map(item => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>KES {item.price * item.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between font-bold mt-4">
          <span>Total</span>
          <span>KES {total}</span>
        </div>
      </div>
    </div>
  )
}
