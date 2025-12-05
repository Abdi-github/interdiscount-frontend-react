import { baseApi } from '@/shared/api/baseApi';
import type { Order } from './orders.types';
import type { PaginatedResponse, ApiResponse } from '@/shared/types/api.types';

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query<PaginatedResponse<Order>, { page?: number; limit?: number }>({
      query: (params) => ({ url: '/customer/orders', params }),
      providesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    getOrderById: builder.query<ApiResponse<Order>, string>({
      query: (id) => `/customer/orders/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Orders', id }],
    }),
    cancelOrder: builder.mutation<ApiResponse<Order>, string>({
      query: (id) => ({ url: `/customer/orders/${id}/cancel`, method: 'PUT' }),
      invalidatesTags: (_res, _err, id) => [{ type: 'Orders', id }, { type: 'Orders', id: 'LIST' }],
    }),
  }),
});

export const { useGetMyOrdersQuery, useGetOrderByIdQuery, useCancelOrderMutation } = ordersApi;
