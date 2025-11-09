// Database configuration and utilities
// MongoDB connection will be set up via environment variables

export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  _id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  promoCode?: string;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromoCode {
  _id: string;
  code: string;
  discount: number;
  discountType: "percentage" | "fixed";
  expiresAt: Date;
  usedCount: number;
  maxUses?: number;
  minOrderAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlashSale {
  _id: string;
  name: string;
  productIds: string[];
  discount: number;
  startTime: Date;
  endTime: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
