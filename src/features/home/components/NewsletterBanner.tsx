import LocaleLink from '@/shared/components/LocaleLink';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';

/**
 * Newsletter banner — matches real interdiscount.ch
 * Simple heading + text + "Jetzt abonnieren" button (not a form)
 */
export default function NewsletterBanner() {
  const { t } = useTranslation('home');
  return (
    <Box sx={{ bgcolor: '#f5f5f5', py: 4, borderTop: '1px solid #e8e8e8' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {t('newsletter.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 520 }}>
              {t('newsletter.description')}
            </Typography>
          </Box>
          <Button
            component={LocaleLink}
            to="/contact"
            variant="contained"
            color="primary"
            endIcon={<ArrowForwardIcon />}
            sx={{ fontWeight: 700, px: 3, flexShrink: 0 }}
          >
            {t('newsletter.cta')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
