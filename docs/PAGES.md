# Pages Documentation

## Overview
This document provides details about all the pages in the La Brioche application, their features, and implementation notes.

## Homepage (`/`)
**File:** `app/page.tsx`

### Features:
- **Hero Section**: Full-width banner with gradient overlay and CTAs
- **Quick Info Bar**: Displays hours, location, and phone number
- **Featured Products**: Dynamically loads featured products from Sanity
- **About Section**: Brief introduction with link to full story
- **Order CTA**: Encourages users to order online or create an account

### Data Sources:
- Featured products from Sanity via `FEATURED_PRODUCTS_QUERY`

### Key Components:
- `ProductCard` for displaying products
- `ProductCardSkeleton` for loading states
- `Button` components for CTAs

## Menu (`/menu`)
**File:** `app/menu/page.tsx`

### Features:
- **Category Tabs**: Dynamic tabs based on Sanity categories
- **Product Grid**: Responsive grid layout for products
- **Loading States**: Skeleton loaders while fetching data
- **Custom Orders**: Information section about custom orders

### Data Sources:
- Products and categories from Sanity
- Products grouped by category for display

### Key Components:
- `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` for navigation
- `ProductCard` for product display
- `ProductCardSkeleton` for loading states

## Our Story (`/our-story`)
**File:** `app/our-story/page.tsx`

### Features:
- **CMS Integration**: Loads content from Sanity with fallback
- **Rich Text Support**: Uses Portable Text for dynamic content
- **Values Section**: Three pillars with icons
- **Team Introduction**: Master baker section
- **Responsive Images**: Placeholder for team/bakery photos

### Data Sources:
- Page content from Sanity via `PAGE_QUERY`
- Fallback content if CMS is unavailable

### Key Components:
- `PortableText` for rendering rich content
- Custom components for headings, images, and links

## Contact (`/contact`)
**File:** `app/contact/page.tsx`

### Features:
- **Contact Information**: Address, hours, phone, email
- **Contact Form**: Name, email, phone, message fields
- **Map Placeholder**: Space for future Google Maps integration
- **Additional Info Cards**: Catering, custom orders, gift cards

### Implementation Notes:
- Client component for form interactivity
- Form validation and error handling
- Success/error message display
- Metadata handled via `layout.tsx`

### Key Components:
- `Card` components for information sections
- `Input` components with validation
- `Button` with loading state

## Layout Components

### Header (`components/layout/header.tsx`)
- **Desktop Navigation**: Horizontal menu for larger screens
- **Mobile Menu**: Sheet drawer for mobile navigation
- **Shopping Cart Icon**: With badge for item count (placeholder)
- **User Account Icon**: Links to account pages

### Footer (`components/layout/footer.tsx`)
- **Brand Section**: Logo and description
- **Quick Links**: Navigation to main pages
- **Hours**: Business hours display
- **Contact Info**: Address, phone, email
- **Social Links**: Facebook and Instagram icons
- **Legal Links**: Privacy policy and terms

## Routing Structure
```
/
├── /menu
├── /our-story
├── /contact
├── /account (future)
│   ├── /login
│   ├── /signup
│   └── /my-orders
├── /checkout (future)
├── /privacy (future)
└── /terms (future)
```

## SEO & Metadata
- Each page has custom metadata
- Open Graph tags configured in root layout
- Dynamic title template: `%s | La Brioche`
- Descriptive meta descriptions for each page

## Performance Considerations
- Server Components used where possible
- Suspense boundaries for async data
- Image optimization with Next.js Image
- Loading skeletons for better UX

## Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators on interactive elements
- Screen reader friendly content

## Future Enhancements
- Google Maps integration for contact page
- Real product images from Sanity
- Newsletter signup integration
- Live chat support
- Multi-language support (French/English)

---

Last Updated: December 2024
Page Count: 4 main pages + layout components