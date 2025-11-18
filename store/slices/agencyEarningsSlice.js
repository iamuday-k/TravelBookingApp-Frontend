import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { agencyEarningsAPI } from '../../services/api';

const initialState = {
  stats: {
    totalRevenue: 0,
    withdrawn: 0,
    pending: 0,
  },
  transactions: [],
  graphData: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchEarnings = createAsyncThunk(
  'agencyEarnings/fetchEarnings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await agencyEarningsAPI.getEarnings();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch earnings');
    }
  }
);

const agencyEarningsSlice = createSlice({
  name: 'agencyEarnings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarnings.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload.summary;
        state.transactions = action.payload.payoutHistory;
        state.graphData = action.payload.graphData;
        state.error = null;
      })
      .addCase(fetchEarnings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default agencyEarningsSlice.reducer;