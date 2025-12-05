import { Grid2, Skeleton, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard';
import type { Product } from '../products.types';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function ProductGrid({ products, isLoading, skeletonCount = 12 }: ProductGridProps) {
  const { t } = useTranslation('products');

  if (isLoading) {
    return (
      <Grid2 container spacing={2}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <Grid2 key={i} size={{ xs: 6, sm: 4, md: 3 }}>
            <Skeleton variant="rectangular" height={320} sx={{ borderRadius: 2 }} />
          </Grid2>
        ))}
      </Grid2>
    );
  }

  if (!products.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">{t('no_products')}</Typography>
      </Box>
    );
  }

  return (
    <Grid2 container spacing={2}>
      {products.map((product) => (
        <Grid2 key={product._id} size={{ xs: 6, sm: 4, md: 3 }}>
          <Link
            to={`/products/${product.slug}`}
            style={{ textDecoration: 'none', display: 'block', height: '100%' }}
          >
            <ProductCard product={product} />
          </Link>
        </Grid2>
      ))}
    </Grid2>
  );
}
