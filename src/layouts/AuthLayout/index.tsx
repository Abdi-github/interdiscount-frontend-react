import { Outlet } from 'react-router-dom';
import LocaleLink from '@/shared/components/LocaleLink';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Box
        component={LocaleLink}
        to="/"
        sx={{
          textDecoration: 'none',
          color: 'primary.main',
          fontWeight: 800,
          fontSize: '1.6rem',
          mb: 3,
          letterSpacing: -0.5,
        }}
      >
        interdiscount
      </Box>
      <Container maxWidth="xs">
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
}
