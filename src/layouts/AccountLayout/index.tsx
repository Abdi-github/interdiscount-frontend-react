import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useLogoutMutation } from '@/features/auth/auth.api';

const NAV_ITEMS = [
  { to: '/account/dashboard', icon: <DashboardIcon />, labelKey: 'tabs.dashboard' },
  { to: '/account/profile', icon: <PersonIcon />, labelKey: 'tabs.profile' },
  { to: '/account/orders', icon: <ShoppingBagIcon />, labelKey: 'tabs.orders' },
  { to: '/account/favorites', icon: <FavoriteIcon />, labelKey: 'tabs.favorites' },
  { to: '/account/notifications', icon: <NotificationsIcon />, labelKey: 'tabs.notifications' },
  { to: '/account/reviews', icon: <RateReviewIcon />, labelKey: 'tabs.reviews' },
];

export default function AccountLayout() {
  const { t } = useTranslation(['profile', 'common']);
  const navigate = useNavigate();
  const [logoutFn] = useLogoutMutation();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <List disablePadding>
              {NAV_ITEMS.map((item) => (
                <ListItemButton
                  key={item.to}
                  component={NavLink}
                  to={item.to}
                  sx={{
                    '&.active': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      '& .MuiListItemIcon-root': { color: 'white' },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={t(item.labelKey)} />
                </ListItemButton>
              ))}
              <Divider />
              <ListItemButton
                onClick={async () => {
                  try { await logoutFn().unwrap(); } catch {}
                  navigate('/');
                }}
                sx={{ color: 'error.main', '& .MuiListItemIcon-root': { color: 'error.main' } }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}><LogoutIcon /></ListItemIcon>
                <ListItemText primary={t('common:nav.logout')} />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        {/* Content */}
        <Grid item xs={12} md={9}>
          <Box>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
