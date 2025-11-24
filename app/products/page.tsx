"use client";

import { useState, useEffect, Suspense } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { useSearchParams, useRouter } from "next/navigation";
import { useProductStore, type Product } from "@/lib/product-store";
import { getImageUrl } from "@/lib/api";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, loading, fetchProducts } = useProductStore();

  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") || "popularity"
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    searchParams.get("subCategory") || "all"
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Update URL params
  const updateURLParams = (
    category: string,
    subCategory: string,
    sort: string
  ) => {
    const params = new URLSearchParams();

    if (category !== "all") {
      params.set("category", category);
    }

    if (subCategory !== "all" && category === "fashion") {
      params.set("subcategory", subCategory);
    }

    if (sort !== "popularity") {
      params.set("sort", sort);
    }

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "/products", {
      scroll: false,
    });
  };

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by subcategory for fashion
    if (selectedCategory === "fashion" && selectedSubCategory !== "all") {
      filtered = filtered.filter((p) => p.subCategory === selectedSubCategory);
    }

    // Sort
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      filtered.reverse();
    }

    setFilteredProducts(filtered);
  }, [sortBy, selectedCategory, selectedSubCategory, products]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    // Reset subcategory when changing main category
    if (cat !== "fashion") {
      setSelectedSubCategory("all");
    }
    updateURLParams(
      cat,
      cat === "fashion" ? selectedSubCategory : "all",
      sortBy
    );
  };

  const handleSubCategoryChange = (subCat: string) => {
    setSelectedSubCategory(subCat);
    updateURLParams(selectedCategory, subCat, sortBy);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateURLParams(selectedCategory, selectedSubCategory, sort);
  };

  // const categories = ["all", "fashion", "electronics", "home", "beauty"];
  const categories = ["all", "fashion"];
  const fashionSubCategories = [
    { value: "all", label: "All Fashion" },
    { value: "gents", label: "Gents" },
    { value: "ladies", label: "Ladies" },
  ];
  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
  ];

  return (
    <div className="container-xl py-8">
      <div className="flex flex-col gap-8">
        {/* <div>
          <h1 className="section-title mb-2">All Products</h1>
          <p className="">
            Explore our complete collection of premium products
          </p>
        </div> */}

        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="flex flex-col gap-3 w-full md:w-auto">
            {/* Main Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={20} />
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
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

            {/* Fashion Subcategory Filter */}
            {selectedCategory === "fashion" && (
              <div className="flex items-center gap-2 flex-wrap ml-7">
                <span className="text-sm text-muted-foreground">Type:</span>
                <div className="flex gap-2 flex-wrap">
                  {fashionSubCategories.map((subCat) => (
                    <button
                      key={subCat.value}
                      onClick={() => handleSubCategoryChange(subCat.value)}
                      className={`px-3 py-1.5 text-sm rounded-full capitalize transition-colors ${
                        selectedSubCategory === subCat.value
                          ? "bg-primary text-white"
                          : "border border-border hover:border-primary"
                      }`}
                    >
                      {subCat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  mainPrice={product.mainPrice}
                  price={product.price}
                  discountPercent={product.discountPercent}
                  image={getImageUrl(product.images[0])}
                  category={product.category}
                  rating={product.rating}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No products found matching your filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container-xl py-8">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
