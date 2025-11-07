"use client";

import { ShoppingBag } from "lucide-react";
import { mockProducts } from "@/lib/mock-products";
import { ProductCard } from "@/components/products/product-card";

export default function LadiesPage() {
  const ladiesProducts = mockProducts.filter(
    (product) => product.gender === "ladies"
  );

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary/20 via-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-secondary/30 shadow-lg mb-4">
            <ShoppingBag size={16} className="text-secondary animate-pulse" />
            <span className="bg-gradient-to-r from-secondary to-purple-500 bg-clip-text text-transparent font-semibold text-sm">
              Ladies Collection
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Shop for{" "}
            <span className="bg-gradient-to-r from-secondary to-purple-500 bg-clip-text text-transparent">
              Ladies
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our exquisite collection of women's fashion, beauty, and accessories
          </p>
        </div>

        {/* Products Grid */}
        {ladiesProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ladiesProducts.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
