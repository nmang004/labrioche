import { Suspense, ReactNode } from 'react'
import { 
  ProductCardSkeleton, 
  OrderCardSkeleton, 
  FormSkeleton, 
  TableSkeleton,
  HeroSkeleton,
  CartItemSkeleton,
  CategoryTabsSkeleton,
  ReviewSkeleton
} from './skeleton-variants'
import { Skeleton } from './skeleton'

interface SuspenseWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  type?: 'default' | 'products' | 'orders' | 'form' | 'table' | 'hero' | 'cart' | 'categories' | 'reviews'
  count?: number
}

const fallbackComponents = {
  default: <Skeleton className="h-32 w-full" />,
  products: (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  ),
  orders: (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </div>
  ),
  form: <FormSkeleton />,
  table: <TableSkeleton />,
  hero: <HeroSkeleton />,
  cart: (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <CartItemSkeleton key={i} />
      ))}
    </div>
  ),
  categories: <CategoryTabsSkeleton />,
  reviews: (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <ReviewSkeleton key={i} />
      ))}
    </div>
  ),
}

export function SuspenseWrapper({ 
  children, 
  fallback, 
  type = 'default',
  count 
}: SuspenseWrapperProps) {
  const getFallback = () => {
    if (fallback) return fallback
    
    if (count && type === 'products') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )
    }
    
    if (count && type === 'orders') {
      return (
        <div className="space-y-4">
          {Array.from({ length: count }).map((_, i) => (
            <OrderCardSkeleton key={i} />
          ))}
        </div>
      )
    }
    
    return fallbackComponents[type]
  }

  return (
    <Suspense fallback={getFallback()}>
      {children}
    </Suspense>
  )
}

// Specific wrappers for common use cases
export function ProductsSuspense({ children, count = 8 }: { children: ReactNode; count?: number }) {
  return (
    <SuspenseWrapper type="products" count={count}>
      {children}
    </SuspenseWrapper>
  )
}

export function OrdersSuspense({ children, count = 5 }: { children: ReactNode; count?: number }) {
  return (
    <SuspenseWrapper type="orders" count={count}>
      {children}
    </SuspenseWrapper>
  )
}

export function FormSuspense({ children }: { children: ReactNode }) {
  return (
    <SuspenseWrapper type="form">
      {children}
    </SuspenseWrapper>
  )
}

export function CartSuspense({ children }: { children: ReactNode }) {
  return (
    <SuspenseWrapper type="cart">
      {children}
    </SuspenseWrapper>
  )
}

export function HeroSuspense({ children }: { children: ReactNode }) {
  return (
    <SuspenseWrapper type="hero">
      {children}
    </SuspenseWrapper>
  )
}