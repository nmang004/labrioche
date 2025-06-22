import { Skeleton } from './skeleton'
import { cn } from '@/lib/utils/cn'

interface SkeletonVariantProps {
  className?: string
}

export function ProductCardSkeleton({ className }: SkeletonVariantProps) {
  return (
    <div className={cn("space-y-4 p-4 border border-border rounded-lg", className)}>
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-9 w-24 rounded" />
      </div>
    </div>
  )
}

export function OrderCardSkeleton({ className }: SkeletonVariantProps) {
  return (
    <div className={cn("flex justify-between items-center p-4 border border-border rounded", className)}>
      <div className="space-y-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="text-right space-y-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  )
}

export function HeaderSkeleton({ className }: SkeletonVariantProps) {
  return (
    <div className={cn("flex justify-between items-center p-4", className)}>
      <Skeleton className="h-8 w-32" />
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  )
}

export function NavigationSkeleton({ className }: SkeletonVariantProps) {
  return (
    <div className={cn("flex space-x-6", className)}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-16" />
      ))}
    </div>
  )
}

export function FormSkeleton({ className, fields = 4 }: SkeletonVariantProps & { fields?: number }) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-24" />
    </div>
  )
}

export function TableSkeleton({ className, rows = 5, columns = 4 }: SkeletonVariantProps & { rows?: number; columns?: number }) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Table Header */}
      <div className="flex space-x-4 p-4 border-b">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      
      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4 p-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function HeroSkeleton({ className }: SkeletonVariantProps) {
  return (
    <div className={cn("relative h-96 bg-muted", className)}>
      <Skeleton className="w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
          <Skeleton className="h-10 w-32 mx-auto" />
        </div>
      </div>
    </div>
  )
}

export function CartItemSkeleton({ className }: SkeletonVariantProps) {
  return (
    <div className={cn("flex justify-between items-center py-4", className)}>
      <div className="flex items-center space-x-3">
        <Skeleton className="h-12 w-12 rounded" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  )
}

export function CategoryTabsSkeleton({ className, count = 5 }: SkeletonVariantProps & { count?: number }) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-2", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-10 w-24 rounded-full" />
      ))}
    </div>
  )
}

export function ReviewSkeleton({ className }: SkeletonVariantProps) {
  return (
    <div className={cn("space-y-3 p-4 border border-border rounded-lg", className)}>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-16 w-full" />
    </div>
  )
}