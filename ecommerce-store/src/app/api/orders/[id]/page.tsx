import { notFound } from "next/navigation"

interface Order {
  id: string
  customer: {
    name: string
    email: string
    address: string
  }
  items: {
    id: number
    name: string
    price: number
    quantity: number
  }[]
  total: number
  createdAt: string
}

async function getOrder(id: string): Promise<Order> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    notFound()
  }

  return res.json()
}

export default async function OrderPage({
  params,
}: {
  params: { id: string }
}) {
  const order = await getOrder(params.id)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>

      <p className="mb-2">
        <strong>Order ID:</strong> {order.id}
      </p>

      <p className="mb-2">
        <strong>Date:</strong>{" "}
        {new Date(order.createdAt).toLocaleString()}
      </p>

      <hr className="my-4" />

      <h2 className="font-bold mb-2">Customer Details</h2>
      <p>{order.customer.name}</p>
      <p>{order.customer.email}</p>
      <p>{order.customer.address}</p>

      <hr className="my-4" />

      <h2 className="font-bold mb-2">Items</h2>

      {order.items.map((item) => (
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
        <span>KES {order.total}</span>
      </div>
    </div>
  )
}
