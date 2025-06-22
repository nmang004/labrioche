'use client';

import { useCartStore } from '@/lib/stores/cart-store';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from './sheet';
import { Button } from './button';
import { CartIcon } from './cart-icon';
import { CartItem } from './cart-item';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <CartIcon onClick={() => setIsOpen(true)} />
        </SheetTrigger>
        <SheetContent className="w-full max-w-md">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Add some delicious items from our menu</p>
            <Button asChild onClick={() => setIsOpen(false)}>
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <CartIcon onClick={() => setIsOpen(true)} />
      </SheetTrigger>
      <SheetContent className="w-full max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart ({totalItems} items)
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <SheetFooter className="flex-col space-y-4 border-t pt-4">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              asChild
            >
              <Link href="/menu">Continue Shopping</Link>
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              asChild
              className="flex items-center gap-2"
            >
              <Link href="/checkout">
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}