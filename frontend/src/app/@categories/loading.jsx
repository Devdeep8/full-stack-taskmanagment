export default function CategoriesLoading() {
  return (
    <div className="max-w-7xl mx-auto mt-4">
      <div className="flex gap-4 px-4 py-3 items-center animate-pulse">
        
        {/* Home Skeleton */}
        <div className="h-8 w-16 rounded-md bg-category/40" />

        {/* Category Skeletons */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 rounded-md bg-category/40"
          />
        ))}
        
      </div>
    </div>
  );
}
