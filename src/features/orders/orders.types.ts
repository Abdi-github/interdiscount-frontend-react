export type OrderStatus =
  | 'PENDING'
  | 'PLACED'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'READY_FOR_PICKUP'
  | 'PICKED_UP'
  | 'CANCELLED'
  | 'RETURNED'
  | 'PICKUP_EXPIRED';

export type PaymentMethod = 'card' | 'twint' | 'postfinance' | 'invoice';
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface OrderItem {
  _id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  image_url?: string;
}

export interface ShippingAddress {
  street: string;
  street_number: string;
  postal_code: string;
  city: string;
  canton: string;
  country: string;
}

export interface Order {
  _id: string;
  order_number: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  subtotal: number;
  shipping_fee: number;
  discount: number;
  total: number;
  currency: 'CHF';
  is_store_pickup: boolean;
  store_pickup_id: string | null;
  items?: OrderItem[];
  shipping_address?: ShippingAddress;
  created_at: string;
  updated_at: string;
}
