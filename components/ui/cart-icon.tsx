'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/stores/cart-store';
import { Button } from './button';
import { Badge } from './badge';

interface CartIconProps {
  onClick: () => void;
}

export function CartIcon({ onClick }: CartIconProps) {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="relative p-2"
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <Badge
          variant="default"
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {totalItems > 99 ? '99+' : totalItems}
        </Badge>
      )}
    </Button>
  );
}