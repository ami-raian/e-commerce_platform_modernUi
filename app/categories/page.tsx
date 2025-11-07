"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  // Main Categories
  const mainCategories = [
    {
      name: "Gents",
      description: "Men's fashion, accessories & electronics",
      icon: "👔",
      href: "/gents",
      color: "bg-linear-to-br from-primary/20 to-blue-500/20",
      featured: true,
    },
    {
      name: "Ladies",
      description: "Women's fashion, beauty & accessories",
      icon: "👗",
      href: "/ladies",
      color: "bg-linear-to-br from-secondary/20 to-pink-500/20",
      featured: true,
    },
  ];

  // Other Categories
  const otherCategories = [
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
      icon: "👠",
      href: "/products?category=fashion",
      color: "bg-pink-100",
    },
    {
      name: "Beauty",
      description: "Skincare and cosmetics",
      icon: "✨",
      href: "/products?category=beauty",
      color: "bg-purple-100",
    },
    {
      name: "Accessories",
      description: "Bags, watches, jewelry & more",
      icon: "💼",
      href: "/products?category=accessories",
      color: "bg-amber-100",
    },
    {
      name: "Home",
      description: "Home decor and furniture",
      icon: "🏠",
      href: "/products?category=home",
      color: "bg-green-100",
    },
  ];

  return (
    <div className="container-xl py-16">
      <h1 className="section-title mb-4">Shop by Category</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Browse our collection by category
      </p>

      {/* Main Categories - Gents & Ladies */}
      <div className="mb-12">
        <h2 className="text-2xl font-serif font-bold mb-6 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Main Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainCategories.map((category) => (
            <Link key={category.name} href={category.href}>
              <div
                className={`${category.color} border-2 border-primary/20 rounded-2xl p-10 h-full cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 group`}
              >
                <div className="text-6xl mb-6">{category.icon}</div>
                <h3 className="text-3xl font-bold mb-3 text-foreground">
                  {category.name}
                </h3>
                <p className="text-base text-muted-foreground mb-6">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all text-lg">
                  Explore Collection <ArrowRight size={24} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Other Categories */}
      <div>
        <h2 className="text-2xl font-serif font-bold mb-6">Browse by Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {otherCategories.map((category) => (
            <Link key={category.name} href={category.href}>
              <div
                className={`${category.color} rounded-lg p-6 h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 group`}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all text-gray-700 text-sm">
                  Shop Now <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
