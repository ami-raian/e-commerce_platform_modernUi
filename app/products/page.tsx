"use client";

import { useState, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { mockProducts } from "@/lib/mock-products";

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState(mockProducts);

  useEffect(() => {
    let filtered = [...mockProducts];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.reverse();
    }

    setProducts(filtered);
  }, [sortBy, selectedCategory]);

  const categories = ["all", "electronics", "fashion", "home", "beauty"];
  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
  ];

  return (
    <div className="container-xl py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="section-title mb-2">All Products</h1>
          <p className="">
            Explore our complete collection of premium products
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={20} />
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full capitalize transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-white"
                      : "border border-border hover:border-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-background border border-border px-4 py-2 rounded-lg pr-10 cursor-pointer w-full md:w-auto"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              size={16}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
