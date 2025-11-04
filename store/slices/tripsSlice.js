import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tripsAPI } from '../../services/api';

export const fetchTrips = createAsyncThunk(
  'trips/fetch',
  async (status, { rejectWithValue }) => {
    try {
      const res = await tripsAPI.getTrips(status);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTripDetails = createAsyncThunk(
  'trips/fetchDetails',
  async (tripId, { rejectWithValue }) => {
    try {
      const res = await tripsAPI.getTripDetails(tripId);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tripsSlice = createSlice({
  name: 'trips',
  initialState: {
    items: [],
    upcomingTrips: [],
    completedTrips: [],
    selectedTrip: null,
    loading: false,
    error: null,
    activeTab: 'upcoming'
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      console.log('Active tab changed to:', action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.upcomingTrips = action.payload.filter(t => t.status === 'upcoming');
        state.completedTrips = action.payload.filter(t => t.status === 'completed');
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTripDetails.fulfilled, (state, action) => {
        state.selectedTrip = action.payload;
      });
  }
});

export const { setActiveTab } = tripsSlice.actions;
export default tripsSlice.reducer;