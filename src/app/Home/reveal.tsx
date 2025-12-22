const ProductSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      {/* Image Skeleton */}
      <div className="relative h-64 bg-gray-200 rounded-t-lg animate-shimmer" />

      {/* Content Skeleton */}
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4 animate-shimmer" />
        <div className="h-4 bg-gray-200 rounded w-full animate-shimmer" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-shimmer" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
