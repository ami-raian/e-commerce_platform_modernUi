import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  CreditCard,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";
import { FlashSaleBanner } from "@/components/flash-sale/flash-sale-banner";
import { ProductCard } from "@/components/products/product-card";
import { mockProducts } from "@/lib/mock-products";

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Enhanced with gradient background */}
      <section className="relative bg-linear-to-br from-primary/5 via-background to-accent/10 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container-xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                <Sparkles size={16} />
                <span>New Collection Available</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight">
                Discover Premium{" "}
                <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Products
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Elevate your lifestyle with our curated collection of premium
                products. Experience quality, style, and convenience in every
                purchase.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/products"
                  className="group btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
                >
                  Shop Collection
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="/categories"
                  className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg"
                >
                  Browse Categories
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div>
                  <div className="text-3xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">
                    Happy Customers
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">4.9★</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[600px] rounded-2xl overflow-hidden bg-linear-to-br from-primary/20 to-purple-600/20 backdrop-blur-sm border border-primary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <Award size={120} className="mx-auto text-primary/40" />
                    <p className="text-2xl font-serif font-bold text-foreground">
                      Premium Quality
                    </p>
                    <p className="text-muted-foreground">
                      Curated with Excellence
                    </p>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute top-8 right-8 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <TrendingUp size={20} className="text-green-600" />
                    <span>Trending Now</span>
                  </div>
                </div>
                <div className="absolute bottom-8 left-8 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Star size={20} className="text-yellow-500" />
                    <span>Best Sellers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-xl py-16 md:py-20 border-b border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="p-4 bg-primary/10 rounded-full">
              <Truck size={32} className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Free Shipping</h3>
            <p className="text-sm text-muted-foreground">On orders over $50</p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="p-4 bg-primary/10 rounded-full">
              <ShieldCheck size={32} className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              100% secure transactions
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="p-4 bg-primary/10 rounded-full">
              <CreditCard size={32} className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Easy Returns</h3>
            <p className="text-sm text-muted-foreground">
              30-day return policy
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl hover:bg-accent/50 transition-colors">
            <div className="p-4 bg-primary/10 rounded-full">
              <Sparkles size={32} className="text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Premium Quality</h3>
            <p className="text-sm text-muted-foreground">
              Carefully curated products
            </p>
          </div>
        </div>
      </section>

      {/* Flash Sales Banner */}
      <section className="container-xl py-12">
        <FlashSaleBanner />
      </section>

      {/* Featured Products Section */}
      <section className="container-xl py-16 md:py-24">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <Star size={16} />
            <span>Featured Collection</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Shop Our Bestsellers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the products that our customers love the most
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product._id}
              className="transform hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
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
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4"
          >
            View All Products
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="container-xl mb-16">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-purple-600 to-pink-600 text-white p-12 md:p-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <Sparkles size={16} />
              <span>Limited Time Offer</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold">
              Get 20% Off Your First Order
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of happy customers and experience premium shopping
              today. Use code{" "}
              <span className="font-bold bg-white/20 px-3 py-1 rounded-lg">
                WELCOME20
              </span>{" "}
              at checkout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Shop Now
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors text-lg"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
