"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cart-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CheckoutFormProps {
  total: number;
}

export function CheckoutForm({ total }: CheckoutFormProps) {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    const isValid =
      newFormData.firstName.trim() &&
      newFormData.lastName.trim() &&
      newFormData.email.trim() &&
      newFormData.phone.trim() &&
      newFormData.address.trim() &&
      newFormData.city.trim() &&
      newFormData.state.trim() &&
      newFormData.zipCode.trim();

    setIsFormValid(!!isValid);
  };

  const customerName = `${formData.firstName} ${formData.lastName}`;

  const mobileMoneyOptions = [
    { id: "bkash", name: "bKash", number: "01712-345678", logo: "💳" },
    { id: "nagad", name: "Nagad", number: "01812-345678", logo: "💰" },
    { id: "rocket", name: "Rocket", number: "01912-345678", logo: "🚀" },
    // { id: "sendmoney", name: "Send Money", number: "01612-345678", logo: "📱" },
  ];

  const handlePlaceOrder = () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    const paymentMethod = mobileMoneyOptions.find(
      (opt) => opt.id === selectedPayment
    );
    toast.success(
      `Order placed successfully! Please send ৳${total.toLocaleString(
        "en-BD"
      )} to ${paymentMethod?.name} number: ${paymentMethod?.number}`,
      {
        duration: 5000,
      }
    );

    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      router.push("/");
    }, 2000);
  };

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
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-2"
            />
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
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="mt-2"
            />
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

      {/* Mobile Money Payment */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-6">Payment Method</h3>

        {isFormValid ? (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Select your preferred mobile money service to complete payment
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mobileMoneyOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedPayment(option.id)}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                    selectedPayment === option.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{option.logo}</span>
                    <div className="text-left">
                      <p className="font-bold text-lg">{option.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Send Money to:
                      </p>
                      <p className="font-mono font-semibold text-primary">
                        {option.number}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedPayment && (
              <div className="bg-accent/50 border border-primary/20 rounded-lg p-6 space-y-3">
                <h4 className="font-semibold text-lg">Payment Instructions:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>
                    Select{" "}
                    {
                      mobileMoneyOptions.find(
                        (opt) => opt.id === selectedPayment
                      )?.name
                    }{" "}
                    from your mobile
                  </li>
                  <li>Choose "Send Money" option</li>
                  <li>
                    Enter the number:{" "}
                    <span className="font-mono font-bold text-foreground">
                      {
                        mobileMoneyOptions.find(
                          (opt) => opt.id === selectedPayment
                        )?.number
                      }
                    </span>
                  </li>
                  <li>
                    Enter amount:{" "}
                    <span className="font-bold text-foreground">
                      ৳{total.toLocaleString("en-BD")}
                    </span>
                  </li>
                  <li>Complete the transaction</li>
                  <li>Click "Place Order" button below</li>
                </ol>
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={orderPlaced}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {orderPlaced ? "Order Placed Successfully!" : "Place Order"}
            </button>

            <div className="text-center text-sm text-muted-foreground">
              <p>We also accept Cash on Delivery (COD)</p>
              <p>Customer support: 01712-XXXXXX</p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-accent rounded-lg border border-border text-center">
            <p className="text-muted-foreground">
              Please fill out all shipping information to proceed with payment
            </p>
          </div>
        )}
      </div>
    </>
  );
}
