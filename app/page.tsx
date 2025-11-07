import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FlashSaleBanner } from "@/components/flash-sale/flash-sale-banner";
import { ProductCard } from "@/components/products/product-card";
import { mockProducts } from "@/lib/mock-products";

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="container-xl py-20 md:py-32 animate-fade-in">
        <div className="space-y-6 max-w-2xl">
          <h1 className="section-title text-primary">
            Discover Premium Products
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Shop from our curated collection of premium products with smooth
            animations and modern design. Your shopping experience, elevated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/products"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Shop Now
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/categories"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Flash Sales Banner */}
      <section className="container-xl mb-12">
        <FlashSaleBanner />
      </section>

      {/* Featured Products Section */}
      <section className="container-xl py-16 md:py-24">
        <h2 className="section-title mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product._id}>
              <ProductCard
                id={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                rating={product.rating}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-xl py-16 md:py-24 bg-primary text-primary-foreground rounded-lg mb-16">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Limited Time Offer
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Get exclusive discounts with our promo codes. Use code WELCOME20 for
            20% off your first order!
          </p>
          <Link
            href="/products"
            className="inline-block bg-background text-foreground px-8 py-3 rounded-full font-semibold hover:bg-muted transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
