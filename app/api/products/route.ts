import { mockProducts } from "@/lib/mock-products"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const sort = searchParams.get("sort")

  let filtered = [...mockProducts]

  // Filter by category
  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category === category)
  }

  // Sort
  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sort === "newest") {
    filtered.reverse()
  }

  return Response.json(filtered)
}
