import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartCount,
  selectCartTotal,
  selectCartIsEmpty,
} from '@/features/cart/cart.slice';
import { openCartDrawer } from '../state/uiSlice';
import type { Product } from '@/features/products/products.types';

export function useCart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);
  const isEmpty = useAppSelector(selectCartIsEmpty);

  const add = (product: Product, quantity = 1) => {
    dispatch(addItem({ product, quantity }));
    dispatch(openCartDrawer());
  };

  const remove = (productId: string) => dispatch(removeItem(productId));

  const setQuantity = (productId: string, quantity: number) =>
    dispatch(updateQuantity({ productId, quantity }));

  const clear = () => dispatch(clearCart());

  return { items, count, total, isEmpty, add, remove, setQuantity, clear };
}
