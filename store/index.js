// store/index.js - Updated with agency reducer
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/homeSlice';
import agencyReducer from './slices/agencySlice';
import wishlistReducer from './slices/wishListSlice';
import profileReducer from './slices/profileSlice';
import tripsReducer from './slices/tripsSlice';
import searchReducer from './slices/searchSlice';
import packagesReducer from './slices/packageSlice';
import packageDetailsReducer from './slices/packageDetailsSlice';
import itineraryReducer from './slices/itinerarySlice';
import bookingReducer from './slices/userBookingSlice';
import agencyDashboardReducer from "./slices/agencyDashboardSlice";
import agencyPackagesReducer from "./slices/agencyPackagesSlice";
import agencyEarningsReducer from './slices/agencyEarningsSlice';
import agencyBookingsReducer from './slices/agencyBookingSlice';
import agencyProfileReducer from './slices/agencyProfileSlice';
import agencyAuthReducer from './slices/agencyAuthSlice';


const store = configureStore({
  reducer: {
    home: homeReducer,
    agency: agencyReducer,
    wishlist: wishlistReducer,
    profile: profileReducer,
    trips: tripsReducer,
    search: searchReducer,
    packages: packagesReducer,
    packageDetails: packageDetailsReducer,
    itinerary: itineraryReducer,
    booking: bookingReducer,
    agencyDashboard: agencyDashboardReducer,
    agencyPackages: agencyPackagesReducer,
    agencyEarnings: agencyEarningsReducer,
    agencyBookings: agencyBookingsReducer,
    agencyProfile: agencyProfileReducer,
    agencyAuth: agencyAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
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
        welcomeGift: [],
      },
      promotions: [],
      spiritualDestinations: [],
      popularDestinations: [],
      testimonials: [],
      pagination: { total: 0, page: 1 },
    },
    agency: {
      agencies: [],
      filteredAgencies: [],
      selectedLocation: 'All',
      wishlist: [],
      loading: false,
      error: null,
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
      },
      currentTier: null,
    },
  },
});

// Debug store state
store.subscribe(() => {
  console.log('Store Updated:', store.getState());
});

export default store;