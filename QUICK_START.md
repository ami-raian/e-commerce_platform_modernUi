# Quick Start Guide - Backend Integration

## 🚀 Get Started in 5 Minutes

### Step 1: Start Backend Server
```bash
cd C:\Users\Rai_An\Documents\backend\e-commerce_platform_modernUi_backend
npm run dev
```
✅ Backend running on `http://localhost:5000`

### Step 2: Start Frontend Server
```bash
cd C:\Users\Rai_An\Documents\GitHub\e-commerce-platform-modernUi
npm run dev
```
✅ Frontend running on `http://localhost:3000`

### Step 3: Test Admin Panel
1. Open browser: `http://localhost:3000/admin/products`
2. Login as admin (make sure you have an admin user in backend)
3. Click "Add Product"
4. Fill form and upload 1-5 images
5. Click "Create Product"

✅ Product created with images stored in backend!

## 📖 Common Tasks

### Fetch Products in a Page

**Client Component:**
```typescript
'use client'
import { useProductStore } from '@/lib/product-store'
import { useEffect } from 'react'

export default function MyPage() {
  const { products, loading, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts({ category: 'electronics' })
  }, [])

  return <div>{products.map(p => <div key={p._id}>{p.name}</div>)}</div>
}
```

**Server Component (with caching):**
```typescript
import { getProducts } from '@/lib/api'

export default async function MyPage() {
  const data = await getProducts({ category: 'electronics' }, 60)
  return <div>{data.products.map(p => <div key={p._id}>{p.name}</div>)}</div>
}
```

### Create Product (Admin)

```typescript
'use client'
import { useProductStore } from '@/lib/product-store'

function CreateForm() {
  const { createProduct } = useProductStore()

  const handleSubmit = async (formData, imageFiles) => {
    const product = await createProduct(formData, imageFiles)
    if (product) alert('Success!')
  }

  return <form>...</form>
}
```

### Login User

```typescript
'use client'
import { useAuthStore } from '@/lib/auth-store'

function LoginForm() {
  const { login } = useAuthStore()

  const handleLogin = async (email, password) => {
    const result = await login(email, password)
    if (result.success) {
      // Redirect or show success
    } else {
      alert(result.error)
    }
  }

  return <form>...</form>
}
```

### Display Images

```typescript
import { getImageUrl } from '@/lib/api'

function ProductCard({ product }) {
  return <img src={getImageUrl(product.images[0])} alt={product.name} />
}
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `lib/api/config.ts` | API client setup |
| `lib/api/products.ts` | Product API methods |
| `lib/api/auth.ts` | Auth API methods |
| `lib/product-store.ts` | Product state management |
| `lib/auth-store.ts` | Auth state management |
| `app/admin/products/page.tsx` | Admin CRUD panel |
| `.env.local` | Backend URL config |

## 🔧 Environment Setup

Create `.env.local` in project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## 📚 Full Documentation

- **Setup Guide**: `BACKEND_INTEGRATION_GUIDE.md`
- **API Reference**: `lib/api/README.md`
- **Summary**: `IMPLEMENTATION_SUMMARY.md`

## ⚡ Quick API Reference

### Get Products
```typescript
import { getProductsAxios } from '@/lib/api'

const data = await getProductsAxios({
  category: 'electronics',
  page: 1,
  limit: 20,
  sort: 'price-asc'
})
```

### Create Product (Admin)
```typescript
import { createProductWithImagesAxios } from '@/lib/api'

const product = await createProductWithImagesAxios(
  { name: 'Laptop', price: 999, category: 'electronics', stock: 10, description: 'Great laptop' },
  imageFiles // File[] from input
)
```

### Update Product (Admin)
```typescript
import { updateProductAxios } from '@/lib/api'

const updated = await updateProductAxios(productId, {
  price: 899,
  stock: 15
})
```

### Delete Product (Admin)
```typescript
import { hardDeleteProductAxios } from '@/lib/api'

await hardDeleteProductAxios(productId) // Permanent deletion
```

## ✅ Checklist

- [x] Backend running on port 5000
- [x] Frontend running on port 3000
- [x] `.env.local` created with API URL
- [ ] Admin user exists in backend
- [ ] Test create product
- [ ] Test fetch products
- [ ] Test delete product
- [ ] Update existing pages to use API

## 🎯 Next Steps

1. Update `app/page.tsx` to fetch real products
2. Update `app/products/page.tsx` for product listing
3. Update `app/product/[id]/page.tsx` for product details
4. Implement login/register pages
5. Add protected routes for admin

## 🐛 Common Issues

**CORS Error?**
- Check backend CORS config allows `http://localhost:3000`

**Images not loading?**
- Use `getImageUrl()` helper function
- Check backend serves `/uploads` folder

**401 Unauthorized?**
- Make sure you're logged in as admin
- Check token in localStorage: `auth-token`

**API calls failing?**
- Verify backend is running
- Check `.env.local` has correct URL
- Look at browser console for errors

## 🎉 You're Ready!

Your e-commerce platform now has:
- ✅ Real backend integration
- ✅ Image upload support
- ✅ Admin product management
- ✅ Authentication ready
- ✅ Type-safe API calls

Start building your amazing e-commerce website! 🚀
