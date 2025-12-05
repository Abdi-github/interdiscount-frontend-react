import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGetBrandsQuery } from '../brands.api';
import { BrandCard } from '../components/BrandCard';

export default function BrandsPage() {
  const { t } = useTranslation('common');
  /* console.log('BrandsPage - loading brands list'); */
  const { data, isLoading } = useGetBrandsQuery({});
  // TODO: Add brand search and filtering capabilities

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>{t('brands.title')}</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {t('brands.description')}
      </Typography>

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 6 }}><CircularProgress /></Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: 'repeat(2,1fr)', sm: 'repeat(3,1fr)', md: 'repeat(4,1fr)', lg: 'repeat(5,1fr)' },
          }}
        >
          {(data?.data ?? []).map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </Box>
      )}
    </Container>
  );
}
