import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingReservationService from '../../services/bookingReservationService';

export const fetchBookingReservations = createAsyncThunk(
  'bookingReservations/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await bookingReservationService.getAll();
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to load bookings.');
    }
  }
);

export const createBookingReservation = createAsyncThunk(
  'bookingReservations/create',
  async (payload, { rejectWithValue }) => {
    try {
      return await bookingReservationService.create(payload);
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to create booking.');
    }
  }
);

export const deleteBookingReservation = createAsyncThunk(
  'bookingReservations/delete',
  async (id, { rejectWithValue }) => {
    try {
      await bookingReservationService.remove(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete booking.');
    }
  }
);

const bookingReservationSlice = createSlice({
  name: 'bookingReservations',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchBookingReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBookingReservation.fulfilled, (state, action) => {
        if (action.payload) state.items.push(action.payload);
      })
      .addCase(deleteBookingReservation.fulfilled, (state, action) => {
        state.items = state.items.filter((b) => b.id !== action.payload);
      });
  },
});

export default bookingReservationSlice.reducer;