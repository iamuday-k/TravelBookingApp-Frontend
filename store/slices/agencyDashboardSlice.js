import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { agencyDashboardAPI } from "../../services/api";

export const fetchAgencyDashboard = createAsyncThunk(
  "agencyDashboard/fetch",
  async (params, { rejectWithValue }) => {
    const res = await agencyDashboardAPI.getDashboard(params);
    if (res?.error) return rejectWithValue(res.message || "Access denied.");
    return res.data; // {stats, latestBookings, monthlyBookingsChart, ...}
  }
);

const agencyDashboardSlice = createSlice({
  name: "agencyDashboard",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchAgencyDashboard.pending, (s) => {
      s.loading = true; s.error = null;
    });
    b.addCase(fetchAgencyDashboard.fulfilled, (s, a) => {
      s.loading = false; s.data = a.payload;
    });
    b.addCase(fetchAgencyDashboard.rejected, (s, a) => {
      s.loading = false; s.error = a.payload || "Failed to load dashboard";
    });
  },
});

export default agencyDashboardSlice.reducer;
