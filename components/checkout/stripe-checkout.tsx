"use client"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { PaymentForm } from "./payment-form"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripeCheckoutProps {
  amount: number
  customerEmail: string
  customerName: string
  onSuccess?: () => void
}

export function StripeCheckout({ amount, customerEmail, customerName, onSuccess }: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const createPaymentIntent = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          description: `Order for ${customerName}`,
          customerEmail,
        }),
      })

      if (!response.ok) throw new Error("Failed to create payment intent")

      const data = await response.json()
      setClientSecret(data.clientSecret)
    } catch (error) {
      console.error("Error creating payment intent:", error)
      alert("Failed to initialize payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!clientSecret) {
    return (
      <button onClick={createPaymentIntent} disabled={isLoading} className="w-full btn-primary py-3 text-lg">
        {isLoading ? "Initializing..." : `Pay with Card - $${amount.toFixed(2)}`}
      </button>
    )
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#2d5a3d",
        colorText: "#1a1a1a",
        borderRadius: "0.625rem",
      },
    },
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm amount={amount} onSuccess={onSuccess} />
    </Elements>
  )
}
