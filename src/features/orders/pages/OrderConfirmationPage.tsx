import { useParams } from 'react-router-dom';
import LocaleLink from '@/shared/components/LocaleLink';
import {
  Container, Box, Typography, Button, Divider,
  CircularProgress, Alert, Paper,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from 'react-i18next';
import { useGetOrderByIdQuery } from '../orders.api';
import { OrderItemList } from '../components/OrderItemList';
import { formatPrice } from '@/shared/utils/formatters';
import PaymentProcessing from '@/features/payments/components/PaymentProcessing';

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('orders');
  const { data, isLoading } = useGetOrderByIdQuery(id!);
  // TODO: Send order confirmation email with tracking info

  if (isLoading) return <Box sx={{ textAlign: 'center', py: 10 }}><CircularProgress /></Box>;
  if (!data?.data) return <Alert severity="error">{t('detail.not_found')}</Alert>;

  const order = data.data;

  return (
    <Container maxWidth="sm" sx={{ py: 6, textAlign: 'center' }}>
      <CheckCircleOutlineIcon sx={{ fontSize: 72, color: 'success.main', mb: 2 }} />

      <Typography variant="h4" fontWeight={700} gutterBottom>
        {t('confirmation.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('confirmation.subtitle', { number: order.order_number })}
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, textAlign: 'left', borderRadius: 2, mb: 4 }}>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          {t('detail.items')}
        </Typography>
        <OrderItemList items={order.items ?? []} />
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">{t('detail.subtotal')}</Typography>
          <Typography variant="body2">{formatPrice(order.subtotal)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">{t('detail.shipping')}</Typography>
          <Typography variant="body2">
            {order.shipping_fee === 0 ? t('detail.shipping_free') : formatPrice(order.shipping_fee)}
          </Typography>
        </Box>
        {order.discount > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="body2" color="success.main">{t('detail.discount')}</Typography>
            <Typography variant="body2" color="success.main">-{formatPrice(order.discount)}</Typography>
          </Box>
        )}
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography fontWeight={700}>{t('detail.total')}</Typography>
          <Typography fontWeight={700} color="primary">{formatPrice(order.total)}</Typography>
        </Box>
      </Paper>

      {/* Payment processing section */}
      <Box sx={{ textAlign: 'left', mb: 4 }}>
        <PaymentProcessing orderId={order._id} paymentMethod={order.payment_method} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Button
          variant="contained"
          size="large"
          component={LocaleLink}
          to={`/account/orders/${order._id}`}
        >
          {t('confirmation.view_order')}
        </Button>
        <Button variant="outlined" size="large" component={LocaleLink} to="/">
          {t('confirmation.continue')}
        </Button>
      </Box>
    </Container>
  );
}
