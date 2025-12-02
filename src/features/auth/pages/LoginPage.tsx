import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import LocaleLink from '@/shared/components/LocaleLink';
import { useLocalePath } from '@/shared/hooks/useLocalePath';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../auth.api';
import { useNotification } from '@/shared/hooks/useNotification';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const lp = useLocalePath();
  const location = useLocation();
  const notify = useNotification();
  const [loginMutation, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || lp('/');

  const onSubmit = async (data: FormValues) => {
    try {
      await loginMutation(data).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      // TODO: Add rate limiting for login attempts
      console.error('Login failed:', error);
      notify.error(t('login.error'));
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t('login.title')}
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label={t('login.email')}
          type="email"
          autoComplete="email"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label={t('login.password')}
          type="password"
          autoComplete="current-password"
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Link component={LocaleLink} to="/auth/forgot-password" variant="body2" sx={{ alignSelf: 'flex-end' }}>
          {t('login.forgot_password')}
        </Link>

        <Button type="submit" variant="contained" size="large" fullWidth disabled={isLoading}>
          {isLoading ? <CircularProgress size={22} color="inherit" /> : t('login.submit')}
        </Button>

        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {t('login.no_account')}{' '}
          <Link component={LocaleLink} to="/auth/register">
            {t('login.register_link')}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
