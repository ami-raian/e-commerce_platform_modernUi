"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useProductStore, type Product } from "@/lib/product-store";
import { ProductForm } from "@/components/admin/product-form";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  // Unwrap the params Promise using React's use hook
  const { id } = use(params);

  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.loading);
  const fetchProductById = useProductStore((state) => state.fetchProductById);

  const [product, setProduct] = useState<Product | null>(null);
  const [productLoading, setProductLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Wait for auth to finish loading before checking user
    if (authLoading) return;

    if (!user || user.role !== "admin") {
      router.push("/login");
      return;
    }

    // Fetch product once authenticated
    const loadProduct = async () => {
      setProductLoading(true);
      setError(null);
      try {
        const fetchedProduct = await fetchProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("Product not found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load product");
      } finally {
        setProductLoading(false);
      }
    };

    loadProduct();
  }, [user, authLoading, router, id, fetchProductById]);

  // Show loading spinner while checking authentication or loading product
  if (authLoading || productLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {authLoading ? "Loading..." : "Loading product..."}
          </p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user || user.role !== "admin") {
    return null;
  }

  // Show error if product not found
  if (error || !product) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container-xl">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-serif font-bold mb-2">
                {error || "Product not found"}
              </h2>
              <p className="text-muted-foreground mb-4">
                The product you're looking for doesn't exist or has been
                deleted.
              </p>
              <Link href="/admin" className="btn-primary inline-block">
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSuccess = () => {
    // Redirect back to admin dashboard after successful update
    router.push("/admin");
  };

  const handleCancel = () => {
    // Navigate back to admin dashboard
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container-xl">
        <div>
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-primary hover:underline mb-4"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-serif font-bold text-primary">
              Edit Product
            </h1>
            <p className="text-muted-foreground mt-2">
              Update product information and images
            </p>
          </div>

          {/* Product Form */}
          <div className="bg-card border border-border rounded-lg p-6">
            <ProductForm
              product={product}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
