import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LocaleLink from '@/shared/components/LocaleLink';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useTranslation } from 'react-i18next';
import SecurityIcon from '@mui/icons-material/Security';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ComputerIcon from '@mui/icons-material/Computer';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import CancelIcon from '@mui/icons-material/Cancel';
import ExtensionIcon from '@mui/icons-material/Extension';
import PaymentIcon from '@mui/icons-material/Payment';
import type { ReactNode } from 'react';

interface ServiceItem {
  icon: ReactNode;
  key: string;
  href: string;
}

interface ServiceSection {
  titleKey: string;
  items: ServiceItem[];
}

const SERVICE_SECTIONS: ServiceSection[] = [
  {
    titleKey: 'section_extras',
    items: [
      { icon: <SecurityIcon />, key: 'garantie_plus', href: '/contact' },
      { icon: <PhoneAndroidIcon />, key: 'mobile_protection', href: '/contact' },
      { icon: <ComputerIcon />, key: 'pc_easy', href: '/contact' },
      { icon: <PhoneAndroidIcon />, key: 'mobile_easy', href: '/contact' },
      { icon: <LocalShippingIcon />, key: 'delivery_install', href: '/shipping' },
      { icon: <CameraAltIcon />, key: 'cewe', href: '/contact' },
      { icon: <SwapHorizIcon />, key: 'trade_in', href: '/contact' },
      { icon: <SupportAgentIcon />, key: 'smart_help', href: '/contact' },
      { icon: <BatteryChargingFullIcon />, key: 'battery', href: '/contact' },
    ],
  },
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
];

export default function ServicePage() {
  const { t } = useTranslation('common');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={LocaleLink} to="/" underline="hover" color="primary">Home</Link>
        <Typography color="text.primary" fontWeight={500}>{t('nav.service')}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" fontWeight={700} sx={{ mb: 4 }}>
        {t('pages.service.title')}
      </Typography>

      {SERVICE_SECTIONS.map((section) => (
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
                    transition: 'all 0.2s',
                    height: '100%',
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
    </Container>
  );
}
