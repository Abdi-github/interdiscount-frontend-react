export interface CreateOrderPayload {
  items: { product_id: string; quantity: number }[];
  payment_method: 'card' | 'twint' | 'postfinance' | 'invoice';
  shipping_address_id?: string;
  store_pickup_id?: string;
  coupon_code?: string;
}

export type DeliveryMethod = 'delivery' | 'pickup';

export interface CheckoutState {
  step: number;
  deliveryMethod: DeliveryMethod;
  selectedAddressId: string | null;
  selectedStoreId: string | null;
  paymentMethod: 'card' | 'twint' | 'postfinance' | 'invoice';
  couponCode: string;
}
