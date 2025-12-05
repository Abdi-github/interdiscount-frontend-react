import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import type { Brand } from '../brands.types';

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Box
      component={Link}
      to={`/brands/${brand.slug}`}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        '&:hover': { borderColor: 'primary.main', boxShadow: 2 },
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
    >
      {brand.logo_url ? (
        <Box
          component="img"
          src={brand.logo_url}
          alt={brand.name}
          sx={{ width: '100%', maxWidth: 120, height: 60, objectFit: 'contain' }}
        />
      ) : (
        <Box
          sx={{
            width: 120, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
            bgcolor: 'grey.100', borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" fontWeight={700}>{brand.name}</Typography>
        </Box>
      )}
      <Typography variant="body2" fontWeight={600} textAlign="center">{brand.name}</Typography>
    </Box>
  );
}
