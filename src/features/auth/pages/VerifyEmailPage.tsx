import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  TextField,
  Paper,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import LocaleLink from '@/shared/components/LocaleLink';
import { useTranslation } from 'react-i18next';
import { useVerifyEmailMutation, useResendVerificationMutation } from '../auth.api';

export default function VerifyEmailPage() {
  const { token } = useParams<{ token: string }>();
  const { t } = useTranslation('auth');
  const [verifyEmail, { isLoading, isSuccess, isError }] = useVerifyEmailMutation();
  const [resendVerification, { isLoading: resending, isSuccess: resent }] =
    useResendVerificationMutation();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  const handleResend = () => {
    if (email.trim()) {
      resendVerification({ email: email.trim() });
    }
  };

  // Token-based verification flow
  if (token) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        {isLoading && (
          <Box>
            <CircularProgress size={48} sx={{ mb: 2 }} />
            <Typography variant="h5" fontWeight={600}>
              {t('verify.verifying')}
            </Typography>
          </Box>
        )}

        {isSuccess && (
          <Box>
            <CheckCircleOutlineIcon sx={{ fontSize: 72, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {t('verify.success_title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {t('verify.success_message')}
            </Typography>
            <Button variant="contained" size="large" component={LocaleLink} to="/auth/login">
              {t('verify.login')}
            </Button>
          </Box>
        )}

        {isError && (
          <Box>
            <ErrorOutlineIcon sx={{ fontSize: 72, color: 'error.main', mb: 2 }} />
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {t('verify.error_title')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              {t('verify.error_message')}
            </Typography>
            <Button variant="contained" size="large" component={LocaleLink} to="/auth/login">
              {t('verify.back_to_login')}
            </Button>
          </Box>
        )}
      </Container>
    );
  }

  // Resend verification flow (no token — user navigated here)
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <MarkEmailReadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {t('verify.resend_title')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t('verify.resend_subtitle')}
        </Typography>
      </Box>

      {resent ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          {t('verify.resend_success')}
        </Alert>
      ) : (
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
          <TextField
            fullWidth
            type="email"
            label={t('verify.email_label')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleResend}
            disabled={resending || !email.trim()}
            startIcon={resending ? <CircularProgress size={18} /> : undefined}
          >
            {t('verify.resend_button')}
          </Button>
        </Paper>
      )}
    </Container>
  );
}
