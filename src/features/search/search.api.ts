import { baseApi } from '@/shared/api/baseApi';
import type { SearchParams } from './search.types';
import type { PaginatedResponse, ApiResponse } from '@/shared/types/api.types';
import type { Product } from '@/features/products/products.types';

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchProducts: builder.query<PaginatedResponse<Product>, SearchParams>({
      query: ({ q, page, per_page, sort, min_price, max_price, brand_id, on_sale, sustainable, speed }) => ({
        url: '/public/products',
        params: {
          q,
          ...(page ? { page } : {}),
          ...(per_page ? { limit: per_page } : {}),
          ...(sort ? { sort } : {}),
          ...(min_price ? { min_price } : {}),
          ...(max_price ? { max_price } : {}),
          ...(brand_id ? { brand: brand_id } : {}),
          ...(on_sale ? { on_sale: true } : {}),
          ...(sustainable ? { sustainable: true } : {}),
          ...(speed ? { speed } : {}),
        },
      }),
      providesTags: ['Products'],
    }),
    searchSuggestions: builder.query<ApiResponse<{ suggestions: string[] }>, string>({
      query: (q) => ({
        url: '/public/search/suggestions',
        params: { q },
      }),
    }),
  }),
});

export const { useSearchProductsQuery, useSearchSuggestionsQuery } = searchApi;
