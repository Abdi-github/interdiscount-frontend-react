import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  fullPage?: boolean;
  sx?: SxProps<Theme>;
}

export default function LoadingSpinner({ size = 40, message, fullPage, sx }: LoadingSpinnerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        ...(fullPage ? { minHeight: '60vh' } : { py: 4 }),
        ...sx,
      }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
}
