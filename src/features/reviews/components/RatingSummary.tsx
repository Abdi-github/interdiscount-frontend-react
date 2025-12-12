import { Box, Typography, Rating, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface RatingSummaryProps {
  averageRating: number;
  totalReviews: number;
  distribution?: Record<number, number>;
}

export function RatingSummary({ averageRating, totalReviews, distribution }: RatingSummaryProps) {
  const { t } = useTranslation('reviews');
  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={700}>{averageRating.toFixed(1)}</Typography>
        <Rating value={averageRating} readOnly precision={0.5} />
        <Typography variant="caption" color="text.secondary">{t('count', { count: totalReviews })}</Typography>
      </Box>
      {distribution && (
        <Box sx={{ flexGrow: 1, minWidth: 200 }}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = distribution[star] ?? 0;
            const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="caption" sx={{ width: 20 }}>{star}★</Typography>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" sx={{ width: 28 }}>{count}</Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
