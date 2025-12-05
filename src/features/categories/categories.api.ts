import { baseApi } from '@/shared/api/baseApi';
import type { Category, CategoryFilters } from './categories.types';
import type { ApiResponse, PaginatedResponse } from '@/shared/types/api.types';
import type { Product } from '@/features/products/products.types';

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/public/categories',
      transformResponse: (res: ApiResponse<Category[]>) => res.data,
      providesTags: ['Categories'],
    }),
    getCategoryProductCounts: builder.query<Record<string, number>, void>({
      query: () => '/public/categories/product-counts',
      transformResponse: (res: ApiResponse<Record<string, number>>) => res.data,
      providesTags: ['Categories'],
    }),
    getCategoryBySlug: builder.query<Category | null, string>({
      query: (slug) => `/public/categories/slug/${slug}`,
      transformResponse: (res: ApiResponse<Category>) => res.data ?? null,
      providesTags: (_res, _err, slug) => [{ type: 'Categories', id: slug }],
    }),
    getCategoryById: builder.query<Category | null, string>({
      query: (id) => `/public/categories/${id}`,
      transformResponse: (res: ApiResponse<Category>) => res.data ?? null,
      providesTags: (_res, _err, id) => [{ type: 'Categories', id }],
    }),
    getCategoryProducts: builder.query<PaginatedResponse<Product>, CategoryFilters>({
      query: ({ category_id, brand_id, ...params }) => ({
        url: '/public/products',
        params: {
          ...(category_id ? { category: category_id } : {}),
          ...(brand_id ? { brand: brand_id } : {}),
          ...params,
        },
      }),
      providesTags: ['Products'],
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryProductCountsQuery, useGetCategoryBySlugQuery, useGetCategoryByIdQuery, useGetCategoryProductsQuery } = categoriesApi;
