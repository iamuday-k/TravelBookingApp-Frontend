// store/slices/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchAPI } from '../../services/api';

export const searchTrips = createAsyncThunk(
  'search/searchTrips',
  async (params, { rejectWithValue }) => {
    try {
      console.log('searchTrips thunk called with:', params);
      const res = await searchAPI.searchTrips(params);
      return res.data;
    } catch (error) {
      console.error('Search error:', error);
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    trips: [],
    relevantAgencies: {
      elite: [],
      premium: [],
      verified: []
    },
    pagination: {
      total: 0,
      page: 1
    },
    loading: false,
    error: null,
    filters: {
      q: '',
      minPrice: 5000,
      maxPrice: 50000,
      minDays: 3,
      maxDays: 3,
      minHotelRating: null
    }
  },
  reducers: {
    setFilters: (state, action) => {
      console.log('Setting filters:', action.payload);
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      console.log('Resetting filters');
      state.filters = {
        q: '',
        minPrice: 5000,
        maxPrice: 50000,
        minDays: 3,
        maxDays: 3,
        minHotelRating: null
      };
    },
    clearSearch: (state) => {
      console.log('Clearing search results');
      state.trips = [];
      state.relevantAgencies = {
        elite: [],
        premium: [],
        verified: []
      };
      state.pagination = {
        total: 0,
        page: 1
      };
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTrips.pending, (state) => {
        console.log('Search pending...');
        state.loading = true;
        state.error = null;
      })
      .addCase(searchTrips.fulfilled, (state, action) => {
        console.log('Search fulfilled:', action.payload);
        state.loading = false;
        state.trips = action.payload.trips;
        state.relevantAgencies = action.payload.relevantAgencies;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchTrips.rejected, (state, action) => {
        console.error('Search rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, resetFilters, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;