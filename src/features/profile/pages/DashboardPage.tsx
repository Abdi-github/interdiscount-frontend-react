import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Chip,
  Button,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/app/hooks';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { selectAuthUser } from '@/shared/state/authSlice';
import { useGetMyOrdersQuery } from '@/features/orders/orders.api';
import { useGetFavoritesQuery } from '@/features/favorites/favorites.api';
import { useLocaleNavigate } from '@/shared/hooks/useLocalePath';
import { OrderCard } from '@/features/orders/components/OrderCard';

export default function DashboardPage() {
  const { t } = useTranslation(['profile', 'orders']);
  const user = useAppSelector(selectAuthUser);
  const navigate = useLocaleNavigate();

  const { data: ordersData, isLoading: ordersLoading } = useGetMyOrdersQuery({ page: 1, limit: 3 });
  const { data: favData, isLoading: favLoading } = useGetFavoritesQuery();

  const recentOrders = ordersData?.data ?? [];
  const totalOrders = ordersData?.pagination?.total ?? 0;
  const totalFavorites = favData?.data?.length ?? 0;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Welcome section */}
      <Paper
        elevation={0}
        variant="outlined"
        sx={{ p: 3, mb: 3, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2 }}
      >
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
          {user?.avatar_url ? (
            <Box component="img" src={user.avatar_url} alt="" sx={{ width: '100%', height: '100%' }} />
          ) : (
            <PersonIcon sx={{ fontSize: 32 }} />
          )}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            {t('dashboard.welcome', { name: user?.first_name ?? '' })}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Paper>

      {/* Stats cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ p: 2.5, borderRadius: 2, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => navigate('/account/orders')}
          >
            <ShoppingBagIcon color="primary" sx={{ fontSize: 36, mb: 1 }} />
            {ordersLoading ? (
              <Skeleton width={40} sx={{ mx: 'auto' }} />
            ) : (
              <Typography variant="h4" fontWeight={700}>{totalOrders}</Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {t('dashboard.total_orders')}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ p: 2.5, borderRadius: 2, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => navigate('/account/favorites')}
          >
            <FavoriteIcon color="error" sx={{ fontSize: 36, mb: 1 }} />
            {favLoading ? (
              <Skeleton width={40} sx={{ mx: 'auto' }} />
            ) : (
              <Typography variant="h4" fontWeight={700}>{totalFavorites}</Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {t('dashboard.total_favorites')}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ p: 2.5, borderRadius: 2, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => navigate('/account/profile')}
          >
            <PersonIcon color="action" sx={{ fontSize: 36, mb: 1 }} />
            <Chip
              label={user?.is_verified ? t('dashboard.verified') : t('dashboard.not_verified')}
              color={user?.is_verified ? 'success' : 'warning'}
              size="small"
              sx={{ mb: 0.5 }}
            />
            <Typography variant="body2" color="text.secondary">
              {t('dashboard.account_status')}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent orders */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            {t('dashboard.recent_orders')}
          </Typography>
          {totalOrders > 3 && (
            <Button
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/account/orders')}
            >
              {t('dashboard.view_all')}
            </Button>
          )}
        </Box>

        {ordersLoading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CircularProgress size={32} />
          </Box>
        ) : recentOrders.length === 0 ? (
          <Paper
            elevation={0}
            variant="outlined"
            sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}
          >
            <LocalShippingIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
            <Typography color="text.secondary">{t('dashboard.no_orders')}</Typography>
            <Button
              variant="contained"
              size="small"
              sx={{ mt: 2 }}
              onClick={() => navigate('/')}
            >
              {t('dashboard.start_shopping')}
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {recentOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onClick={() => navigate(`/account/orders/${order._id}`)}
              />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
