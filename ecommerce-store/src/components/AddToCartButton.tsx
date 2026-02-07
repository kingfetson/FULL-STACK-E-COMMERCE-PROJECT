"use client"

import { useCartStore } from "../store/cartStore"

interface Props {
  product: {
    id: number
    name: string
    price: number
    image: string
  }
}

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore(state => state.addToCart)

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Add to Cart
    </button>
  )
}
