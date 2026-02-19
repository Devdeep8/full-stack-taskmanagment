export default function Loading() {
  return (
    <div className="min-h-screen max-w-7xl w-full mx-auto bg-alert/50 p-8 flex flex-col gap-4">
      {/* Header Skeleton */}
      <div className="h-12 w-1/3 bg-alert/60 rounded-md animate-pulse" />
      
      {/* Content Skeletons */}
      <div className="flex flex-col gap-6 mt-8">
        <div className="h-32 w-full bg-alert/60 rounded-xl animate-pulse" />
        <div className="h-32 w-full bg-alert/60 rounded-xl animate-pulse" />
        
        {/* Smaller text lines */}
        <div className="space-y-3">
          <div className="h-4 w-3/4 bg-alert/60 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-alert/60 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}