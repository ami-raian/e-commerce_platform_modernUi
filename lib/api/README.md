# API Client Documentation

## Quick Start

```typescript
// Import API functions
import { getProductsAxios, createProductWithImagesAxios, login } from '@/lib/api'

// Use in components
const products = await getProductsAxios({ category: 'electronics' })
const user = await login({ email: 'user@example.com', password: 'password' })
```

## Configuration

Set your backend URL in `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## API Methods

### Products (Client-Side - Axios)

#### Get Products
```typescript
getProductsAxios(filters?: ProductFilters): Promise<ProductsResponse>

// Example
const data = await getProductsAxios({
  category: 'electronics',
  minPrice: 10,
  maxPrice: 100,
  sort: 'price-asc',
  page: 1,
  limit: 20,
  search: 'laptop'
})
// Returns: { products: Product[], pagination: { page, limit, total, pages } }
```

#### Get Single Product
```typescript
getProductByIdAxios(id: string): Promise<Product>

// Example
const product = await getProductByIdAxios('507f1f77bcf86cd799439011')
```

#### Get by Category
```typescript
getProductsByCategoryAxios(category: string, limit?: number): Promise<Product[]>

// Example
const products = await getProductsByCategoryAxios('fashion', 12)
```

#### Flash Sale Products
```typescript
getFlashSaleProductsAxios(limit?: number): Promise<Product[]>

// Example
const flashSale = await getFlashSaleProductsAxios(8)
```

#### Bestsellers
```typescript
getBestsellersAxios(limit?: number): Promise<Product[]>

// Example
const bestsellers = await getBestsellersAxios(10)
```

#### Check Availability
```typescript
checkAvailabilityAxios(id: string, quantity: number): Promise<boolean>

// Example
const available = await checkAvailabilityAxios(productId, 5)
if (available) {
  // Add to cart
}
```

#### Add Review (Requires Auth)
```typescript
addReviewAxios(productId: string, reviewData: AddReviewData): Promise<Product>

// Example
const updated = await addReviewAxios(productId, {
  rating: 5,
  comment: 'Great product!'
})
```

### Products (Admin Only)

#### Create Product (JSON only)
```typescript
createProductAxios(productData: CreateProductData): Promise<Product>

// Example
const product = await createProductAxios({
  name: 'New Product',
  description: 'Description here',
  price: 99.99,
  category: 'electronics',
  stock: 50,
  images: ['/uploads/existing-image.jpg'] // Pre-uploaded URLs
})
```

#### Create Product with Image Upload
```typescript
createProductWithImagesAxios(
  productData: Omit<CreateProductData, 'images'>,
  images: File[]
): Promise<Product>

// Example - In a form
const handleSubmit = async (e) => {
  const productData = {
    name: 'Gaming Laptop',
    description: 'High performance laptop',
    price: 1299.99,
    category: 'electronics',
    stock: 10,
    discount: 15,
    isFlashSale: true
  }

  const fileInput = document.querySelector('input[type="file"]')
  const images = Array.from(fileInput.files) // File[]

  const product = await createProductWithImagesAxios(productData, images)
}
```

#### Update Product
```typescript
updateProductAxios(id: string, updateData: UpdateProductData): Promise<Product>

// Example
const updated = await updateProductAxios(productId, {
  price: 89.99,
  stock: 25,
  discount: 20
})
```

#### Update Product Images
```typescript
updateProductImagesAxios(id: string, images: File[]): Promise<Product>

// Example
const fileInput = document.querySelector('input[type="file"]')
const images = Array.from(fileInput.files)
const updated = await updateProductImagesAxios(productId, images)
```

#### Soft Delete
```typescript
softDeleteProductAxios(id: string): Promise<void>

// Example
await softDeleteProductAxios(productId)
// Product is marked as inactive, images kept
```

#### Hard Delete
```typescript
hardDeleteProductAxios(id: string): Promise<void>

// Example
await hardDeleteProductAxios(productId)
// Product and all images permanently deleted
```

#### Update Stock
```typescript
updateStockAxios(id: string, quantity: number): Promise<Product>

// Example
await updateStockAxios(productId, 50) // Set stock to 50
```

### Products (Server Components - Fetch with ISR)

Use these in Server Components for automatic caching:

```typescript
// app/page.tsx - Server Component
import { getProducts, getBestsellers } from '@/lib/api'

