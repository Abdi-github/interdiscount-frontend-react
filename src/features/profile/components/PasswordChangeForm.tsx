import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChangePasswordMutation } from '../profile.api';
import type { ChangePasswordPayload } from '../profile.types';

export function PasswordChangeForm() {
  const { t } = useTranslation('profile');
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset, setError: setFormError } = useForm<ChangePasswordPayload & { confirm: string }>({
    defaultValues: { current_password: '', new_password: '', confirm: '' },
  });

  const onSubmit = async (values: ChangePasswordPayload & { confirm: string }) => {
    if (values.new_password !== values.confirm) {
      setFormError('confirm', { message: t('errors.wrong_password') });
      return;
    }
    setError(null);
    try {
      await changePassword({ current_password: values.current_password, new_password: values.new_password }).unwrap();
      setSuccess(true);
      reset();
    } catch {
      setError(t('errors.wrong_password'));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400 }}>
      {success && <Alert severity="success" sx={{ mb: 2 }}>{t('password.saved')}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {(
        [
          { name: 'current_password', label: t('password.current') },
          { name: 'new_password', label: t('password.new') },
          { name: 'confirm', label: t('password.confirm') },
        ] as const
      ).map((f) => (
        <Controller
          key={f.name}
          name={f.name}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label={f.label}
              type="password"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      ))}

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : undefined}
      >
        {t('password.save')}
      </Button>
    </Box>
  );
}
