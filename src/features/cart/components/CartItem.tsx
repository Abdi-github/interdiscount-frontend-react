import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocaleLink from '@/shared/components/LocaleLink';
import { useAppDispatch } from '@/app/hooks';
import { removeItem, updateQuantity } from '../cart.slice';
import CurrencyDisplay from '@/shared/components/CurrencyDisplay';
import type { CartItem as CartItemType } from '../cart.types';

interface Props {
  item: CartItemType;
}

export default function CartItem({ item }: Props) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;
  const image = product.images?.[0]?.src.md ?? '/placeholder.png';

  return (
    <Box sx={{ display: 'flex', gap: 2, py: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Box
        component="img"
        src={image}
        alt={product.name_short}
        sx={{ width: 72, height: 72, objectFit: 'contain', borderRadius: 1, flexShrink: 0 }}
      />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          fontWeight={600}
          component={LocaleLink}
          to={`/products/${product._id}`}
          sx={{ textDecoration: 'none', color: 'text.primary', display: 'block' }}
          noWrap
        >
          {product.name_short}
        </Typography>
        <CurrencyDisplay
          amount={product.price}
          originalAmount={product.original_price > product.price ? product.original_price : undefined}
          variant="body2"
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
          <IconButton
            size="small"
            onClick={() => dispatch(updateQuantity({ productId: product._id, quantity: quantity - 1 }))}
            disabled={quantity <= 1}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>{quantity}</Typography>
          <IconButton
            size="small"
            onClick={() => dispatch(updateQuantity({ productId: product._id, quantity: quantity + 1 }))}
          >
            <AddIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => dispatch(removeItem(product._id))}
            sx={{ ml: 'auto' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}


