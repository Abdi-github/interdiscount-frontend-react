import LocaleLink from '@/shared/components/LocaleLink';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';

/**
 * Promo banners grid — matches the real interdiscount.ch homepage layout.
 * Shows 6 promo cards arranged in a 3×2 grid with overlaid text + badge.
 */

interface PromoBanner {
  image: string;
  badge: string;
  title: string;
  href: string;
}

const PROMO_BANNERS: PromoBanner[] = [
  {
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=340&fit=crop',
    badge: 'Bis zu 45%',
    title: 'Rabatt auf ausgewählte Produkte von APPLE',
    href: '/search?brand=Apple',
  },
  {
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=340&fit=crop',
    badge: 'AKTION',
    title: 'Best of SAMSUNG - Top Preise auf ausgewählte TV, Soundbar und Tablets',
    href: '/search?brand=Samsung',
  },
  {
    image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=600&h=340&fit=crop',
    badge: '10%',
    title: 'Mac mini. Sieht klein aus. Kommt gross raus.',
    href: '/search?q=mac+mini',
  },
  {
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=340&fit=crop',
    badge: 'Bis zu 20%',
    title: 'Rabatt auf ausgewählte Kaffeemaschinen',
    href: '/search?q=kaffeemaschine',
  },
  {
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=340&fit=crop',
    badge: 'NEW',
    title: 'SAMSUNG Galaxy S26 Series - Jetzt kaufen!',
    href: '/search?q=samsung+galaxy+s26',
  },
  {
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=340&fit=crop',
    badge: '479.– statt 599.–',
    title: 'SAMSUNG Galaxy S25 FE 256 GB',
    href: '/search?q=samsung+galaxy+s25+fe',
  },
];

export default function PromoBanners() {
  const { t } = useTranslation('home');
  return (
    <Box>
      {/* 3×2 promo grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 1.5,
          mb: 2,
        }}
      >
        {PROMO_BANNERS.map((promo, i) => (
          <Box
            key={i}
            component={LocaleLink}
            to={promo.href}
            sx={{
              position: 'relative',
              borderRadius: 2,
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'block',
              aspectRatio: '16/9',
              '&:hover img': { transform: 'scale(1.03)' },
            }}
          >
            <Box
              component="img"
              src={promo.image}
              alt={promo.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s',
              }}
            />
            {/* Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 1.5,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.65))',
                color: 'white',
              }}
            >
              <Typography
                component="span"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  px: 1,
                  py: 0.25,
                  borderRadius: 0.5,
                  mr: 1,
                  display: 'inline-block',
                  mb: 0.5,
                }}
              >
                {promo.badge}
              </Typography>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  color: 'white',
                  lineHeight: 1.3,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {promo.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* "Weitere Aktionen" link */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          {t('promos.more_actions')}
        </Typography>
        <Button
          component={LocaleLink}
          to="/search?on_sale=true"
          size="small"
          endIcon={<ArrowForwardIcon fontSize="small" />}
          sx={{ fontWeight: 700, fontSize: '0.8rem' }}
        >
          {t('promos.cta')}
        </Button>
      </Box>
    </Box>
  );
}
