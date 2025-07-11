'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useAuthStore } from '@/lib/stores/auth-store';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, ShoppingCart, Settings, Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, profile, setProfile } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Check for demo admin session first
        const demoSession = localStorage.getItem('demo_admin_session');
        if (demoSession) {
          try {
            const sessionData = JSON.parse(demoSession);
            setProfile(sessionData.profile);
            setIsLoading(false);
            return;
          } catch {
            localStorage.removeItem('demo_admin_session');
          }
        }

        // Check if user is authenticated
        if (!user) {
          router.push('/auth/login?redirectTo=/admin');
          return;
        }

        // Fetch user profile with role
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error || !profileData) {
          console.error('Error fetching profile:', error);
          router.push('/account');
          return;
        }

        setProfile(profileData);

        // For production, uncomment this to check for admin role
        /*
        if (profileData.role !== 'admin') {
          router.push('/account')
          return
        }
        */

        setIsLoading(false);
      } catch (error) {
        console.error('Admin access check error:', error);
        router.push('/account');
      }
    };

    checkAdminAccess();
  }, [user, router, supabase, setProfile]);

  const handleSignOut = async () => {
    // Clear demo session if it exists
    localStorage.removeItem('demo_admin_session');
    document.cookie = 'demo_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    await supabase.auth.signOut();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 border-b">
            <h2 className="text-lg sm:text-xl font-semibold">La Brioche Admin</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 sm:px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-3 sm:py-2 text-sm font-medium transition-colors active:scale-95',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info and sign out */}
          <div className="border-t p-3 sm:p-4">
            <div className="mb-3 px-2 sm:px-3">
              <p className="text-sm font-medium text-gray-900 truncate">
                {profile?.full_name || user?.email}
              </p>
              <p className="text-xs text-gray-500">
                {profile?.role === 'admin' ? 'Administrator' : 'User'}
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start text-sm py-2.5 active:scale-95 transition-transform"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center gap-4 border-b bg-white px-4 sm:px-6">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-95"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <h1 className="text-base sm:text-lg font-semibold truncate">
            {navigation.find((item) => item.href === pathname)?.name || 'Admin Dashboard'}
          </h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
