"use client"

import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
}

export function ProductCard({ id, name, price, image, category, rating }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      productId: id,
      name,
      price,
      quantity: 1,
      image,
    })
  }

  return (
    <Link href={`/product/${id}`} className="group cursor-pointer">
      <div className="card overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="bg-accent h-48 flex items-center justify-center overflow-hidden rounded-lg mb-4 relative">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2">{name}</h3>

          <div className="flex items-center gap-1 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(rating) ? "fill-primary text-primary" : "text-border"}
                />
              ))}
            </div>
            <span className="text-sm text-muted">({rating})</span>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-primary font-bold text-lg">${price.toFixed(2)}</span>
            <button
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart()
              }}
              className="p-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
