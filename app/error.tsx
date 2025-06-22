'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-destructive/10 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Oops! Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We&apos;re sorry, but something unexpected happened. Our team has been notified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="default" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="outline" 
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Go home
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 p-4 bg-muted rounded-lg text-left">
            <summary className="cursor-pointer font-medium mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs text-muted-foreground overflow-auto">
              {error.message}
              {error.stack && (
                <>
                  {'\n\nStack Trace:\n'}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}