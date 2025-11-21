// API Response Types based on backend

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: string
  stack?: string
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  pages: number
}

// Product Types
export interface Product {
  _id: string
  name: string
  description: string
  mainPrice: number // Original price
  price: number // Discounted selling price
  discountPercent: number // Auto-calculated discount percentage
  images: string[] // Array of image URLs (1-5 images)
  category: 'electronics' | 'fashion' | 'beauty' | 'accessories' | 'home'
  subCategory?: 'gents' | 'ladies' | null
  gender?: 'gents' | 'ladies' | 'unisex' | null
  stock: number
  rating: number
  reviews: Review[]
  isFlashSale: boolean
  isActive: boolean
  sizes: string[] // Default: [] - Allowed: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
  createdAt: string
  updatedAt: string
}

export interface Review {
  userId: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}

export interface ProductsResponse {
  products: Product[]
  pagination: PaginationMeta
}

export interface ProductFilters {
  category?: string
  subCategory?: 'gents' | 'ladies'
  gender?: 'gents' | 'ladies' | 'unisex'
  minPrice?: number
  maxPrice?: number
  isFlashSale?: boolean
  search?: string
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'popularity'
  page?: number
  limit?: number
}

export interface CreateProductData {
  name: string
  description: string
  mainPrice: number // Original price
  price: number // Discounted selling price
  images?: string[] // URLs or will be uploaded
  category: 'electronics' | 'fashion' | 'beauty' | 'accessories' | 'home'
  subCategory?: 'gents' | 'ladies' | null
  gender?: 'gents' | 'ladies' | 'unisex' | null
  stock: number
  isFlashSale?: boolean
  isActive?: boolean
  sizes?: string[] // Default: [] - Allowed: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
}

export interface UpdateProductData {
  name?: string
  description?: string
  mainPrice?: number // Original price
  price?: number // Discounted selling price
  images?: string[]
  category?: 'electronics' | 'fashion' | 'beauty' | 'accessories' | 'home'
  subCategory?: 'gents' | 'ladies' | null
  gender?: 'gents' | 'ladies' | 'unisex' | null
  stock?: number
  rating?: number
  isFlashSale?: boolean
  isActive?: boolean
  sizes?: string[] // Default: [] - Allowed: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
}

export interface AddReviewData {
  rating: number
  comment: string
}

// Auth Types
export interface User {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

// Cart Types (if you implement cart in backend later)
export interface CartItem {
  productId: string
  quantity: number
  price: number
}

export interface Cart {
  userId: string
  items: CartItem[]
  total: number
  createdAt: string
  updatedAt: string
}
