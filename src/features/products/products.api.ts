import { baseApi } from '@/shared/api/baseApi';
import type { Product, ProductFilters, ProductReview } from './products.types';
import type { ApiResponse, PaginatedResponse } from '@/shared/types/api.types';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<Product>, ProductFilters & { page?: number; per_page?: number }>({
      query: (params) => ({ url: '/public/products', params }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ _id }) => ({ type: 'Products' as const, id: _id })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/public/products/${id}`,
      transformResponse: (res: ApiResponse<Product>) => res.data,
      providesTags: (_res, _err, id) => [{ type: 'Products', id }],
    }),
    getRelatedProducts: builder.query<Product[], { categoryId: string; excludeId: string; limit?: number }>({
      query: ({ categoryId, limit = 8 }) => ({
        url: '/public/products',
        params: { category_id: categoryId, limit },
      }),
      transformResponse: (res: PaginatedResponse<Product>, _meta, { excludeId }) =>
        res.data.filter((p) => p._id !== excludeId).slice(0, 8),
      providesTags: ['Products'],
    }),
    getProductReviews: builder.query<PaginatedResponse<ProductReview>, { id: string; page?: number; limit?: number }>({
      query: ({ id, ...params }) => ({ url: `/public/products/${id}/reviews`, params }),
      providesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetRelatedProductsQuery,
  useGetProductReviewsQuery,
} = productsApi;

