import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import type { ProductAvailability } from '../products.types';

interface Props {
  availability: ProductAvailability;
  state?: ProductAvailability; // legacy alias
}

export default function AvailabilityChip({ availability, state }: Props) {
  const { t } = useTranslation('products');
  const status = availability ?? state;

  const config: Record<ProductAvailability, { color: 'success' | 'error' | 'warning' | 'info'; icon: JSX.Element }> = {
    AVAILABLE: { color: 'success', icon: <CheckCircleIcon /> },
    OUT_OF_STOCK: { color: 'error', icon: <CancelIcon /> },
    LOW_STOCK: { color: 'warning', icon: <CheckCircleIcon /> },
    PREORDER: { color: 'info', icon: <CheckCircleIcon /> },
    DISCONTINUED: { color: 'error', icon: <CancelIcon /> },
    ONORDER: { color: 'info', icon: <CheckCircleIcon /> },
  };

  const { color, icon } = config[status ?? 'OUT_OF_STOCK'] ?? config.OUT_OF_STOCK;

  return (
    <Chip
      icon={icon}
      label={t(`availability.${status}`)}
      color={color}
      size="small"
      variant="outlined"
    />
  );
}
