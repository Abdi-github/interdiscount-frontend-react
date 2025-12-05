import type { Product } from '@/features/products/products.types';
import type { LocalizableField } from '@/shared/utils/localizeField';

export interface Category {
  _id: string;
  /** API may return a multilingual object { en, fr, de, it } or a plain string */
  name: LocalizableField;
  slug: string;
  description?: LocalizableField;
  image_url?: string;
  parent_id?: string | null;
  level?: number;
  children?: Category[];
  product_count?: number;
}

export interface CategoryFilters {
  category_id?: string;
  brand_id?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  sort?: string;
  page?: number;
  limit?: number;
  search?: string;
  on_sale?: boolean;
  speed?: string;
  sustainable?: boolean;
  availability?: string;
  in_store?: boolean;
}
