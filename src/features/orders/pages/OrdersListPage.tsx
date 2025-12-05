import { Container, Typography, Box, Pagination, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useGetMyOrdersQuery } from '../orders.api';
import { OrderCard } from '../components/OrderCard';
import EmptyState from '@/shared/components/EmptyState';

export default function OrdersListPage() {
  const { t } = useTranslation('orders');
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMyOrdersQuery({ page, limit: 10 });
  // TODO: Add order filtering by status (pending, delivered, etc.)

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>{t('title')}</Typography>

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 6 }}><CircularProgress /></Box>
      ) : !data?.data?.length ? (
        <EmptyState
          icon={<ShoppingBagIcon sx={{ fontSize: 64 }} />}
          title={t('empty.title')}
          subtitle={t('empty.subtitle')}
          action={t('empty.cta')}
          onAction={() => navigate('/')}
        />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {data.data.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onClick={() => navigate(`/account/orders/${order._id}`)}
            />
          ))}
          {(data.pagination.total_pages ?? 1) > 1 && (
            <Pagination
              count={data.pagination.total_pages}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
              sx={{ mx: 'auto', mt: 2 }}
            />
          )}
        </Box>
      )}
    </Container>
  );
}
