"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FlashSaleBanner } from "@/components/flash-sale/flash-sale-banner"
import { ProductCard } from "@/components/products/product-card"
import { mockProducts } from "@/lib/mock-products"

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const featuredProducts = mockProducts.slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <motion.section
        className="container-xl py-20 md:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-6 max-w-2xl" variants={itemVariants}>
          <h1 className="section-title text-primary">Discover Premium Products</h1>
          <p className="text-lg text-muted leading-relaxed">
            Shop from our curated collection of premium products with smooth animations and modern design. Your shopping
            experience, elevated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/products" className="btn-primary inline-flex items-center justify-center gap-2">
              Shop Now
              <ArrowRight size={20} />
            </Link>
            <Link href="/products" className="btn-secondary inline-flex items-center justify-center gap-2">
              Browse Categories
            </Link>
          </div>
        </motion.div>
      </motion.section>

      {/* Flash Sales Banner */}
      <motion.section
        className="container-xl mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <FlashSaleBanner />
      </motion.section>

      {/* Featured Products Section */}
      <motion.section
        className="container-xl py-16 md:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 className="section-title mb-12" variants={itemVariants}>
          Featured Products
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="container-xl py-16 md:py-24 bg-primary text-white rounded-lg mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="text-center space-y-6" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Limited Time Offer</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Get exclusive discounts with our promo codes. Use code WELCOME20 for 20% off your first order!
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-accent transition-colors"
          >
            Shop Now
          </Link>
        </motion.div>
      </motion.section>
    </div>
  )
}
