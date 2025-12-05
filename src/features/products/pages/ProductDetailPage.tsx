import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LocaleLink from '@/shared/components/LocaleLink';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import { useGetProductByIdQuery, useGetRelatedProductsQuery } from '../products.api';
import type { ProductImage } from '../products.types';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import CurrencyDisplay from '@/shared/components/CurrencyDisplay';
import AvailabilityChip from '../components/AvailabilityChip';
import RatingStars from '../components/RatingStars';
import AddToCartButton from '../components/AddToCartButton';
import { ProductReviews } from '../components/ProductReviews';
import { FavoriteButton } from '@/features/favorites/components/FavoriteButton';
import { localizeField } from '@/shared/utils/localizeField';
import { useAppSelector } from '@/app/hooks';
import { selectLanguage } from '@/shared/state/uiSlice';
import FeaturedProducts from '@/features/home/components/FeaturedProducts';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(['products', 'common']);
  const locale = useAppSelector(selectLanguage);
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id!);
  // TODO: Implement product view tracking for analytics
  const { data: related = [] } = useGetRelatedProductsQuery(
    { categoryId: product?.category_id ?? '', excludeId: id! },
    { skip: !product?.category_id }
  );
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  if (isLoading) return <LoadingSpinner fullPage />;
  if (isError || !product)
    return <EmptyState title={t('common:errors.not_found')} sx={{ mt: 8 }} />;

  const placeholder: ProductImage = { src: { xs: '/placeholder.png', sm: '/placeholder.png', md: '/placeholder.png' }, alt: product.name };
  const images: ProductImage[] = product.images?.length ? product.images : [placeholder];

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={LocaleLink} to="/" underline="hover" color="inherit">
          Home
        </Link>
        {product.category && (
          <Link
            component={LocaleLink}
            to={`/categories/${product.category.slug}`}
            underline="hover"
            color="inherit"
          >
            {localizeField(product.category.name, locale)}
          </Link>
        )}
        <Typography color="text.primary" noWrap sx={{ maxWidth: 200 }}>
          {product.name}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Images */}
        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Box
              component="img"
              src={images[activeImage]?.src?.md ?? '/placeholder.png'}
              alt={images[activeImage]?.alt ?? product.name}
              sx={{ width: '100%', maxHeight: 400, objectFit: 'contain' }}
            />
          </Paper>
          {images.length > 1 && (
            <Box sx={{ display: 'flex', gap: 1, mt: 1, overflowX: 'auto' }}>
              {images.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img.src?.md ?? '/placeholder.png'}
                  alt={img.alt ?? `${i + 1}`}
                  onClick={() => setActiveImage(i)}
                  sx={{
                    width: 64,
                    height: 64,
                    objectFit: 'contain',
                    border: 2,
                    borderColor: i === activeImage ? 'primary.main' : 'transparent',
                    borderRadius: 1,
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                />
              ))}
            </Box>
          )}
        </Grid>

        {/* Info */}
        <Grid item xs={12} md={7}>
          <Typography variant="caption" color="text.secondary">
            {product.brand?.name} · {t('detail.code')} {product.code}
          </Typography>
          <Typography variant="h4" fontWeight={700} sx={{ mt: 0.5 }}>
            {product.name}
          </Typography>

          {product.rating != null && (
            <Box sx={{ mt: 1 }}>
              <RatingStars value={product.rating} count={product.review_count} />
            </Box>
          )}

          <Box sx={{ my: 2 }}>
            <CurrencyDisplay
              amount={product.price}
              originalAmount={product.original_price}
              variant="h4"
            />
          </Box>

          <AvailabilityChip availability={product.availability_state} />

          {/* Delivery info */}
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalShippingOutlinedIcon fontSize="small" color="action" />
              <Typography variant="body2">
                {product.delivery_days <= 1
                  ? t('products:detail.delivery_tomorrow')
                  : t('products:detail.delivery', { count: product.delivery_days })}
              </Typography>
            </Box>
            {product.in_store_possible && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StorefrontOutlinedIcon fontSize="small" color="action" />
                <Typography variant="body2">Click & Collect {t('products:detail.click_collect_available')}</Typography>
              </Box>
            )}
          </Box>

          {/* Financing teaser */}
          {product.price >= 200 && (
            <Box
              sx={{
                mt: 2,
                p: 1.5,
                bgcolor: 'grey.50',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCardOutlinedIcon fontSize="small" color="primary" />
                <Typography variant="body2">
                  {t('products:detail.financing_from')}{' '}
                  <strong>
                    CHF {(product.price / 24).toFixed(2)}/{t('products:detail.financing_month')}
                  </strong>{' '}
                  {t('products:detail.financing_interest')}
                </Typography>
              </Box>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'stretch' }}>
            <Box sx={{ flexGrow: 1 }}>
              <AddToCartButton product={product} fullWidth />
            </Box>
            <FavoriteButton productId={product._id} />
          </Box>

          {/* Service guarantees strip */}
          <Box
            sx={{
              mt: 3,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1,
              textAlign: 'center',
            }}
          >
            {[
              { icon: <LocalShippingOutlinedIcon fontSize="small" />, line1: t('products:detail.free_delivery'), line2: t('products:detail.free_delivery_min') },
              { icon: <VerifiedOutlinedIcon fontSize="small" />, line1: t('products:detail.warranty_years'), line2: t('products:detail.warranty') },
              { icon: <StorefrontOutlinedIcon fontSize="small" />, line1: 'Click &', line2: 'Collect' },
            ].map(({ icon, line1, line2 }) => (
              <Box
                key={line1}
                sx={{
                  p: 1,
                  bgcolor: 'grey.50',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <Box sx={{ color: 'primary.main' }}>{icon}</Box>
                <Typography variant="caption" align="center" sx={{ lineHeight: 1.3 }}>
                  {line1}<br />{line2}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ mt: 5 }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
          <Tab label={t('detail.description')} />
          <Tab label={t('detail.specs')} />
          <Tab label={t('detail.reviews')} />
        </Tabs>
        <Divider />
        <Box sx={{ py: 3 }}>
          {activeTab === 0 && (
            <Typography
              variant="body1"
              sx={{ whiteSpace: 'pre-line' }}
              dangerouslySetInnerHTML={{ __html: product.description ?? '' }}
            />
          )}
          {activeTab === 1 && product.specification && (
            <Box>
              {Object.entries(product.specification).map(([key, value]) => (
                <Box
                  key={key}
                  sx={{ display: 'flex', py: 1, borderBottom: 1, borderColor: 'divider' }}
                >
                  <Typography variant="body2" sx={{ minWidth: 200, fontWeight: 600 }}>
                    {key}
                  </Typography>
                  <Typography variant="body2">{String(value)}</Typography>
                </Box>
              ))}
            </Box>
          )}
          {activeTab === 2 && product && (
            <ProductReviews product={product} />
          )}
        </Box>
      </Box>

      {/* Related */}
      {related.length > 0 && (
        <FeaturedProducts products={related} titleKey="sections.related" />
      )}
    </Container>
  );
}
