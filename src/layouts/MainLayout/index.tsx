import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from './Header';
import CategoryNav from './CategoryNav';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import CartDrawer from '@/features/cart/components/CartDrawer';

export default function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <CategoryNav />
      <MobileMenu />
      <CartDrawer />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
