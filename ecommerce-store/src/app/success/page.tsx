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
    </div>
  )
}

export default function SuccessPage({
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


