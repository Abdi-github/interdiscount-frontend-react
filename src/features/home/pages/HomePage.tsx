import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useGetFeaturedProductsQuery, useGetTopDealsQuery, useGetNewArrivalsQuery } from '../home.api';
import FeaturedProducts from '../components/FeaturedProducts';
import PromoBanners from '../components/PromoBanners';
import Themenwelten from '../components/Themenwelten';
import NewsletterBanner from '../components/NewsletterBanner';
import ServicesStrip from '../components/ServicesStrip';
import BrandShowcase from '../components/BrandShowcase';
import FilialCard from '../components/FilialCard';
import { CategorySidebar } from '@/features/categories/components/CategorySidebar';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation('home');
  const { data: featured } = useGetFeaturedProductsQuery();
  const { data: topDeals } = useGetTopDealsQuery();
  const { data: newArrivals } = useGetNewArrivalsQuery();
  
  /* console.log('Featured products loaded:', featured?.data?.length ?? 0); */
  // TODO: Add product recommendation engine based on browsing history

  return (
    <Box>
      {/* Main content: sidebar + promo banners */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          {/* Left category sidebar + Filialsuche */}
          <Box
            sx={{
              width: 220,
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
              position: 'sticky',
              top: 80,
            }}
          >
            <CategorySidebar />
            <FilialCard />
          </Box>

          {/* Main content area: promo banners */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <PromoBanners />
          </Box>
        </Box>
      </Container>

      {/* Featured products carousel */}
      <FeaturedProducts products={featured?.data ?? []} titleKey="sections.featured" />

      {/* Themenwelten */}
      <Container maxWidth="lg">
        <Themenwelten />
      </Container>

      <Divider />

      {/* Top Deals */}
      <FeaturedProducts products={topDeals?.data ?? []} titleKey="sections.top_deals" />

      {/* New Arrivals */}
      <FeaturedProducts products={newArrivals?.data ?? []} titleKey="sections.new_arrivals" />

      {/* About Interdiscount */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t('about.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 900, lineHeight: 1.7 }}>
          {t('about.description')}
        </Typography>
      </Container>

      <Divider />

      {/* Newsletter + Services */}
      <NewsletterBanner />
      <ServicesStrip />

      {/* Brands */}
      <BrandShowcase />
    </Box>
  );
}
