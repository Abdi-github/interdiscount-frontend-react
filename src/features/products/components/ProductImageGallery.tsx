import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import type { ProductImage } from '../products.types';

interface ProductImageGalleryProps {
  images: ProductImage[];
  name: string;
}

export function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const list = images.length ? images : [{ alt: name, src: { xs: '', sm: '/placeholder.png', md: '/placeholder.png' } }];

  const prev = () => setSelected((s) => (s - 1 + list.length) % list.length);
  const next = () => setSelected((s) => (s + 1) % list.length);

  return (
    <Box>
      {/* Main image */}
      <Box
        sx={{
          position: 'relative',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: { xs: 260, sm: 360 },
        }}
      >
        <img
          src={list[selected].src.md || '/placeholder.png'}
          alt={list[selected].alt}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
        {list.length > 1 && (
          <>
            <IconButton onClick={prev} sx={{ position: 'absolute', left: 4, bgcolor: 'rgba(255,255,255,0.8)' }} size="small">
              <ChevronLeftIcon />
            </IconButton>
            <IconButton onClick={next} sx={{ position: 'absolute', right: 4, bgcolor: 'rgba(255,255,255,0.8)' }} size="small">
              <ChevronRightIcon />
            </IconButton>
          </>
        )}
      </Box>

      {/* Thumbnails */}
      {list.length > 1 && (
        <Box sx={{ display: 'flex', gap: 1, mt: 1, overflowX: 'auto', pb: 0.5 }}>
          {list.map((img, i) => (
            <Box
              key={i}
              onClick={() => setSelected(i)}
              sx={{
                width: 64,
                height: 64,
                flexShrink: 0,
                border: '2px solid',
                borderColor: i === selected ? 'primary.main' : 'divider',
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                bgcolor: '#fafafa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={img.src.sm || img.src.md} alt={img.alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
