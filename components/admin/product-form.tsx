"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  productFormSchema,
  type CreateProductFormData,
} from "@/lib/validations/product-schema";
import { useProductStore, type Product } from "@/lib/product-store";
import { toast } from "sonner";

interface ProductFormProps {
  product?: Product; // If provided, form is in edit mode
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ProductForm({
  product,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const isEditMode = !!product;

  // Existing images (from product)
  const [existingImages, setExistingImages] = useState<string[]>(
    product?.images || []
  );
  // New images to upload
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  const createProduct = useProductStore((state) => state.createProduct);
  const updateProductWithImages = useProductStore(
    (state) => state.updateProductWithImages
  );
  const loading = useProductStore((state) => state.loading);

  // Modified schema for edit mode - make images optional
  const editFormSchema = productFormSchema.omit({ images: true });

  const form = useForm<
    CreateProductFormData | Omit<CreateProductFormData, "images">
  >({
    resolver: zodResolver(isEditMode ? editFormSchema : productFormSchema),
    defaultValues: isEditMode
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          subCategory: product.subCategory,
          gender: product.gender,
          stock: product.stock,
          rating: product.rating,
          isFlashSale: product.isFlashSale,
          discount: product.discount,
          isActive: product.isActive,
        }
      : {
          name: "",
          description: "",
          price: 0,
          category: "fashion",
          subCategory: null,
          gender: null,
          stock: 0,
          rating: 0,
          isFlashSale: false,
          discount: 0,
          isActive: true,
          images: [],
        },
  });

  // Update existing images when product changes
  useEffect(() => {
    if (product?.images) {
      setExistingImages(product.images);
    }
  }, [product]);

  // Handle new image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const totalImages =
      existingImages.length + newImages.length + fileArray.length;

    // Limit to 5 images total
    if (totalImages > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    // Add new files
    const updatedNewImages = [...newImages, ...fileArray];
    setNewImages(updatedNewImages);

    // Update form field for create mode validation
    if (!isEditMode) {
      form.setValue("images", updatedNewImages as any);
    }

    // Create previews for new images
    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove existing image
  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove new image
  const removeNewImage = (index: number) => {
    const updatedImages = newImages.filter((_, i) => i !== index);
    setNewImages(updatedImages);
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));

    // Update form field for create mode validation
    if (!isEditMode) {
      form.setValue("images", updatedImages as any);
    }
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    console.log("🚀 Form submitted!", { isEditMode, data });
    try {
      if (isEditMode) {
        // Edit mode
        const totalImages = existingImages.length + newImages.length;
        if (totalImages < 1) {
          toast.error("Product must have at least 1 image");
          return;
        }

        const updatedProduct = await updateProductWithImages(
          product._id,
          data,
          newImages,
          existingImages
        );

        if (updatedProduct) {
          toast.success("Product updated successfully!");
          onSuccess?.();
        } else {
          toast.error("Failed to update product");
        }
      } else {
        // Create mode
        console.log("📦 Creating product with data:", data);
        const { images, ...productData } = data;
        console.log("📸 Images:", images);
        console.log("📝 Product data:", productData);

        const createdProduct = await createProduct(productData, images);

        if (createdProduct) {
          toast.success("Product created successfully!");
          form.reset();
          setNewImages([]);
          setNewImagePreviews([]);
          form.setValue("images", []);
          onSuccess?.();
        } else {
          toast.error("Failed to create product");
        }
      }
    } catch (error: any) {
      console.error("❌ Error submitting form:", error);
      toast.error(
        error.message || `Failed to ${isEditMode ? "update" : "create"} product`
      );
    }
  };

  const totalImageCount = existingImages.length + newImages.length;

  // Error handler to debug validation issues
  const onError = (errors: any) => {
    console.error("❌ Form validation errors:", errors);
    toast.error("Please fix the form errors before submitting");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="space-y-6"
      >
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product name"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (৳) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* <SelectItem value="electronics">Electronics</SelectItem> */}
                    <SelectItem value="fashion">Fashion</SelectItem>
                    {/* <SelectItem value="beauty">Beauty</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="home">Home</SelectItem> */}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sub Category */}
          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value === "none" ? null : value)
                  }
                  defaultValue={field.value || "none"}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="gents">Gents</SelectItem>
                    <SelectItem value="ladies">Ladies</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={(value) =>
                    field.onChange(value === "none" ? null : value)
                  }
                  defaultValue={field.value || "none"}
                  disabled={loading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="gents">Gents</SelectItem>
                    <SelectItem value="ladies">Ladies</SelectItem>
                    <SelectItem value="unisex">Unisex</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rating */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (0-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="0.0"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Discount */}
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    placeholder="0"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(isNaN(value) ? 0 : value);
                    }}
                    disabled={loading}
                  />
                </FormControl>
                <FormDescription>
                  Enter discount percentage (0-100)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter detailed product description"
                  rows={4}
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormDescription>
                Maximum 2000 characters ({field.value?.length || 0}/2000)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload/Management */}
        {!isEditMode ? (
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Images *</FormLabel>

                {/* Upload Button */}
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={loading || totalImageCount >= 5}
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Images
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {totalImageCount}/5 images
                  </span>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={loading}
                />

                {/* New Image Previews */}
                {newImagePreviews.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Selected Images</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {newImagePreviews.map((preview, index) => (
                        <Card key={`new-${index}`} className="relative group">
                          <CardContent className="p-2">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeNewImage(index)}
                              disabled={loading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Images State */}
                {totalImageCount === 0 && (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      No images uploaded yet. Click "Upload Images" to add 1-5
                      images.
                    </p>
                  </div>
                )}

                <FormDescription>
                  Upload 1-5 product images (JPG, PNG, or WebP)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <div className="space-y-4">
            <FormLabel>Product Images *</FormLabel>

            {/* Upload Button */}
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                disabled={loading || totalImageCount >= 5}
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Images
              </Button>
              <span className="text-sm text-muted-foreground">
                {totalImageCount}/5 images
              </span>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
              disabled={loading}
            />

            {/* Existing Images (Edit Mode) */}
            {existingImages.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Current Images</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {existingImages.map((imagePath, index) => (
                    <Card key={`existing-${index}`} className="relative group">
                      <CardContent className="p-2">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMG_URL}/${imagePath}`}
                          alt={`Existing ${index + 1}`}
                          width={200}
                          height={128}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeExistingImage(index)}
                          disabled={loading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* New Image Previews */}
            {newImagePreviews.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">New Images</p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {newImagePreviews.map((preview, index) => (
                    <Card key={`new-${index}`} className="relative group">
                      <CardContent className="p-2">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeNewImage(index)}
                          disabled={loading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <FormDescription>
              Upload 1-5 product images (JPG, PNG, or WebP)
            </FormDescription>
          </div>
        )}

        {/* Checkboxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flash Sale */}
          <FormField
            control={form.control}
            name="isFlashSale"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Flash Sale</FormLabel>
                  <FormDescription>
                    Mark this product as a flash sale item
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {/* Active Status */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={loading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Active</FormLabel>
                  <FormDescription>
                    Make this product visible to customers
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update Product"
                : "Create Product"}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
