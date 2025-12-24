import { useState } from 'react';
import { Box, Button, Typography, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';
import { useGetAddressesQuery, useDeleteAddressMutation } from '../profile.api';
import { AddressForm } from './AddressForm';
import type { Address } from '../profile.types';

export function AddressBook() {
  const { t } = useTranslation('profile');
  const { data } = useGetAddressesQuery();
  const [deleteAddress] = useDeleteAddressMutation();
  const [editId, setEditId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  const addresses = data?.data ?? [];

  return (
    <Box>
      {addresses.map((addr: Address) => (
        <Box
          key={addr._id}
          sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2, mb: 2 }}
        >
          {editId === addr._id ? (
            <AddressForm existing={addr} onDone={() => setEditId(null)} />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography fontWeight={600}>{addr.label ?? addr.city}</Typography>
                  {addr.is_default && <Chip label={t('address.default_label')} size="small" color="primary" />}
                </Box>
                <Typography variant="body2">
                  {addr.first_name} {addr.last_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {addr.street} {addr.street_number}, {addr.postal_code} {addr.city}
                </Typography>
                {addr.phone && (
                  <Typography variant="caption" color="text.secondary">{addr.phone}</Typography>
                )}
              </Box>
              <Box>
                <IconButton size="small" onClick={() => setEditId(addr._id)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" color="error" onClick={() => deleteAddress(addr._id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      ))}

      {adding ? (
        <Box sx={{ border: '1px solid', borderColor: 'primary.main', borderRadius: 2, p: 2 }}>
          <AddressForm onDone={() => setAdding(false)} />
        </Box>
      ) : (
        <Button startIcon={<AddIcon />} onClick={() => setAdding(true)}>
          {t('address.add')}
        </Button>
      )}
    </Box>
  );
}
