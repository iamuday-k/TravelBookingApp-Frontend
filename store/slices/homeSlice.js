import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { homeAPI } from '../../services/api';

// Async thunk for fetching home data
export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await homeAPI.getHomeData();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
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
  pagination: {
    total: 0,
    page: 1,
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearHomeData: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        const { pagination, trips, relevantAgencies, promotions, spiritualDestinations, popularDestinations, testimonials } = action.payload;
        
        // Update state with fetched data
        state.pagination = pagination || initialState.pagination;
        state.trips = trips || [];
        state.relevantAgencies = {
          elite: relevantAgencies?.elite || [],
          premium: relevantAgencies?.premium || [],
          verified: relevantAgencies?.verified || [],
          welcomeGift: relevantAgencies?.welcomeGift || [],
        };
        state.promotions = promotions || [];
        state.spiritualDestinations = spiritualDestinations || [];
        state.popularDestinations = popularDestinations || [];
        state.testimonials = testimonials || [];
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { error: 'UnknownError', message: 'Something went wrong' };
      });
  },
});

export const { clearError, clearHomeData } = homeSlice.actions;
export default homeSlice.reducer;