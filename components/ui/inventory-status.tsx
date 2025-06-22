'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Badge } from './badge';
import { cn } from '@/lib/utils/cn';

interface InventoryStatusProps {
  productId: string;
  className?: string;
  compact?: boolean;
}

type InventoryLevel = 'high' | 'medium' | 'low' | 'out-of-stock';

interface InventoryData {
  level: InventoryLevel;
  quantity: number;
  lastUpdated: string;
  estimatedRestock?: string;
}

const levelConfig = {
  high: {
    icon: CheckCircle,
    label: 'In Stock',
    color: 'bg-green-100 text-green-800',
    textColor: 'text-green-700',
  },
  medium: {
    icon: Clock,
    label: 'Limited Stock',
    color: 'bg-yellow-100 text-yellow-800',
    textColor: 'text-yellow-700',
  },
  low: {
    icon: AlertTriangle,
    label: 'Low Stock',
    color: 'bg-orange-100 text-orange-800',
    textColor: 'text-orange-700',
  },
  'out-of-stock': {
    icon: AlertTriangle,
    label: 'Sold Out',
    color: 'bg-red-100 text-red-800',
    textColor: 'text-red-700',
  },
};

// Simulated inventory data - in real app, this would come from Supabase or your inventory system
const mockInventoryData: Record<string, InventoryData> = {
  // This would be populated from your actual inventory system
};

function getInventoryLevel(quantity: number): InventoryLevel {
  if (quantity === 0) return 'out-of-stock';
  if (quantity <= 3) return 'low';
  if (quantity <= 10) return 'medium';
  return 'high';
}

function generateMockInventory(): InventoryData {
  // This simulates real inventory data
  const quantity = Math.floor(Math.random() * 25);
  const level = getInventoryLevel(quantity);
  
  return {
    level,
    quantity,
    lastUpdated: new Date().toISOString(),
    estimatedRestock: level === 'out-of-stock' 
      ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Tomorrow
      : undefined,
  };
}

export function InventoryStatus({ productId, className, compact = false }: InventoryStatusProps) {
  const [inventoryData, setInventoryData] = useState<InventoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching inventory data
    const fetchInventoryData = async () => {
      try {
        setLoading(true);
        
        // In a real app, you'd fetch from your inventory system
        // For demo purposes, we&apos;ll use mock data
        const data = mockInventoryData[productId] || generateMockInventory();
        mockInventoryData[productId] = data;
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setInventoryData(data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();

    // Set up polling for real-time updates (every 30 seconds)
    const interval = setInterval(() => {
      // In a real app, you'd use WebSockets or Supabase real-time subscriptions
      // For demo, we&apos;ll occasionally update the mock data
      if (Math.random() < 0.1) { // 10% chance of update
        const newData = generateMockInventory();
        mockInventoryData[productId] = newData;
        setInventoryData(newData);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [productId]);

  if (loading) {
    return (
      <div className={cn('animate-pulse', className)}>
        <div className="h-5 bg-gray-200 rounded w-20"></div>
      </div>
    );
  }

  if (!inventoryData) {
    return null;
  }

  const config = levelConfig[inventoryData.level];
  const StatusIcon = config.icon;

  if (compact) {
    return (
      <Badge className={cn(config.color, 'text-xs', className)}>
        <StatusIcon className="mr-1 h-3 w-3" />
        {config.label}
      </Badge>
    );
  }

  return (
    <div className={cn('space-y-1', className)}>
      <div className="flex items-center gap-2">
        <StatusIcon className={cn('h-4 w-4', config.textColor)} />
        <span className={cn('text-sm font-medium', config.textColor)}>
          {config.label}
        </span>
      </div>
      
      {inventoryData.level !== 'out-of-stock' && inventoryData.level !== 'high' && (
        <p className="text-xs text-muted-foreground">
          {inventoryData.quantity} remaining
        </p>
      )}
      
      {inventoryData.estimatedRestock && (
        <p className="text-xs text-muted-foreground">
          Expected back: {new Date(inventoryData.estimatedRestock).toLocaleDateString()}
        </p>
      )}
      
      <p className="text-xs text-muted-foreground">
        Updated {new Date(inventoryData.lastUpdated).toLocaleTimeString()}
      </p>
    </div>
  );
}

// Hook for checking if a product is available
export function useInventoryStatus(productId: string) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [inventoryLevel, setInventoryLevel] = useState<InventoryLevel>('high');

  useEffect(() => {
    const data = mockInventoryData[productId] || generateMockInventory();
    mockInventoryData[productId] = data;
    
    setIsAvailable(data.level !== 'out-of-stock');
    setInventoryLevel(data.level);
  }, [productId]);

  return { isAvailable, inventoryLevel };
}