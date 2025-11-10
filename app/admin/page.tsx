"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { useProductStore, type Product } from "@/lib/product-store";
import { Trash2, Plus } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminDashboard() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const products = useProductStore((state) => state.products);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login");
    } else {
      // Fetch products when admin dashboard loads
      fetchProducts();
    }
  }, [user, router, fetchProducts]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const success = await deleteProduct(id);
      if (success) {
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchProducts(); // Refresh product list
  };

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
              onClick={() => setShowForm(!showForm)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              {showForm ? "Hide Form" : "Add Product"}
            </button>
          </div>

          {/* Product Form */}
          {showForm && (
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-serif font-bold mb-6">
                Add New Product
              </h2>
              <ProductForm
                onSuccess={handleFormSuccess}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

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
                          onClick={() => handleDelete(product._id)}
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
    </div>
  );
}
