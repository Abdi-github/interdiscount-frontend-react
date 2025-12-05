import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage, saveToStorage } from '@/shared/utils/storage';
import type { Product } from '../products/products.types';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: CartState = {
  items: loadFromStorage<CartItem[]>('cart_items') ?? [],
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const existing = state.items.find((i) => i.product._id === action.payload.product._id);
      if (existing) {
        existing.quantity += action.payload.quantity ?? 1;
      } else {
        state.items.push({ product: action.payload.product, quantity: action.payload.quantity ?? 1 });
      }
      saveToStorage('cart_items', state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.product._id !== action.payload);
      saveToStorage('cart_items', state.items);
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const item = state.items.find((i) => i.product._id === action.payload.productId);
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.product._id !== action.payload.productId);
        } else {
          item.quantity = action.payload.quantity;
        }
      }
      saveToStorage('cart_items', state.items);
    },
    clearCart(state) {
      state.items = [];
      saveToStorage('cart_items', []);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
export const selectCartSubtotal = selectCartTotal;
export const selectCartIsEmpty = (state: { cart: CartState }) => state.cart.items.length === 0;
