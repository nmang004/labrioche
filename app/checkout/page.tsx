'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/lib/stores/cart-store';
import { useAuthStore } from '@/lib/stores/auth-store';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import Image from 'next/image';

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
  });
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = getTotalPrice();

  useEffect(() => {
    if (items.length === 0) {
      router.push('/menu');
    }
  }, [items, router]);

  useEffect(() => {
    if (user) {
      // Pre-fill with user data if authenticated
      setCustomerInfo({
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!customerInfo.fullName || !customerInfo.email) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!pickupDate || !pickupTime) {
      setError('Please select a pickup date and time');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      
      // Generate order number
      const orderNumber = `LB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Combine pickup date and time
      const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`);
      
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id || null,
          order_number: orderNumber,
          total_price: totalPrice,
          status: 'pending',
          pickup_time: pickupDateTime.toISOString(),
          notes: notes,
          customer_name: customerInfo.fullName,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and redirect to confirmation
      clearCart();
      router.push(`/checkout/confirmation/${orderNumber}`);
      
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while processing your order';
      setError(errorMessage);
    }

    setLoading(false);
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="mb-4"
          >
            <Link href="/menu" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Menu
            </Link>
          </Button>
          
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your order for pickup at La Brioche
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            {!user && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <p className="text-sm text-blue-800">
                    Have an account?{' '}
                    <Link href="/auth/login" className="font-medium underline">
                      Sign in
                    </Link>{' '}
                    for faster checkout
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  We&apos;ll use this information for order updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">
                    Full Name *
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={customerInfo.fullName}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Pickup Details
                </CardTitle>
                <CardDescription>
                  Choose when you&apos;d like to pick up your order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="pickupDate" className="text-sm font-medium">
                      Pickup Date *
                    </label>
                    <Input
                      id="pickupDate"
                      type="date"
                      min={getMinDate()}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="pickupTime" className="text-sm font-medium">
                      Pickup Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="pickupTime"
                        type="time"
                        min="07:00"
                        max="18:00"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    Special Instructions
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <textarea
                      id="notes"
                      placeholder="Any special requests or dietary notes?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full min-h-[80px] pl-10 pt-3 pr-3 pb-3 border border-input bg-background rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-md text-sm">
                  <p className="font-medium mb-1">Store Hours:</p>
                  <p>Monday - Saturday: 7:00 AM - 6:00 PM</p>
                  <p>Sunday: 8:00 AM - 4:00 PM</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Processing Order...' : 'Place Order'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing your order, you agree to our terms of service
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}