export interface Favorite {
  _id: string;
  product_id: string;
  product?: import('@/features/products/products.types').Product;
  created_at: string;
}
