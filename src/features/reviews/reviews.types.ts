export interface ReviewProduct {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: Array<{ alt: string; src: Record<string, string> }>;
}

export interface Review {
  _id: string;
  product_id: string | ReviewProduct;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  language?: string;
  is_verified_purchase?: boolean;
  is_approved: boolean;
  helpful_count?: number;
  created_at: string;
  updated_at?: string;
  user?: { first_name: string; last_name: string };
}

export interface CreateReviewPayload {
  product_id: string;
  rating: number;
  title: string;
  comment: string;
}

export interface UpdateReviewPayload {
  id: string;
  rating?: number;
  title?: string;
  comment?: string;
}
