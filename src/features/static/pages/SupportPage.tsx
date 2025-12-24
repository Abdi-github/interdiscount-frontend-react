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
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import CancelIcon from '@mui/icons-material/Cancel';
import ExtensionIcon from '@mui/icons-material/Extension';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ComputerIcon from '@mui/icons-material/Computer';
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';

const SIDEBAR_LINKS = [
  { key: 'sidebar_support', href: '/support' },
  { key: 'sidebar_helpcenter', href: '/contact' },
  { key: 'sidebar_contact', href: '/contact' },
  { key: 'sidebar_shipping', href: '/shipping' },
  { key: 'sidebar_repairs', href: '/contact' },
  { key: 'sidebar_returns', href: '/contact' },
  { key: 'sidebar_order_docs', href: '/account/orders' },
  { key: 'sidebar_cancel', href: '/contact' },
];

interface SupportItem {
  icon: ReactNode;
  key: string;
  href: string;
}

interface SupportSection {
  titleKey: string;
  items: SupportItem[];
}

const SUPPORT_SECTIONS: SupportSection[] = [
  {
    titleKey: 'section_info',
    items: [
      { icon: <StorefrontIcon />, key: 'stores', href: '/stores' },
      { icon: <HelpOutlineIcon />, key: 'helpcenter', href: '/contact' },
      { icon: <ContactMailIcon />, key: 'contact', href: '/contact' },
    ],
  },
  {
    titleKey: 'section_after',
    items: [
      { icon: <AssignmentReturnIcon />, key: 'returns', href: '/contact' },
      { icon: <BuildIcon />, key: 'repairs', href: '/contact' },
      { icon: <DescriptionIcon />, key: 'order_docs', href: '/account/orders' },
      { icon: <CancelIcon />, key: 'cancel_order', href: '/contact' },
      { icon: <ExtensionIcon />, key: 'spare_parts', href: '/contact' },
    ],
  },
  {
    titleKey: 'section_order',
    items: [
      { icon: <PaymentIcon />, key: 'payment', href: '/contact' },
      { icon: <LocalShippingIcon />, key: 'shipping', href: '/shipping' },
    ],
  },
  {
    titleKey: 'section_extras',
    items: [
      { icon: <SecurityIcon />, key: 'garantie_plus', href: '/contact' },
      { icon: <PhoneAndroidIcon />, key: 'mobile_protection', href: '/contact' },
      { icon: <ComputerIcon />, key: 'pc_easy', href: '/contact' },
      { icon: <PhoneAndroidIcon />, key: 'mobile_easy', href: '/contact' },
      { icon: <LocalShippingIcon />, key: 'delivery_install', href: '/shipping' },
    ],
  },
];

export default function SupportPage() {
  const { t } = useTranslation('common');
  const location = useLocation();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={LocaleLink} to="/" underline="hover" color="primary">Home</Link>
        <Typography color="text.primary" fontWeight={500}>{t('nav.support')}</Typography>
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
                  borderLeftColor: location.pathname === link.href ? 'text.primary' : 'transparent',
                  fontWeight: location.pathname === link.href ? 700 : 400,
                  '&:hover': { color: 'primary.main', borderLeftColor: 'primary.main' },
                }}
              >
                <ListItemText
                  primary={t(`pages.support.${link.key}`)}
                  primaryTypographyProps={{ fontSize: '0.88rem' }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 4 }}>
            {t('pages.support.title')}
          </Typography>

          {SUPPORT_SECTIONS.map((section) => (
            <Box key={section.titleKey} sx={{ mb: 5 }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                {t(`pages.service.${section.titleKey}`)}
              </Typography>
              <Grid container spacing={2}>
                {section.items.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.key}>
                    <Paper
                      component={LocaleLink}
                      to={item.href}
                      elevation={0}
                      sx={{
                        p: 3,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        textDecoration: 'none',
                        color: 'inherit',
                        height: '100%',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      <Box sx={{ color: 'primary.main', mt: 0.25, flexShrink: 0 }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography fontWeight={600} sx={{ mb: 0.5 }}>
                          {t(`pages.service.${item.key}`)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t(`pages.service.${item.key}_desc`)}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
