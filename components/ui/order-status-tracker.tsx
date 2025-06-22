'use client';

import { useState, useEffect } from 'react';
import { Clock, CheckCircle, Package, Car } from 'lucide-react';
import { Badge } from './badge';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { cn } from '@/lib/utils/cn';
import { createClient } from '@/lib/supabase/client';

interface OrderStatusTrackerProps {
  orderId: string;
  className?: string;
}

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

interface OrderUpdate {
  id: string;
  status: OrderStatus;
  pickupTime?: string;
  updatedAt: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'Order Received',
    description: 'We&apos;ve received your order and are processing it',
    color: 'bg-yellow-100 text-yellow-800',
  },
  confirmed: {
    icon: CheckCircle,
    label: 'Order Confirmed',
    description: 'Your order has been confirmed and queued for preparation',
    color: 'bg-blue-100 text-blue-800',
  },
  preparing: {
    icon: Package,
    label: 'Preparing',
    description: 'Our bakers are preparing your fresh items',
    color: 'bg-orange-100 text-orange-800',
  },
  ready: {
    icon: Car,
    label: 'Ready for Pickup',
    description: 'Your order is ready! Please come pick it up',
    color: 'bg-green-100 text-green-800',
  },
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    description: 'Order has been picked up successfully',
    color: 'bg-green-100 text-green-800',
  },
  cancelled: {
    icon: Clock,
    label: 'Cancelled',
    description: 'Order has been cancelled',
    color: 'bg-red-100 text-red-800',
  },
};

const statusOrder: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready', 'completed'];

export function OrderStatusTracker({ orderId, className }: OrderStatusTrackerProps) {
  const [orderData, setOrderData] = useState<OrderUpdate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    
    // Initial fetch
    async function fetchOrderStatus() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('orders')
          .select('id, status, pickup_time, updated_at')
          .eq('id', orderId)
          .single();

        if (error) throw error;

        setOrderData({
          id: data.id,
          status: data.status,
          pickupTime: data.pickup_time,
          updatedAt: data.updated_at,
        });
      } catch (err) {
        console.error('Error fetching order status:', err);
        setError('Failed to load order status');
      } finally {
        setLoading(false);
      }
    }

    fetchOrderStatus();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`order_${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          setOrderData({
            id: payload.new.id,
            status: payload.new.status,
            pickupTime: payload.new.pickup_time,
            updatedAt: payload.new.updated_at,
          });
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [orderId]);

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !orderData) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">{error || 'Order not found'}</p>
        </CardContent>
      </Card>
    );
  }

  const currentStatus = orderData.status;
  const currentStatusIndex = statusOrder.indexOf(currentStatus);
  const config = statusConfig[currentStatus];
  const StatusIcon = config.icon;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Order Status
          <Badge className={config.color}>
            <StatusIcon className="mr-1 h-3 w-3" />
            {config.label}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Status Description */}
          <div className="text-center p-4 bg-secondary/10 rounded-lg">
            <StatusIcon className="mx-auto h-8 w-8 mb-2 text-primary" />
            <h3 className="font-semibold mb-1">{config.label}</h3>
            <p className="text-sm text-muted-foreground">{config.description}</p>
            {orderData.pickupTime && currentStatus === 'ready' && (
              <p className="text-sm font-medium mt-2 text-primary">
                Pickup by: {new Date(orderData.pickupTime).toLocaleString()}
              </p>
            )}
          </div>

          {/* Status Timeline */}
          <div className="space-y-4">
            {statusOrder.slice(0, -1).map((status, index) => {
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              const statusConf = statusConfig[status];
              const StatusIconSmall = statusConf.icon;

              return (
                <div key={status} className="flex items-center space-x-3">
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full border-2',
                      isCompleted
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 bg-white text-gray-400'
                    )}
                  >
                    <StatusIconSmall className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {statusConf.label}
                    </p>
                    {isCurrent && (
                      <p className="text-xs text-muted-foreground">
                        Updated {new Date(orderData.updatedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}