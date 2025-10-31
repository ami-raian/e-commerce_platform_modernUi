import { create } from "zustand"
import { persist } from "zustand/middleware"
import { mockProducts } from "./mock-products"

export interface Product {
  _id: string
  name: string
  price: number
  image: string
  category: string
  description?: string
  rating: number
  reviews?: number
}

interface ProductStore {
  products: Product[]
  addProduct: (product: Omit<Product, "_id">) => Product
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void
  searchProducts: (query: string) => Product[]
  getProductsByCategory: (category: string) => Product[]
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          _id: Date.now().toString(),
        }
        set((state) => ({ products: [...state.products, newProduct] }))
        return newProduct
      },
      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) => (p._id === id ? { ...p, ...updates } : p)),
        }))
      },
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p._id !== id),
        }))
      },
      searchProducts: (query) => {
        const products = get().products
        const lowerQuery = query.toLowerCase()
        return products.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery) ||
            p.description?.toLowerCase().includes(lowerQuery),
        )
      },
      getProductsByCategory: (category) => {
        return get().products.filter((p) => p.category === category)
      },
    }),
    {
      name: "product-store",
    },
  ),
)
