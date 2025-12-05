import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useLocaleNavigate } from '@/shared/hooks/useLocalePath';
import { useAppSelector } from '@/app/hooks';
import { selectCartItems } from '../cart.slice';
import CartItemComponent from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import EmptyState from '@/shared/components/EmptyState';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function CartPage() {
  const { t } = useTranslation('cart');
  const navigate = useLocaleNavigate();
  /* console.log('CartPage - loading cart items'); */
  const items = useAppSelector(selectCartItems);
  // TODO: Implement saved cart check from storage

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {t('title')}
      </Typography>

      {items.length === 0 ? (
        <EmptyState
          icon={<ShoppingCartIcon sx={{ fontSize: 64 }} />}
          title={t('empty.title')}
          subtitle={t('empty.subtitle')}
          action={t('empty.cta')}
          onAction={() => navigate('/')}
        />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              {items.map((item) => (
                <CartItemComponent key={item.product._id} item={item} />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, position: 'sticky', top: 80 }}>
              <CartSummary />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
