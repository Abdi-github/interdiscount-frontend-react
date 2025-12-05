import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useLocaleNavigate } from '@/shared/hooks/useLocalePath';
import { useCart } from '@/shared/hooks/useCart';
import { formatPrice } from '@/shared/utils/formatters';

const FREE_SHIPPING_THRESHOLD = 49;

interface CartSummaryProps {
  /** When true, hides the checkout button (used inside CartDrawer which has its own buttons) */
  hideCheckout?: boolean;
}

export default function CartSummary({ hideCheckout = false }: CartSummaryProps) {
  const { t } = useTranslation('cart');
  const navigate = useLocaleNavigate();
  const { total, count } = useCart();

  const shippingFree = total >= FREE_SHIPPING_THRESHOLD;
  const remaining = FREE_SHIPPING_THRESHOLD - total;

  return (
    <Box>
      {!shippingFree && (
        <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
          {t('free_shipping_hint', { amount: formatPrice(remaining) })}
        </Typography>
      )}
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2" color="text.secondary">{t('subtotal')}</Typography>
        <Typography variant="body2">{formatPrice(total)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">{t('shipping')}</Typography>
        <Typography variant="body2" color={shippingFree ? 'success.main' : undefined}>
          {shippingFree ? t('shipping_free') : formatPrice(5.9)}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={700}>{t('total')}</Typography>
        <Typography variant="subtitle1" fontWeight={700}>
          {formatPrice(shippingFree ? total : total + 5.9)}
        </Typography>
      </Box>
      {!hideCheckout && (
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => navigate('/checkout')}
        >
          {t('checkout')}
        </Button>
      )}
    </Box>
  );
}
