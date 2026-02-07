"use client"

import { Suspense } from "react"

function SuccessContent({
  searchParams,
}: {
  searchParams: { orderId?: string }
}) {
  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Order Placed!</h1>
      <p>Your order ID:</p>
      <p className="font-mono mt-2">{searchParams.orderId}</p>
      <a
        href="/"
        className="mt-6 bg-black text-white px-6 py-3 rounded inline-block"
      >
        Continue Shopping
      </a>
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
