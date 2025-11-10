import { create } from "zustand";
import {
  getProductsAxios,
  getProductByIdAxios,
  getProductsByCategoryAxios,
  getFlashSaleProductsAxios,
  getBestsellersAxios,
  createProductWithImagesAxios,
  updateProductAxios,
  updateProductImagesAxios,
  hardDeleteProductAxios,
  type Product,
  type ProductFilters,
  type CreateProductData,
  type UpdateProductData,
} from "./api";

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;

  // Fetch products
  fetchProducts: (filters?: ProductFilters) => Promise<void>;
  fetchProductById: (id: string) => Promise<Product | null>;
  fetchProductsByCategory: (
    category: string,
    limit?: number
  ) => Promise<Product[]>;
  fetchFlashSaleProducts: (limit?: number) => Promise<Product[]>;
  fetchBestsellers: (limit?: number) => Promise<Product[]>;

  // Admin operations
  createProduct: (
    productData: CreateProductData,
    images: File[]
  ) => Promise<Product | null>;
  updateProduct: (id: string, updates: UpdateProductData) => Promise<boolean>;
  updateProductWithImages: (
    id: string,
    productData: UpdateProductData,
    newImages: File[],
    existingImages: string[]
  ) => Promise<Product | null>;
  deleteProduct: (id: string) => Promise<boolean>;

  // Local search (from already fetched products)
  searchProducts: (query: string) => Product[];
  getProductsByCategory: (category: string) => Product[];
}

export const useProductStore = create<ProductStore>()((set, get) => ({
  products: [],
  loading: false,
  error: null,

  // Fetch all products with filters
  fetchProducts: async (filters) => {
    set({ loading: true, error: null });
    try {
      const data = await getProductsAxios(filters);
      set({ products: data.products, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch products",
        loading: false,
      });
    }
  },

  // Fetch single product
  fetchProductById: async (id) => {
    set({ loading: true, error: null });
    try {
      const product = await getProductByIdAxios(id);
      set({ loading: false });
      return product;
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch product",
        loading: false,
      });
      return null;
    }
  },

  // Fetch products by category
  fetchProductsByCategory: async (category, limit) => {
    set({ loading: true, error: null });
    try {
      const products = await getProductsByCategoryAxios(category, limit);
      set({ loading: false });
      return products;
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch products",
        loading: false,
      });
      return [];
    }
  },

  // Fetch flash sale products
  fetchFlashSaleProducts: async (limit) => {
    set({ loading: true, error: null });
    try {
      const products = await getFlashSaleProductsAxios(limit);
      set({ loading: false });
      return products;
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch flash sale products",
        loading: false,
      });
      return [];
    }
  },

  // Fetch bestsellers
  fetchBestsellers: async (limit) => {
    set({ loading: true, error: null });
    try {
      const products = await getBestsellersAxios(limit);
      set({ loading: false });
      return products;
    } catch (error: any) {
      set({
        error: error.message || "Failed to fetch bestsellers",
        loading: false,
      });
      return [];
    }
  },

  // Create product (Admin)
  createProduct: async (productData, images) => {
    set({ loading: true, error: null });
    try {
      const product = await createProductWithImagesAxios(productData, images);
      set((state) => ({
        products: [...state.products, product],
        loading: false,
      }));
      return product;
    } catch (error: any) {
      set({
        error: error.message || "Failed to create product",
        loading: false,
      });
      return null;
    }
  },

  // Update product (Admin)
  updateProduct: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const product = await updateProductAxios(id, updates);
      set((state) => ({
        products: state.products.map((p) => (p._id === id ? product : p)),
        loading: false,
      }));
      return true;
    } catch (error: any) {
      set({
        error: error.message || "Failed to update product",
        loading: false,
      });
      return false;
    }
  },

  // Update product with images (Admin)
  updateProductWithImages: async (
    id,
    productData,
    newImages,
    existingImages
  ) => {
    set({ loading: true, error: null });
    try {
      // First update product data
      const updatedProduct = await updateProductAxios(id, productData);

      // Then update images if there are changes
      if (newImages.length > 0 || existingImages.length > 0) {
        const productWithImages = await updateProductImagesAxios(
          id,
          newImages,
          existingImages
        );
        set((state) => ({
          products: state.products.map((p) =>
            p._id === id ? productWithImages : p
          ),
          loading: false,
        }));
        return productWithImages;
      }

      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? updatedProduct : p
        ),
        loading: false,
      }));
      return updatedProduct;
    } catch (error: any) {
      set({
        error: error.message || "Failed to update product",
        loading: false,
      });
      return null;
    }
  },

  // Delete product (Admin)
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await hardDeleteProductAxios(id);
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
        loading: false,
      }));
      return true;
    } catch (error: any) {
      set({
        error: error.message || "Failed to delete product",
        loading: false,
      });
      return false;
    }
  },

  // Local search from cached products
  searchProducts: (query) => {
    const products = get().products;
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery)
    );
  },

  // Get products by category from cached products
  getProductsByCategory: (category) => {
    return get().products.filter((p) => p.category === category);
  },
}));

// Re-export Product type for convenience
export type { Product };
