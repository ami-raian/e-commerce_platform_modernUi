import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container-xl py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <div>
          <h1 className="section-title mb-4">About ShopHub</h1>
          <p className="text-lg text-muted-foreground">
            Welcome to ShopHub, your premier destination for premium products with exceptional shopping experience.
          </p>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-2xl font-serif font-bold mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe in making premium shopping accessible to everyone. Our mission is to deliver curated products
              with outstanding customer service and modern technology that makes shopping delightful.
            </p>
          </div>

          <div className="card">
            <h2 className="text-2xl font-serif font-bold mb-3">Why Choose Us?</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Carefully curated collection of premium products</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Fast and reliable shipping worldwide</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">24/7 customer support</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Secure and encrypted payments</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Easy returns and exchanges</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-2xl font-serif font-bold mb-3">Quality Guarantee</h2>
            <p className="text-muted-foreground leading-relaxed">
              Every product in our store is thoroughly vetted for quality and authenticity. We stand behind every
              purchase with a 30-day money-back guarantee.
            </p>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-foreground mb-6">Ready to explore our collection?</p>
          <Link href="/products" className="btn-primary inline-block">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}
