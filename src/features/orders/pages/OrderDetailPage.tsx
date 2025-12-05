import {
  Container, Typography, Box, Button, CircularProgress,
  Alert, Divider, Chip, Card, CardContent,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { useGetOrderByIdQuery, useCancelOrderMutation } from '../orders.api';
import { OrderTimeline } from '../components/OrderTimeline';
import { OrderItemList } from '../components/OrderItemList';
import { formatPrice } from '@/shared/utils/formatters';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('orders');
  const { data, isLoading } = useGetOrderByIdQuery(id!);
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  // TODO: Implement order status tracking with real-time updates

  if (isLoading) return <Box sx={{ textAlign: 'center', py: 8 }}><CircularProgress /></Box>;
  if (!data?.data) return <Alert severity="error">{t('detail.not_found')}</Alert>;

  const order = data.data;
  const canCancel = order.status === 'PLACED' || order.status === 'CONFIRMED';

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/account/orders')} sx={{ mb: 2 }}>
        {t('detail.back')}
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h5" fontWeight={700}>{t('order')} #{order.order_number}</Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(order.created_at).toLocaleString('de-CH')}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <OrderTimeline status={order.status} createdAt={order.created_at} />
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>{t('detail.items')}</Typography>
          <OrderItemList items={order.items ?? []} />
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>{t('detail.subtotal')}</Typography>
            <Typography>{formatPrice(order.subtotal)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>{t('detail.shipping')}</Typography>
            <Typography>{order.shipping_fee === 0 ? t('detail.shipping_free') : formatPrice(order.shipping_fee)}</Typography>
          </Box>
          {order.discount > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="success.main">{t('detail.discount')}</Typography>
              <Typography color="success.main">-{formatPrice(order.discount)}</Typography>
            </Box>
          )}
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight={700}>{t('detail.total')}</Typography>
            <Typography variant="h6" fontWeight={700} color="primary">{formatPrice(order.total)}</Typography>
          </Box>
        </CardContent>
      </Card>

      {order.shipping_address && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>{t('detail.shipping_address')}</Typography>
            <Typography variant="body2">
              {order.shipping_address.street} {order.shipping_address.street_number},&nbsp;
              {order.shipping_address.postal_code} {order.shipping_address.city}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Chip label={`${t('detail.payment')}: ${t('payment_method.' + order.payment_method)}`} variant="outlined" size="small" />
        {canCancel && (
          <Button
            color="error"
            variant="outlined"
            size="small"
            disabled={isCancelling}
            onClick={() => cancelOrder(order._id)}
          >
            {t('detail.cancel')}
          </Button>
        )}
      </Box>
    </Container>
  );
}
