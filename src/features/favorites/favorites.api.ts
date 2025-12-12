import { baseApi } from '@/shared/api/baseApi';
import type { Favorite } from './favorites.types';
import type { ApiResponse, PaginatedResponse } from '@/shared/types/api.types';

export const favoritesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<PaginatedResponse<Favorite>, void>({
      query: () => '/customer/wishlist',
      providesTags: ['Favorites'],
    }),
    addFavorite: builder.mutation<ApiResponse<Favorite>, string>({
      query: (productId) => ({ url: '/customer/wishlist', method: 'POST', body: { product_id: productId } }),
      invalidatesTags: ['Favorites'],
    }),
    removeFavorite: builder.mutation<ApiResponse<void>, string>({
      query: (productId) => ({ url: `/customer/wishlist/${productId}`, method: 'DELETE' }),
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } = favoritesApi;
