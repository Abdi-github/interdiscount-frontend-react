import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useLocaleNavigate } from '@/shared/hooks/useLocalePath';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { closeCartDrawer } from '@/shared/state/uiSlice';
import { selectCartItems, selectCartCount } from '../cart.slice';
import CartItemComponent from './CartItem';
import CartSummary from './CartSummary';
import EmptyState from '@/shared/components/EmptyState';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function CartDrawer() {
  const { t } = useTranslation('cart');
  const dispatch = useAppDispatch();
  const navigate = useLocaleNavigate();

  const handleViewCart = () => {
    dispatch(closeCartDrawer());
    navigate('/cart');
  };

  const handleCheckout = () => {
    dispatch(closeCartDrawer());
    navigate('/checkout');
  };
  const open = useAppSelector((s) => s.ui.cartDrawerOpen);
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => dispatch(closeCartDrawer())}
      PaperProps={{ sx: { width: { xs: '100%', sm: 420 } } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5 }}>
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
          {t('title')} {count > 0 && `(${count})`}
        </Typography>
        <IconButton onClick={() => dispatch(closeCartDrawer())}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2 }}>
        {items.length === 0 ? (
          <EmptyState
            icon={<ShoppingCartIcon />}
            title={t('empty.title')}
            subtitle={t('empty.subtitle')}
          />
        ) : (
          items.map((item) => <CartItemComponent key={item.product._id} item={item} />)
        )}
      </Box>

      {items.length > 0 && (
        <Box sx={{ px: 2, py: 2, borderTop: 1, borderColor: 'divider' }}>
          <CartSummary hideCheckout />
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button variant="outlined" size="small" fullWidth onClick={handleViewCart}>
              {t('view_cart')}
            </Button>
            <Button variant="contained" size="small" fullWidth onClick={handleCheckout}>
              {t('checkout')}
            </Button>
          </Stack>
        </Box>
      )}
    </Drawer>
  );
}
