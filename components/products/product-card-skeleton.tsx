export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden h-full flex flex-col">
      {/* Image Skeleton */}
      <div className="bg-muted h-48 rounded-lg mb-4 animate-pulse" />

      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col space-y-3">
        {/* Product Name Skeleton - Single Line */}
        <div className="h-7 w-full bg-muted rounded animate-pulse" />

        {/* Rating Skeleton */}
        <div className="h-4 w-24 bg-muted rounded animate-pulse" />

        {/* Price and Button Section */}
        <div className="flex items-center justify-between mt-auto">
          {/* Price Skeleton */}
          <div className="flex flex-col gap-1">
            <div className="h-6 w-20 bg-muted rounded animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          </div>

          {/* Button Skeleton */}
          <div className="h-10 w-10 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
