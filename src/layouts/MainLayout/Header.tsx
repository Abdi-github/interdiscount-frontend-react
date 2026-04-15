import LocaleLink from '@/shared/components/LocaleLink';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/PersonOutline';
import StorefrontIcon from '@mui/icons-material/StorefrontOutlined';
import CompareIcon from '@mui/icons-material/CompareArrowsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectCartCount } from '@/features/cart/cart.slice';
import { selectIsAuthenticated } from '@/shared/state/authSlice';
import { useGetUnreadCountQuery } from '@/features/notifications/notifications.api';
import { openCartDrawer, openMobileMenu } from '@/shared/state/uiSlice';
import Container from '@mui/material/Container';
import { useSnackbar } from 'notistack';
import SearchAutocomplete from '@/features/search/components/SearchAutocomplete';

/** Interdiscount logo */
function IDLogo() {
  return (
    <Box
      component={LocaleLink}
      to="/"
      sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
    >
      <Box component="img" src="/logo.svg" alt="Interdiscount" sx={{ height: 40 }} />
    </Box>
  );
}

export default function Header() {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector(selectCartCount);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { data: unreadData } = useGetUnreadCountQuery(undefined, { skip: !isAuthenticated });
  const unreadCount = unreadData?.data?.count ?? 0;
  const { enqueueSnackbar } = useSnackbar();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid #e0e0e0',
        borderTop: '3px solid',
        borderTopColor: 'primary.main',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: 'text.primary',
      }}
    >
      <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 64 } }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: { xs: 1, sm: 2 }, width: '100%' }}>
        {/* Mobile menu button */}
        <IconButton
          color="inherit"
          sx={{ display: { md: 'none' }, color: 'text.primary' }}
          onClick={() => dispatch(openMobileMenu())}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <IDLogo />

        {/* Search */}
        <SearchAutocomplete />

        {/* Right-side icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
          {/* Account */}
          <Tooltip title={isAuthenticated ? t('nav.account') : t('nav.login')}>
            <IconButton
              sx={{ color: 'text.primary' }}
              component={LocaleLink}
              to={isAuthenticated ? '/account/dashboard' : '/auth/login'}
              size="small"
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>

          {/* Filialen / Store Finder */}
          <Tooltip title={t('nav.stores')}>
            <Button
              component={LocaleLink}
              to="/stores"
              size="small"
              startIcon={<StorefrontIcon />}
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                fontSize: '0.78rem',
                display: { xs: 'none', md: 'flex' },
                minWidth: 0,
                px: 1,
              }}
            >
              {t('nav.stores')}
            </Button>
          </Tooltip>

          {/* Compare */}
          <Tooltip title={t('nav.compare')}>
            <IconButton
              sx={{ color: 'text.primary', display: { xs: 'none', sm: 'flex' } }}
              size="small"
              onClick={() => enqueueSnackbar(t('compare_coming_soon'), { variant: 'info' })}
            >
              <CompareIcon />
            </IconButton>
          </Tooltip>

          {/* Notifications bell */}
          {isAuthenticated && (
            <Tooltip title={t('nav.notifications')}>
              <IconButton
                sx={{ color: 'text.primary' }}
                component={LocaleLink}
                to="/account/notifications"
                size="small"
              >
                <Badge badgeContent={unreadCount} color="error" max={99}>
                  <NotificationsOutlinedIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          )}

          {/* Favorites / Merkliste */}
          <Tooltip title={t('nav.favorites')}>
            <IconButton
              sx={{ color: 'text.primary' }}
              component={LocaleLink}
              to={isAuthenticated ? '/account/favorites' : '/auth/login'}
              size="small"
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>

          {/* Cart */}
          <Tooltip title={t('nav.cart')}>
            <IconButton
              sx={{ color: 'text.primary' }}
              onClick={() => dispatch(openCartDrawer())}
              aria-label="cart"
              size="small"
            >
              <Badge badgeContent={cartCount} color="error" max={99}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

