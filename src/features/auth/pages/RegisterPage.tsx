import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LocaleLink from '@/shared/components/LocaleLink';
import { useLocaleNavigate } from '@/shared/hooks/useLocalePath';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { useRegisterMutation } from '../auth.api';
import { useNotification } from '@/shared/hooks/useNotification';

const schema = z
  .object({
    first_name: z.string().min(2),
    last_name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine((d) => d.password === d.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });
type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const { t } = useTranslation('auth');
  const navigate = useLocaleNavigate();
  const notify = useNotification();
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    try {
      await registerMutation(data).unwrap();
      navigate('/', { replace: true });
    } catch {
      notify.error(t('register.error') ?? 'Registration failed');
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t('register.title')}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label={t('register.first_name')}
              fullWidth
              {...register('first_name')}
              error={!!errors.first_name}
              helperText={errors.first_name?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t('register.last_name')}
              fullWidth
              {...register('last_name')}
              error={!!errors.last_name}
              helperText={errors.last_name?.message}
            />
          </Grid>
        </Grid>
        <TextField
          label={t('register.email')}
          type="email"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label={t('register.password')}
          type="password"
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label={t('register.confirm_password')}
          type="password"
          fullWidth
          {...register('password_confirmation')}
          error={!!errors.password_confirmation}
          helperText={errors.password_confirmation?.message}
        />

        <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
          {isLoading ? <CircularProgress size={22} color="inherit" /> : t('register.submit')}
        </Button>

        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {t('register.has_account')}{' '}
          <Link component={LocaleLink} to="/auth/login">
            {t('register.login_link')}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
