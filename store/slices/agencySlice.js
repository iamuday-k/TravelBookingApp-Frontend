// store/slices/agencySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { agencyAPI } from '../../services/api';

export const fetchAgencies = createAsyncThunk(
  'agency/fetchAgencies',
  async ({ tier, page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await agencyAPI.getAgenciesByTier(tier, page, limit);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch agencies');
    }
  }
);

const agencySlice = createSlice({
  name: 'agency',
  initialState: {
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
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
      
      if (action.payload === 'All') {
        state.filteredAgencies = state.agencies;
      } else {
        state.filteredAgencies = state.agencies.filter(
          (agency) => agency.location === action.payload
        );
      }
    },
    toggleWishlist: (state, action) => {
      const agencyId = action.payload;
      const index = state.wishlist.indexOf(agencyId);
      
      if (index > -1) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(agencyId);
      }
    },
    setCurrentTier: (state, action) => {
      state.currentTier = action.payload;
    },
    clearAgencies: (state) => {
      state.agencies = [];
      state.filteredAgencies = [];
      state.selectedLocation = 'All';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgencies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgencies.fulfilled, (state, action) => {
        state.loading = false;
        state.agencies = action.payload.agencies;
        state.filteredAgencies = action.payload.agencies;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchAgencies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setSelectedLocation, 
  toggleWishlist, 
  setCurrentTier,
  clearAgencies 
} = agencySlice.actions;

export default agencySlice.reducer;