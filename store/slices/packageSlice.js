import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { packagesAPI } from '../../services/api';

export const fetchPackages = createAsyncThunk(
  'packages/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching packages...');
      const res = await packagesAPI.getAllPackages(params);
      console.log('✅ Packages fetched:', res.data);
      return res.data;
    } catch (error) {
      console.error('❌ Error fetching packages:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPackageById = createAsyncThunk(
  'packages/fetchById',
  async (packageId, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching package:', packageId);
      const res = await packagesAPI.getPackageById(packageId);
      console.log('✅ Package fetched:', res.data);
      return res.data;
    } catch (error) {
      console.error('❌ Error fetching package:', error);
      return rejectWithValue(error.message);
    }
  }
);

const packagesSlice = createSlice({
  name: 'packages',
  initialState: {
    allPackages: [],
    popularPackages: [],
    domesticPackages: [],
    internationalPackages: [],
    currentPackage: null,
    loading: false,
    error: null,
    pagination: {
      total: 0,
      page: 1,
      totalPages: 1
    }
  },
  reducers: {
    clearCurrentPackage: (state) => {
      state.currentPackage = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all packages
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.allPackages = action.payload.packages;
        state.pagination = action.payload.pagination;
        
        // Categorize packages
        state.popularPackages = action.payload.packages.filter(
          pkg => pkg.category === 'popular'
        );
        state.domesticPackages = action.payload.packages.filter(
          pkg => pkg.category === 'domestic'
        );
        state.internationalPackages = action.payload.packages.filter(
          pkg => pkg.category === 'international'
        );
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch package by ID
      .addCase(fetchPackageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackageById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPackage = action.payload;
      })
      .addCase(fetchPackageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentPackage, clearError } = packagesSlice.actions;
export default packagesSlice.reducer;