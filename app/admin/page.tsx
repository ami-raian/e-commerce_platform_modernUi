"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { useProductStore, type Product } from "@/lib/product-store";
import { Trash2, Plus, Edit, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.loading);
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const deleteProduct = useProductStore((state) => state.deleteProduct);
  const softDeleteProduct = useProductStore((state) => state.softDeleteProduct);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    // Wait for auth to finish loading before checking user
    if (authLoading) return;

    if (!user || user.role !== "admin") {
      router.push("/login");
    } else {
      // Fetch products when admin dashboard loads
      fetchProducts();
    }
  }, [user, authLoading, router, fetchProducts]);

  const handleEdit = (productId: string) => {
    router.push(`/admin/products/${productId}/edit`);
  };

  const handleAddProduct = () => {
    router.push("/admin/products/create");
  };

  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleSoftDelete = async () => {
    if (!productToDelete) return;

    const success = await softDeleteProduct(productToDelete._id);
    if (success) {
      toast.success("Product moved to trash");
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } else {
      toast.error("Failed to delete product");
    }
  };

  const handleHardDelete = async () => {
    if (!productToDelete) return;

    const success = await deleteProduct(productToDelete._id);
    if (success) {
      toast.success("Product permanently deleted");
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } else {
      toast.error("Failed to delete product");
    }
  };

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

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container-xl">
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-primary">
              Admin Dashboard
            </h1>
            <button
              onClick={handleAddProduct}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary text-primary-foreground">
                  <tr>
                    <th className="px-6 py-3 text-left">Image</th>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Category</th>
                    <th className="px-6 py-3 text-left">Stock</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Discount</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-t border-border hover:bg-accent transition-colors"
                    >
                      <td className="px-6 py-4">
                        {product.images && product.images[0] ? (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMG_URL}/${product.images[0]}`}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs">
                            No Image
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium">{product.name}</td>
                      <td className="px-6 py-4">
                        <span className="capitalize">{product.category}</span>
                        {product.subCategory && (
                          <span className="text-xs text-muted-foreground ml-1">
                            ({product.subCategory})
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4">
                        <div>
                          <div>৳{product.price.toLocaleString("en-BD")}</div>
                          {product.discount > 0 && (
                            <div className="text-xs text-green-600">
                              Save {product.discount}%
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {product.discount > 0 ? `${product.discount}%` : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              product.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.isActive ? "Active" : "Inactive"}
                          </span>
                          {product.isFlashSale && (
                            <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800">
                              Flash Sale
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 flex gap-2">
                        <button
                          onClick={() => handleEdit(product._id)}
                          className="p-2 hover:bg-blue-500 hover:text-white rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(product)}
                          className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                          title="Delete product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent rounded-lg">
            <p className="text-sm">Total Products: {products.length}</p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Product
            </DialogTitle>
            <DialogDescription className="space-y-2">
              <p>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{productToDelete?.name}</span>?
              </p>
              <p className="text-sm">
                Choose how you want to delete this product:
              </p>
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-1">Soft Delete</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Move to trash. Can be restored later.
              </p>
              <Button
                variant="outline"
                onClick={handleSoftDelete}
                className="w-full"
              >
                Move to Trash
              </Button>
            </div>

            <div className="p-4 border border-red-200 rounded-lg">
              <h4 className="font-semibold mb-1 text-red-600">
                Permanent Delete
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Delete forever. This cannot be undone.
              </p>
              <Button
                variant="destructive"
                onClick={handleHardDelete}
                className="w-full"
              >
                Delete Forever
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
