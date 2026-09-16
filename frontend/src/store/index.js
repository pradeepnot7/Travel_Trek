import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import travelPackageReducer from './slices/travelPackageSlice';
import tripItineraryReducer from './slices/tripItinerarySlice';
import plannedActivityReducer from './slices/plannedActivitySlice';
import bookingReservationReducer from './slices/bookingReservationSlice';
import systemAccountReducer from './slices/systemAccountSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    travelPackages: travelPackageReducer,
    tripItineraries: tripItineraryReducer,
    plannedActivities: plannedActivityReducer,
    bookingReservations: bookingReservationReducer,
    systemAccounts: systemAccountReducer,
  },
});

export default store;