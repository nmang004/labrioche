'use client';

import { useCartStore } from '@/lib/stores/cart-store';
import { CartItem as CartItemType } from '@/types';
import { Button } from './button';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const itemTotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded-md"
          sizes="64px"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm truncate">{item.name}</h4>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
        <p className="text-sm font-medium">${itemTotal.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.id)}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}