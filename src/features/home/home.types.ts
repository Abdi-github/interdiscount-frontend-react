import type { Product } from '@/features/products/products.types';

export interface HeroBannerItem {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_url: string;
  background_color?: string;
}

export interface PromoItem {
  id: number;
  icon: string;
  text: string;
}

export interface HomeData {
  banners: HeroBannerItem[];
  featured_products: Product[];
  new_arrivals: Product[];
  top_deals: Product[];
}
