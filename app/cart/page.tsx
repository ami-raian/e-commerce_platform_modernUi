"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { usePromoStore } from "@/lib/promo-store"
import { CartItemComponent } from "@/components/cart/cart-item"
import { PromoInput } from "@/components/promo/promo-input"

export default function CartPage() {
  const [mounted, setMounted] = useState(false)
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotal = useCartStore((state) => state.getTotal)
  const appliedCode = usePromoStore((state) => state.appliedCode)
  const calculateDiscount = usePromoStore((state) => state.calculateDiscount)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const subtotal = getTotal()
  const promoDiscount = calculateDiscount(subtotal)
  const tax = (subtotal - promoDiscount) * 0.1
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal - promoDiscount + tax + shipping

  return (
    <div className="container-xl py-8">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/products" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft size={20} />
          Back to Products
        </Link>
      </div>

      <h1 className="section-title mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
          <Link href="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemComponent
                key={item.productId}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Sidebar with Promo and Summary */}
          <div className="space-y-4">
            <PromoInput />

            {/* Order Summary */}
            <div className="card h-fit">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">৳{subtotal.toLocaleString('en-BD')}</span>
                </div>

                {appliedCode && promoDiscount > 0 && (
                  <div className="flex justify-between text-success">
                    <span className="text-muted-foreground">Promo Discount ({appliedCode})</span>
                    <span className="font-medium">-৳{promoDiscount.toLocaleString('en-BD')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">৳{tax.toLocaleString('en-BD')}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `৳${shipping.toLocaleString('en-BD')}`}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold text-primary">৳{total.toLocaleString('en-BD')}</span>
              </div>

              <Link href="/checkout" className="btn-primary w-full text-center block mb-3">
                Proceed to Checkout
              </Link>

              <button onClick={clearCart} className="w-full btn-secondary">
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
