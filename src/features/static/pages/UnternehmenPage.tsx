import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useLocation } from 'react-router-dom';
import LocaleLink from '@/shared/components/LocaleLink';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import WorkIcon from '@mui/icons-material/Work';
import RecyclingIcon from '@mui/icons-material/Recycling';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SchoolIcon from '@mui/icons-material/School';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useTranslation } from 'react-i18next';

const SIDEBAR_LINKS = [
  { key: 'sidebar_company', href: '/unternehmen' },
  { key: 'sidebar_about', href: '/about' },
  { key: 'sidebar_sustainability', href: '/unternehmen' },
  { key: 'sidebar_press', href: '/unternehmen' },
  { key: 'sidebar_jobs', href: '/unternehmen' },
  { key: 'sidebar_prospekt', href: '/unternehmen' },
  { key: 'sidebar_sponsoring', href: '/unternehmen' },
  { key: 'sidebar_business', href: '/unternehmen' },
  { key: 'sidebar_terms', href: '/unternehmen' },
  { key: 'sidebar_imprint', href: '/unternehmen' },
  { key: 'sidebar_privacy', href: '/unternehmen' },
];

const INFO_CARDS = [
  { icon: <NewspaperIcon sx={{ fontSize: 40 }} />, key: 'card_press' },
  { icon: <WorkIcon sx={{ fontSize: 40 }} />, key: 'card_jobs' },
  { icon: <RecyclingIcon sx={{ fontSize: 40 }} />, key: 'card_sustainability' },
  { icon: <HandshakeIcon sx={{ fontSize: 40 }} />, key: 'card_sponsoring' },
  { icon: <SchoolIcon sx={{ fontSize: 40 }} />, key: 'card_education' },
  { icon: <CampaignIcon sx={{ fontSize: 40 }} />, key: 'card_advertising' },
];

export default function UnternehmenPage() {
  const { t } = useTranslation('common');
  const location = useLocation();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={LocaleLink} to="/" underline="hover" color="primary">Home</Link>
        <Typography color="text.primary" fontWeight={500}>{t('nav.unternehmen')}</Typography>
      </Breadcrumbs>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Sidebar */}
        <Box sx={{ width: 230, flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
          <List dense disablePadding>
            {SIDEBAR_LINKS.map((link) => (
              <ListItemButton
                key={link.key}
                component={LocaleLink}
                to={link.href}
                sx={{
                  py: 0.75,
                  px: 1.5,
                  borderLeft: '3px solid',
                  borderLeftColor: location.pathname === link.href && link.key === 'sidebar_company' ? 'text.primary' : 'transparent',
                  fontWeight: location.pathname === link.href && link.key === 'sidebar_company' ? 700 : 400,
                  '&:hover': { color: 'primary.main', borderLeftColor: 'primary.main' },
                }}
              >
                <ListItemText
                  primary={t(`pages.unternehmen.${link.key}`)}
                  primaryTypographyProps={{ fontSize: '0.88rem' }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
            {t('pages.unternehmen.title')}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 5, lineHeight: 1.8 }}>
            {t('pages.unternehmen.description')}
          </Typography>

          <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
            {t('pages.unternehmen.learn_more')}
          </Typography>

          <Grid container spacing={2}>
            {INFO_CARDS.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.key}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main' }}>{card.icon}</Box>
                  <Typography fontWeight={700} variant="h6">
                    {t(`pages.unternehmen.${card.key}`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {t(`pages.unternehmen.${card.key}_desc`)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
