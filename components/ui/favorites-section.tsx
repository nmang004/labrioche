'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Grape } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardFooter } from './card';
import { useFavoritesStore } from '@/lib/stores/favorites-store';
import { useCartStore } from '@/lib/stores/cart-store';
import { useAuthStore } from '@/lib/stores/auth-store';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FavoriteCardProps {
  favorite: { id: string; name: string; price: number; image: string; dateAdded: string };
  onAddToCart: (favorite: { id: string; name: string; price: number; image: string }) => void;
  onRemoveFavorite: (id: string) => void;
}

function FavoriteCard({ favorite, onAddToCart, onRemoveFavorite }: FavoriteCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageError && (
          <Image
            src={favorite.image}
            alt={favorite.name}
            fill
            className={cn(
              'object-cover transition-transform group-hover:scale-105',
              !imageLoaded && 'opacity-0'
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
          />
        )}

        {/* Fallback icon display */}
        {(imageError || !imageLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
            <div className="relative">
              <Grape className="h-12 w-12 text-primary/60 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 -z-10 rounded-full bg-primary/5 scale-150" />
            </div>
          </div>
        )}

        <Button
          variant="secondary"
          size="sm"
          onClick={() => onRemoveFavorite(favorite.id)}
          className="absolute top-2 right-2 p-2 h-auto"
          title="Remove from favorites"
        >
          <Heart className="h-4 w-4 fill-current text-red-600" />
        </Button>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{favorite.name}</h3>
        <p className="text-lg font-bold text-primary mt-2">${favorite.price.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Added {new Date(favorite.dateAdded).toLocaleDateString()}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onAddToCart(favorite)} className="w-full" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

interface FavoritesSectionProps {
  className?: string;
  maxItems?: number;
  showAll?: boolean;
}

export function FavoritesSection({
  className,
  maxItems = 4,
  showAll = false,
}: FavoritesSectionProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const favorites = useFavoritesStore((state) => state.getFavorites());
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const addItem = useCartStore((state) => state.addItem);

  if (!user) {
    return (
      <div className={cn('text-center py-12', className)}>
        <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">Save Your Favorites</h3>
        <p className="text-muted-foreground mb-4">
          Sign in to save your favorite items and access them anytime
        </p>
        <Button onClick={() => router.push('/auth/login')}>Sign In</Button>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
        <p className="text-muted-foreground mb-4">
          Start browsing our delicious pastries and save your favorites
        </p>
        <Button onClick={() => router.push('/menu')}>Browse Menu</Button>
      </div>
    );
  }

  const displayedFavorites = showAll ? favorites : favorites.slice(0, maxItems);
  const hasMore = favorites.length > maxItems && !showAll;

  const handleAddToCart = (favorite: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    addItem({
      id: favorite.id,
      name: favorite.name,
      price: favorite.price,
      image: favorite.image,
    });
  };

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold">Your Favorites</h2>
        {hasMore && (
          <Button variant="outline" onClick={() => router.push('/account/favorites')}>
            View All ({favorites.length})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedFavorites.map((favorite) => (
          <FavoriteCard
            key={favorite.id}
            favorite={favorite}
            onAddToCart={handleAddToCart}
            onRemoveFavorite={handleRemoveFavorite}
          />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-8">
          <Button variant="outline" onClick={() => router.push('/account/favorites')}>
            View All Favorites ({favorites.length})
          </Button>
        </div>
      )}
    </div>
  );
}
