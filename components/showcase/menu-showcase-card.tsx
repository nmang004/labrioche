'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Coffee, Croissant, Wheat, Cake, Cookie, Grape, Snowflake } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';

const getProductIcon = (productName: string, categoryId?: string) => {
  const name = productName.toLowerCase();

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
        return Grape;
    }
  }

  return Grape;
};

interface MenuShowcaseCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  available?: boolean;
  className?: string;
  categoryId?: string;
  featured?: boolean;
  ingredients?: string[];
}

export function MenuShowcaseCard({
  name,
  price,
  image,
  description,
  available = true,
  className,
  categoryId,
  featured = false,
  ingredients = [],
}: MenuShowcaseCardProps) {
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

        {(imageError || !imageLoaded) && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
            <div className="relative">
              <IconComponent className="h-16 w-16 text-primary/60 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 -z-10 rounded-full bg-primary/5 scale-150" />
            </div>
          </div>
        )}

        {!available && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="text-lg font-semibold text-muted-foreground">Seasonal</span>
          </div>
        )}

        {featured && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-primary/90 text-white">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{name}</h3>
            <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
          </div>

          {description && (
            <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
          )}

          {ingredients.length > 0 && (
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-1">Key Ingredients:</p>
              <div className="flex flex-wrap gap-1">
                {ingredients.slice(0, 3).map((ingredient, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {ingredient}
                  </Badge>
                ))}
                {ingredients.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{ingredients.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
