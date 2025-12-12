import { Box, Typography, Rating, Divider } from '@mui/material';
import type { Review } from '../reviews.types';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>{review.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={review.rating} readOnly size="small" precision={0.5} />
            <Typography variant="caption" color="text.secondary">{review.rating}/5</Typography>
          </Box>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {new Date(review.created_at).toLocaleDateString('de-CH')}
        </Typography>
      </Box>
      {review.comment && (
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>{review.comment}</Typography>
      )}
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
}
