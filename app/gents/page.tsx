"use client";

import { ShoppingBag } from "lucide-react";
import { mockProducts } from "@/lib/mock-products";
import { ProductCard } from "@/components/products/product-card";

export default function GentsPage() {
  const gentsProducts = mockProducts.filter(
    (product) => product.gender === "gents"
  );

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 via-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full border border-primary/30 shadow-lg mb-4">
            <ShoppingBag size={16} className="text-primary animate-pulse" />
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent font-semibold text-sm">
              Gents Collection
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Shop for{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              Gents
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our exclusive collection of men's fashion, accessories, and electronics
          </p>
        </div>

        {/* Products Grid */}
        {gentsProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gentsProducts.map((product) => (
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
