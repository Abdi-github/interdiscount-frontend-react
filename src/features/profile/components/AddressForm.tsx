import { useForm, Controller } from 'react-hook-form';
import { Box, Grid, TextField, Button, CircularProgress, FormControlLabel, Checkbox } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAddAddressMutation, useUpdateAddressMutation } from '../profile.api';
import type { Address, AddressPayload } from '../profile.types';

interface AddressFormProps {
  existing?: Address;
  onDone?: () => void;
}

export function AddressForm({ existing, onDone }: AddressFormProps) {
  const { t } = useTranslation('profile');
  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const isLoading = isAdding || isUpdating;

  const { control, handleSubmit } = useForm<AddressPayload>({
    defaultValues: existing ?? {
      label: '', first_name: '', last_name: '', street: '', street_number: '',
      postal_code: '', city: '', country: 'CH', phone: '', is_default: false,
    },
  });

  const onSubmit = async (values: AddressPayload) => {
    if (existing) {
      await updateAddress({ id: existing._id, body: values }).unwrap();
    } else {
      await addAddress(values).unwrap();
    }
    onDone?.();
  };

  const FIELDS: Array<{ name: keyof AddressPayload; label: string; sm?: number }> = [
    { name: 'label', label: t('address.label_field') ?? 'Label', sm: 12 },
    { name: 'first_name', label: t('personal.first_name') },
    { name: 'last_name', label: t('personal.last_name') },
    { name: 'street', label: t('address.street'), sm: 8 },
    { name: 'street_number', label: t('address.street_no'), sm: 4 },
    { name: 'postal_code', label: t('address.postal_code'), sm: 4 },
    { name: 'city', label: t('address.city'), sm: 8 },
    { name: 'phone', label: t('personal.phone'), sm: 12 },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {FIELDS.map((f) => (
          <Grid item xs={12} sm={f.sm ?? 6} key={f.name as string}>
            <Controller
              name={f.name}
              control={control}
              render={({ field }) => (
                <TextField {...field} label={f.label} fullWidth size="small" value={field.value ?? ''} />
              )}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Controller
            name="is_default"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                label={t('address.set_default')}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        {onDone && <Button onClick={onDone} disabled={isLoading}>{t('address.cancel')}</Button>}
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : undefined}
        >
          {existing ? t('address.edit') : t('address.add')}
        </Button>
      </Box>
    </Box>
  );
}
