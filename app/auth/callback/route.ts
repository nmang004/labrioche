import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput, getClientIP } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const rawCode = searchParams.get('code');
    const rawNext = searchParams.get('next') ?? '/';
    
    // Sanitize inputs
    const code = rawCode ? sanitizeInput(rawCode) : null;
    const next = sanitizeInput(rawNext);
    
    // Validate next parameter to prevent open redirects
    const allowedRedirects = ['/', '/account', '/menu', '/our-story', '/contact'];
    const sanitizedNext = allowedRedirects.includes(next) ? next : '/';
    
    if (!code) {
      console.warn('Auth callback missing code parameter', {
        ip: getClientIP(request),
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer')
      });
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      // Log successful authentication
      console.log('Successful OAuth callback', {
        userId: data.user.id,
        email: data.user.email,
        ip: getClientIP(request),
        timestamp: new Date().toISOString()
      });
      
      const forwardedHost = request.headers.get('x-forwarded-host');
      const isLocalEnv = process.env.NODE_ENV === 'development';
      
      // Validate forwarded host in production
      if (!isLocalEnv && forwardedHost) {
        const allowedHosts = ['labriochenorfolk.com', 'www.labriochenorfolk.com'];
        if (!allowedHosts.includes(forwardedHost)) {
          console.warn('Invalid forwarded host', {
            forwardedHost,
            ip: getClientIP(request)
          });
          return NextResponse.redirect(`${origin}${sanitizedNext}`);
        }
        return NextResponse.redirect(`https://${forwardedHost}${sanitizedNext}`);
      } else if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${sanitizedNext}`);
      } else {
        return NextResponse.redirect(`${origin}${sanitizedNext}`);
      }
    } else {
      // Log authentication error
      console.error('OAuth callback error', {
        error: error?.message,
        ip: getClientIP(request),
        timestamp: new Date().toISOString()
      });
    }
  } catch (err) {
    // Log unexpected errors
    console.error('Unexpected error in auth callback', {
      error: err instanceof Error ? err.message : 'Unknown error',
      ip: getClientIP(request),
      timestamp: new Date().toISOString()
    });
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${new URL(request.url).origin}/auth/auth-code-error`);
}