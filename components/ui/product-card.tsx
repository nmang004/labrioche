'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from './card';
import { DynamicOrderButton } from './dynamic-order-button';
import { InventoryStatus } from './inventory-status';
import { cn } from '@/lib/utils/cn';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  available?: boolean;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  description,
  available = true,
  className,
}: ProductCardProps) {

  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all hover:shadow-lg',
        !available && 'opacity-75',
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!available && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="text-lg font-semibold text-muted-foreground">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg flex-1">{name}</h3>
          <InventoryStatus productId={id} compact className="ml-2" />
        </div>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
        <p className="mt-2 text-lg font-bold text-primary">
          ${price.toFixed(2)}
        </p>
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