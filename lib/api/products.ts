import { apiClient, apiFetch } from "./config";
import type {
  ApiResponse,
  Product,
  ProductsResponse,
  ProductFilters,
  CreateProductData,
  UpdateProductData,
  AddReviewData,
} from "./types";

/**
 * Product API Service
 * Provides methods to interact with the products API
 */

// ============================================
// AXIOS METHODS (Client-side)
// ============================================

/**
 * Get all products with filters (Axios)
 * @param filters - Query parameters for filtering
 */
export async function getProductsAxios(
  filters?: ProductFilters
): Promise<ProductsResponse> {
  const response = await apiClient.get<ApiResponse<ProductsResponse>>(
    "/products",
    {
      params: filters,
    }
  );
  return response.data.data!;
}

/**
 * Get product by ID (Axios)
 */
export async function getProductByIdAxios(id: string): Promise<Product> {
  const response = await apiClient.get<ApiResponse<{ product: Product }>>(
    `/products/${id}`
  );
  return response.data.data!.product;
}

/**
 * Get products by category (Axios)
 */
export async function getProductsByCategoryAxios(
  category: string,
  limit?: number
): Promise<Product[]> {
  const response = await apiClient.get<ApiResponse<{ products: Product[] }>>(
    `/products/category/${category}`,
    {
      params: { limit },
    }
  );
  return response.data.data!.products;
}

/**
 * Get flash sale products (Axios)
 */
export async function getFlashSaleProductsAxios(
  limit?: number
): Promise<Product[]> {
  const response = await apiClient.get<ApiResponse<{ products: Product[] }>>(
    "/products/flash-sale",
    {
      params: { limit },
    }
  );
  return response.data.data!.products;
}

/**
 * Get bestseller products (Axios)
 */
export async function getBestsellersAxios(limit?: number): Promise<Product[]> {
  const response = await apiClient.get<ApiResponse<{ products: Product[] }>>(
    "/products/bestsellers",
    {
      params: { limit },
    }
  );
  return response.data.data!.products;
}

/**
 * Check product availability (Axios)
 */
export async function checkAvailabilityAxios(
  id: string,
  quantity: number
): Promise<boolean> {
  const response = await apiClient.get<ApiResponse<{ available: boolean }>>(
    `/products/${id}/availability`,
    {
      params: { quantity },
    }
  );
  return response.data.data!.available;
}

/**
 * Add review to product (Axios) - Requires auth
 */
export async function addReviewAxios(
  productId: string,
  reviewData: AddReviewData
): Promise<Product> {
  const response = await apiClient.post<ApiResponse<{ product: Product }>>(
    `/products/${productId}/reviews`,
    reviewData
  );
  return response.data.data!.product;
}

// ============================================
// ADMIN ONLY METHODS (Axios)
// ============================================

/**
 * Create a new product (Axios) - Admin only
 * For file uploads, use FormData
 */
export async function createProductAxios(
  productData: CreateProductData
): Promise<Product> {
  const response = await apiClient.post<ApiResponse<{ product: Product }>>(
    "/products",
    productData
  );
  return response.data.data!.product;
}

/**
 * Create product with image upload (Axios) - Admin only
 * @param productData - Product data
 * @param images - Array of File objects (1-5 images)
 */
