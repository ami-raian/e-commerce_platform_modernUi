"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CategoriesPage() {
  const categories = [
    {
      name: "Electronics",
      description: "Premium tech gadgets and devices",
      icon: "📱",
      href: "/products?category=electronics",
      color: "bg-blue-100",
    },
    {
      name: "Fashion",
      description: "Trendy clothing and accessories",
      icon: "👗",
      href: "/products?category=fashion",
      color: "bg-pink-100",
    },
    {
      name: "Home",
      description: "Home decor and furniture",
      icon: "🏠",
      href: "/products?category=home",
      color: "bg-amber-100",
    },
    {
      name: "Beauty",
      description: "Skincare and cosmetics",
      icon: "✨",
      href: "/products?category=beauty",
      color: "bg-purple-100",
    },
  ]

  return (
    <div className="container-xl py-16">
      <h1 className="section-title mb-4">Shop by Category</h1>
      <p className="text-lg text-muted mb-12">Browse our collection by category</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <div
              className={`${category.color} rounded-lg p-8 h-full cursor-pointer hover:shadow-lg transition-shadow group`}
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                Shop Now <ArrowRight size={18} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
