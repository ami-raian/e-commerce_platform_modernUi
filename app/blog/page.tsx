export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "5 Tips for Perfect Online Shopping",
      excerpt: "Learn how to find the best deals and make the most out of your shopping experience.",
      date: "Dec 15, 2024",
      category: "Shopping Tips",
    },
    {
      id: 2,
      title: "Seasonal Collection Highlights",
      excerpt: "Discover our curated seasonal collection featuring the latest trends and timeless classics.",
      date: "Dec 10, 2024",
      category: "Collection",
    },
    {
      id: 3,
      title: "How to Care for Your Purchases",
      excerpt: "Expert tips on maintaining and caring for your new products to ensure longevity.",
      date: "Dec 5, 2024",
      category: "Care Guide",
    },
  ]

  return (
    <div className="container-xl py-16">
      <h1 className="section-title mb-4">ShopHub Blog</h1>
      <p className="text-lg text-muted-foreground mb-12">Tips, trends, and insights from the ShopHub team</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary text-white text-xs rounded-full font-medium">
                {post.category}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <p className="text-sm text-muted-foreground">{post.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