export default async function HomePage() {
  // Automatically cached, revalidates every 60 seconds
  const data = await getProducts({ category: 'electronics' }, 60)
  const bestsellers = await getBestsellers(8, 300)

  return (
    <div>
      <ProductGrid products={data.products} />
      <BestsellerSection products={bestsellers} />
    </div>
  )
}
```

Available methods:
- `getProducts(filters, revalidate)` - ISR with revalidation
- `getProductById(id, revalidate)` - ISR for single product
- `getProductsByCategory(category, limit, revalidate)`
- `getFlashSaleProducts(limit, revalidate)`
- `getBestsellers(limit, revalidate)`

### Authentication

#### Login
```typescript
login(credentials: LoginCredentials): Promise<AuthResponse>

// Example
const { user, token } = await login({
  email: 'user@example.com',
  password: 'password123'
})
// Token is automatically stored in localStorage
```

#### Register
```typescript
register(data: RegisterData): Promise<AuthResponse>

// Example
const { user, token } = await register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securepassword'
})
```

#### Logout
```typescript
logout(): Promise<void>

// Example
await logout()
// Clears token from localStorage
```

#### Get Current User
```typescript
getCurrentUser(): Promise<User>

// Example
const user = await getCurrentUser()
```

#### Verify Token
```typescript
verifyToken(): Promise<User | null>

// Example
const user = await verifyToken()
if (user) {
  // User is authenticated
} else {
  // Token invalid or expired
}
```

## Helper Functions

### Get Image URL
```typescript
getImageUrl(imagePath: string): string

// Example
const fullUrl = getImageUrl(product.images[0])
// "/uploads/image.jpg" -> "http://localhost:5000/uploads/image.jpg"

// Use in JSX
<img src={getImageUrl(product.images[0])} alt={product.name} />
```

### Auth Token Management
```typescript
import { getAuthToken, setAuthToken, clearAuthToken } from '@/lib/api'

// Get token
const token = getAuthToken()

// Set token
setAuthToken('your-jwt-token')

// Clear token
clearAuthToken()
```

## Type Definitions

### Product
```typescript
interface Product {
  _id: string
  name: string
  description: string
  price: number
  images: string[] // 1-5 images
  category: 'electronics' | 'fashion' | 'beauty' | 'accessories' | 'home'
  subCategory?: 'gents' | 'ladies' | null
  gender?: 'gents' | 'ladies' | 'unisex' | null
  stock: number
  rating: number
  reviews: Review[]
  isFlashSale: boolean
  discount: number
  isActive: boolean
  discountedPrice?: number // Virtual field
  createdAt: string
  updatedAt: string
}
```

### ProductFilters
```typescript
interface ProductFilters {
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
```

### User
```typescript
interface User {
  _id: string
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt: string
  updatedAt: string
}
```

## Error Handling

```typescript
import { AxiosError } from 'axios'

try {
  await createProductAxios(data)
} catch (error) {
  if (error.response) {
    // Backend returned error response
    console.error(error.response.data.message)
  } else if (error.request) {
    // Request made but no response
    console.error('No response from server')
  } else {
    // Something else happened
    console.error(error.message)
  }
}
```

## Examples

### Complete Product Creation Form
```typescript
'use client'
import { useState } from 'react'
import { createProductWithImagesAxios } from '@/lib/api'
import { toast } from 'sonner'

export function CreateProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'electronics',
    stock: 0,
  })
  const [images, setImages] = useState<File[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (images.length === 0) {
      toast.error('Please select at least 1 image')
      return
    }

    try {
      const product = await createProductWithImagesAxios(formData, images)
      toast.success('Product created successfully!')
      // Reset form or redirect
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create product')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={(e) => {
          if (e.target.files) {
            setImages(Array.from(e.target.files).slice(0, 5))
          }
        }}
        required
      />

      <button type="submit">Create Product</button>
    </form>
  )
}
```

### Product List with Filters
```typescript
'use client'
import { useEffect, useState } from 'react'
import { getProductsAxios } from '@/lib/api'

export function ProductList() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    category: 'electronics',
    sort: 'newest' as const,
    page: 1
  })

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductsAxios(filters)
      setProducts(data.products)
    }
    fetchProducts()
  }, [filters])

  return (
    <div>
      <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
      </select>

      <div>
        {products.map(product => (
          <div key={product._id}>{product.name}</div>
        ))}
      </div>
    </div>
  )
}
```
