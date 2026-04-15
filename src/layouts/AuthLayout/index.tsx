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
          display: 'block',
          textDecoration: 'none',
          mb: 3,
        }}
      >
        <Box component="img" src="/logo.svg" alt="Interdiscount" sx={{ height: 44 }} />
      </Box>
      <Container maxWidth="xs">
        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
}
