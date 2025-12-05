export interface ProductImage {
  _id?: string;
  alt: string;
  src: { xs: string; sm: string; md: string };
}

export type ProductAvailability =
  | 'AVAILABLE'
  | 'LOW_STOCK'
  | 'OUT_OF_STOCK'
  | 'PREORDER'
  | 'DISCONTINUED'
  | 'ONORDER';

export type ProductStatus = 'PUBLISHED' | 'DRAFT' | 'ARCHIVED' | 'INACTIVE';

import type { LocalizableField } from '@/shared/utils/localizeField';

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  logo_url?: string;
}

export interface Category {
  _id: string;
  /** May be a multilingual object { en, fr, de, it } from the API */
  name: LocalizableField;
  slug: string;
  parent_id: string | null;
  level: number;
  image_url?: string;
  children?: Category[];
  product_count?: number;
}

export interface Product {
  _id: string;
  name: string;
  name_short: string;
  slug: string;
  code: string;
  displayed_code: string;
  brand_id: string | null;
  brand?: Brand;
  category_id: string;
  category?: Category;
  price: number;
  original_price: number;
  currency: 'CHF';
  images: ProductImage[];
  description?: string;
  description_de?: string;
  description_en?: string;
  description_fr?: string;
  description_it?: string;
  rating: number;
  review_count: number;
  specification: Record<string, string>;
  availability_state: ProductAvailability;
  delivery_days: number;
  in_store_possible: boolean;
  is_active: boolean;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: string;
  brand_id?: string;
  min_price?: number;
  max_price?: number;
  sort?: 'price_asc' | 'price_desc' | 'rating' | 'newest' | 'popular';
  availability?: 'AVAILABLE' | 'LOW_STOCK';
  in_store?: boolean;
}

export interface ProductReview {
  _id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  is_approved: boolean;
  created_at: string;
  user?: { first_name: string; last_name: string };
}

