import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// DE
import deCommon from './locales/de/common.json';
import deAuth from './locales/de/auth.json';
import deHome from './locales/de/home.json';
import deProducts from './locales/de/products.json';
import deCategories from './locales/de/categories.json';
import deCart from './locales/de/cart.json';
import deCheckout from './locales/de/checkout.json';
import deOrders from './locales/de/orders.json';
import deProfile from './locales/de/profile.json';
import deFavorites from './locales/de/favorites.json';
import deReviews from './locales/de/reviews.json';
import deStores from './locales/de/stores.json';
import deSearch from './locales/de/search.json';
import deNotifications from './locales/de/notifications.json';

// EN
import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enHome from './locales/en/home.json';
import enProducts from './locales/en/products.json';
import enCategories from './locales/en/categories.json';
import enCart from './locales/en/cart.json';
import enCheckout from './locales/en/checkout.json';
import enOrders from './locales/en/orders.json';
import enProfile from './locales/en/profile.json';
import enFavorites from './locales/en/favorites.json';
import enReviews from './locales/en/reviews.json';
import enStores from './locales/en/stores.json';
import enSearch from './locales/en/search.json';
import enNotifications from './locales/en/notifications.json';

// FR
import frCommon from './locales/fr/common.json';
import frAuth from './locales/fr/auth.json';
import frHome from './locales/fr/home.json';
import frProducts from './locales/fr/products.json';
import frCategories from './locales/fr/categories.json';
import frCart from './locales/fr/cart.json';
import frCheckout from './locales/fr/checkout.json';
import frOrders from './locales/fr/orders.json';
import frProfile from './locales/fr/profile.json';
import frFavorites from './locales/fr/favorites.json';
import frReviews from './locales/fr/reviews.json';
import frStores from './locales/fr/stores.json';
import frSearch from './locales/fr/search.json';
import frNotifications from './locales/fr/notifications.json';

// IT
import itCommon from './locales/it/common.json';
import itAuth from './locales/it/auth.json';
import itHome from './locales/it/home.json';
import itProducts from './locales/it/products.json';
import itCategories from './locales/it/categories.json';
import itCart from './locales/it/cart.json';
import itCheckout from './locales/it/checkout.json';
import itOrders from './locales/it/orders.json';
import itProfile from './locales/it/profile.json';
import itFavorites from './locales/it/favorites.json';
import itReviews from './locales/it/reviews.json';
import itStores from './locales/it/stores.json';
import itSearch from './locales/it/search.json';
import itNotifications from './locales/it/notifications.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: {
        common: deCommon, auth: deAuth, home: deHome, products: deProducts,
        categories: deCategories, cart: deCart, checkout: deCheckout,
        orders: deOrders, profile: deProfile, favorites: deFavorites,
        reviews: deReviews, stores: deStores, search: deSearch, notifications: deNotifications,
      },
      en: {
        common: enCommon, auth: enAuth, home: enHome, products: enProducts,
        categories: enCategories, cart: enCart, checkout: enCheckout,
        orders: enOrders, profile: enProfile, favorites: enFavorites,
        reviews: enReviews, stores: enStores, search: enSearch, notifications: enNotifications,
      },
      fr: {
        common: frCommon, auth: frAuth, home: frHome, products: frProducts,
        categories: frCategories, cart: frCart, checkout: frCheckout,
        orders: frOrders, profile: frProfile, favorites: frFavorites,
        reviews: frReviews, stores: frStores, search: frSearch, notifications: frNotifications,
      },
      it: {
        common: itCommon, auth: itAuth, home: itHome, products: itProducts,
        categories: itCategories, cart: itCart, checkout: itCheckout,
        orders: itOrders, profile: itProfile, favorites: itFavorites,
        reviews: itReviews, stores: itStores, search: itSearch, notifications: itNotifications,
      },
    },
    fallbackLng: 'de',
    defaultNS: 'common',
    ns: [
      'common', 'auth', 'home', 'products', 'categories', 'cart',
      'checkout', 'orders', 'profile', 'favorites', 'reviews', 'stores', 'search', 'notifications',
    ],
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'language',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
