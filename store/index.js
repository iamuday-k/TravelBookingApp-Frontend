import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/homeSlice';

const store = configureStore({
  reducer: {
    home: homeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  preloadedState: {
    home: {
      loading: false,
      error: null,
      trips: [],
      relevantAgencies: {
        elite: [],
        premium: [],
        verified: [],
        welcomeGift: []
      },
      promotions: [],
      spiritualDestinations: [],
      popularDestinations: [],
      testimonials: [],
      pagination: { total: 0, page: 1 }
    }
  }
});

// Debug store state
store.subscribe(() => {
  console.log('Store Updated:', store.getState());
});

export default store;