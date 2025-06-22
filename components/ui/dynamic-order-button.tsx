'use client';

import { ShoppingCart, Heart, RotateCcw } from 'lucide-react';
import { Button } from './button';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useCartStore } from '@/lib/stores/cart-store';
import { useFavoritesStore } from '@/lib/stores/favorites-store';
import { cn } from '@/lib/utils/cn';
import { useRouter } from 'next/navigation';

interface DynamicOrderButtonProps {
  id: string;
  name: string;
  price: number;
  image: string;
  available?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  showFavoriteButton?: boolean;
}

export function DynamicOrderButton({
  id,
  name,
  price,
  image,
  available = true,
  className,
  size = 'sm',
  showFavoriteButton = true,
}: DynamicOrderButtonProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  
  // Check if user has ordered this item before
  const hasOrderedBefore = user && items.some(item => item.id === id);
  const isCurrentlyFavorited = isFavorite(id);
  
  const handleAddToCart = () => {
    if (available) {
      addItem({
        id,
        name,
        price,
        image,
      });
    }
  };

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorited) {
      removeFavorite(id);
    } else {
      addFavorite({
        id,
        name,
        price,
        image,
      });
    }
  };

  const handleQuickReorder = () => {
    handleAddToCart();
  };

  const handleSignInPrompt = () => {
    router.push('/auth/login');
  };

  if (!available) {
    return (
      <div className={cn('flex gap-2', className)}>
        <Button disabled className="flex-1" size={size}>
          Sold Out
        </Button>
        {showFavoriteButton && (
          <Button
            variant="outline"
            size={size}
            onClick={handleToggleFavorite}
            className={cn(
              'px-3',
              isCurrentlyFavorited && 'text-red-600 border-red-200 bg-red-50'
            )}
          >
            <Heart className={cn('h-4 w-4', isCurrentlyFavorited && 'fill-current')} />
          </Button>
        )}
      </div>
    );
  }

  // Guest user experience
  if (!user) {
    return (
      <div className={cn('flex gap-2', className)}>
        <Button onClick={handleAddToCart} className="flex-1" size={size}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        {showFavoriteButton && (
          <Button
            variant="outline"
            size={size}
            onClick={handleSignInPrompt}
            className="px-3"
            title="Sign in to save favorites"
          >
            <Heart className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  // Authenticated user with reorder option
  if (hasOrderedBefore) {
    return (
      <div className={cn('flex gap-2', className)}>
        <Button onClick={handleQuickReorder} className="flex-1" size={size}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reorder
        </Button>
        {showFavoriteButton && (
          <Button
            variant="outline"
            size={size}
            onClick={handleToggleFavorite}
            className={cn(
              'px-3',
              isCurrentlyFavorited && 'text-red-600 border-red-200 bg-red-50'
            )}
          >
            <Heart className={cn('h-4 w-4', isCurrentlyFavorited && 'fill-current')} />
          </Button>
        )}
      </div>
    );
  }

  // Authenticated user, standard experience
  return (
    <div className={cn('flex gap-2', className)}>
      <Button onClick={handleAddToCart} className="flex-1" size={size}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
      {showFavoriteButton && (
        <Button
          variant="outline"
          size={size}
          onClick={handleToggleFavorite}
          className={cn(
            'px-3',
            isCurrentlyFavorited && 'text-red-600 border-red-200 bg-red-50'
          )}
        >
          <Heart className={cn('h-4 w-4', isCurrentlyFavorited && 'fill-current')} />
        </Button>
      )}
    </div>
  );
}