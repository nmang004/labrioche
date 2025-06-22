'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Coffee, Croissant, Wheat, Cake, Cookie, Grape, Snowflake } from 'lucide-react';
import { Card, CardContent, CardFooter } from './card';
import { DynamicOrderButton } from './dynamic-order-button';
import { InventoryStatus } from './inventory-status';
import { cn } from '@/lib/utils/cn';

// Icon mapping based on product category or name
const getProductIcon = (productName: string, categoryId?: string) => {
  const name = productName.toLowerCase();

  // Specific product matches
  if (name.includes('croissant')) return Croissant;
  if (
    name.includes('coffee') ||
    name.includes('espresso') ||
    name.includes('café') ||
    name.includes('lait')
  )
    return Coffee;
  if (name.includes('macaron')) return Cookie;
  if (name.includes('cake') || name.includes('opera') || name.includes('mille')) return Cake;
  if (name.includes('galette') || name.includes('bûche') || name.includes('noël')) return Snowflake;

  // Category-based fallbacks
  if (categoryId) {
    switch (categoryId.toLowerCase()) {
      case 'pastries':
        return Croissant;
      case 'breads':
        return Wheat;
      case 'cakes':
        return Cake;
      case 'macarons':
        return Cookie;
      case 'beverages':
        return Coffee;
      case 'seasonal':
        return Snowflake;
      default:
        return Grape; // General bakery item
    }
  }

  return Grape; // Default fallback
};

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  available?: boolean;
  className?: string;
  categoryId?: string;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  description,
  available = true,
  className,
  categoryId,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const IconComponent = getProductIcon(name, categoryId);

  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all hover:shadow-lg',
        !available && 'opacity-75',
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageError && (
          <Image
            src={image}
            alt={name}
            fill
            className={cn(
              'object-cover transition-transform group-hover:scale-105',
              !imageLoaded && 'opacity-0'
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
          />
        )}

        {/* Fallback icon display */}
        {(imageError || !imageLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
            <div className="relative">
              <IconComponent className="h-16 w-16 text-primary/60 transition-transform group-hover:scale-110" />
              {/* Decorative background circle */}
              <div className="absolute inset-0 -z-10 rounded-full bg-primary/5 scale-150" />
            </div>
          </div>
        )}

        {!available && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="text-lg font-semibold text-muted-foreground">Sold Out</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg flex-1">{name}</h3>
          <InventoryStatus productId={id} compact className="ml-2" />
        </div>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
        <p className="mt-2 text-lg font-bold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <DynamicOrderButton
          id={id}
          name={name}
          price={price}
          image={image}
          available={available}
          className="w-full"
          size="sm"
        />
      </CardFooter>
    </Card>
  );
}
