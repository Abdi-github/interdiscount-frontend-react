import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LocaleLink from '@/shared/components/LocaleLink';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { useForgotPasswordMutation } from '../auth.api';

const schema = z.object({ email: z.string().email() });
type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const { t } = useTranslation('auth');
  const [sent, setSent] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      await forgotPassword(data).unwrap();
      setSent(true);
    } catch {}
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t('forgot_password.title')}
      </Typography>

      {sent ? (
        <Alert severity="success" sx={{ mt: 2 }}>
          {t('forgot_password.success')}
        </Alert>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label={t('forgot_password.email')}
            type="email"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
            {isLoading ? <CircularProgress size={22} color="inherit" /> : t('forgot_password.submit')}
          </Button>
        </Box>
      )}

      <Link component={LocaleLink} to="/auth/login" variant="body2" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
        {t('forgot_password.back_to_login')}
      </Link>
    </Box>
  );
}
