import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  CircularProgress,
  Pagination,
  Tabs,
  Tab,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import CampaignIcon from '@mui/icons-material/Campaign';
import InfoIcon from '@mui/icons-material/Info';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EmptyState from '@/shared/components/EmptyState';
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  useGetUnreadCountQuery,
} from '../notifications.api';
import type { Notification } from '../notifications.types';

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'order_confirmed':
    case 'order_status':
      return <LocalShippingIcon color="primary" />;
    case 'order_shipped':
      return <LocalShippingIcon color="info" />;
    case 'order_delivered':
    case 'pickup_ready':
      return <CheckCircleIcon color="success" />;
    case 'order_cancelled':
    case 'pickup_expired':
      return <CancelIcon color="error" />;
    case 'review_approved':
    case 'review_rejected':
      return <StarIcon color="warning" />;
    case 'price_drop':
      return <TrendingDownIcon color="success" />;
    case 'promotion':
      return <CampaignIcon color="secondary" />;
    default:
      return <InfoIcon color="action" />;
  }
};

export default function NotificationsPage() {
  const { t } = useTranslation('notifications');
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const params = {
    page,
    limit: 15,
    ...(filter === 'unread' && { is_read: 'false' }),
    ...(filter === 'read' && { is_read: 'true' }),
  };

  const { data, isLoading } = useGetNotificationsQuery(params);
  const { data: unreadData } = useGetUnreadCountQuery();
  const [markRead] = useMarkAsReadMutation();
  const [markAllRead, { isLoading: markingAll }] = useMarkAllAsReadMutation();

  const notifications = data?.data ?? [];
  const unreadCount = unreadData?.data?.count ?? 0;

  const handleClick = async (notification: Notification) => {
    if (!notification.is_read) {
      await markRead(notification._id);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t('time.just_now');
    if (diffMins < 60) return t('time.minutes_ago', { count: diffMins });
    if (diffHours < 24) return t('time.hours_ago', { count: diffHours });
    if (diffDays < 7) return t('time.days_ago', { count: diffDays });
    return date.toLocaleDateString();
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>
          {t('title')}
          {unreadCount > 0 && (
            <Chip label={unreadCount} color="error" size="small" sx={{ ml: 1, verticalAlign: 'middle' }} />
          )}
        </Typography>
        {unreadCount > 0 && (
          <Button
            size="small"
            startIcon={<DoneAllIcon />}
            onClick={() => markAllRead()}
            disabled={markingAll}
          >
            {t('mark_all_read')}
          </Button>
        )}
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={filter} onChange={(_, v) => { setFilter(v); setPage(1); }}>
          <Tab label={t('filter.all')} value="all" />
          <Tab label={t('filter.unread')} value="unread" />
          <Tab label={t('filter.read')} value="read" />
        </Tabs>
      </Box>

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 6 }}><CircularProgress /></Box>
      ) : notifications.length === 0 ? (
        <EmptyState
          icon={<NotificationsNoneIcon sx={{ fontSize: 64 }} />}
          title={t('empty.title')}
          subtitle={t('empty.subtitle')}
        />
      ) : (
        <>
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <List disablePadding>
              {notifications.map((n, i) => (
                <ListItemButton
                  key={n._id}
                  onClick={() => handleClick(n)}
                  sx={{
                    bgcolor: n.is_read ? 'transparent' : 'action.hover',
                    borderBottom: i < notifications.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    py: 1.5,
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{getNotificationIcon(n.type)}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="body2"
                          fontWeight={n.is_read ? 400 : 600}
                          sx={{ flex: 1 }}
                        >
                          {n.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" whiteSpace="nowrap">
                          {formatDate(n.created_at)}
                        </Typography>
                      </Box>
                    }
                    secondary={n.message}
                  />
                  {!n.is_read && (
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        ml: 1,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </ListItemButton>
              ))}
            </List>
          </Paper>

          {(data?.pagination?.total_pages ?? 1) > 1 && (
            <Pagination
              count={data?.pagination?.total_pages}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
              sx={{ mx: 'auto', mt: 3, display: 'flex', justifyContent: 'center' }}
            />
          )}
        </>
      )}
    </Container>
  );
}
