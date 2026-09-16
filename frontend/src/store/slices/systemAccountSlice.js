import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import systemAccountService from '../../services/systemAccountService';

export const fetchSystemAccounts = createAsyncThunk(
  'systemAccounts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await systemAccountService.getAll();
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to load accounts.');
    }
  }
);

export const createSystemAccount = createAsyncThunk(
  'systemAccounts/create',
  async (payload, { rejectWithValue }) => {
    try {
      return await systemAccountService.create(payload);
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to create account.');
    }
  }
);

export const deleteSystemAccount = createAsyncThunk(
  'systemAccounts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await systemAccountService.remove(id);
      return id;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Failed to delete account.');
    }
  }
);

const systemAccountSlice = createSlice({
  name: 'systemAccounts',
  initialState: { items: [], loading: false, error: null, searchQuery: '' },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSystemAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSystemAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSystemAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSystemAccount.fulfilled, (state, action) => {
        if (action.payload) state.items.push(action.payload);
      })
      .addCase(deleteSystemAccount.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a.id !== action.payload);
      });
  },
});

export const { setSearchQuery } = systemAccountSlice.actions;
export default systemAccountSlice.reducer;