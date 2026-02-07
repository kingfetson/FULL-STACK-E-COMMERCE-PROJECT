"use client"

import { Product } from "../types/product"
import { useCartStore } from "../store/cartStore"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className="border rounded-lg p-4 shadow flex flex-col gap-2">
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-600">KES {product.price}</p>
      <p className="text-sm">{product.description}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-black text-white py-2 rounded hover:opacity-80"
      >
        Add to Cart
      </button>
    </div>
  )
}
