import { stripe } from "@/lib/stripe"
import { type NextRequest, NextResponse } from "next/server"

interface PaymentIntentRequest {
  amount: number
  description?: string
  customerEmail?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: PaymentIntentRequest = await request.json()

    if (!body.amount || body.amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(body.amount * 100),
      currency: "usd",
      description: body.description,
      receipt_email: body.customerEmail,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("Payment Intent Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create payment intent" },
      { status: 500 },
    )
  }
}
