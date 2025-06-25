'use client';

import { Coffee, Croissant, Wheat, Cake, Cookie, Grape, Snowflake } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog';
import { DynamicOrderButton } from './dynamic-order-button';
import { InventoryStatus } from './inventory-status';

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

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    available?: boolean;
    categoryId?: string;
  };
}

export function ProductModal({ open, onOpenChange, product }: ProductModalProps) {
  const IconComponent = getProductIcon(product.name, product.categoryId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Icon Display Section */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/10 rounded-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <IconComponent className="h-32 w-32 text-primary/60" />
                <div className="absolute inset-0 -z-10 rounded-full bg-primary/5 scale-150" />
              </div>
            </div>
            {!product.available && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                <span className="text-2xl font-semibold text-muted-foreground">Sold Out</span>
              </div>
            )}
          </div>

          {/* Product Information Section */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
                <InventoryStatus productId={product.id} />
              </div>

              {product.description && (
                <DialogDescription className="text-base mb-6">
                  {product.description}
                </DialogDescription>
              )}
            </div>

            <DynamicOrderButton
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              available={product.available}
              className="w-full"
              size="lg"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
