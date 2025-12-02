import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../app/store';
import { setTokens, logout } from '../state/authSlice';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    if (state.auth.accessToken) {
      headers.set('Authorization', `Bearer ${state.auth.accessToken}`);
    }
    headers.set('Accept-Language', state.ui.language);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;
    if (refreshToken) {
      const refreshResult = await rawBaseQuery(
        { url: '/public/auth/refresh', method: 'POST', body: { refresh_token: refreshToken } },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        const tokens = (refreshResult.data as { data: { access_token: string; refresh_token: string } })
          .data;
        api.dispatch(setTokens({ accessToken: tokens.access_token, refreshToken: tokens.refresh_token }));
        result = await rawBaseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Products',
    'Categories',
    'Brands',
    'Orders',
    'Reviews',
    'Favorites',
    'Addresses',
    'Stores',
    'User',
    'Cart',
    'Promotions',
    'Notifications',
    'Payments',
  ],
  endpoints: () => ({}),
});
