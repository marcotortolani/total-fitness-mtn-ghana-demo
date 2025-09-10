import { Skeleton } from './skeleton'

export default function ShortCardSkeleton() {
  return (
    <div className="w-full sm:w-1/2 px-6 md:px-10 lg:px-16 py-12 flex items-center justify-center space-x-4 bg-Primary rounded-xl">
      <Skeleton className="h-12 aspect-square rounded-full bg-Secondary bg-opacity-50" />
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-full md:w-5/6 bg-Secondary bg-opacity-50" />
        <Skeleton className="h-4 w-2/3 md:w-2/5 bg-Secondary bg-opacity-50" />
      </div>
    </div>
  )
}
