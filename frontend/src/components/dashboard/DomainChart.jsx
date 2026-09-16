import React from 'react';
import { useSelector } from 'react-redux';

const DomainChart = () => {
  const data = [
    { label: 'Itineraries', value: useSelector((s) => s.tripItineraries.items.length), color: '#2d6cdf' },
    { label: 'Packages', value: useSelector((s) => s.travelPackages.items.length), color: '#2f9e52' },
    { label: 'Bookings', value: useSelector((s) => s.bookingReservations.items.length), color: '#f5a623' },
    { label: 'Activities', value: useSelector((s) => s.plannedActivities.items.length), color: '#6a3de8' },
  ];
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 20 }}>
      <h3 style={{ marginTop: 0 }}>Domain Overview</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, height: 160 }}>
        {data.map((d) => (
          <div key={d.label} style={{ textAlign: 'center', flex: 1 }}>
            <div
              style={{
                height: `${(d.value / max) * 120}px`,
                background: d.color,
                borderRadius: '4px 4px 0 0',
                minHeight: 4,
              }}
            />
            <p style={{ fontSize: 12, margin: '8px 0 0' }}>{d.label}</p>
            <strong>{d.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainChart;