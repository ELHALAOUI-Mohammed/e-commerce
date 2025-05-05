import { Skeleton } from "@/components/ui/skeleton"

export function HomeLoading() {
  return (
    <div className="flex gap-7 space-y-3">
      <Skeleton className="h-[365px] w-[500px] rounded-xl" />
      <Skeleton className="h-[365px] w-[500px] rounded-xl" />
      <Skeleton className="h-[365px] w-[500px] rounded-xl" />
    
    </div>
  )
}
