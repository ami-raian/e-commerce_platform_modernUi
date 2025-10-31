"use client"

import type React from "react"

import { useState } from "react"
import { useCartStore } from "@/lib/cart-store"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { StripeCheckout } from "./stripe-checkout"

interface CheckoutFormProps {
  total: number
}

export function CheckoutForm({ total }: CheckoutFormProps) {
  const clearCart = useCartStore((state) => state.clearCart)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })
  const [isFormValid, setIsFormValid] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)

    const isValid =
      newFormData.firstName.trim() &&
      newFormData.lastName.trim() &&
      newFormData.email.trim() &&
      newFormData.phone.trim() &&
      newFormData.address.trim() &&
      newFormData.city.trim() &&
      newFormData.state.trim() &&
      newFormData.zipCode.trim()

    setIsFormValid(!!isValid)
  }

  const customerName = `${formData.firstName} ${formData.lastName}`

  return (
    <>
      {/* Shipping Information */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-6">Shipping Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>

          <div className="col-span-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="mt-2" />
          </div>

          <div className="col-span-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" value={formData.city} onChange={handleChange} required className="mt-2" />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" value={formData.state} onChange={handleChange} required className="mt-2" />
          </div>

          <div className="col-span-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Stripe Payment */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-6">Payment Information</h3>

        {isFormValid ? (
          <StripeCheckout amount={total} customerEmail={formData.email} customerName={customerName} />
        ) : (
          <div className="p-4 bg-accent rounded-lg border border-border text-center">
            <p className="text-muted-foreground">Please fill out all shipping information to proceed with payment</p>
          </div>
        )}
      </div>
    </>
  )
}
