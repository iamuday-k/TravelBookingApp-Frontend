import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { itineraryAPI } from '../../services/api';

export const fetchItinerary = createAsyncThunk(
  'itinerary/fetch',
  async (packageId, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching itinerary...');
      const res = await itineraryAPI.getItinerary(packageId);
      console.log('✅ Itinerary fetched:', res.data);
      return res.data;
    } catch (error) {
      console.error('❌ Error fetching itinerary:', error);
      return rejectWithValue(error.message);
    }
  }
);

const itinerarySlice = createSlice({
  name: 'itinerary',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    clearItinerary: (state) => {
      state.data = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItinerary.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearItinerary } = itinerarySlice.actions;
export default itinerarySlice.reducer;