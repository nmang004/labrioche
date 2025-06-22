'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from './product-card';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useFavoritesStore } from '@/lib/stores/favorites-store';
import { useCartStore } from '@/lib/stores/cart-store';
import { Product } from '@/types';

interface ScoredProduct {
  product: Product;
  score: number;
}
import { sanityClient } from '@/lib/sanity/client';
import { PRODUCTS_QUERY, FEATURED_PRODUCTS_QUERY } from '@/lib/sanity/queries';
import { Skeleton } from './skeleton';

interface ProductRecommendationsProps {
  maxItems?: number;
  title?: string;
  className?: string;
}

export function ProductRecommendations({
  maxItems = 4,
  title = 'Recommended for You',
  className,
}: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const user = useAuthStore((state) => state.user);
  const favorites = useFavoritesStore((state) => state.items);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    async function generateRecommendations() {
      try {
        setLoading(true);

        if (!user) {
          // For guests, show featured products
          const featuredProducts = await sanityClient.fetch(FEATURED_PRODUCTS_QUERY);
          setRecommendations(featuredProducts.slice(0, maxItems));
          return;
        }

        // For authenticated users, create personalized recommendations
        const allProducts = await sanityClient.fetch(PRODUCTS_QUERY);

        // Get user's interaction data
        const favoriteIds = new Set(favorites.map((f) => f.id));
        const cartItemIds = new Set(cartItems.map((c) => c.id));

        // Filter out items already in cart or favorites for recommendation diversity
        const availableProducts = allProducts.filter(
          (product: Product) => !cartItemIds.has(product._id) && !favoriteIds.has(product._id)
        );

        // Recommendation algorithm
        const scored = availableProducts.map((product: Product) => {
          let score = 0;

          // Base score for featured items
          if (product.featured) score += 3;

          // Boost score if user has items from same category in favorites
          const hasFavoriteInCategory = favorites.some((fav) => {
            const favProduct = allProducts.find((p: Product) => p._id === fav.id);
            return favProduct?.category._id === product.category._id;
          });
          if (hasFavoriteInCategory) score += 2;

          // Boost score if user has items from same category in cart
          const hasCartItemInCategory = cartItems.some((item) => {
            const cartProduct = allProducts.find((p: Product) => p._id === item.id);
            return cartProduct?.category._id === product.category._id;
          });
          if (hasCartItemInCategory) score += 1;

          // Random factor for diversity
          score += Math.random() * 0.5;

          return { product, score };
        });

        // Sort by score and take top items
        scored.sort((a: ScoredProduct, b: ScoredProduct) => b.score - a.score);
        const topRecommendations = scored
          .slice(0, maxItems)
          .map((item: ScoredProduct) => item.product);

        setRecommendations(topRecommendations);
      } catch (error) {
        console.error('Error generating recommendations:', error);
        // Fallback to featured products
        try {
          const featuredProducts = await sanityClient.fetch(FEATURED_PRODUCTS_QUERY);
          setRecommendations(featuredProducts.slice(0, maxItems));
        } catch (fallbackError) {
          console.error('Error loading fallback recommendations:', fallbackError);
          setRecommendations([]);
        }
      } finally {
        setLoading(false);
      }
    }

    generateRecommendations();
  }, [user, favorites, cartItems, maxItems]);

  if (loading) {
    return (
      <div className={className}>
        <h2 className="text-2xl font-serif font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: maxItems }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="text-2xl font-serif font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
            available={product.available}
            categoryId={product.category?._id}
          />
        ))}
      </div>
    </div>
  );
}
