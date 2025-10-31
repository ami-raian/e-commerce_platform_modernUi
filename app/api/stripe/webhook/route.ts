import { stripe } from "@/lib/stripe"
import { type NextRequest, NextResponse } from "next/server"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret || "")
  } catch (err) {
    console.error("Webhook verification failed:", err)
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 })
  }

  // Handle different event types
  switch (event.type) {
    case "payment_intent.succeeded":
      console.log("Payment succeeded:", event.data.object)
      break
    case "payment_intent.payment_failed":
      console.log("Payment failed:", event.data.object)
      break
    case "charge.refunded":
      console.log("Charge refunded:", event.data.object)
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
