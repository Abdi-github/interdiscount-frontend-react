import { Box, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import type { OrderStatus } from '../orders.types';

interface OrderTimelineProps {
  status: OrderStatus;
  createdAt: string;
}

const STEP_ICONS = [HourglassEmptyIcon, InventoryIcon, InventoryIcon, LocalShippingIcon, CheckCircleIcon];
const STEP_STATUSES: OrderStatus[] = ['PLACED', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'];

const ORDER_IDX: Record<OrderStatus, number> = {
  PLACED: 0, CONFIRMED: 1, PROCESSING: 2, SHIPPED: 3, DELIVERED: 4,
  READY_FOR_PICKUP: 3, PICKED_UP: 4, CANCELLED: -1, RETURNED: -1, PICKUP_EXPIRED: -1,
};

export function OrderTimeline({ status }: OrderTimelineProps) {
  const { t } = useTranslation('orders');
  const currentIdx = ORDER_IDX[status] ?? 0;
  const isCancelled = status === 'CANCELLED' || status === 'RETURNED';

  if (isCancelled) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CancelIcon color="error" />
        <Typography color="error">{t('cancelled')}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
      {STEP_STATUSES.map((stepStatus, idx) => {
        const Icon = STEP_ICONS[idx];
        const done = idx <= currentIdx;
        return (
          <Box key={stepStatus} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Icon fontSize="small" sx={{ color: done ? 'primary.main' : 'text.disabled' }} />
            <Typography variant="caption" sx={{ color: done ? 'text.primary' : 'text.disabled' }}>
              {t(`status.${stepStatus}`)}
            </Typography>
            {idx < STEP_STATUSES.length - 1 && (
              <Box sx={{ width: 20, height: 2, bgcolor: done ? 'primary.main' : 'divider', mx: 0.5 }} />
            )}
          </Box>
        );
      })}
    </Box>
  );
}
