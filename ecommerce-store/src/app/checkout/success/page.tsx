"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"

function SuccessContent({
  searchParams,
}: {
  searchParams: { orderId?: string }
}) {
  const router = useRouter()

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Order Placed!</h1>

      {searchParams.orderId && (
        <>
          <p className="mb-2">Your order ID:</p>
          <p className="font-mono mb-4">{searchParams.orderId}</p>
        </>
      )}

      <p>Your payment was successful.</p>

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-black text-white px-6 py-3 rounded"
      >
        Continue Shopping
      </button>
    </div>
  )
}

export default function CheckoutSuccess({
  searchParams,
}: {
  searchParams: { orderId?: string }
}) {
  return (
    <Suspense>
      <SuccessContent searchParams={searchParams} />
    </Suspense>
  )
}
