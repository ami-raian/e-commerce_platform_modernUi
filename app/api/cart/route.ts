import { mockProducts } from "@/lib/mock-products"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get("productId")

  if (productId) {
    const product = mockProducts.find((p) => p._id === productId)
    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 })
    }
    return Response.json(product)
  }

  return Response.json(mockProducts)
}
