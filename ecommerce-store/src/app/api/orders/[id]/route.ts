import { NextResponse } from "next/server"
import { orders } from "@/lib/orders"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const order = orders.find((o) => o.id === params.id)

  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(order)
}
