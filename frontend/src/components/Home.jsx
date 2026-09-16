import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyItineraries } from '../store/slices/tripItinerarySlice';
import { getMyBookings } from '../store/slices/bookingReservationSlice';
import { getPackages } from '../store/slices/travelPackageSlice';
import StatCards from './dashboard/StatCards';
import DomainChart from './dashboard/DomainChart';
import RecentActivity from './dashboard/RecentActivity';

const Home = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) return;
    dispatch(getPackages());
    if (user.role === 'TRAVELER') {
      dispatch(getMyItineraries());
      dispatch(getMyBookings());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="page-container">
        <div className="hero-card">
          <h2>Welcome to TravelTrek</h2>
          <p>Sign in to plan AI-assisted trips and manage your bookings.</p>
        </div>
      </div>
    );
  }

  if (user.role === 'TRAVELER') {
    return (
      <div className="page-container">
        <div className="hero-card">
          <h2>Greetings, traveler!</h2>
          <p>
            Plan dynamic trips supported by our secure AI routing agents, view customized
            daily activities, and place instant reservation bookings with zero transaction
            turnaround.
          </p>
          <div className="card-actions">
            <button onClick={() => setActiveTab && setActiveTab('itineraries')}>
              Request AI Itinerary
            </button>
            <button onClick={() => setActiveTab && setActiveTab('packages')}>
              Explore Pre-packaged Tours
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Operations Dashboard</h2>
      <StatCards />
      <div className="dashboard-grid">
        <DomainChart />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Home;