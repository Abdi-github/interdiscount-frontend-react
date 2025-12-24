import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

export default function ImpressumPage() {
  /* console.log('ImpressumPage - displaying company imprint'); */
  const { t } = useTranslation('common');

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {t('footer.imprint', 'Impressum')}
      </Typography>

      <Paper variant="outlined" sx={{ p: 4, mt: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {t('imprint.company_name')}
        </Typography>
        {/* TODO: Extract company info to content management system */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('imprint.company_label')}:</strong> {t('imprint.company_value')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('imprint.address_label')}:</strong> {t('imprint.address_value')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('imprint.phone_label')}:</strong> 0848 247 247
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('imprint.email_label')}:</strong> info@interdiscount.ch
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>UID:</strong> CHE-116.281.710
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('imprint.vat_label')}:</strong> CHE-116.281.710 MWST
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontStyle: 'italic' }}>
          {t('imprint.disclaimer')}
        </Typography>
      </Paper>
    </Container>
  );
}
