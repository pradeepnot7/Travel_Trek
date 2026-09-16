import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import travelPackageService from '../../services/travelpackageService';

export const fetchTravelPackages = createAsyncThunk(
  'travelPackages/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await travelPackageService.getAll();
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to load travel packages.');
    }
  }
);

export const createTravelPackage = createAsyncThunk(
  'travelPackages/create',
  async (payload, { rejectWithValue }) => {
    try {
      return await travelPackageService.create(payload);
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to create travel package.');
    }
  }
);

export const updateTravelPackage = createAsyncThunk(
  'travelPackages/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await travelPackageService.update(id, payload);
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to update travel package.');
    }
  }
);

export const deleteTravelPackage = createAsyncThunk(
  'travelPackages/delete',
  async (id, { rejectWithValue }) => {
    try {
      await travelPackageService.remove(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete travel package.');
    }
  }
);

const travelPackageSlice = createSlice({
  name: 'travelPackages',
  initialState: { items: [], loading: false, error: null, searchQuery: '' },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTravelPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTravelPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTravelPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTravelPackage.fulfilled, (state, action) => {
        if (action.payload) state.items.push(action.payload);
      })
      .addCase(updateTravelPackage.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload?.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTravelPackage.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { setSearchQuery } = travelPackageSlice.actions;
export default travelPackageSlice.reducer;