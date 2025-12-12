import { baseApi } from '@/shared/api/baseApi';
import type { Review, CreateReviewPayload, UpdateReviewPayload } from './reviews.types';
import type { ApiResponse, PaginatedResponse } from '@/shared/types/api.types';

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyReviews: builder.query<PaginatedResponse<Review>, { page?: number; limit?: number } | void>({
      query: (params) => ({ url: '/customer/reviews', params: params ?? {} }),
      providesTags: [{ type: 'Reviews', id: 'MY_LIST' }],
    }),

    createReview: builder.mutation<ApiResponse<Review>, CreateReviewPayload>({
      query: (body) => ({ url: '/customer/reviews', method: 'POST', body }),
      invalidatesTags: ['Reviews'],
    }),

    updateReview: builder.mutation<ApiResponse<Review>, UpdateReviewPayload>({
      query: ({ id, ...body }) => ({ url: `/customer/reviews/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Reviews'],
    }),

    deleteReview: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({ url: `/customer/reviews/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const {
  useGetMyReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi;
