import { baseApi } from '@/shared/api/baseApi';
import type { CreateOrderPayload } from './checkout.types';

export const checkoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation<{ data: { _id: string; order_number: string } }, CreateOrderPayload>({
      query: (body) => ({ url: '/customer/orders', method: 'POST', body }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    applyCoupon: builder.mutation<{ data: { discount: number } }, { code: string }>({
      query: (body) => ({ url: '/customer/coupons/validate', method: 'POST', body }),
    }),
  }),
});

export const { usePlaceOrderMutation, useApplyCouponMutation } = checkoutApi;
