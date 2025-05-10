import { Skeleton } from "@/components/ui/skeleton"

export function ProductLoading() {
  return (
    <>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-4 group">
          {/* Image Skeleton with shimmer */}
          <div className="relative overflow-hidden rounded-xl">
            <Skeleton className="h-64 w-full rounded-xl bg-gray-100 dark:bg-gray-800" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-gray-900/30 animate-[shimmer_1.5s_infinite]" />
          </div>
          
          {/* Text Content Skeletons */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4 bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800" />
          </div>
          
          {/* Price & Button Skeleton */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-16 bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="h-9 w-24 rounded-full bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
</>
)
}