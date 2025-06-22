import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            Sorry, the page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="default" className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/menu">
              <Search className="h-4 w-4" />
              Browse Menu
            </Link>
          </Button>
        </div>

        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Need help finding something?
          </p>
          <div className="space-y-2 text-sm">
            <Link 
              href="/contact" 
              className="text-primary hover:underline block"
            >
              Contact Us
            </Link>
            <Link 
              href="/our-story" 
              className="text-primary hover:underline block"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}