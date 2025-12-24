import { baseApi } from '@/shared/api/baseApi';
import type { Notification, UnreadCountResponse } from './notifications.types';
import type { ApiResponse, PaginatedResponse } from '@/shared/types/api.types';

interface NotificationParams {
  page?: number;
  limit?: number;
  is_read?: string;
  type?: string;
}

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<PaginatedResponse<Notification>, NotificationParams | void>({
      query: (params) => ({ url: '/customer/notifications', params: params ?? {} }),
      providesTags: [{ type: 'Notifications', id: 'LIST' }],
    }),

    getUnreadCount: builder.query<ApiResponse<UnreadCountResponse>, void>({
      query: () => '/customer/notifications/unread-count',
      providesTags: [{ type: 'Notifications', id: 'UNREAD' }],
    }),

    markAsRead: builder.mutation<ApiResponse<Notification>, string>({
      query: (id) => ({ url: `/customer/notifications/${id}/read`, method: 'PUT' }),
      invalidatesTags: [
        { type: 'Notifications', id: 'LIST' },
        { type: 'Notifications', id: 'UNREAD' },
      ],
    }),

    markAllAsRead: builder.mutation<ApiResponse<{ updated: number }>, void>({
      query: () => ({ url: '/customer/notifications/read-all', method: 'PUT' }),
      invalidatesTags: [
        { type: 'Notifications', id: 'LIST' },
        { type: 'Notifications', id: 'UNREAD' },
      ],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationsApi;
