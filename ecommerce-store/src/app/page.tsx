
import Image from "next/image"
import AddToCartButton from "../components/AddToCartButton"
import { Product } from "../types/product"

async function getProducts(): Promise<Product[]> {
  const res = await fetch("/api/products", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  return res.json()
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded">
          <Image src={product.image} alt={product.name} width={300} height={300} className="mb-3" />
          <h2 className="font-bold">{product.name}</h2>
          <p>KES {product.price}</p>

          <AddToCartButton product={product} />
        </div>
      ))}
    </div>
  )
}