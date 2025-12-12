import { baseApi } from '@/shared/api/baseApi';
import type { Store } from './stores.types';
import type { ApiResponse, PaginatedResponse } from '@/shared/types/api.types';

export const storesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query<PaginatedResponse<Store>, { page?: number; limit?: number; canton?: string; search?: string }>({
      query: (params) => ({ url: '/public/stores', params }),
      providesTags: ['Stores'],
    }),
    getStoreById: builder.query<ApiResponse<Store>, string>({
      query: (id) => `/public/stores/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Stores', id }],
    }),
  }),
});

export const { useGetStoresQuery, useGetStoreByIdQuery } = storesApi;
