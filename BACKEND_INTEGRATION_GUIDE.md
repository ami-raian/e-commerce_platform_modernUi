# Backend API Integration Guide

## Overview
This Next.js e-commerce application is now integrated with your Express.js backend API. The integration includes full CRUD operations for products, authentication, and image uploads.

## Setup

### 1. Environment Variables
Create or update `.env.local` in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### 2. Backend Server
Make sure your backend server is running on `http://localhost:5000`

```bash
cd C:\Users\Rai_An\Documents\backend\e-commerce_platform_modernUi_backend
npm run dev
```

### 3. Frontend Server
Start the Next.js development server:

```bash
cd C:\Users\Rai_An\Documents\GitHub\e-commerce-platform-modernUi
npm run dev
```

## Architecture

### API Client (`lib/api/`)
- **`config.ts`** - Axios instance with interceptors, auth token management, and fetch wrapper
- **`types.ts`** - TypeScript interfaces matching your backend models
- **`products.ts`** - Product API methods (Axios for client-side, fetch for server components)
- **`auth.ts`** - Authentication API methods
- **`index.ts`** - Exports all API functions

### State Management (`lib/`)
- **`product-store.ts`** - Zustand store for products (now uses real API)
- **`auth-store.ts`** - Zustand store for authentication (now uses real API)

## API Features

### Product APIs

#### Client-Side (Axios - for Client Components)
```typescript
import { getProductsAxios, createProductWithImagesAxios } from '@/lib/api'

// Get products with filters
const data = await getProductsAxios({ category: 'electronics', page: 1, limit: 20 })

// Create product with images (Admin only)
const product = await createProductWithImagesAxios(productData, imageFiles)
```

#### Server-Side (Fetch - for Server Components with ISR/SSG)
```typescript
import { getProducts, getProductById } from '@/lib/api'

// In Server Components - with automatic caching
const data = await getProducts({ category: 'fashion' }, 60) // Revalidate every 60s

// Get single product
const product = await getProductById(id, 60)
```

### Available Product Methods

**Public APIs:**
- `getProductsAxios(filters)` / `getProducts(filters, revalidate)` - Get all products
- `getProductByIdAxios(id)` / `getProductById(id, revalidate)` - Get single product
- `getProductsByCategoryAxios(category, limit)` - Get products by category
- `getFlashSaleProductsAxios(limit)` / `getFlashSaleProducts(limit, revalidate)` - Flash sales
- `getBestsellersAxios(limit)` / `getBestsellers(limit, revalidate)` - Bestsellers
- `checkAvailabilityAxios(id, quantity)` - Check stock
- `addReviewAxios(productId, reviewData)` - Add review (requires auth)

**Admin Only:**
- `createProductAxios(data)` - Create product (JSON only)
- `createProductWithImagesAxios(data, images)` - Create with file upload
- `updateProductAxios(id, data)` - Update product
- `updateProductImagesAxios(id, images)` - Update only images
- `softDeleteProductAxios(id)` - Soft delete (marks inactive)
- `hardDeleteProductAxios(id)` - Permanent delete (removes images)
- `updateStockAxios(id, quantity)` - Update stock

### Authentication APIs

```typescript
import { login, register, logout } from '@/lib/api'

// Login
const { user, token } = await login({ email, password })

// Register
const { user, token } = await register({ name, email, password })

// Logout
await logout()
```

### Using Stores

#### Product Store
```typescript
'use client'
import { useProductStore } from '@/lib/product-store'

function MyComponent() {
  const { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct } = useProductStore()

  useEffect(() => {
    fetchProducts({ category: 'electronics' })
  }, [])

  // Create product (Admin)
  const handleCreate = async (data, images) => {
    const product = await createProduct(data, images)
    if (product) {
      toast.success('Product created!')
    }
  }

  // Update product (Admin)
  const handleUpdate = async (id, data) => {
    const success = await updateProduct(id, data)
    if (success) {
      toast.success('Product updated!')
    }
  }

  // Delete product (Admin)
  const handleDelete = async (id) => {
    const success = await deleteProduct(id)
    if (success) {
      toast.success('Product deleted!')
    }
  }
}
```

#### Auth Store
```typescript
'use client'
import { useAuthStore } from '@/lib/auth-store'

function MyComponent() {
  const { user, loading, error, login, register, logout } = useAuthStore()

  const handleLogin = async (email, password) => {
    const result = await login(email, password)
    if (result.success) {
      toast.success('Logged in!')
    } else {
      toast.error(result.error)
    }
  }
}
```

## Admin Panel

### Product Management
Navigate to `/admin/products` (requires admin role)

Features:
- ✅ View all products
- ✅ Create new products with 1-5 image uploads
- ✅ Edit existing products
- ✅ Delete products (permanent deletion)
- ✅ Upload validation (max 5MB, JPEG/PNG/WEBP only)
- ✅ Real-time updates with toast notifications

