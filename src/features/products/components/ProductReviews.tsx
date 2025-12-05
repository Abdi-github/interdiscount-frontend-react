import { Box, Typography, Divider, Rating, LinearProgress, Stack, Pagination, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Product } from '../products.types';
import { useGetProductReviewsQuery } from '../products.api';

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const { t, i18n } = useTranslation('reviews');
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetProductReviewsQuery({ id: product._id, page, limit: 5 });

  const reviews = data?.data ?? [];
  const totalPages = data?.pagination.total_pages ?? 1;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>{t('title')}</Typography>

      {/* Rating summary */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 3 }}>
        <Box sx={{ textAlign: 'center', minWidth: 120 }}>
          <Typography variant="h2" fontWeight={800} color="primary">{product.rating.toFixed(1)}</Typography>
          <Rating value={product.rating} precision={0.5} readOnly size="small" />
          <Typography variant="caption" color="text.secondary">{t('count', { count: product.review_count })}</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => Math.round(r.rating) === star).length;
            const pct = reviews.length ? (count / reviews.length) * 100 : 0;
            return (
              <Stack key={star} direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                <Typography variant="caption" sx={{ minWidth: 16 }}>{star}</Typography>
                <LinearProgress variant="determinate" value={pct} sx={{ flexGrow: 1, height: 8, borderRadius: 4 }} />
                <Typography variant="caption" sx={{ minWidth: 28 }}>{count}</Typography>
              </Stack>
            );
          })}
        </Box>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>
      ) : reviews.length === 0 ? (
        <Typography color="text.secondary">{t('no_reviews')}</Typography>
      ) : (
        <>
          {reviews.map((review) => (
            <Box key={review._id} sx={{ mb: 2 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Rating value={review.rating} size="small" readOnly />
                <Typography variant="subtitle2" fontWeight={700}>{review.title}</Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                {review.user?.first_name} {review.user?.last_name?.charAt(0)}.
                &nbsp;·&nbsp;
                {new Date(review.created_at).toLocaleDateString(i18n.language)}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>{review.comment}</Typography>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
          {totalPages > 1 && (
            <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} color="primary" sx={{ mt: 2 }} />
          )}
        </>
      )}
    </Box>
  );
}
