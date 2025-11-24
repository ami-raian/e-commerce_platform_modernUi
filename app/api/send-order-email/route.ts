import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/emails/order-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface OrderEmailData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  cartItems: CartItem[];
  subtotal: number;
  promoDiscount: number;
  appliedPromoCode?: string;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentNumber: string;
}

export async function POST(req: NextRequest) {
  try {
    const orderData: OrderEmailData = await req.json();

    // Validate required fields
    if (!orderData.customerName || !orderData.email || !orderData.cartItems) {
      return NextResponse.json(
        { error: "Missing required order information" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (
      !process.env.RESEND_API_KEY ||
      process.env.RESEND_API_KEY === "your_resend_api_key_here"
    ) {
      console.error("Resend API key is not configured");
      return NextResponse.json(
        { error: "Email service not configured. Please contact support." },
        { status: 500 }
      );
    }

    const orderDate = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send email to admin (marqenbd@gmail.com)
    const adminEmailResult = await resend.emails.send({
      from: "E-Commerce Store <onboarding@resend.dev>", // Change this to your verified domain
      to: ["marqenbd@gmail.com"],
      subject: `New Order from ${orderData.customerName}`,
      react: OrderConfirmationEmail({
        ...orderData,
        orderDate,
      }),
    });

    // Send email to customer
    const customerEmailResult = await resend.emails.send({
      from: "E-Commerce Store <onboarding@resend.dev>", // Change this to your verified domain
      to: [orderData.email],
      subject: "Order Confirmation - Thank you for your order!",
      react: OrderConfirmationEmail({
        ...orderData,
        orderDate,
      }),
    });

    console.log("Admin email sent:", adminEmailResult);
    console.log("Customer email sent:", customerEmailResult);

    return NextResponse.json(
      {
        success: true,
        message: "Order confirmation emails sent successfully",
        adminEmailId: adminEmailResult.data?.id,
        customerEmailId: customerEmailResult.data?.id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error sending order email:", error);
    return NextResponse.json(
      {
        error: "Failed to send order confirmation email",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
