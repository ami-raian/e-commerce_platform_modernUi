"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useProductStore } from "@/lib/product-store"
import { ProductCard } from "@/components/products/product-card"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const searchProducts = useProductStore((state) => state.searchProducts)
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    if (query.trim()) {
      const searchResults = searchProducts(query)
      setResults(searchResults)
    } else {
      setResults([])
    }
    setIsLoading(false)
  }, [query, searchProducts])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Back Button */}
          <Link href="/products" className="flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft size={20} />
            Back to Products
          </Link>

          {/* Search Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2">Search Results</h1>
            <p className="text-muted-foreground">
              {query ? (
                <>
                  Found <span className="font-semibold text-foreground">{results.length}</span> products for "
                  <span className="font-semibold text-foreground">{query}</span>"
                </>
              ) : (
                "Enter a search term to find products"
              )}
            </p>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {results.map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard
                    id={product._id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    rating={product.rating}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : query.trim() ? (
            <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-xl text-muted-foreground mb-4">No products found for "{query}"</p>
              <p className="text-muted-foreground mb-6">Try a different search term or browse all products</p>
              <Link href="/products" className="btn-primary inline-block">
                Browse All Products
              </Link>
            </motion.div>
          ) : (
            <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-muted-foreground mb-6">Enter a search term to find products</p>
              <Link href="/products" className="btn-primary inline-block">
                Browse All Products
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
