import { Order } from "../types/order"
import Link from "next/link"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { notFound } from "next/navigation"

// Fetch orders from API
async function getOrders(): Promise<Order[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("Failed to fetch orders")
  return res.json()
}

export default async function AdminOrdersPage() {
  // Protect page
  const session = await getServerSession(authOptions)
  if (!session || session.user?.email !== "admin@test.com") {
    notFound()
  }

  // ✅ Fetch orders
  const orders = await getOrders()

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Orders Dashboard</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Order ID</th>
            <th className="text-left p-2">Customer</th>
            <th className="text-left p-2">Total</th>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b hover:bg-gray-50">
              <td className="p-2 font-mono">{order.id}</td>
              <td className="p-2">{order.customer.name}</td>
              <td className="p-2">KES {order.total}</td>
              <td className="p-2">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="p-2">
                <Link
                  href={`/orders/${order.id}`}
                  className="text-blue-600 underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
