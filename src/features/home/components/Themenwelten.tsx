import LocaleLink from '@/shared/components/LocaleLink';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

/**
 * "Unsere Themenwelten" section — matches real interdiscount.ch homepage.
 * Horizontal scrolling cards with icon, title and subtitle.
 */

interface ThemeCard {
  emoji: string;
  key: string;
  href: string;
}

const THEME_CARDS: ThemeCard[] = [
  { emoji: '✨', key: 'new_arrivals', href: '/search?sort=newest' },
  { emoji: '🎮', key: 'gaming', href: '/categories/ordinateurs-et-jeux' },
  { emoji: '🧹', key: 'spring_cleaning', href: '/search?q=staubsauger' },
  { emoji: '👶', key: 'baby_family', href: '/categories/beaute-bebe-sante' },
  { emoji: '📷', key: 'photo_video', href: '/categories/photo-et-video' },
  { emoji: '🔌', key: 'gadgets', href: '/search?q=gadget' },
];

export default function Themenwelten() {
  const { t } = useTranslation('home');
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2.5 }}>
        {t('themes.heading')}
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
        {THEME_CARDS.map((card) => (
          <Box
            key={card.key}
            component={LocaleLink}
            to={card.href}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              minWidth: 240,
              flexShrink: 0,
              p: 2,
              borderRadius: 2,
              border: '1px solid #e8e8e8',
              textDecoration: 'none',
              color: 'text.primary',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              },
            }}
          >
            <Typography component="span" sx={{ fontSize: '2rem', flexShrink: 0 }}>
              {card.emoji}
            </Typography>
            <Box>
              <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                {t(`themes.${card.key}`)}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3 }}>
                {t(`themes.${card.key}_desc`)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
