import { Box, Typography } from '@mui/material';
import { formatPrice } from '@/shared/utils/formatters';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: 'small' | 'medium' | 'large';
}

export function PriceDisplay({ price, originalPrice, size = 'medium' }: PriceDisplayProps) {
  const hasDiscount = originalPrice !== undefined && originalPrice > price;
  const fontSize = size === 'large' ? 'h4' : size === 'small' ? 'body2' : 'h6';

  return (
    <Box>
      <Typography variant={fontSize} component="span" color="primary" fontWeight={700}>
        {formatPrice(price)}
      </Typography>
      {hasDiscount && (
        <Typography
          variant="body2"
          component="span"
          color="text.secondary"
          sx={{ textDecoration: 'line-through', ml: 1 }}
        >
          {formatPrice(originalPrice!)}
        </Typography>
      )}
    </Box>
  );
}
