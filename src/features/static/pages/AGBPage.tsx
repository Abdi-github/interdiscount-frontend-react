import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

export default function AGBPage() {
  const { t } = useTranslation('common');

  const sectionKeys = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {t('footer.terms', 'Allgemeine Geschäftsbedingungen')}
      </Typography>

      <Paper variant="outlined" sx={{ p: 4, mt: 3 }}>
        {sectionKeys.map((n) => (
          <Box key={n} sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {t(`agb.section${n}_title`)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {t(`agb.section${n}_content`)}
            </Typography>
          </Box>
        ))}

        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mt: 2 }}>
          {t('agb.disclaimer')}
        </Typography>
      </Paper>
    </Container>
  );
}
