import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { agencyBookingsAPI } from '../../services/api';

const initialState = {
  stats: {
    total: 0,
    confirmed: 0,
    pending: 0,
  },
  bookings: [],
  filteredBookings: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  filters: {
    dateRange: null,
    package: null,
    status: null,
  },
};

export const fetchBookings = createAsyncThunk(
  'agencyBookings/fetchBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await agencyBookingsAPI.getBookings();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch bookings');
    }
  }
);

const agencyBookingSlice = createSlice({
  name: 'agencyBookings',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      applyFilters(state);
    },
    setDateFilter: (state, action) => {
      state.filters.dateRange = action.payload;
      applyFilters(state);
    },
    setPackageFilter: (state, action) => {
      state.filters.package = action.payload;
      applyFilters(state);
    },
    setStatusFilter: (state, action) => {
      state.filters.status = action.payload;
      applyFilters(state);
    },
    clearFilters: (state) => {
      state.filters = {
        dateRange: null,
        package: null,
        status: null,
      };
      state.searchQuery = '';
      state.filteredBookings = state.bookings;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload.stats;
        state.bookings = action.payload.bookings;
        state.filteredBookings = action.payload.bookings;
        state.error = null;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Helper function to apply filters
function applyFilters(state) {
  let filtered = [...state.bookings];

  // Search filter
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(booking =>
      booking.customerName.toLowerCase().includes(query)
    );
  }

  // Date filter
  if (state.filters.dateRange) {
    // Apply date range filter logic here
  }

  // Package filter
  if (state.filters.package) {
    filtered = filtered.filter(booking =>
      booking.package === state.filters.package
    );
  }

  // Status filter
  if (state.filters.status) {
    filtered = filtered.filter(booking =>
      booking.paymentStatus.toLowerCase() === state.filters.status.toLowerCase()
    );
  }

  state.filteredBookings = filtered;
}

export const { setSearchQuery, setDateFilter, setPackageFilter, setStatusFilter, clearFilters } = agencyBookingSlice.actions;
export default agencyBookingSlice.reducer;