import { baseApi } from '@/shared/api/baseApi';
import type { Brand } from './brands.types';
import type { ApiResponse, PaginatedResponse } from '@/shared/types/api.types';
import type { Product } from '@/features/products/products.types';

export const brandsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<PaginatedResponse<Brand>, { page?: number; limit?: number; search?: string }>({
      query: (params) => ({ url: '/public/brands', params }),
      providesTags: ['Brands'],
    }),
    getBrandBySlug: builder.query<ApiResponse<Brand>, string>({
      query: (slug) => `/public/brands/${slug}`,
      providesTags: (_res, _err, slug) => [{ type: 'Brands', id: slug }],
    }),
    getBrandProducts: builder.query<PaginatedResponse<Product>, { slug: string; page?: number }>({
      query: ({ slug, ...params }) => ({ url: `/public/brands/${slug}/products`, params }),
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetBrandsQuery, useGetBrandBySlugQuery, useGetBrandProductsQuery } = brandsApi;
