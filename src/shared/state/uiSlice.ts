import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export type AppLocale = 'de' | 'en' | 'fr' | 'it';

interface UiState {
  language: AppLocale;
  cartDrawerOpen: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
}

const initialState: UiState = {
  language: (loadFromStorage<AppLocale>('language') as AppLocale) || 'de',
  cartDrawerOpen: false,
  mobileMenuOpen: false,
  searchOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<AppLocale>) {
      state.language = action.payload;
      saveToStorage('language', action.payload);
    },
    openCartDrawer(state) { state.cartDrawerOpen = true; },
    closeCartDrawer(state) { state.cartDrawerOpen = false; },
    toggleCartDrawer(state) { state.cartDrawerOpen = !state.cartDrawerOpen; },
    openMobileMenu(state) { state.mobileMenuOpen = true; },
    closeMobileMenu(state) { state.mobileMenuOpen = false; },
    toggleMobileMenu(state) { state.mobileMenuOpen = !state.mobileMenuOpen; },
    setSearchOpen(state, action: PayloadAction<boolean>) { state.searchOpen = action.payload; },
  },
});

export const {
  setLanguage,
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
  setSearchOpen,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;

export const selectLanguage = (state: { ui: UiState }) => state.ui.language;
export const selectCartDrawerOpen = (state: { ui: UiState }) => state.ui.cartDrawerOpen;
export const selectMobileMenuOpen = (state: { ui: UiState }) => state.ui.mobileMenuOpen;
export const selectSearchOpen = (state: { ui: UiState }) => state.ui.searchOpen;
