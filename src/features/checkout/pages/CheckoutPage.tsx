import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Stepper, Step, StepLabel,
  Button, Divider, CircularProgress, Alert,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectCartItems, selectCartTotal, clearCart } from '@/features/cart/cart.slice';
import { usePlaceOrderMutation } from '../checkout.api';
import { useGetAddressesQuery } from '@/features/profile/profile.api';
import { useGetStoresQuery } from '@/features/stores/stores.api';
import { formatPrice } from '@/shared/utils/formatters';
import { useLocaleNavigate } from '@/shared/hooks/useLocalePath';
import type { DeliveryMethod } from '../checkout.types';

export default function CheckoutPage() {
  const { t } = useTranslation('checkout');
  const navigate = useNavigate();
  const localeNavigate = useLocaleNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  const [step, setStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'twint' | 'postfinance' | 'invoice'>('card');
  const [error, setError] = useState<string | null>(null);

  const { data: addresses } = useGetAddressesQuery();
  const { data: stores } = useGetStoresQuery({});
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  // Redirect to cart if empty (using useEffect to avoid hooks violation)
  useEffect(() => {
    if (!items.length) {
      // TODO: Add analytics tracking for abandoned checkout
      /* console.log('Cart empty - redirecting to cart'); */
      localeNavigate('/cart', { replace: true });
    }
  }, [items.length, localeNavigate]);

  if (!items.length) {
    return null;
  }

  const STEPS = [t('steps.delivery'), t('steps.address'), t('steps.payment'), t('steps.confirm')];

  const handleConfirm = async () => {
    setError(null);
    try {
      const result = await placeOrder({
        items: items.map((i) => ({ product_id: i.product._id, quantity: i.quantity })),
        payment_method: paymentMethod,
        shipping_address_id: deliveryMethod === 'delivery' ? selectedAddressId ?? undefined : undefined,
        store_pickup_id: deliveryMethod === 'pickup' ? selectedStoreId ?? undefined : undefined,
      }).unwrap();
      // Log::info('Order placed successfully - id: ' . $result->data->_id);
      dispatch(clearCart());
      /* console.log('Redirecting to confirmation page'); */
      localeNavigate(`/account/orders/${result.data._id}/confirmation`);
    } catch {
      setError(t('errors.place_order'));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>{t('title')}</Typography>
      <Stepper activeStep={step} sx={{ mb: 4 }}>
        {STEPS.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Step 0: Delivery method */}
      {step === 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>{t('delivery.title')}</Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            {(['delivery', 'pickup'] as DeliveryMethod[]).map((m) => (
              <Box
                key={m}
                onClick={() => setDeliveryMethod(m)}
                sx={{
                  p: 2, border: '2px solid', borderRadius: 2, cursor: 'pointer', flex: 1,
                  borderColor: deliveryMethod === m ? 'primary.main' : 'divider',
                  bgcolor: deliveryMethod === m ? 'primary.50' : 'background.paper',
                }}
              >
                <Typography fontWeight={600}>
                  {m === 'delivery' ? '🚚 ' + t('delivery.home_delivery') : '🏪 ' + t('delivery.click_collect')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {m === 'delivery' ? t('delivery.home_delivery_desc') : t('delivery.click_collect_desc')}
                </Typography>
              </Box>
            ))}
          </Box>
          <Button variant="contained" onClick={() => setStep(1)}>{t('actions.next')}</Button>
        </Box>
      )}

      {/* Step 1: Address / Store */}
      {step === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            {deliveryMethod === 'delivery' ? t('address.title') : t('delivery.select_store')}
          </Typography>
          {deliveryMethod === 'delivery' ? (
            <Box>
              {(addresses?.data ?? []).map((addr) => (
                <Box
                  key={addr._id}
                  onClick={() => setSelectedAddressId(addr._id)}
                  sx={{
                    p: 2, border: '2px solid', borderRadius: 2, cursor: 'pointer', mb: 1,
                    borderColor: selectedAddressId === addr._id ? 'primary.main' : 'divider',
                  }}
                >
                  <Typography fontWeight={600}>{addr.label}</Typography>
                  <Typography variant="body2">{addr.first_name} {addr.last_name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {addr.street} {addr.street_number}, {addr.postal_code} {addr.city}
                  </Typography>
                </Box>
              ))}
              {!(addresses?.data?.length) && (
                <Alert severity="info">{t('address.no_saved')}</Alert>
              )}
            </Box>
          ) : (
            <Box>
              {(stores?.data ?? []).slice(0, 10).map((store) => (
                <Box
                  key={store._id}
                  onClick={() => setSelectedStoreId(store._id)}
                  sx={{
                    p: 2, border: '2px solid', borderRadius: 2, cursor: 'pointer', mb: 1,
                    borderColor: selectedStoreId === store._id ? 'primary.main' : 'divider',
                  }}
                >
                  <Typography fontWeight={600}>{store.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {store.street} {store.street_number}, {store.postal_code} {store.city}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button onClick={() => setStep(0)}>{t('actions.back')}</Button>
            <Button
              variant="contained"
              onClick={() => setStep(2)}
              disabled={deliveryMethod === 'delivery' ? !selectedAddressId : !selectedStoreId}
            >
              {t('actions.next')}
            </Button>
          </Box>
        </Box>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>{t('payment.title')}</Typography>
          {(['card', 'twint', 'postfinance', 'invoice'] as const).map((method) => (
            <Box
              key={method}
              onClick={() => setPaymentMethod(method)}
              sx={{
                p: 2, border: '2px solid', borderRadius: 2, cursor: 'pointer', mb: 1,
                borderColor: paymentMethod === method ? 'primary.main' : 'divider',
              }}
            >
              <Typography fontWeight={600}>{t(`payment.${method}`)}</Typography>
            </Box>
          ))}
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Button onClick={() => setStep(1)}>{t('actions.back')}</Button>
            <Button variant="contained" onClick={() => setStep(3)}>{t('actions.next')}</Button>
          </Box>
        </Box>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <Box>
          <Typography variant="h6" gutterBottom>{t('summary.title')}</Typography>
          {items.map((item) => (
            <Box key={item.product._id} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2">{item.product.name_short} × {item.quantity}</Typography>
              <Typography variant="body2" fontWeight={600}>{formatPrice(item.product.price * item.quantity)}</Typography>
            </Box>
          ))}
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>{t('summary.total')}</Typography>
            <Typography variant="h6" fontWeight={700} color="primary">{formatPrice(total)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button onClick={() => setStep(2)}>{t('actions.back')}</Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : undefined}
            >
              {t('summary.place_order')}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
