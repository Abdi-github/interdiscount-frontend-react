import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface RatingStarsProps {
  value: number;
  count?: number;
  size?: 'small' | 'medium' | 'large';
  showCount?: boolean;
  readOnly?: boolean;
}

export default function RatingStars({ value, count, size = 'small', showCount = true }: RatingStarsProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Rating value={value} precision={0.5} readOnly size={size} />
      {showCount && count !== undefined && (
        <Typography variant="body2" color="text.secondary">
          ({count})
        </Typography>
      )}
    </Box>
  );
}
