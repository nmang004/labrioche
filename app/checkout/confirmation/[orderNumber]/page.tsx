'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OrderStatusTracker } from '@/components/ui/order-status-tracker';
import { CheckCircle, Clock, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface OrderDetails {
  id: string;
  orderNumber: string;
  totalPrice: number;
  status: string;
  pickupTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt: string;
  items: {
    id: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrder = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('orders')
        .select(
          `
          *,
          order_items (
            id,
            product_name,
            quantity,
            price
          )
        `
        )
        .eq('order_number', orderNumber)
        .single();

      if (error) throw error;

      setOrder({
        id: data.id,
        orderNumber: data.order_number,
        totalPrice: data.total_price,
        status: data.status,
        pickupTime: data.pickup_time,
        customerName: data.customer_name || 'N/A',
        customerEmail: data.customer_email || 'N/A',
        customerPhone: data.customer_phone || 'N/A',
        createdAt: data.created_at,
        items: data.order_items || [],
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Order not found');
    } finally {
      setLoading(false);
    }
  }, [orderNumber]);

  useEffect(() => {
    fetchOrder();
  }, [orderNumber, fetchOrder]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Order Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || 'The order you are looking for could not be found.'}
          </p>
          <Button asChild>
            <Link href="/menu">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. We&apos;ll have it ready for pickup at the scheduled time.
          </p>
        </div>

        {/* Order Status Tracker */}
        <OrderStatusTracker orderId={order.id} className="mb-6" />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order #{order.orderNumber}</span>
              <span className="text-lg font-normal text-muted-foreground">
                ${order.totalPrice.toFixed(2)}
              </span>
            </CardTitle>
            <CardDescription>
              Placed on {format(new Date(order.createdAt), 'MMMM d, yyyy h:mm a')}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Pickup Information */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-blue-600" />
                Pickup Information
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Date & Time:</strong>{' '}
                  {format(new Date(order.pickupTime), 'EEEE, MMMM d, yyyy h:mm a')}
                </p>
                <p>
                  <strong>Location:</strong> La Brioche Norfolk
                </p>
                <div className="flex items-start gap-2 mt-3">
                  <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-xs text-blue-800">
                    <p>1415 Colley Avenue</p>
                    <p>Norfolk, Virginia 23517</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div>
              <h3 className="font-semibold mb-3">Customer Information</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {order.customerName}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {order.customerEmail}
                </p>
                {order.customerPhone !== 'N/A' && (
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {order.customerPhone}
                  </p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-semibold mb-3">Order Items</h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What&apos;s Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  1
                </div>
                <p>We&apos;ll start preparing your order and send you updates via email.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  2
                </div>
                <p>You&apos;ll receive a notification when your order is ready for pickup.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  3
                </div>
                <p>Visit us at the scheduled time to collect your fresh bakery items!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link href="/menu" className="flex items-center gap-2">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg text-center text-sm text-muted-foreground">
          <p>
            Need to make changes? Contact us at{' '}
            <a href="tel:+17572269745" className="text-primary hover:underline">
              1-757-226-9745
            </a>{' '}
            or{' '}
            <a href="mailto:yvanbakery@gmail.com" className="text-primary hover:underline">
              yvanbakery@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
