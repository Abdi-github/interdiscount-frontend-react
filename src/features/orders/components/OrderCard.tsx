import { Box, Typography, Chip, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '@/shared/utils/formatters';
import type { Order, OrderStatus } from '../orders.types';

const STATUS_COLORS: Partial<Record<OrderStatus, 'success' | 'warning' | 'error' | 'default'>> = {
  DELIVERED: 'success', PICKED_UP: 'success',
  SHIPPED: 'warning', READY_FOR_PICKUP: 'warning', PROCESSING: 'warning',
  CANCELLED: 'error', RETURNED: 'error', PICKUP_EXPIRED: 'error',
};

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  const { t } = useTranslation('orders');
  return (
    <Box
      onClick={onClick}
      sx={{
        border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? { borderColor: 'primary.main', bgcolor: 'action.hover' } : {},
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography variant="subtitle2" fontWeight={700}>{t('order')} #{order.order_number}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(order.created_at).toLocaleDateString('de-CH')}
          </Typography>
        </Box>
        <Chip
          label={t(`status.${order.status}`) ?? order.status}
          color={STATUS_COLORS[order.status] ?? 'default'}
          size="small"
        />
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          {order.items?.length ? `${order.items.length} ${t('detail.items')}` : t(`status.${order.status}`)}
        </Typography>
        <Typography variant="subtitle2" fontWeight={700} color="primary">
          {formatPrice(order.total)}
        </Typography>
      </Box>
    </Box>
  );
}
