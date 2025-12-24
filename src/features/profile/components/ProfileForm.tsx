import { useForm, Controller } from 'react-hook-form';
import { Box, Grid, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNotification } from '@/shared/hooks/useNotification';
import { useGetProfileQuery, useUpdateProfileMutation } from '../profile.api';
import type { UpdateProfilePayload } from '../profile.types';

const LANGUAGES = [
  { value: 'de', label: 'Deutsch' },
  { value: 'fr', label: 'Français' },
  { value: 'it', label: 'Italiano' },
  { value: 'en', label: 'English' },
];

export function ProfileForm() {
  const { t } = useTranslation('profile');
  const notify = useNotification();
  const { data } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const profile = data?.data;

  const { control, handleSubmit } = useForm<UpdateProfilePayload>({
    values: {
      first_name: profile?.first_name ?? '',
      last_name: profile?.last_name ?? '',
      email: profile?.email ?? '',
      phone: profile?.phone ?? '',
      preferred_language: profile?.preferred_language ?? 'de',
    },
  });

  const onSubmit = async (values: UpdateProfilePayload) => {
    try {
      await updateProfile(values).unwrap();
      notify.success(t('personal.saved'));
    } catch {
      notify.error(t('errors.save'));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {(
          [
            { name: 'first_name', label: t('personal.first_name') },
            { name: 'last_name', label: t('personal.last_name') },
            { name: 'email', label: t('personal.email') },
            { name: 'phone', label: t('personal.phone') },
          ] as const
        ).map((f) => (
          <Grid item xs={12} sm={6} key={f.name}>
            <Controller
              name={f.name}
              control={control}
              render={({ field }) => <TextField {...field} label={f.label} fullWidth size="small" />}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6}>
          <Controller
            name="preferred_language"
            control={control}
            render={({ field }) => (
              <TextField {...field} label={t('personal.language')} select fullWidth size="small">
                {LANGUAGES.map((l) => (
                  <MenuItem key={l.value} value={l.value}>{l.label}</MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : undefined}
        >
          {t('personal.save')}
        </Button>
      </Box>
    </Box>
  );
}
