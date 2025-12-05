import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { openCartDrawer } from '@/shared/state/uiSlice';
import { selectCartCount } from '../cart.slice';

export default function CartIcon() {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCartCount);

  return (
    <Tooltip title={t('nav.cart')}>
      <IconButton color="inherit" onClick={() => dispatch(openCartDrawer())}>
        <Badge badgeContent={count} color="secondary" max={99}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}
