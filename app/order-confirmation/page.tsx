"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function OrderConfirmationPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

  return (
    <div className="container-xl py-16 md:py-24">
      <div className="text-center space-y-8 max-w-2xl mx-auto">
        <div className="flex justify-center">
          <CheckCircle size={64} className="text-success" />
        </div>

        <div>
          <h1 className="section-title mb-2">Order Confirmed</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase!
          </p>
        </div>

        <div className="card bg-accent">
          <p className="text-sm text-muted-foreground mb-2">Order Number</p>
          <p className="text-2xl font-bold font-mono">{orderNumber}</p>
        </div>

        <div className="space-y-3 text-muted-foreground">
          <p>
            We've sent a confirmation email to your inbox with order details and
            tracking information.
          </p>
          <p>Your order will be shipped within 2-3 business days.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/products" className="btn-primary">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
