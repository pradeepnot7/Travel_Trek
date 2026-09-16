import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tripItineraryService from '../../services/tripItineraryService';

export const fetchTripItineraries = createAsyncThunk(
  'tripItineraries/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await tripItineraryService.getAll();
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to load itineraries.');
    }
  }
);

export const createTripItinerary = createAsyncThunk(
  'tripItineraries/create',
  async (payload, { rejectWithValue }) => {
    try {
      return await tripItineraryService.create(payload);
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to create itinerary.');
    }
  }
);

export const updateTripItinerary = createAsyncThunk(
  'tripItineraries/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await tripItineraryService.update(id, payload);
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to update itinerary.');
    }
  }
);

export const confirmTripItinerary = createAsyncThunk(
  'tripItineraries/confirm',
  async (id, { rejectWithValue }) => {
    try {
      return await tripItineraryService.confirm(id);
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to confirm itinerary.');
    }
  }
);

export const deleteTripItinerary = createAsyncThunk(
  'tripItineraries/delete',
  async (id, { rejectWithValue }) => {
    try {
      await tripItineraryService.remove(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete itinerary.');
    }
  }
);

export const generateAiItinerary = createAsyncThunk(
  'tripItineraries/aiGenerate',
  async (prompt, { rejectWithValue }) => {
    try {
      return await tripItineraryService.generateWithAi(prompt);
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'AI itinerary generation failed.');
    }
  }
);

const tripItinerarySlice = createSlice({
  name: 'tripItineraries',
  initialState: { items: [], loading: false, error: null, statusFilter: 'ALL' },
  reducers: {
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTripItineraries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTripItineraries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTripItineraries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTripItinerary.fulfilled, (state, action) => {
        if (action.payload) state.items.push(action.payload);
      })
      .addCase(generateAiItinerary.fulfilled, (state, action) => {
        if (action.payload) state.items.push(action.payload);
      })
      .addCase(updateTripItinerary.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i.id === action.payload?.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(confirmTripItinerary.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i.id === action.payload?.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTripItinerary.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      });
  },
});

export const { setStatusFilter } = tripItinerarySlice.actions;
export default tripItinerarySlice.reducer;