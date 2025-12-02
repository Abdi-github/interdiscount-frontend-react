import LocaleLink from '@/shared/components/LocaleLink';
import { useLocaleNavigate } from '@/shared/hooks/useLocalePath';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { closeMobileMenu } from '@/shared/state/uiSlice';
import { selectIsAuthenticated } from '@/shared/state/authSlice';
import { useLogoutMutation } from '@/features/auth/auth.api';

export default function MobileMenu() {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const navigate = useLocaleNavigate();
  const open = useAppSelector((s) => s.ui.mobileMenuOpen);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [logoutFn] = useLogoutMutation();

  const close = () => dispatch(closeMobileMenu());

  const mainLinks = [
    { to: '/', label: t('nav.home'), icon: <HomeIcon /> },
    { to: '/search', label: t('nav.categories'), icon: <CategoryIcon /> },
    { to: '/brands', label: t('nav.brands'), icon: <LoyaltyIcon /> },
    { to: '/stores', label: t('nav.stores'), icon: <StoreIcon /> },
  ];

  const accountLinks = isAuthenticated
    ? [
        { to: '/account/profile', label: t('nav.profile'), icon: <PersonIcon /> },
        { to: '/account/orders', label: t('nav.orders'), icon: <ShoppingBagIcon /> },
        { to: '/account/favorites', label: t('nav.favorites'), icon: <FavoriteIcon /> },
      ]
    : [
        { to: '/auth/login', label: t('nav.login'), icon: <LoginIcon /> },
      ];

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={close}
      sx={{ display: { md: 'none' } }}
    >
      <Box sx={{ width: 280 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            bgcolor: 'primary.main',
            color: 'white',
          }}
        >
          <Typography variant="subtitle1" fontWeight={700}>interdiscount</Typography>
          <IconButton color="inherit" size="small" onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {mainLinks.map((link) => (
            <ListItem key={link.to} disablePadding>
              <ListItemButton component={LocaleLink} to={link.to} onClick={close}>
                <ListItemIcon sx={{ minWidth: 36 }}>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {accountLinks.map((link) => (
            <ListItem key={link.to} disablePadding>
              <ListItemButton component={LocaleLink} to={link.to} onClick={close}>
                <ListItemIcon sx={{ minWidth: 36 }}>{link.icon}</ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          {isAuthenticated && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={async () => {
                  close();
                  try { await logoutFn().unwrap(); } catch {}
                  navigate('/');
                }}
                sx={{ color: 'error.main', '& .MuiListItemIcon-root': { color: 'error.main' } }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}><LogoutIcon /></ListItemIcon>
                <ListItemText primary={t('nav.logout')} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
}
