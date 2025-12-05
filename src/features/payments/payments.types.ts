export type PaymentMethod = 'card' | 'twint' | 'postfinance' | 'invoice';

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'REFUNDED'
  | 'CANCELLED'
  | 'NO_PAYMENT';

export interface Payment {
  _id: string;
  order_id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  stripe_payment_intent_id: string | null;
  stripe_client_secret: string | null;
  failure_reason: string | null;
  paid_at: string | null;
  refunded_at: string | null;
  created_at: string;
  updated_at: string;
}
