import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import type { Product } from '@/features/products/products.types';
import ProductCard from '@/features/products/components/ProductCard';

interface Props {
  products: Product[];
  titleKey?: string;
  inline?: boolean;
}

export default function FeaturedProducts({ products, titleKey = 'sections.featured', inline = false }: Props) {
  const { t } = useTranslation('home');

  if (!products.length) return null;

  const inner = (
    <Box sx={{ py: inline ? 2 : 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t(titleKey)}
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product._id} xs={6} sm={4} md={inline ? 4 : 3} lg={inline ? 3 : 2.4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return inline ? inner : <Container maxWidth="lg">{inner}</Container>;
}
