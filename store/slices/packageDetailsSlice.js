import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { packageDetailsAPI } from '../../services/api';

export const fetchPackageDetails = createAsyncThunk(
  'packageDetails/fetch',
  async (packageId, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching package details...');
      const res = await packageDetailsAPI.getPackageDetails(packageId);
      console.log('✅ Package details fetched:', res.data);
      return res.data;
    } catch (error) {
      console.error('❌ Error fetching package details:', error);
      return rejectWithValue(error.message);
    }
  }
);

const packageDetailsSlice = createSlice({
  name: 'packageDetails',
  initialState: {
    details: null,
    selectedFilters: {
      duration: null,
      rating: null,
      priceRange: null,
      packageType: 'All Packages'
    },
    loading: false,
    error: null
  },
  reducers: {
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      console.log(`🎯 Setting filter: ${filterType} = ${value}`);
      state.selectedFilters[filterType] = value;
    },
    clearFilters: (state) => {
      console.log('🧹 Clearing all filters');
      state.selectedFilters = {
        duration: null,
        rating: null,
        priceRange: null,
        packageType: 'All Packages'
      };
    },
    clearDetails: (state) => {
      state.details = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackageDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackageDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchPackageDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilter, clearFilters, clearDetails } = packageDetailsSlice.actions;
export default packageDetailsSlice.reducer;