export async function createProductWithImagesAxios(
  productData: Omit<CreateProductData, "images">,
  images: File[]
): Promise<Product> {
  const formData = new FormData();

  // Append product data
  Object.entries(productData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  // Append images
  images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await apiClient.post<ApiResponse<{ product: Product }>>(
    "/products",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data!.product;
}

/**
 * Update product (Axios) - Admin only
 */
export async function updateProductAxios(
  id: string,
  updateData: UpdateProductData
): Promise<Product> {
  const response = await apiClient.patch<ApiResponse<{ product: Product }>>(
    `/products/${id}`,
    updateData
  );
  return response.data.data!.product;
}

/**
 * Update product images only (Axios) - Admin only
 * @param id - Product ID
 * @param newImages - Array of new File objects to upload
 * @param existingImages - Array of existing image paths to keep
 *
 * Scenarios:
 * 1. Keep some + Add new: Pass existingImages paths and new files
 * 2. Replace all: Only pass new files (no existingImages)
 * 3. Remove some: Pass only the existingImages you want to keep
 */
export async function updateProductImagesAxios(
  id: string,
  newImages: File[] = [],
  existingImages: string[] = []
): Promise<Product> {
  const formData = new FormData();

  // Append existing images to keep
  existingImages.forEach((imagePath) => {
    formData.append("existingImages", imagePath);
  });

  // Append new images to upload
  newImages.forEach((image) => {
    formData.append("images", image);
  });

  const response = await apiClient.patch<ApiResponse<{ product: Product }>>(
    `/products/${id}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data!.product;
}

/**
 * Soft delete product (Axios) - Admin only
 */
export async function softDeleteProductAxios(id: string): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}

/**
 * Hard delete product (Axios) - Admin only
 * Permanently deletes product and all images
 */
export async function hardDeleteProductAxios(id: string): Promise<void> {
  await apiClient.delete(`/products/${id}/permanent`);
}

/**
 * Update product stock (Axios) - Admin only
 */
export async function updateStockAxios(
  id: string,
  quantity: number
): Promise<Product> {
  const response = await apiClient.patch<ApiResponse<{ product: Product }>>(
    `/products/${id}/stock`,
    { quantity }
  );
  return response.data.data!.product;
}

// ============================================
// FETCH METHODS (Server Components)
// ============================================

/**
 * Get all products with filters (Fetch with caching)
 * Use this in Server Components for ISR/SSG
 */
export async function getProducts(
  filters?: ProductFilters,
  revalidate?: number
): Promise<ProductsResponse> {
  const queryString = filters
    ? "?" + new URLSearchParams(filters as any).toString()
    : "";
  const response = await apiFetch<ApiResponse<ProductsResponse>>(
    `/products${queryString}`,
    {
      cache: "force-cache",
      revalidate: revalidate || 60, // Revalidate every 60 seconds by default
    }
  );
  return response.data!;
}

/**
 * Get product by ID (Fetch with caching)
 */
export async function getProductById(
  id: string,
  revalidate?: number
): Promise<Product> {
  const response = await apiFetch<ApiResponse<{ product: Product }>>(
    `/products/${id}`,
    {
      cache: "force-cache",
      revalidate: revalidate || 60,
    }
  );
  return response.data!.product;
}

/**
 * Get products by category (Fetch with caching)
 */
export async function getProductsByCategory(
  category: string,
  limit?: number,
  revalidate?: number
): Promise<Product[]> {
  const queryString = limit ? `?limit=${limit}` : "";
  const response = await apiFetch<ApiResponse<{ products: Product[] }>>(
    `/products/category/${category}${queryString}`,
    {
      cache: "force-cache",
      revalidate: revalidate || 60,
    }
  );
  return response.data!.products;
}

/**
 * Get flash sale products (Fetch with caching)
 */
export async function getFlashSaleProducts(
  limit?: number,
  revalidate?: number
): Promise<Product[]> {
  const queryString = limit ? `?limit=${limit}` : "";
  const response = await apiFetch<ApiResponse<{ products: Product[] }>>(
    `/products/flash-sale${queryString}`,
    {
      cache: "force-cache",
      revalidate: revalidate || 30, // Flash sales update more frequently
    }
  );
  return response.data!.products;
}

/**
 * Get bestseller products (Fetch with caching)
 */
export async function getBestsellers(
  limit?: number,
  revalidate?: number
): Promise<Product[]> {
  const queryString = limit ? `?limit=${limit}` : "";
  const response = await apiFetch<ApiResponse<{ products: Product[] }>>(
    `/products/bestsellers${queryString}`,
    {
      cache: "force-cache",
      revalidate: revalidate || 300, // Bestsellers update less frequently
    }
  );
  return response.data!.products;
}

// Helper function to get full image URL
export function getImageUrl(imagePath: string): string {
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ||
    "http://localhost:5000";
  return `${baseUrl}${imagePath}`;
}
