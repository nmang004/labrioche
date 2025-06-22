# La Brioche Project Architecture & MCP Integration

## Project Overview
La Brioche is a modern, high-performance web application for an artisan French bakery in Norfolk, VA. Built with Next.js 14+, TypeScript, Tailwind CSS, Supabase, and Sanity.io.

## Tech Stack
- **Frontend**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Authentication & Database**: Supabase
- **CMS**: Sanity.io
- **State Management**: Zustand
- **Icons**: Lucide React
- **Testing**: Playwright (E2E)
- **Monitoring**: Sentry
- **Code Quality**: ESLint, Prettier, Husky

## MCP Integration Strategy

### 1. Serena MCP - Code Analysis
**Usage**: Run before major refactoring and during code reviews
- Analyze component architecture before implementing new features
- Security audit on authentication flows and payment processing
- Performance analysis on critical paths (menu loading, checkout)
- Pattern detection for React best practices

**Key Commands**:
```bash
# Analyze component structure
serena analyze components/

# Security audit
serena security-check app/auth/
serena security-check app/checkout/

# Performance optimization
serena performance app/menu/page.tsx
```

### 2. Context7 MCP - Documentation
**Usage**: Real-time documentation for framework updates
- Next.js 14+ App Router patterns
- Supabase Auth v2 implementation
- Sanity.io v3 best practices
- Zustand state management patterns

**Key Areas**:
- Server Components vs Client Components decisions
- Data fetching patterns (static vs dynamic)
- Authentication flow implementation
- CMS integration patterns

### 3. GitHub MCP - Repository Management
**Usage**: Automated PR creation and issue tracking
- Generate comprehensive PR descriptions
- Automated issue labeling
- Branch management for features

**Workflow**:
1. Feature branches: `feature/[phase]-[feature-name]`
2. PR template includes testing checklist
3. Automated code review comments via Serena integration

### 4. Memory MCP - Persistent Context
**Usage**: Track architectural decisions and patterns
- Design system conventions (color palette, spacing)
- API response formats
- Component naming patterns
- Business logic rules (order minimums, delivery zones)

**Key Memory Points**:
- French artisan bakery aesthetic
- Norfolk, VA location specifics
- Order ahead functionality requirements
- Mobile-first responsive approach

### 5. Playwright MCP - E2E Testing
**Usage**: Comprehensive testing suite
- User flows: Browse → Add to Cart → Checkout
- Authentication flows
- Order history access
- Mobile responsiveness testing

**Test Scenarios**:
```typescript
// Critical paths to test
- Homepage load and navigation
- Menu browsing and filtering
- Add to cart functionality
- Guest vs authenticated checkout
- Order confirmation and history
- Mobile menu navigation
```

### 6. Sentry MCP - Error Tracking
**Usage**: Production monitoring
- Track checkout failures
- Monitor API response times
- User experience metrics
- Performance budgets

**Key Metrics**:
- Page load times < 3s
- Cart operations < 500ms
- Zero checkout failures
- 99.9% uptime target

## Architecture Patterns

### Dynamic UI Based on Auth Status
```typescript
// Dynamic order button component
const OrderButton = () => {
  const user = useAuth();
  
  if (!user) {
    return <LoginPrompt />;
  }
  
  if (user.hasOrders) {
    return <ReorderButton lastOrder={user.lastOrder} />;
  }
  
  return <StandardOrderButton />;
};
```

### Content Management Structure
```typescript
// Sanity schemas
- product: { name, slug, image, price, description, category, availability }
- category: { title, description, displayOrder }
- page: { title, body, seo }
- promotion: { title, content, active, startDate, endDate }
```

### Database Schema
```sql
-- Supabase tables
profiles (
  id uuid references auth.users,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz
)

orders (
  id uuid primary key,
  user_id uuid references profiles,
  order_number text unique,
  total_price numeric,
  status text, -- pending, confirmed, ready, completed
  pickup_time timestamptz,
  notes text,
  created_at timestamptz
)

order_items (
  id uuid primary key,
  order_id uuid references orders,
  product_id text, -- Sanity product ID
  product_name text,
  quantity integer,
  price numeric,
  customizations jsonb
)
```

## Documentation Guidelines

### Documentation Structure
All project documentation should be maintained in the `/docs` directory:
- `/docs/PROJECT_PLAN.md` - Main project plan with checkboxes for tracking progress
- `/docs/API.md` - API documentation (when applicable)
- `/docs/DEPLOYMENT.md` - Deployment instructions
- `/docs/TESTING.md` - Testing strategies and instructions
- `/docs/ARCHITECTURE.md` - Detailed architecture decisions

### Documentation Standards
- Use Markdown for all documentation
- Include checkboxes for trackable tasks
- Keep documentation up-to-date with code changes
- Add diagrams where helpful (Mermaid syntax supported)
- Version and date all major documentation updates

## Development Workflow

### Phase Execution Order
1. **Phase 0**: Environment setup ✓
2. **Phase 1**: Data modeling (Sanity + Supabase)
3. **Phase 2**: UI component library
4. **Phase 3**: Static pages with CMS integration
5. **Phase 4**: E-commerce functionality
6. **Phase 5**: Advanced features (personalization, promotions)
7. **Phase 6**: Testing, optimization, deployment prep

### Code Quality Checklist
- [ ] Run Serena analysis before commits
- [ ] Prettier formatting on all files
- [ ] ESLint passes with no warnings
- [ ] Playwright tests pass
- [ ] Lighthouse score > 90
- [ ] No console.logs in production
- [ ] Environment variables documented

### Performance Targets
- First Contentful Paint: < 1.2s
- Largest Contentful Paint: < 2.5s
- Total Bundle Size: < 200KB (gzipped)
- Image Optimization: Next.js Image component
- Font Loading: Variable fonts with font-display: swap

## Security Considerations
- Supabase RLS policies on all tables
- API routes validate user permissions
- Sanitize user inputs
- HTTPS only
- Environment variables never exposed
- Payment processing via secure third-party

## Monitoring & Analytics
- Sentry for error tracking
- Google Analytics 4 for user behavior
- Vercel Analytics for performance
- Custom events for conversion tracking

## Deployment Strategy
- Vercel for Next.js hosting
- Supabase cloud for database
- Sanity.io cloud for CMS
- Environment-based configurations
- Automated deployments via GitHub Actions

## Future Enhancements
- Loyalty program integration
- SMS notifications for order ready
- Seasonal menu automation
- Inventory management system
- Multi-location support