import { Container, Typography, Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ProfileForm } from '../components/ProfileForm';
import { AddressBook } from '../components/AddressBook';
import { PasswordChangeForm } from '../components/PasswordChangeForm';

export default function ProfilePage() {
  const { t } = useTranslation('profile');
  const [tab, setTab] = useState(0);

  const TABS = [
    { label: t('tabs.profile'), component: <ProfileForm /> },
    { label: t('tabs.addresses'), component: <AddressBook /> },
    { label: t('tabs.security'), component: <PasswordChangeForm /> },
  ];

  // TODO: Add profile data validation for missing fields
  /* console.log('Profile page loaded - tabs:', TABS.length); */

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>{t('title')}</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          {TABS.map((item) => <Tab key={item.label} label={item.label} />)}
        </Tabs>
      </Box>
      {TABS[tab].component}
    </Container>
  );
}
