# Component Library Documentation

## Overview
This document provides a comprehensive guide to the UI components available in the La Brioche project. All components are built with TypeScript, Tailwind CSS, and follow accessibility best practices.

## Core Components

### Button
**Location:** `components/ui/button.tsx`

**Props:**
- `variant`: 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
- `size`: 'default' | 'sm' | 'lg' | 'icon'
- `loading`: boolean - Shows loading spinner
- `disabled`: boolean

**Usage:**
```tsx
import { Button } from '@/components/ui/button';

<Button variant="primary" size="lg" loading={isLoading}>
  Place Order
</Button>
```

### Input
**Location:** `components/ui/input.tsx`

**Props:**
- `label`: string - Field label
- `error`: string - Error message
- `helperText`: string - Helper text below input
- `required`: boolean - Shows required indicator

**Usage:**
```tsx
import { Input } from '@/components/ui/input';

<Input
  label="Email Address"
  type="email"
  required
  error={errors.email}
  helperText="We'll never share your email"
/>
```

### Card
**Location:** `components/ui/card.tsx`

**Components:**
- `Card` - Container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

**Usage:**
```tsx
import { Card, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### ProductCard
**Location:** `components/ui/product-card.tsx`

**Props:**
- `id`: string - Product ID
- `name`: string - Product name
- `price`: number - Product price
- `image`: string - Image URL
- `description`: string - Product description
- `available`: boolean - Availability status
- `onAddToCart`: (productId: string) => void

**Usage:**
```tsx
import { ProductCard } from '@/components/ui/product-card';

<ProductCard
  id="croissant-001"
  name="Butter Croissant"
  price={4.50}
  image="/images/croissant.jpg"
  description="Flaky, buttery perfection"
  available={true}
  onAddToCart={handleAddToCart}
/>
```

### Dialog
**Location:** `components/ui/dialog.tsx`

**Components:**
- `Dialog` - Root component
- `DialogTrigger` - Trigger element
- `DialogContent` - Modal content
- `DialogHeader` - Header section
- `DialogTitle` - Title
- `DialogDescription` - Description
- `DialogFooter` - Footer section

**Usage:**
```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Order</DialogTitle>
    </DialogHeader>
    <p>Your order details...</p>
  </DialogContent>
</Dialog>
```

### Sheet
**Location:** `components/ui/sheet.tsx`

**Props:**
- `side`: 'top' | 'bottom' | 'left' | 'right' (default: 'right')

**Components:**
- `Sheet` - Root component
- `SheetTrigger` - Trigger element
- `SheetContent` - Drawer content
- `SheetHeader` - Header section
- `SheetTitle` - Title
- `SheetDescription` - Description
- `SheetFooter` - Footer section

**Usage:**
```tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">
      <ShoppingCart className="h-4 w-4" />
    </Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Shopping Cart</SheetTitle>
    </SheetHeader>
    {/* Cart items */}
  </SheetContent>
</Sheet>
```

### Spinner
**Location:** `components/ui/spinner.tsx`

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `className`: string

**Usage:**
```tsx
import { Spinner } from '@/components/ui/spinner';

<Spinner size="lg" />
```

### Skeleton
**Location:** `components/ui/skeleton.tsx`

**Usage:**
```tsx
import { Skeleton } from '@/components/ui/skeleton';

<Skeleton className="h-12 w-full" />
```

### Badge
**Location:** `components/ui/badge.tsx`

**Props:**
- `variant`: 'default' | 'secondary' | 'destructive' | 'outline'

**Usage:**
```tsx
import { Badge } from '@/components/ui/badge';

<Badge variant="secondary">New</Badge>
```

### ProductCardSkeleton
**Location:** `components/ui/product-card-skeleton.tsx`

**Usage:**
```tsx
import { ProductCardSkeleton } from '@/components/ui/product-card-skeleton';

// Loading state
{isLoading ? (
  <ProductCardSkeleton />
) : (
  <ProductCard {...product} />
)}
```

## Design Tokens

### Colors
- **Primary**: French Blue (#002FA7)
- **Secondary**: Warm Beige (#F5E6D3)
- **Accent**: Gold (#FFD700)
- **Destructive**: Soft Red (#DC2626)
- **Background**: Off-white (#FAFAFA)
- **Foreground**: Dark Gray (#333333)

### Spacing
- Base unit: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96

### Typography
- Font families configured in layout.tsx
- Responsive sizing using Tailwind classes

## Accessibility

All components follow WCAG 2.1 AA guidelines:
- Proper ARIA labels and descriptions
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- Color contrast compliance

## Best Practices

1. **Import Paths**: Always use the `@/` alias for imports
2. **Composition**: Prefer composition over customization
3. **Styling**: Use Tailwind classes with the `cn()` utility
4. **TypeScript**: All props are fully typed
5. **Loading States**: Use skeletons for better UX

## Examples

### Form with Validation
```tsx
<form onSubmit={handleSubmit}>
  <Input
    label="Name"
    name="name"
    required
    error={errors.name}
  />
  <Input
    label="Email"
    type="email"
    name="email"
    required
    error={errors.email}
  />
  <Button type="submit" loading={isSubmitting}>
    Submit
  </Button>
</form>
```

### Product Grid with Loading
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {isLoading
    ? Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))
    : products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          onAddToCart={handleAddToCart}
        />
      ))}
</div>
```

---

Last Updated: December 2024
Component Count: 11