import { baseApi } from '@/shared/api/baseApi';
import { setCredentials, logout } from '@/shared/state/authSlice';
import type {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthResponse,
} from './auth.types';
import type { ApiResponse } from '@/shared/types/api.types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<AuthResponse>, LoginRequest>({
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user, tokens } = data.data;
          dispatch(setCredentials({ user, access_token: tokens.access_token, refresh_token: tokens.refresh_token }));
        } catch {}
      },
      query: (body) => ({ url: '/public/auth/login', method: 'POST', body }),
    }),

    register: builder.mutation<ApiResponse<AuthResponse>, RegisterRequest>({
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { user, tokens } = data.data;
          dispatch(setCredentials({ user, access_token: tokens.access_token, refresh_token: tokens.refresh_token }));
        } catch {}
      },
      query: (body) => ({ url: '/public/auth/register', method: 'POST', body }),
    }),

    forgotPassword: builder.mutation<{ message: string }, ForgotPasswordRequest>({
      query: (body) => ({ url: '/public/auth/forgot-password', method: 'POST', body }),
    }),

    resetPassword: builder.mutation<{ message: string }, ResetPasswordRequest>({
      query: (body) => ({ url: '/public/auth/reset-password', method: 'POST', body }),
    }),

    logout: builder.mutation<void, void>({
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
        }
      },
      query: () => ({ url: '/public/auth/logout', method: 'POST' }),
    }),

    verifyEmail: builder.mutation<{ message: string }, string>({
      query: (token) => ({ url: `/public/auth/verify-email/${token}`, method: 'GET' }),
      invalidatesTags: ['User'],
    }),

    resendVerification: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({ url: '/public/auth/resend-verification', method: 'POST', body }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
} = authApi;

// injectEndpoints loses the inferred hook type in strict tsc — cast explicitly
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLogoutMutation = (authApi as any).useLogoutMutation as (
  ...args: Parameters<typeof useLoginMutation>
) => ReturnType<typeof useLoginMutation>;
