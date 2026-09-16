
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import authService from '../../services/authService';

// let notifId = 1;
// const nextId = () => notifId++;

// const tokenFromStorage =
//   typeof window !== 'undefined' ? localStorage.getItem('tt_token') : null;

// const initialState = {
//   isAuthenticated: !!tokenFromStorage,
//   account: null,
//   token: tokenFromStorage || null,
//   loading: false,
//   error: null,
//   notifications: [],
// };

// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       return await authService.login(email, password);
//     } catch (err) {
//       return rejectWithValue(err?.response?.data?.message || 'Login failed. Check your credentials.');
//     }
//   }
// );

// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async (payload, { rejectWithValue }) => {
//     try {
//       return await authService.register(payload);
//     } catch (err) {
//       return rejectWithValue(err?.response?.data?.message || 'Registration failed.');
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout(state) {
//       authService.logout();
//       state.isAuthenticated = false;
//       state.account = null;
//       state.token = null;
//     },
//     pushNotification(state, action) {
//       if (!Array.isArray(state.notifications)) state.notifications = [];
//       state.notifications.push({ id: nextId(), ...action.payload });
//     },
//     dismissNotification(state, action) {
//       if (!Array.isArray(state.notifications)) {
//         state.notifications = [];
//         return;
//       }
//       state.notifications = state.notifications.filter((n) => n.id !== action.payload);
//     },
//     clearError(state) {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.account = action.payload?.account || null;
//         state.token = action.payload?.token || null;
//         if (!Array.isArray(state.notifications)) state.notifications = [];
//         state.notifications.push({ id: nextId(), type: 'success', message: 'Signed in successfully.' });
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.error = action.payload;
//         if (!Array.isArray(state.notifications)) state.notifications = [];
//         state.notifications.push({ id: nextId(), type: 'error', message: action.payload || 'Login failed.' });
//       })
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state) => {
//         state.loading = false;
//         if (!Array.isArray(state.notifications)) state.notifications = [];
//         state.notifications.push({ id: nextId(), type: 'success', message: 'Registration complete. Please sign in.' });
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         if (!Array.isArray(state.notifications)) state.notifications = [];
//         state.notifications.push({ id: nextId(), type: 'error', message: action.payload || 'Registration failed.' });
//       });
//   },
// });

// export const { logout, pushNotification, dismissNotification, clearError } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

let notifId = 1;

const nextId = () => notifId++;

const initialState = {
  isAuthenticated:
    typeof window !== 'undefined'
      ? !!localStorage.getItem('tt_token')
      : false,

  account: null,
  token: null,
  loading: false,
  error: null,
  notifications: [],
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { email, password },
    { rejectWithValue }
  ) => {
    try {
      return await authService.login(
        email,
        password
      );
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message ||
          'Login failed. Check your credentials.'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    payload,
    { rejectWithValue }
  ) => {
    try {
      return await authService.register(
        payload
      );
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message ||
          'Registration failed.'
      );
    }
  }
);

const ensureNotifications = (state) => {
  if (!Array.isArray(state.notifications)) {
    state.notifications = [];
  }
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    logout(state) {
      authService.logout();

      state.isAuthenticated = false;
      state.account = null;
      state.token = null;
    },

    pushNotification(state, action) {
      ensureNotifications(state);

      state.notifications.push({
        id: nextId(),
        ...action.payload,
      });
    },

    dismissNotification(
      state,
      action
    ) {
      ensureNotifications(state);

      state.notifications =
        state.notifications.filter(
          (n) =>
            n.id !== action.payload
        );
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        loginUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loading = false;
          state.isAuthenticated = true;

          state.account =
            action.payload?.account ||
            null;

          state.token =
            action.payload?.token ||
            null;

          ensureNotifications(state);

          state.notifications.push({
            id: nextId(),
            type: 'success',
            message:
              'Signed in successfully.',
          });
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.error = action.payload;

          ensureNotifications(state);

          state.notifications.push({
            id: nextId(),
            type: 'error',
            message:
              action.payload ||
              'Login failed.',
          });
        }
      )

      .addCase(
        registerUser.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        registerUser.fulfilled,
        (state) => {
          state.loading = false;

          ensureNotifications(state);

          state.notifications.push({
            id: nextId(),
            type: 'success',
            message:
              'Registration complete. Please sign in.',
          });
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;

          ensureNotifications(state);

          state.notifications.push({
            id: nextId(),
            type: 'error',
            message:
              action.payload ||
              'Registration failed.',
          });
        }
      );
  },
});

export const {
  logout,
  pushNotification,
  dismissNotification,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;