import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import plannedActivityService from '../../services/plannedActivityService';

export const fetchPlannedActivities = createAsyncThunk(
  'plannedActivities/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await plannedActivityService.getAll();
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to load activities.');
    }
  }
);

export const createPlannedActivity = createAsyncThunk(
  'plannedActivities/create',
  async (payload, { rejectWithValue }) => {
    try {
      return await plannedActivityService.create(payload);
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to create activity.');
    }
  }
);

export const deletePlannedActivity = createAsyncThunk(
  'plannedActivities/delete',
  async (id, { rejectWithValue }) => {
    try {
      await plannedActivityService.remove(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete activity.');
    }
  }
);

const plannedActivitySlice = createSlice({
  name: 'plannedActivities',
  initialState: { items: [], loading: false, error: null, searchQuery: '' },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlannedActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlannedActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchPlannedActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPlannedActivity.fulfilled, (state, action) => {
        if (action.payload) state.items.push(action.payload);
      })
      .addCase(deletePlannedActivity.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a.id !== action.payload);
      });
  },
});

export const { setSearchQuery } = plannedActivitySlice.actions;
export default plannedActivitySlice.reducer;