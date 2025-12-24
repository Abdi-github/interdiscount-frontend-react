import { baseApi } from '@/shared/api/baseApi';
import type { Address, UpdateProfilePayload, ChangePasswordPayload, AddressPayload } from './profile.types';
import type { ApiResponse } from '@/shared/types/api.types';
import type { AuthUser } from '@/features/auth/auth.types';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<ApiResponse<AuthUser>, void>({
      query: () => '/customer/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation<ApiResponse<AuthUser>, UpdateProfilePayload>({
      query: (body) => ({ url: '/customer/profile', method: 'PUT', body }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation<ApiResponse<void>, ChangePasswordPayload>({
      query: (body) => ({ url: '/customer/profile/password', method: 'PUT', body }),
    }),
    getAddresses: builder.query<ApiResponse<Address[]>, void>({
      query: () => '/customer/addresses',
      providesTags: ['Addresses'],
    }),
    addAddress: builder.mutation<ApiResponse<Address>, AddressPayload>({
      query: (body) => ({ url: '/customer/addresses', method: 'POST', body }),
      invalidatesTags: ['Addresses'],
    }),
    updateAddress: builder.mutation<ApiResponse<Address>, { id: string; body: AddressPayload }>({
      query: ({ id, body }) => ({ url: `/customer/addresses/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Addresses'],
    }),
    deleteAddress: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({ url: `/customer/addresses/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Addresses'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = profileApi;
