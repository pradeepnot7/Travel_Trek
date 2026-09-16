import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import AuthShell from './components/AuthShell';

import Sidebar from './components/layout/Sidebar';
import NotificationStack from './components/NotificationStack';
import ErrorHandler from './components/ErrorHandler';

import TravelerDashboard from './components/dashboard/TravelerDashboard';
import AgentDashboard from './components/dashboard/AgentDashboard';
import ManagerDashboard from './components/dashboard/ManagerDashboard';

import TripItineraryList from './components/tripitinerary/TripItineraryList';
import PlannedActivityList from './components/plannedactivity/PlannedActivityList';
import TravelPackageList from './components/travelpackage/TravelPackageList';
import BookingReservationList from './components/bookingreservation/BookingReservationList';
import SystemAccountList from './components/systemaccount/SystemAccountList';

const DASHBOARD_BY_ROLE = {
  TRAVELER: TravelerDashboard,
  TOUR_AGENT: AgentDashboard,
  AGENCY_MANAGER: ManagerDashboard,
};

const VALID_TABS = [
  'home',
  'itineraries',
  'activities',
  'packages',
  'bookings',
  'accounts',
];

const getInitialTab = () => {
  try {
    const savedTab = sessionStorage.getItem(
      'traveltrek_active_tab'
    );

    if (VALID_TABS.includes(savedTab)) {
      return savedTab;
    }
  } catch (error) {
    // sessionStorage may be unavailable in some environments.
  }

  return 'home';
};

function App() {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  const account = useSelector(
    (state) => state.auth.account
  );

  const [activeTab, setActiveTabState] =
    useState(getInitialTab);

  const setActiveTab = (tab) => {
    if (!VALID_TABS.includes(tab)) {
      return;
    }

    setActiveTabState(tab);

    try {
      sessionStorage.setItem(
        'traveltrek_active_tab',
        tab
      );
    } catch (error) {
      // Continue normally if sessionStorage is unavailable.
    }
  };

  if (!isAuthenticated) {
    return (
      <ErrorHandler>
        <NotificationStack />
        <AuthShell />
      </ErrorHandler>
    );
  }

  const role =
    account?.role || 'TRAVELER';

  const DashboardComponent =
    DASHBOARD_BY_ROLE[role] ||
    TravelerDashboard;

  return (
    <ErrorHandler>
      <NotificationStack />

      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          background: '#f4f6f9',
        }}
      >
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {activeTab === 'home' && (
            <DashboardComponent
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'itineraries' && (
            <TripItineraryList />
          )}

          {activeTab === 'activities' && (
            <PlannedActivityList />
          )}

          {activeTab === 'packages' && (
            <TravelPackageList />
          )}

          {activeTab === 'bookings' && (
            <BookingReservationList />
          )}

          {activeTab === 'accounts' &&
            role === 'AGENCY_MANAGER' && (
              <SystemAccountList />
            )}
        </main>
      </div>
    </ErrorHandler>
  );
}

export default App;