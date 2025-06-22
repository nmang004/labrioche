'use client';

import { useAuthStore } from '@/lib/stores/auth-store';
import { useCartStore } from '@/lib/stores/cart-store';
import { useFavoritesStore } from '@/lib/stores/favorites-store';
import { cn } from '@/lib/utils/cn';

interface PersonalizedGreetingProps {
  className?: string;
  showStats?: boolean;
}

export function PersonalizedGreeting({ 
  className, 
  showStats = false 
}: PersonalizedGreetingProps) {
  const user = useAuthStore((state) => state.user);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const favorites = useFavoritesStore((state) => state.items);
  
  if (!user) {
    return (
      <div className={cn('space-y-1', className)}>
        <h2 className="text-2xl font-bold text-foreground">
          Welcome to La Brioche
        </h2>
        <p className="text-muted-foreground">
          Sign in to unlock personalized recommendations and quick reordering
        </p>
      </div>
    );
  }

  const firstName = user.user_metadata?.full_name?.split(' ')[0] || 
                   user.email?.split('@')[0] || 
                   'Friend';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getPersonalizedMessage = () => {
    if (totalItems > 0) {
      return `You have ${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`;
    }
    if (favorites.length > 0) {
      return `You have ${favorites.length} favorite item${favorites.length > 1 ? 's' : ''}`;
    }
    return "What's calling to you from our French oven today?";
  };

  return (
    <div className={cn('space-y-1', className)}>
      <h2 className="text-2xl font-bold text-foreground">
        {getGreeting()}, {firstName}!
      </h2>
      <p className="text-muted-foreground">
        {getPersonalizedMessage()}
      </p>
      {showStats && (
        <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
          <span>Cart: {totalItems} items</span>
          <span>Favorites: {favorites.length} items</span>
        </div>
      )}
    </div>
  );
}