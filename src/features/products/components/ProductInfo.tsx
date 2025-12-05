import { Box, Typography, Divider, Stack, Chip } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { formatPrice } from '@/shared/utils/formatters';
import { useTranslation } from 'react-i18next';
import AvailabilityChip from './AvailabilityChip';
import RatingStars from './RatingStars';
import AddToCartButton from './AddToCartButton';
import type { Product } from '../products.types';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { t } = useTranslation(['products', 'common']);
  const hasDiscount = product.original_price > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <Box>
      {product.brand && (
        <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
          {product.brand.name}
        </Typography>
      )}

      <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5, mb: 1 }}>
        {product.name}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <RatingStars value={product.rating} readOnly />
        <Typography variant="body2" color="text.secondary">
          ({product.review_count} {t('products:detail.reviews')})
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Price block */}
      <Box sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="baseline" spacing={1.5}>
          <Typography variant="h4" color="primary" fontWeight={800}>
            {formatPrice(product.price)}
          </Typography>
          {hasDiscount && (
            <>
              <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                {formatPrice(product.original_price)}
              </Typography>
              <Chip label={`-${discountPct}%`} size="small" sx={{ bgcolor: '#d32f2f', color: '#fff', fontWeight: 700 }} />
            </>
          )}
        </Stack>
        <Typography variant="caption" color="text.secondary">{t('products:detail.vat_included')}</Typography>
      </Box>

      {/* Availability */}
      <Stack spacing={1} sx={{ mb: 2 }}>
        <AvailabilityChip availability={product.availability_state} />
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <LocalShippingOutlinedIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {t('products:detail.delivery', { count: product.delivery_days })}
          </Typography>
        </Stack>
        {product.in_store_possible && (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <StorefrontOutlinedIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">{t('common:pickup_available')}</Typography>
          </Stack>
        )}
      </Stack>

      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
        {t('products:detail.article_number')}: {product.displayed_code || product.code}
      </Typography>

      <AddToCartButton product={product} fullWidth size="large" />
    </Box>
  );
}
