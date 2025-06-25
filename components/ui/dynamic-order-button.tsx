'use client';

import { useState } from 'react';
import { ShoppingCart, Heart, RotateCcw, CheckCircle } from 'lucide-react';
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
  onClick?: (e: React.MouseEvent) => void;
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
  onClick,
}: DynamicOrderButtonProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const [isAdded, setIsAdded] = useState(false);

  // Check if user has ordered this item before
  const hasOrderedBefore = user && items.some((item) => item.id === id);
  const isCurrentlyFavorited = isFavorite(id);

  const handleAddToCart = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
    if (available && !isAdded) {
      addItem({
        id,
        name,
        price,
        image,
      });

      // Show success state
      setIsAdded(true);

      // Revert after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
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

  const handleQuickReorder = (e: React.MouseEvent) => {
    handleAddToCart(e);
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
            className={cn('px-3', isCurrentlyFavorited && 'text-red-600 border-red-200 bg-red-50')}
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
        <Button
          onClick={handleAddToCart}
          className={cn(
            'flex-1 transition-all duration-300 ease-in-out',
            isAdded && 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
          )}
          size={size}
          disabled={isAdded}
        >
          <span className="flex items-center transition-opacity duration-300">
            {isAdded ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4 animate-in fade-in zoom-in duration-300" />
                <span className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                  Added to Cart
                </span>
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Add to Cart</span>
              </>
            )}
          </span>
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
        <Button
          onClick={handleQuickReorder}
          className={cn(
            'flex-1 transition-all duration-300 ease-in-out',
            isAdded && 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
          )}
          size={size}
          disabled={isAdded}
        >
          <span className="flex items-center transition-opacity duration-300">
            {isAdded ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4 animate-in fade-in zoom-in duration-300" />
                <span className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                  Added to Cart
                </span>
              </>
            ) : (
              <>
                <RotateCcw className="mr-2 h-4 w-4" />
                <span>Reorder</span>
              </>
            )}
          </span>
        </Button>
        {showFavoriteButton && (
          <Button
            variant="outline"
            size={size}
            onClick={handleToggleFavorite}
            className={cn('px-3', isCurrentlyFavorited && 'text-red-600 border-red-200 bg-red-50')}
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
      <Button
        onClick={handleAddToCart}
        className={cn(
          'flex-1 transition-all duration-300 ease-in-out',
          isAdded && 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600'
        )}
        size={size}
        disabled={isAdded}
      >
        <span className="flex items-center transition-opacity duration-300">
          {isAdded ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4 animate-in fade-in zoom-in duration-300" />
              <span className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                Added to Cart
              </span>
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Add to Cart</span>
            </>
          )}
        </span>
      </Button>
      {showFavoriteButton && (
        <Button
          variant="outline"
          size={size}
          onClick={handleToggleFavorite}
          className={cn('px-3', isCurrentlyFavorited && 'text-red-600 border-red-200 bg-red-50')}
        >
          <Heart className={cn('h-4 w-4', isCurrentlyFavorited && 'fill-current')} />
        </Button>
      )}
    </div>
  );
}
