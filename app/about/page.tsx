import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container-xl py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <div>
          <h1 className="section-title mb-4">About Marqen</h1>
          <p className="text-lg text-muted-foreground">
            Welcome to Marqen, your trusted destination for premium quality gents and ladies clothing in Bangladesh.
            We specialize in trendy t-shirts, comfortable pants, and stylish apparel for every occasion.
          </p>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h2 className="text-2xl font-serif font-bold mb-3">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Marqen, we believe fashion should be accessible, affordable, and stylish. Our mission is to provide
              high-quality gents and ladies clothing that combines comfort with contemporary style. From casual t-shirts
              to elegant pants, we curate products that fit your lifestyle perfectly.
            </p>
          </div>

          <div className="card">
            <h2 className="text-2xl font-serif font-bold mb-3">What We Offer</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Premium quality t-shirts for men and women</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Comfortable and stylish pants for all occasions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Latest fashion trends at affordable prices</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Cash on Delivery available across Bangladesh</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Fast delivery and easy returns</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-2xl font-serif font-bold mb-3">Why Choose Marqen?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We are passionate about bringing you the best in fashion. Every piece of clothing is carefully selected
              for its quality, comfort, and style. Whether you're looking for casual wear or something more elegant,
              Marqen has something for everyone.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Based in Bangladesh, we understand local preferences and deliver products that match your expectations.
              With secure payment options and reliable customer support, shopping with us is always a pleasant experience.
            </p>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-foreground mb-6">Ready to upgrade your wardrobe?</p>
          <Link href="/products" className="btn-primary inline-block">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}
