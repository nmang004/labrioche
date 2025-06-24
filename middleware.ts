import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { rateLimit, validateRequest, getClientIP } from '@/lib/security';
import type { Database } from '@/lib/types/database';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co https://cdn.sanity.io; frame-src 'none'; object-src 'none'; base-uri 'self';"
    );
  }

  // Rate limiting for API routes and auth endpoints
  if (
    request.nextUrl.pathname.startsWith('/api/') ||
    request.nextUrl.pathname.startsWith('/auth/')
  ) {
    const clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(clientIP, 20, 60000); // 20 requests per minute

    if (!rateLimitResult.success) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          'X-RateLimit-Limit': '20',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        },
      });
    }

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', '20');
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString());
  }

  // Validate requests
  const validation = validateRequest(request);
  if (!validation.isValid && process.env.NODE_ENV === 'production') {
    console.warn('Invalid request detected:', validation.errors, {
      ip: getClientIP(request),
      url: request.url,
      userAgent: request.headers.get('user-agent'),
    });

    // For now, just log the error but don't block the request
    // In a more strict setup, you might want to block certain invalid requests
  }

  // Authentication check for protected routes
  const protectedRoutes = ['/account', '/checkout', '/admin'];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    try {
      // Special handling for demo admin access to /admin routes
      if (request.nextUrl.pathname.startsWith('/admin')) {
        const demoAdminCookie = request.cookies.get('demo_admin_session');
        if (demoAdminCookie?.value === 'true') {
          return response; // Allow demo admin access without authentication
        }
      }

      // Create supabase client for middleware
      const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value, options }) => {
                request.cookies.set(name, value);
                response.cookies.set(name, value, options);
              });
            },
          },
        }
      );

      // Get user session
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      // Special handling for checkout - allow guest access
      if (request.nextUrl.pathname.startsWith('/checkout')) {
        // If user is authenticated, continue normally
        if (user) {
          return response;
        }

        // For guest checkout, check if there are items in cart
        // This is a simplified check - in practice you might want more sophisticated logic
        const hasCartItems = request.cookies.get('cart-storage')?.value;
        if (hasCartItems) {
          const cartData = JSON.parse(hasCartItems);
          if (cartData?.state?.items?.length > 0) {
            return response; // Allow guest checkout
          }
        }

        // No cart items, redirect to menu
        return NextResponse.redirect(new URL('/menu', request.url));
      }

      // For other protected routes, require authentication
      if (!user || error) {
        const redirectUrl = new URL('/auth/login', request.url);
        redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
      }

      // Admin route protection
      if (request.nextUrl.pathname.startsWith('/admin')) {
        // Check for demo admin session
        const demoAdminCookie = request.cookies.get('demo_admin_session');
        if (demoAdminCookie?.value === 'true') {
          return response; // Allow demo admin access
        }

        // For now, allow any authenticated user to access admin
        // In production, uncomment the following to check for admin role:
        /*
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        
        if (!profile || profile.role !== 'admin') {
          return NextResponse.redirect(new URL('/account', request.url))
        }
        */
      }
    } catch (error) {
      console.error('Middleware auth error:', error);
      // On auth error, redirect to login
      const redirectUrl = new URL('/auth/login', request.url);
      redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
