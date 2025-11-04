// store/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistAPI } from '../../services/api';

export const fetchWishlist = createAsyncThunk(
  'wishlist/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await wishlistAPI.getWishlist();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/remove',
  async (itemId, { rejectWithValue }) => {
    try {
      await wishlistAPI.removeFromWishlist(itemId);
      return itemId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to remove item');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    sections: [],
    loading: false,
    error: null,
    selectedFilter: 'All'
  },
  reducers: {
    setFilter: (state, action) => {
      state.selectedFilter = action.payload;
      console.log('Filter changed to:', action.payload);
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
        console.log('Wishlist fetched:', action.payload.length, 'sections');
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('Wishlist fetch error:', action.payload);
      })
      .addCase(removeFromWishlist.pending, (state) => {
        // Optimistic update can be added here
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        // Remove item from sections
        state.sections = state.sections.map(section => ({
          ...section,
          items: section.items.filter(item => item.itemId !== action.payload)
        })).filter(section => section.items.length > 0);
        console.log('Item removed from wishlist:', action.payload);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.payload;
        console.error('Remove from wishlist error:', action.payload);
      });
  }
});

export const { setFilter, clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;