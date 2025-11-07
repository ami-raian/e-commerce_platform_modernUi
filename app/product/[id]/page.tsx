"use client"

import { use, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Star, ShoppingCart } from "lucide-react"
import { mockProducts } from "@/lib/mock-products"
import { useCartStore } from "@/lib/cart-store"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = mockProducts.find((p) => p._id === id)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [promoMessage, setPromoMessage] = useState("")
  const addItem = useCartStore((state) => state.addItem)

  const promoCodes: { [key: string]: number } = {
    "SAVE5": 5,
    "SAVE10": 10,
    "SAVE15": 15,
    "WELCOME20": 20,
  }

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase()
    if (promoCodes[code]) {
      setDiscount(promoCodes[code])
      setPromoMessage(`Promo code applied! ${promoCodes[code]}% discount`)
    } else {
      setDiscount(0)
      setPromoMessage("Invalid promo code")
    }
    setTimeout(() => setPromoMessage(""), 3000)
  }

  const calculateFinalPrice = () => {
    if (discount > 0) {
      return product.price - (product.price * discount) / 100
    }
    return product.price
  }

  if (!product) {
    return (
      <div className="container-xl py-8">
        <Link href="/products" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft size={20} />
          Back to Products
        </Link>
        <div className="text-center py-16">
          <h1 className="section-title mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="container-xl py-8">
      <Link href="/products" className="flex items-center gap-2 text-primary hover:underline mb-8">
        <ArrowLeft size={20} />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-accent h-96 rounded-lg overflow-hidden flex items-center justify-center">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-balance mb-4">{product.name}</h1>
            <p className="text-xl text-muted-foreground">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}
                />
              ))}
            </div>
            <span className="text-lg font-semibold">{product.rating} / 5</span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <p className="text-muted-foreground">Price</p>
            {discount > 0 ? (
              <div className="space-y-2">
                <p className="text-2xl text-muted-foreground line-through">৳{product.price.toLocaleString('en-BD')}</p>
                <p className="text-4xl font-bold text-primary">৳{calculateFinalPrice().toLocaleString('en-BD')}</p>
                <p className="text-green-600 font-semibold">You save: ৳{(product.price - calculateFinalPrice()).toLocaleString('en-BD')} ({discount}% off)</p>
              </div>
            ) : (
              <p className="text-4xl font-bold text-primary">৳{product.price.toLocaleString('en-BD')}</p>
            )}
          </div>

          {/* Promo Code Section */}
          <div className="bg-accent/50 border border-border rounded-lg p-4 space-y-3">
            <p className="font-semibold">Have a Promo Code?</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={applyPromoCode}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className={`text-sm font-medium ${promoMessage.includes("Invalid") ? "text-red-500" : "text-green-600"}`}>
                {promoMessage}
              </p>
            )}
            <div className="pt-2 space-y-1">
              <p className="text-xs text-muted-foreground">Available promo codes:</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">SAVE5</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">SAVE10</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">SAVE15</span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">WELCOME20</span>
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">{product.stock} in stock</span>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Quantity</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                −
              </button>
              <span className="w-12 text-center text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart size={24} />
              Add to Cart
            </button>
            {addedToCart && <p className="text-center text-green-600 font-medium">Added to cart!</p>}
            <Link href="/products" className="w-full btn-secondary text-center py-4">
              Continue Shopping
            </Link>
          </div>

          {/* Product Details */}
          <div className="border-t border-border pt-6 space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Category</p>
              <p className="capitalize font-semibold">{product.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">SKU</p>
              <p className="font-mono text-sm">{product._id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