### Access Control
The admin panel checks for `user.role === 'admin'`. Make sure your backend JWT includes the user role.

## Image Handling

### Image URLs
Images are stored on the backend at `/uploads/filename.ext`

Use the helper function to get full URLs:

```typescript
import { getImageUrl } from '@/lib/api'

// Converts "/uploads/image.jpg" to "http://localhost:5000/uploads/image.jpg"
const fullUrl = getImageUrl(product.images[0])
```

### Image Upload
```typescript
// In a form
const [images, setImages] = useState<File[]>([])

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const fileArray = Array.from(e.target.files)
    if (fileArray.length > 5) {
      toast.error('Maximum 5 images allowed')
      return
    }
    setImages(fileArray)
  }
}

// In submit handler
await createProduct(productData, images)
```

## Error Handling

The API client includes automatic error handling:

- **401 Unauthorized** - Automatically clears auth token
- **Network errors** - Returns user-friendly error messages
- **Validation errors** - Returns backend validation messages

```typescript
try {
  await createProduct(data, images)
} catch (error) {
  // Error is already handled by axios interceptor
  // Display error from store
  toast.error(error.message)
}
```

## Next Steps

### Update Existing Pages

1. **Home Page** (`app/page.tsx`)
   ```typescript
   import { getProducts, getBestsellers } from '@/lib/api'

   export default async function HomePage() {
     const bestsellers = await getBestsellers(8, 300)
     return <div>...</div>
   }
   ```

2. **Products Page** (`app/products/page.tsx`)
   ```typescript
   'use client'
   import { useProductStore } from '@/lib/product-store'

   export default function ProductsPage() {
     const { products, loading, fetchProducts } = useProductStore()

     useEffect(() => {
       fetchProducts()
     }, [])

     return <div>...</div>
   }
   ```

3. **Product Detail** (`app/product/[id]/page.tsx`)
   ```typescript
   import { getProductById } from '@/lib/api'

   export default async function ProductDetailPage({ params }) {
     const product = await getProductById(params.id, 60)
     return <div>...</div>
   }
   ```

### Add Missing Features

1. **User Registration/Login Pages** - Update to use new auth store
2. **Shopping Cart** - Can integrate with backend cart API (when ready)
3. **Product Reviews** - Use `addReviewAxios` method
4. **Search** - Use `fetchProducts` with `search` filter

## Testing

### Test Admin Functions

1. Login as admin (update backend to have an admin user)
2. Go to `/admin/products`
3. Try creating a product with images
4. Edit and delete products
5. Check that images appear correctly

### Test Public Functions

1. Visit home page - should show products from backend
2. Browse products page - should fetch from API
3. View product details - should show correct data
4. Test search and filters

## Backend Compatibility

This frontend is compatible with your backend APIs:

✅ **Product APIs**
- GET `/api/v1/products` - Get all products with filters
- GET `/api/v1/products/:id` - Get single product
- GET `/api/v1/products/category/:category` - Get by category
- GET `/api/v1/products/flash-sale` - Flash sale products
- GET `/api/v1/products/bestsellers` - Bestsellers
- POST `/api/v1/products` - Create product (with image upload)
- PATCH `/api/v1/products/:id` - Update product
- PATCH `/api/v1/products/:id/images` - Update images only
- DELETE `/api/v1/products/:id` - Soft delete
- DELETE `/api/v1/products/:id/permanent` - Hard delete

✅ **Auth APIs** (you'll need to implement these in backend)
- POST `/api/v1/auth/login`
- POST `/api/v1/auth/register`
- GET `/api/v1/auth/me`

## Troubleshooting

### CORS Issues
Make sure your backend has CORS enabled for `http://localhost:3000`

### Image Upload Fails
- Check backend accepts `multipart/form-data`
- Verify multer is configured correctly
- Ensure `public/uploads` folder exists and has write permissions

### Auth Token Not Sent
- Check localStorage has `auth-token` key
- Verify axios interceptor is adding Authorization header
- Check backend validates Bearer token format

## Performance Optimization

### Server Components (Recommended)
Use fetch-based methods in Server Components for better performance:

```typescript
// app/products/page.tsx
import { getProducts } from '@/lib/api'

// Server Component - automatically cached by Next.js
export default async function ProductsPage() {
  const data = await getProducts({}, 60) // Revalidate every 60s
  return <ProductGrid products={data.products} />
}
```

### Client Components
Use Axios methods in Client Components when you need interactivity:

```typescript
'use client'
import { useProductStore } from '@/lib/product-store'

export default function ProductsPage() {
  const { products, fetchProducts } = useProductStore()
  // Interactive features like filters, search
}
```

## Support

For issues:
1. Check backend console for API errors
2. Check browser console for frontend errors
3. Verify environment variables are set
4. Ensure backend is running and accessible

---

**Backend**: `http://localhost:5000`
**Frontend**: `http://localhost:3000`
**Admin Panel**: `http://localhost:3000/admin/products`
