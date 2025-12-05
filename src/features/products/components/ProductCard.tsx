import LocaleLink from '@/shared/components/LocaleLink';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import type { Product, ProductAvailability } from '../products.types';
import { formatPriceShort } from '@/shared/utils/formatters';
import { useCart } from '@/shared/hooks/useCart';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { FavoriteButton } from '@/features/favorites/components/FavoriteButton';

interface ProductCardProps {
  product: Product;
}

const AVAILABILITY_COLORS: Record<ProductAvailability, string> = {
  AVAILABLE:    '#4caf50',
  LOW_STOCK:    '#ff9800',
  ONORDER:      '#2196f3',
  PREORDER:     '#9c27b0',
  OUT_OF_STOCK: '#9e9e9e',
  DISCONTINUED: '#9e9e9e',
};

export default function ProductCard({ product }: ProductCardProps) {
  const { add } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation(['products', 'common']);

  const primaryImage = product.images?.[0]?.src.md ?? '/placeholder.png';
  const hasDiscount = product.original_price != null && product.original_price > product.price;
  const discountPct = hasDiscount
    ? `-${Math.round((1 - product.price / product.original_price!) * 100)}%`
    : null;
  const availState = product.availability_state ?? 'AVAILABLE';
  const availColor = AVAILABILITY_COLORS[availState] ?? AVAILABILITY_COLORS.AVAILABLE;
  const availLabel = t(`products:availability.${availState}`);

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        border: '1px solid #e8e8e8',
        borderRadius: 2,
        transition: 'border-color 0.15s, box-shadow 0.15s',
        '&:hover': { borderColor: 'primary.main', boxShadow: '0 2px 12px rgba(220,0,0,0.12)' },
      }}
    >
      {/* Discount badge top-left */}
      {discountPct && (
        <Chip
          label={discountPct}
          color="error"
          size="small"
          sx={{ position: 'absolute', top: 8, left: 8, zIndex: 1, fontWeight: 700, fontSize: '0.72rem', height: 22 }}
        />
      )}

      {/* Image + product info (clickable area) */}
      <CardActionArea component={LocaleLink} to={`/products/${product._id}`} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={primaryImage}
          alt={product.name}
          sx={{ height: 200, objectFit: 'contain', p: 2, bgcolor: '#ffffff' }}
        />
        <CardContent sx={{ pb: 0.5 }}>
          {/* Brand */}
          <Typography variant="caption" color="text.secondary" fontWeight={600} noWrap>
            {product.brand?.name}
          </Typography>

          {/* Product name — 2-line clamp */}
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{
              mt: 0.25,
              lineHeight: 1.35,
              minHeight: '2.7em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </Typography>

          {/* Availability */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: availColor, flexShrink: 0 }} />
            <Typography variant="caption" sx={{ color: availColor, fontSize: '0.7rem' }}>
              {availLabel}
            </Typography>
          </Box>

          {/* Price */}
          <Box sx={{ mt: 1 }}>
            <Typography variant="h6" component="span" fontWeight={700} color="primary.main">
              {formatPriceShort(product.price)}
            </Typography>
            {hasDiscount && (
              <Typography
                variant="caption"
                sx={{ ml: 1, color: 'text.secondary', textDecoration: 'line-through', fontSize: '0.8rem' }}
              >
                {t('products:card.instead_of')} {formatPriceShort(product.original_price!)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>

      {/* Bottom actions — 3 icons like real site */}
      <Divider />
      <CardActions sx={{ px: 1.5, py: 0.5, justifyContent: 'flex-end' }}>
        <Tooltip title={t('common:nav.compare')}>
          <IconButton size="small" onClick={() => enqueueSnackbar(t('common:compare_coming_soon'), { variant: 'info' })}>
            <CompareArrowsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('common:nav.favorites')}>
          <span>
            <FavoriteButton productId={product._id} />
          </span>
        </Tooltip>
        <Tooltip title={t('common:add_to_cart')}>
          <IconButton size="small" color="primary" onClick={() => add(product, 1)}>
            <AddShoppingCartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
