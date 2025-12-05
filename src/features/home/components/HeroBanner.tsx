import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import type { HeroBannerItem } from '../home.types';

interface Props {
  banners: HeroBannerItem[];
}

export default function HeroBanner({ banners }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation('home');
  const [active, setActive] = useState(0);

  if (!banners.length) {
    return (
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 4, md: 6 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={800} gutterBottom>
            {t('hero.default_title')}
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            {t('hero.default_subtitle')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={() => navigate('/search')}
            sx={{ fontWeight: 700 }}
          >
            {t('hero.default_cta')}
          </Button>
        </Container>
      </Box>
    );
  }

  const banner = banners[active];

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: banner.background_color ?? 'primary.main',
        color: 'white',
        py: { xs: 6, md: 10 },
        backgroundImage: banner.image_url ? `url(${banner.image_url})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          {banner.title}
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          {banner.subtitle}
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          onClick={() => navigate(banner.cta_url)}
          sx={{ fontWeight: 700 }}
        >
          {banner.cta_text}
        </Button>
      </Container>

      {/* Indicators */}
      {banners.length > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2, position: 'absolute', bottom: 16, width: '100%' }}>
          {banners.map((_, i) => (
            <Box
              key={i}
              onClick={() => setActive(i)}
              sx={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: 'white',
                opacity: i === active ? 1 : 0.5,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
