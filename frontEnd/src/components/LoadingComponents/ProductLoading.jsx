import { Skeleton } from "@/components/ui/skeleton"

export function ProductLoading() {
  return (
    <>
    <div className="flex gap-7 space-y-3">
      <Skeleton className="h-[300px] w-[445px] rounded-xl" />
      <Skeleton className="h-[300px] w-[445px] rounded-xl" />
      <Skeleton className="h-[300px] w-[445px] rounded-xl" />
      <Skeleton className="h-[300px] w-[445px] rounded-xl" />
      
    </div>
    <div className="flex gap-7 space-y-3">
      <Skeleton className="h-[300px] w-[445px] rounded-xl" />
      <Skeleton className="h-[300px] w-[445px] rounded-xl" />
      <Skeleton className="h-[300px] w-[445px] rounded-xl" />
      <Skeleton className="h-[300px] w-[445px] rounded-xl" />
      
    </div>
    <div className="flex gap-7 space-y-3">
      <Skeleton className="h-[300px] w-[445px] rounded-xl" />
      <Skeleton className="h-[300px] w-[445px] rounded-xl" />
      
    </div>
    </>
  )
}
