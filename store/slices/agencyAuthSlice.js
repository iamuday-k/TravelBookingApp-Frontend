// GoVyral/store/slices/agencyAuthSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://api.yourdomain.com'; // << replace with your real backend

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const signUpAgency = createAsyncThunk(
  'agencyAuth/signUpAgency',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/agency/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => null);
        const message = errBody?.message || `Request failed with status ${res.status}`;
        return rejectWithValue(message);
      }

      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err?.message || 'Network error');
    }
  }
);

const agencyAuthSlice = createSlice({
  name: 'agencyAuth',
  initialState,
  reducers: {
    // optional local reducers if needed later
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAgency.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signUpAgency.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(signUpAgency.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error?.message || 'Sign up failed';
      });
  },
});

export default agencyAuthSlice.reducer;
