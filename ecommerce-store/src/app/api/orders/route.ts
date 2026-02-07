import { NextResponse } from "next/server"
import { orders } from "../lib/orders"
import { Order } from "../types/order"
import { randomUUID } from "crypto"


function getOrderById(id: string, orders: any[]) {
  return orders.find((order) => order.id === id)
}
export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (
      !body.customer?.name ||
      !body.customer?.email ||
      !body.customer?.address ||
      !body.items?.length
    ) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      )
    }

    const total = body.items.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    )

    const newOrder: Order = {
      id: randomUUID(),
      customer: body.customer,
      items: body.items,
      total,
      createdAt: new Date().toISOString(),
    }

    orders.push(newOrder)

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(orders)
}
