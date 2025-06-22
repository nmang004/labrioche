export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  description?: string;
  available: boolean;
  featured: boolean;
  ingredients?: string[];
  allergens?: string[];
  image: string;
  _updatedAt: string;
  category: {
    _id: string;
    title: string;
    slug: { current: string };
  };
}

export interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  displayOrder: number;
  image?: string;
  _updatedAt: string;
}

export interface Page {
  _id: string;
  title: string;
  body: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface Promotion {
  _id: string;
  title: string;
  content: string;
  link?: string;
  backgroundColor: 'primary' | 'secondary' | 'accent' | 'warning';
  startDate?: string;
  endDate?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  pickupTime?: string;
  notes?: string;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  customizations?: Record<string, any>;
}