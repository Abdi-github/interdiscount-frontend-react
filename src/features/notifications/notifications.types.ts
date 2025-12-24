export interface Notification {
  _id: string;
  user_id: string;
  type:
    | 'order_status'
    | 'order_confirmed'
    | 'order_shipped'
    | 'order_delivered'
    | 'order_cancelled'
    | 'pickup_ready'
    | 'pickup_reminder'
    | 'pickup_expired'
    | 'review_approved'
    | 'review_rejected'
    | 'price_drop'
    | 'promotion'
    | 'system';
  title: string;
  message: string;
  data: Record<string, unknown> | null;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UnreadCountResponse {
  count: number;
}
