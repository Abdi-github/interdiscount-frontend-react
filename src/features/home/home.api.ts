import { baseApi } from '@/shared/api/baseApi';
import type { PaginatedResponse } from '@/shared/types/api.types';
import type { Product } from '@/features/products/products.types';

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedProducts: builder.query<PaginatedResponse<Product>, void>({
      query: () => '/public/products?sort=newest&limit=8',
      providesTags: ['Products'],
    }),
    getTopDeals: builder.query<PaginatedResponse<Product>, void>({
      query: () => '/public/products?sort=discount&limit=8',
      providesTags: ['Products'],
    }),
    getNewArrivals: builder.query<PaginatedResponse<Product>, void>({
      query: () => '/public/products?sort=newest&limit=8&page=2',
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetFeaturedProductsQuery, useGetTopDealsQuery, useGetNewArrivalsQuery } = homeApi;
