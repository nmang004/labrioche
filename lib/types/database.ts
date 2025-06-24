export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: 'customer' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  order_number: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  pickup_time: string | null;
  notes: string | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  customizations: Record<string, unknown>;
  created_at: string;
}

export interface SystemSetting {
  id: number;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'order_number'>;
        Update: Partial<Omit<Order, 'id' | 'created_at' | 'updated_at'>>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Omit<OrderItem, 'id' | 'created_at'>;
        Update: Partial<Omit<OrderItem, 'id' | 'created_at'>>;
      };
      system_settings: {
        Row: SystemSetting;
        Insert: Omit<SystemSetting, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SystemSetting, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
};
