export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  customer: {
    name: string
    email: string
    address: string
  }
  items: OrderItem[]
  total: number
  createdAt: string
}
