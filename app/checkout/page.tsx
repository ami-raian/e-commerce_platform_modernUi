"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { usePromoStore } from "@/lib/promo-store"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { PromoInput } from "@/components/promo/promo-input"

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const items = useCartStore((state) => state.items)
  const getTotal = useCartStore((state) => state.getTotal)
  const appliedCode = usePromoStore((state) => state.appliedCode)
  const calculateDiscount = usePromoStore((state) => state.calculateDiscount)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <div className="container-xl py-8">
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">Your cart is empty</p>
          <Link href="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = getTotal()
  const promoDiscount = calculateDiscount(subtotal)
  const tax = (subtotal - promoDiscount) * 0.1
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal - promoDiscount + tax + shipping

  return (
    <div className="container-xl py-8">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/cart" className="flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft size={20} />
          Back to Cart
        </Link>
      </div>

      <h1 className="section-title mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PromoInput />
          <CheckoutForm total={total} />
        </div>

        {/* Order Summary */}
        <div className="card h-fit sticky top-24">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between">
                <span className="text-muted-foreground">
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-6 pb-6 border-b border-border">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            {appliedCode && promoDiscount > 0 && (
              <div className="flex justify-between text-success">
                <span className="text-muted-foreground">Discount ({appliedCode})</span>
                <span className="font-medium">-${promoDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
          </div>

          <div className="flex justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
