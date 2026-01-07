import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { formatPrice } from '@/shared/utils/formatters';

interface CurrencyDisplayProps {
  amount: number;
  originalAmount?: number;
  variant?: 'body1' | 'body2' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps<Theme>;
}

export default function CurrencyDisplay({
  amount,
  originalAmount,
  variant = 'body1',
  sx,
}: CurrencyDisplayProps) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6 }}>
      <Typography
        component="span"
        variant={variant}
        sx={{ fontWeight: 700, color: 'primary.main', ...sx }}
      >
        {formatPrice(amount)}
      </Typography>
      {originalAmount !== undefined && originalAmount > amount && (
        <Typography
          component="span"
          variant="body2"
          sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
        >
          {formatPrice(originalAmount)}
        </Typography>
      )}
    </span>
  );
}
