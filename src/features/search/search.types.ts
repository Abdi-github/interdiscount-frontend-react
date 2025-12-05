export interface SearchParams {
  q: string;
  page?: number;
  per_page?: number;
  min_price?: number;
  max_price?: number;
  sort?: string;
  brand_id?: string;
  on_sale?: boolean;
  sustainable?: boolean;
  speed?: string;
}
