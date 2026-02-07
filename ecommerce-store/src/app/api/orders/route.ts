import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const data = await req.json()
  const { customer, items, total } = data

  const order = await prisma.order.create({
    data: {
      total,
      customer: {
        connectOrCreate: {
          where: { email: customer.email },
          create: customer,
        },
      },
      items: {
        create: items.map((item: any) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
    include: {
      customer: true,
      items: true,
    },
  })

  return NextResponse.json(order)
}

export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      items: true,
    },
  })
  return NextResponse.json(orders)
}
