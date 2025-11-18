// store/slices/agencyPackagesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { agencyPackagesAPI } from "../../services/api";

export const fetchAgencyPackages = createAsyncThunk(
  "agencyPackages/fetch",
  async (params = {}, { rejectWithValue }) => {
    const res = await agencyPackagesAPI.getList(params);
    if (res?.error) return rejectWithValue(res.message || "Access denied.");
    return res; // { pagination, packages }
  }
);

export const deleteAgencyPackage = createAsyncThunk(
  "agencyPackages/delete",
  async (packageId, { rejectWithValue }) => {
    try {
      const res = await agencyPackagesAPI.delete(packageId);
      if (res?.error) return rejectWithValue(res.message || "Failed to delete");
      return { packageId };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const createAgencyPackage = createAsyncThunk(
  "agencyPackages/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await agencyPackagesAPI.createPackage(payload);
      if (res?.error) return rejectWithValue(res.message || "Failed to create");
      return res.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const agencyPackagesSlice = createSlice({
  name: "agencyPackages",
  initialState: { items: [], pagination: { total: 0, page: 1 }, loading: false, error: null },
  reducers: {
    clearPackages(state) {
      state.items = [];
      state.pagination = { total: 0, page: 1 };
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchAgencyPackages.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(fetchAgencyPackages.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload.packages || [];
      s.pagination = a.payload.pagination || { total: s.items.length, page: 1 };
    });
    b.addCase(fetchAgencyPackages.rejected, (s, a) => { s.loading = false; s.error = a.payload || "Failed to load packages"; });

    b.addCase(deleteAgencyPackage.fulfilled, (s, a) => {
      s.items = s.items.filter((p) => p.packageId !== a.payload.packageId);
      s.pagination.total = Math.max(0, (s.pagination.total || 0) - 1);
    });

    b.addCase(createAgencyPackage.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(createAgencyPackage.fulfilled, (s, a) => {
      s.loading = false;
      s.items = [a.payload, ...s.items];
      s.pagination.total = (s.pagination.total || 0) + 1;
    });
    b.addCase(createAgencyPackage.rejected, (s, a) => { s.loading = false; s.error = a.payload || "Failed to create package"; });
  },
});

export const { clearPackages } = agencyPackagesSlice.actions;
export default agencyPackagesSlice.reducer;
