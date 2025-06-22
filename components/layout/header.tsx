'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CartDrawer } from '@/components/ui/cart-drawer';
import { useAuthStore } from '@/lib/stores/auth-store';
import { cn } from '@/lib/utils/cn';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">La Brioche</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* User account */}
            <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
              <Link href={user ? '/account/profile' : '/auth/login'}>
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>

            {/* Shopping cart */}
            <CartDrawer />

            {/* Mobile menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={handleMobileNavClick}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <hr className="my-4" />
                  <Link
                    href={user ? '/account/profile' : '/auth/login'}
                    onClick={handleMobileNavClick}
                    className="text-lg font-medium text-muted-foreground hover:text-primary"
                  >
                    {user ? 'My Account' : 'Sign In'}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
