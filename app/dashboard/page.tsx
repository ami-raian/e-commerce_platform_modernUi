"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/auth-store"
import { useCartStore } from "@/lib/cart-store"
import { motion } from "framer-motion"
import { LogOut, ShoppingBag, User } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  date: string
  total: number
  items: number
  status: "pending" | "completed" | "shipped"
}

export default function UserDashboard() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const cartItems = useCartStore((state) => state.items)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      total: 299.99,
      items: 3,
      status: "completed",
    },
    {
      id: "ORD-002",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      total: 149.99,
      items: 2,
      status: "shipped",
    },
  ])

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return null
  }

  const isAdmin = user.role === "admin"

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-serif font-bold text-primary">Dashboard</h1>
              <p className="text-muted mt-2">Welcome, {user.name}</p>
            </div>
            <div className="flex gap-2">
              {isAdmin && (
                <Link href="/admin" className="btn-secondary">
                  Admin Panel
                </Link>
              )}
              <button onClick={handleLogout} className="btn-primary flex items-center gap-2">
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-lg text-white">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <p className="text-muted text-sm">Total Orders</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-lg text-white">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <p className="text-muted text-sm">Cart Items</p>
                  <p className="text-2xl font-bold">{cartItems.length}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-card border border-border rounded-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-lg text-white">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-muted text-sm">Account Type</p>
                  <p className="text-2xl font-bold capitalize">{user.role}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Profile Information */}
          <motion.div
            className="bg-card border border-border rounded-lg p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-serif font-bold mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-muted text-sm">Full Name</p>
                <p className="text-lg font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-muted text-sm">Email</p>
                <p className="text-lg font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-muted text-sm">Member Since</p>
                <p className="text-lg font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted text-sm">Account Status</p>
                <p className="text-lg font-medium text-green-600">Active</p>
              </div>
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            className="bg-card border border-border rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-serif font-bold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Items</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Total</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.id} className="border-t border-border hover:bg-accent transition-colors">
                        <td className="px-6 py-4">{order.id}</td>
                        <td className="px-6 py-4">{order.date}</td>
                        <td className="px-6 py-4">{order.items}</td>
                        <td className="px-6 py-4 font-semibold">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-muted">
                        No orders yet.{" "}
                        <Link href="/products" className="text-primary hover:underline">
                          Start shopping
                        </Link>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
