import Link from "next/link"
import { ProductCard } from "@/components/products/product-card"
import { mockProducts } from "@/lib/mock-products"

export default function BestsellersPage() {
  const bestsellers = mockProducts.filter((p) => p.rating >= 4.5).sort((a, b) => b.rating - a.rating)

  return (
    <div className="container-xl py-8">
      <div className="space-y-8">
        <div>
          <h1 className="section-title mb-2">Bestsellers</h1>
          <p className="text-muted-foreground">Our most popular and highest-rated products</p>
        </div>

        {bestsellers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">No bestsellers yet</p>
            <Link href="/products" className="btn-primary inline-block">
              Shop All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
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
        )}
      </div>
    </div>
  )
}
