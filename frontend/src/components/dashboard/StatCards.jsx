import React from 'react';
import { useSelector } from 'react-redux';

const Card = ({ label, value, color }) => (
  <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 20, borderTop: `4px solid ${color}` }}>
    <p style={{ margin: 0, color: '#8a8f9c', fontSize: 13 }}>{label}</p>
    <h2 style={{ margin: '6px 0 0' }}>{value}</h2>
  </div>
);

const StatCards = () => {
  const itineraries = useSelector((state) => state.tripItineraries.items.length);
  const packages = useSelector((state) => state.travelPackages.items.length);
  const bookings = useSelector((state) => state.bookingReservations.items.length);
  const activities = useSelector((state) => state.plannedActivities.items.length);

  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
      <Card label="Trip Itineraries" value={itineraries} color="#2d6cdf" />
      <Card label="Travel Packages" value={packages} color="#2f9e52" />
      <Card label="Booking Reservations" value={bookings} color="#f5a623" />
      <Card label="Planned Activities" value={activities} color="#6a3de8" />
    </div>
  );
};

export default StatCards;