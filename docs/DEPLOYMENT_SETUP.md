# La Brioche - Complete Setup & Deployment Guide

This guide provides step-by-step instructions to set up the La Brioche project on your local machine and deploy it to production.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0 or higher) - comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Vercel CLI** (optional, for deployment) - `npm install -g vercel`

## 1. Repository Setup

### Clone the Repository
```bash
git clone [your-repo-url]
cd labrioche
```

### Install Dependencies
```bash
npm install
```

## 2. Environment Variables Setup

Create the following environment files:

### `.env.local` (for local development)
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_tracking_id

# Sentry (Optional - for error tracking)
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project
```

### `.env.production` (for production deployment)
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_supabase_service_role_key

# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_tracking_id

# Sentry
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project
```

## 3. Supabase Setup

### 3.1 Create a Supabase Project
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key from Settings > API

### 3.2 Database Schema Setup

Run the following SQL commands in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
  pickup_time TIMESTAMPTZ,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL, -- Sanity product ID
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price NUMERIC(10,2) NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  customizations JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS policies
-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Orders policies
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
    )
  );

CREATE POLICY "Users can insert order items" ON public.order_items
  FOR INSERT WITH CHECK (true);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create functions and triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3.3 Storage Setup (Optional)
If you plan to store user avatars in Supabase:

```sql
-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Create policy for avatar uploads
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 4. Sanity CMS Setup

### 4.1 Create a Sanity Project
1. Go to [Sanity.io](https://sanity.io)
2. Create a new project
3. Choose a project ID and dataset name (usually 'production')

### 4.2 Schema Setup

Create the following schema files in your Sanity Studio:

#### schemas/product.js
```javascript
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
      validation: Rule => Rule.required()
    },
    {
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'allergens',
      title: 'Allergens',
      type: 'array',
      of: [{type: 'string'}]
    }
  ]
}
```

#### schemas/category.js
```javascript
export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0
    }
  ]
}
```

## 5. Local Development

### 5.1 Start Development Server
```bash
npm run dev
```

Your application will be available at `http://localhost:3000`

### 5.2 Development Commands

```bash
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run typecheck

# Run tests
npm test

# Run E2E tests
npm run test:e2e

# Performance tests
npm run test:performance

# Accessibility tests
npm run test:accessibility
```

## 6. Production Deployment

### 6.1 Vercel Deployment (Recommended)

#### Option A: Deploy via Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure environment variables in the Vercel dashboard
5. Deploy

#### Option B: Deploy via CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### 6.2 Environment Variables in Vercel
In your Vercel project settings, add all the environment variables from your `.env.production` file.

### 6.3 Custom Domain Setup
1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions

## 7. Essential Configuration Files

### 7.1 Prettier Configuration (`.prettierrc.json`)
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100
}
```

### 7.2 Husky Git Hooks (`.husky/pre-commit`)
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run format
npm run lint
npm run typecheck
```

## 8. Testing Setup

### 8.1 Playwright Configuration
The project includes Playwright for E2E testing. Tests are located in the `tests/` directory.

```bash
# Install Playwright browsers
npx playwright install

# Run all tests
npm test

# Run specific test suites
npm run test:e2e
npm run test:performance
npm run test:accessibility

# Run tests in headed mode (with browser UI)
npm run test:headed

# Run tests with UI mode
npm run test:ui
```

## 9. Monitoring & Analytics

### 9.1 Error Tracking with Sentry
1. Create a Sentry account and project
2. Add Sentry environment variables
3. Error tracking is automatically configured

### 9.2 Analytics with Google Analytics 4
1. Create a GA4 property
2. Add your measurement ID to environment variables
3. Analytics tracking is automatically enabled

## 10. Performance Optimization

### 10.1 Built-in Optimizations
- Next.js Image optimization
- Automatic code splitting
- Static generation where possible
- Bundle analysis available with `npm run analyze`

### 10.2 Lighthouse Targets
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

## 11. Security Checklist

- ✅ Environment variables properly configured
- ✅ Supabase RLS policies enabled
- ✅ API routes protected
- ✅ Input validation in place
- ✅ HTTPS enforced in production
- ✅ No sensitive data in client-side code

## 12. Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript
npm run typecheck
```

#### Environment Variable Issues
- Ensure all required variables are set
- Restart development server after changes
- Check variable names match exactly (case-sensitive)

#### Database Connection Issues
- Verify Supabase URL and keys
- Check RLS policies
- Ensure tables exist with correct schema

#### Sanity CMS Issues
- Verify project ID and dataset
- Check API token permissions
- Ensure schema matches type definitions

### Getting Help

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [Supabase documentation](https://supabase.com/docs)
- Consult [Sanity documentation](https://www.sanity.io/docs)
- Check project issues in the repository

## 13. Maintenance

### Regular Tasks
- Update dependencies monthly: `npm update`
- Review and rotate API keys quarterly
- Monitor error rates in Sentry
- Check performance metrics in Vercel Analytics
- Backup database regularly

### Updates
- Follow Next.js update guide for major versions
- Test all functionality after updates
- Update TypeScript definitions as needed

---

**Note**: This guide assumes you have basic knowledge of Next.js, React, and modern web development practices. For additional help, refer to the official documentation of each service used in this project.