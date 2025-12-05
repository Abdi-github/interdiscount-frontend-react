import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/shared/hooks/useCart';
import type { Product } from '../products.types';

interface Props {
  product: Product;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function AddToCartButton({ product, fullWidth }: Props) {
  const { t } = useTranslation('common');
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const isDisabled = product.availability_state === 'OUT_OF_STOCK';

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
      <ButtonGroup size="small" variant="outlined">
        <IconButton size="small" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}>
          <RemoveIcon fontSize="small" />
        </IconButton>
        <Box sx={{ px: 2, display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'divider' }}>
          {qty}
        </Box>
        <IconButton size="small" onClick={() => setQty((q) => q + 1)}>
          <AddIcon fontSize="small" />
        </IconButton>
      </ButtonGroup>
      <Button
        variant="contained"
        size="large"
        startIcon={<ShoppingCartIcon />}
        disabled={isDisabled}
        fullWidth={fullWidth}
        onClick={() => add(product, qty)}
        sx={{ flexGrow: 1 }}
      >
        {isDisabled ? t('out_of_stock') : t('add_to_cart')}
      </Button>
    </Box>
  );
}
