import { Box, Grid2, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetFavoritesQuery } from '../favorites.api';
import { FavoriteButton } from './FavoriteButton';
import { PriceDisplay } from '@/features/products/components/PriceDisplay';
import EmptyState from '@/shared/components/EmptyState';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export function FavoritesGrid() {
  const { t } = useTranslation('favorites');
  const { data, isLoading } = useGetFavoritesQuery();
  const favorites = data?.data ?? [];

  if (isLoading) return <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress /></Box>;
  if (!favorites.length) return (
    <EmptyState
      icon={<FavoriteBorderIcon sx={{ fontSize: 64 }} />}
      title={t('empty.title')}
      subtitle={t('empty.subtitle')}
    />
  );

  return (
    <Grid2 container spacing={2}>
      {favorites.map((fav) => (
        <Grid2 key={fav._id} size={{ xs: 6, sm: 4, md: 3 }}>
          <Box
            component={Link}
            to={`/products/${fav.product?._id ?? fav.product_id}`}
            sx={{ textDecoration: 'none', color: 'inherit', display: 'block', position: 'relative' }}
          >
            <Box
              sx={{
                border: '1px solid', borderColor: 'divider', borderRadius: 2,
                p: 2, textAlign: 'center', position: 'relative',
                '&:hover': { borderColor: 'primary.main', boxShadow: 2 },
              }}
            >
              <Box sx={{ position: 'absolute', top: 4, right: 4 }}>
                <FavoriteButton productId={fav.product_id} />
              </Box>
              {fav.product?.images?.[0] && (
                <Box
                  component="img"
                  src={fav.product.images[0].src.md}
                  alt={fav.product?.name_short}
                  sx={{ width: '100%', maxHeight: 120, objectFit: 'contain', mb: 1 }}
                />
              )}
              <Typography variant="body2" fontWeight={500} noWrap>{fav.product?.name_short}</Typography>
              {fav.product && (
                <PriceDisplay price={fav.product.price} originalPrice={fav.product.original_price} size="small" />
              )}
            </Box>
          </Box>
        </Grid2>
      ))}
    </Grid2>
  );
}
