"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useProductStore, type Product } from "@/lib/product-store";
import Image from "next/image";
import { getImageUrl } from "@/lib/api";
import { toast } from "sonner";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { products, loading, fetchProductById } = useProductStore();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const p = await fetchProductById(id);
      if (!cancelled) setProduct(p);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [fetchProductById, id]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const addItem = useCartStore((state) => state.addItem);

  const promoCodes: { [key: string]: number } = {
    SAVE5: 5,
    SAVE10: 10,
    SAVE15: 15,
    WELCOME20: 20,
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase();
    if (promoCodes[code]) {
      setDiscount(promoCodes[code]);
      setPromoMessage(`Promo code applied! ${promoCodes[code]}% discount`);
    } else {
      setDiscount(0);
      setPromoMessage("Invalid promo code");
    }
    setTimeout(() => setPromoMessage(""), 3000);
  };

  const calculateFinalPrice = () => {
    if (!product) return 0;
    // Apply promo code discount on top of the already discounted price
    if (discount > 0) {
      return product.price - (product.price * discount) / 100;
    }
    return product.price;
  };
  if (loading && !product) {
    return (
      <div className="container-xl py-8">
        <div className="text-center py-16">
          <h1 className="section-title mb-4">Loading product...</h1>
          <p className="text-muted-foreground">
            Please wait while we load the product.
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-xl py-8">
        <Link
          href="/products"
          className="flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>
        <div className="text-center py-16">
          <h1 className="section-title mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Validate size selection if product has sizes
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image:
        product.images?.[0] ?? (product as any).image ?? "/placeholder.svg",
      size: selectedSize || undefined,
    });

    const sizeInfo = selectedSize ? ` - Size: ${selectedSize}` : "";
    toast.success(`${product.name} added to cart!`, {
      description: `৳${product.price.toLocaleString("en-BD")} - Quantity: ${quantity}${sizeInfo}`,
      duration: 2000,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="container-xl py-8">
      <Link
        href="/products"
        className="flex items-center gap-2 text-primary hover:underline mb-8"
      >
        <ArrowLeft size={20} />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image - main + thumbnails (supports 1-5 images) */}
        <div className="space-y-3">
          <div className="relative bg-accent h-96 rounded-lg overflow-hidden flex items-center justify-center">
            <button
              aria-label="Previous image"
              onClick={() => setSelectedImageIndex((i) => Math.max(0, i - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 text-white rounded-full hover:bg-black/40"
            >
              ‹
            </button>

            <Image
              src={getImageUrl(
                product.images?.[selectedImageIndex] ??
                  product.images?.[0] ??
                  "/placeholder.svg"
              )}
              alt={product.name}
              width={800}
              height={800}
              className="w-full h-full object-cover"
            />

            <button
              aria-label="Next image"
              onClick={() =>
                setSelectedImageIndex((i) =>
                  Math.min((product.images?.length ?? 1) - 1, i + 1)
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/30 text-white rounded-full hover:bg-black/40"
            >
              ›
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {(product.images ?? ["/placeholder.svg"])
              ?.slice(0, 5)
              .map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-16 rounded overflow-hidden border ${
                    selectedImageIndex === idx
                      ? "border-primary"
                      : "border-border"
                  }`}
                >
                  <Image
                    src={getImageUrl(img)}
                    alt={`${product.name} ${idx + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-balance mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-muted-foreground">
              {product.description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "text-border"
                  }
                />
              ))}
            </div>
            <span className="text-lg font-semibold">{product.rating} / 5</span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <p className="text-muted-foreground">Price</p>
              {product.discountPercent > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                  -{Math.round(product.discountPercent)}% OFF
                </span>
              )}
            </div>
            <div className="space-y-2">
              {product.discountPercent > 0 && (
                <p className="text-2xl text-muted-foreground line-through">
                  ৳{product.mainPrice.toLocaleString("en-BD")}
                </p>
              )}
              <p className="text-4xl font-bold text-primary">
                ৳
                {(discount > 0
                  ? calculateFinalPrice()
                  : product.price
                ).toLocaleString("en-BD")}
              </p>
              {product.discountPercent > 0 && discount === 0 && (
                <p className="text-green-600 font-semibold">
                  You save: ৳
                  {(product.mainPrice - product.price).toLocaleString("en-BD")}{" "}
                  ({Math.round(product.discountPercent)}% off)
                </p>
              )}
              {discount > 0 && (
                <p className="text-green-600 font-semibold">
                  Extra promo discount: ৳
                  {(product.price - calculateFinalPrice()).toLocaleString(
                    "en-BD"
                  )}{" "}
                  ({discount}% off with code)
                </p>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">
              {product.stock} in stock
            </span>
          </div>

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Select Size</p>
                {selectedSize && (
                  <span className="text-xs text-primary font-semibold">
                    Selected: {selectedSize}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border hover:border-primary hover:bg-accent"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Quantity</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                −
              </button>
              <span className="w-12 text-center text-xl font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Promo Code Section */}
          <div className="bg-accent/50 border border-border rounded-lg p-4 space-y-3">
            <p className="font-semibold">Have a Promo Code?</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={applyPromoCode}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p
                className={`text-sm font-medium ${
                  promoMessage.includes("Invalid")
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {promoMessage}
              </p>
            )}
            <div className="pt-2 space-y-1">
              <p className="text-xs text-muted-foreground">
                Available promo codes:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                  SAVE5
                </span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                  SAVE10
                </span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                  SAVE15
                </span>
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                  WELCOME20
                </span>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="space-y-8">
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart size={24} />
              Add to Cart
            </button>
            {addedToCart && (
              <p className="text-center text-green-600 font-medium">
                Added to cart!
              </p>
            )}
            <Link
              href="/products"
              className="w-full btn-secondary text-center py-4"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Product Details */}
          <div className="border-t border-border pt-6 space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                Category
              </p>
              <p className="capitalize font-semibold">{product.category}</p>
            </div>
            {product.sizes.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Available Sizes
                </p>
                <p className="font-semibold">{product.sizes.join(", ")}</p>
              </div>
            )}
            {/* <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">
                SKU
              </p>
              <p className="font-mono text-sm">{product._id}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
