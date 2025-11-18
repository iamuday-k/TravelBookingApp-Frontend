import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { agencyProfileAPI } from "../../services/api";

const initialState = {
  profileData: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "agencyProfile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await agencyProfileAPI.getProfile();
      return res;
    } catch (err) {
      return rejectWithValue(err?.message || "Failed to fetch profile");
    }
  }
);

const agencyProfileSlice = createSlice({
  name: "agencyProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profileData = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default agencyProfileSlice.reducer;
