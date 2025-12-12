import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Rating, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateReviewMutation } from '../reviews.api';
import type { CreateReviewPayload } from '../reviews.types';

interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
}

export function ReviewForm({ productId, onSuccess }: ReviewFormProps) {
  const { t } = useTranslation('reviews');
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<CreateReviewPayload>({
    defaultValues: { product_id: productId, rating: 5, title: '', comment: '' },
  });

  const onSubmit = async (values: CreateReviewPayload) => {
    setError(null);
    try {
      await createReview(values).unwrap();
      setSuccess(true);
      onSuccess?.();
    } catch {
      setError(t('form.error'));
    }
  };

  if (success) return <Alert severity="success">{t('form.success')}</Alert>;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Typography variant="body2" gutterBottom>{t('form.rating_label')}</Typography>
      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <Rating
            value={Number(field.value)}
            onChange={(_, v) => field.onChange(v ?? 1)}
            size="large"
          />
        )}
      />

      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField {...field} label={t('form.title_label')} fullWidth size="small" sx={{ mt: 2 }} />
        )}
      />
      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
          <TextField {...field} label={t('form.body_label')} fullWidth size="small" multiline rows={3} sx={{ mt: 2 }} />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={isLoading}
        startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : undefined}
      >
        {t('form.submit')}
      </Button>
    </Box>
  );
}
