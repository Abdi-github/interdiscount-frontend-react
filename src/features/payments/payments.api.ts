import { baseApi } from '@/shared/api/baseApi';
import type { Payment } from './payments.types';
import type { ApiResponse } from '@/shared/types/api.types';

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation<ApiResponse<Payment>, string>({
      query: (orderId) => ({
        url: `/customer/payments/${orderId}/initiate`,
        method: 'POST',
      }),
      invalidatesTags: (_res, _err, orderId) => [
        { type: 'Payments', id: orderId },
        { type: 'Orders', id: orderId },
      ],
    }),

    simulatePayment: builder.mutation<ApiResponse<Payment>, string>({
      query: (orderId) => ({
        url: `/customer/payments/${orderId}/simulate`,
        method: 'POST',
      }),
      invalidatesTags: (_res, _err, orderId) => [
        { type: 'Payments', id: orderId },
        { type: 'Orders', id: orderId },
        { type: 'Orders', id: 'LIST' },
      ],
    }),

    confirmInvoicePayment: builder.mutation<
      ApiResponse<Payment>,
      { orderId: string; transfer_number: string }
    >({
      query: ({ orderId, transfer_number }) => ({
        url: `/customer/payments/${orderId}/invoice`,
        method: 'POST',
        body: { transfer_number },
      }),
      invalidatesTags: (_res, _err, { orderId }) => [
        { type: 'Payments', id: orderId },
        { type: 'Orders', id: orderId },
      ],
    }),

    getPaymentStatus: builder.query<ApiResponse<Payment | { status: 'NO_PAYMENT' }>, string>({
      query: (orderId) => `/customer/payments/${orderId}`,
      providesTags: (_res, _err, orderId) => [{ type: 'Payments', id: orderId }],
    }),
  }),
});

export const {
  useInitiatePaymentMutation,
  useSimulatePaymentMutation,
  useConfirmInvoicePaymentMutation,
  useGetPaymentStatusQuery,
} = paymentsApi;
