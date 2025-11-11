"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { ProductForm } from "@/components/admin/product-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateProductPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.loading);

  useEffect(() => {
    // Wait for auth to finish loading before checking user
    if (authLoading) return;

    if (!user || user.role !== "admin") {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!user || user.role !== "admin") {
    return null;
  }

  const handleSuccess = () => {
    // Redirect back to admin dashboard after successful creation
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
              Create New Product
            </h1>
            <p className="text-muted-foreground mt-2">
              Add a new product to your store
            </p>
          </div>

          {/* Product Form */}
          <div className="bg-card border border-border rounded-lg p-6">
            <ProductForm onSuccess={handleSuccess} onCancel={handleCancel} />
          </div>
        </div>
      </div>
    </div>
  );
}
