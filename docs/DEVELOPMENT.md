# Development Guide

## Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager
- Supabase account
- Sanity.io account

### Environment Setup
1. Clone the repository
2. Copy `.env.local.example` to `.env.local`
3. Fill in your environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure
```
labrioche/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── menu/              # Menu page
│   ├── our-story/         # Our Story page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── ui/               # UI components
│   └── layout/           # Layout components
├── lib/                   # Utilities and clients
│   ├── supabase/         # Supabase clients
│   ├── sanity/           # Sanity client and queries
│   └── utils/            # Helper functions
├── types/                 # TypeScript definitions
├── sanity/               # Sanity schemas
├── supabase/             # Database schema
├── public/               # Static assets
└── docs/                 # Documentation
```

## Key Technologies

### Frontend
- **Next.js 15**: App Router, Server Components
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Headless components
- **Lucide Icons**: Icon library

### Backend
- **Supabase**: Authentication & Database
- **Sanity.io**: Headless CMS
- **Vercel**: Deployment platform

### State Management
- **Zustand**: Client-side state (cart)
- **React Context**: Auth state

## Development Workflow

### Adding a New Component
1. Create component in `components/ui/`
2. Add TypeScript types
3. Document in `docs/COMPONENTS.md`
4. Use the `cn()` utility for styling

### Adding a New Page
1. Create directory in `app/`
2. Add `page.tsx` file
3. Include metadata export
4. Update navigation in Header
5. Document in `docs/PAGES.md`

### Working with Sanity
1. Define schemas in `sanity/schemas/`
2. Add queries to `lib/sanity/queries.ts`
3. Add types to `types/index.ts`
4. Use in pages with proper error handling

### Working with Supabase
1. Update schema in `supabase/schema.sql`
2. Run migrations in Supabase dashboard
3. Use typed clients from `lib/supabase/`
4. Implement Row Level Security

## Code Style

### TypeScript
- Use explicit types
- Avoid `any` type
- Export interfaces for props
- Use type inference where obvious

### React
- Functional components only
- Use hooks for state
- Implement error boundaries
- Memoize expensive operations

### CSS
- Use Tailwind classes
- Follow mobile-first approach
- Use CSS variables for theming
- Avoid inline styles

## Testing

### Running Tests
```bash
npm run test        # Unit tests (when implemented)
npm run test:e2e    # E2E tests with Playwright
```

### Linting
```bash
npm run lint        # ESLint
npm run format      # Prettier
```

## Build & Deployment

### Local Build
```bash
npm run build
npm run start
```

### Production Build
- Commits to `main` trigger automatic deployment
- Environment variables set in Vercel
- Preview deployments for PRs

## Common Tasks

### Update Dependencies
```bash
npm update
npm audit fix
```

### Add New Package
```bash
npm install package-name
npm install -D dev-package-name
```

### Database Migrations
1. Update `supabase/schema.sql`
2. Run in Supabase SQL editor
3. Update TypeScript types
4. Test locally

### CMS Updates
1. Update Sanity schemas
2. Deploy to Sanity Studio
3. Update queries and types
4. Test data fetching

## Troubleshooting

### Common Issues
- **Module not found**: Clear `.next` folder and rebuild
- **Type errors**: Run `npm run typecheck`
- **Styling issues**: Check Tailwind config
- **Data not loading**: Check environment variables

### Debug Mode
Add to `.env.local`:
```
NEXT_PUBLIC_DEBUG=true
```

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [Sanity.io Docs](https://www.sanity.io/docs)

---

Last Updated: December 2024