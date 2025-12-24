import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import LocaleLink from '@/shared/components/LocaleLink';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

const TOPICS = [
  'order',
  'return',
  'payment',
  'shipping',
  'product',
  'account',
  'other',
] as const;

export default function ContactPage() {
  const { t } = useTranslation('common');
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    order_number: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  // TODO: Implement contact form captcha verification

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app this would call a backend API
    setSubmitted(true);
    enqueueSnackbar(t('contact.success'), { variant: 'success' });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={LocaleLink} to="/" underline="hover" color="inherit">
          {t('nav.home')}
        </Link>
        <Link component={LocaleLink} to="/support" underline="hover" color="inherit">
          {t('nav.support')}
        </Link>
        <Typography color="text.primary">{t('contact.title')}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" fontWeight={700} gutterBottom>
        {t('contact.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('contact.subtitle')}
      </Typography>

      <Grid container spacing={4}>
        {/* Contact info cards */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <PhoneIcon color="primary" />
                <Typography fontWeight={600}>{t('contact.phone_title')}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {t('contact.phone_number')}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {t('contact.phone_hours')}
              </Typography>
            </Paper>

            <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <EmailIcon color="primary" />
                <Typography fontWeight={600}>{t('contact.email_title')}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {t('contact.email_address')}
              </Typography>
            </Paper>

            <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <LocationOnIcon color="primary" />
                <Typography fontWeight={600}>{t('contact.address_title')}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Interdiscount AG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bernstrasse 41, 3175 Flamatt
              </Typography>
            </Paper>

            <Paper elevation={0} variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <AccessTimeIcon color="primary" />
                <Typography fontWeight={600}>{t('contact.hours_title')}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {t('contact.hours_weekday')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t('contact.hours_saturday')}
              </Typography>
            </Paper>
          </Box>
        </Grid>

        {/* Contact form */}
        <Grid item xs={12} md={8}>
          {submitted ? (
            <Paper elevation={0} variant="outlined" sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
              <Alert severity="success" sx={{ mb: 2 }}>
                {t('contact.submitted_title')}
              </Alert>
              <Typography color="text.secondary">
                {t('contact.submitted_message')}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: '', order_number: '', message: '' }); }}
              >
                {t('contact.new_request')}
              </Button>
            </Paper>
          ) : (
            <Paper
              elevation={0}
              variant="outlined"
              component="form"
              onSubmit={handleSubmit}
              sx={{ p: 3, borderRadius: 2 }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {t('contact.form_title')}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label={t('contact.form_name')}
                    value={form.name}
                    onChange={handleChange('name')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    type="email"
                    label={t('contact.form_email')}
                    value={form.email}
                    onChange={handleChange('email')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    select
                    label={t('contact.form_topic')}
                    value={form.topic}
                    onChange={handleChange('topic')}
                  >
                    {TOPICS.map((topic) => (
                      <MenuItem key={topic} value={topic}>
                        {t(`contact.topics.${topic}`)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t('contact.form_order_number')}
                    value={form.order_number}
                    onChange={handleChange('order_number')}
                    helperText={t('contact.form_order_optional')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={5}
                    label={t('contact.form_message')}
                    value={form.message}
                    onChange={handleChange('message')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    disabled={!form.name || !form.email || !form.topic || !form.message}
                  >
                    {t('contact.form_submit')}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
