import LocaleLink from '@/shared/components/LocaleLink';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

const BRANDS = ['Apple', 'Samsung', 'Sony', 'Philips', 'LG', 'Bosch', 'Dyson', 'Garmin'];

export default function BrandShowcase() {
  const { t } = useTranslation('home');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t('sections.brands')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 1,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {BRANDS.map((brand) => (
          <Paper
            key={brand}
            component={LocaleLink}
            to={`/brands?name=${brand}`}
            elevation={0}
            variant="outlined"
            sx={{
              px: 3,
              py: 2,
              minWidth: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.9rem',
              flexShrink: 0,
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
            }}
          >
            {brand}
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
