import React from 'react';
import { useSelector } from 'react-redux';

const RecentActivity = () => {
  const activities = useSelector((state) => state.plannedActivities.items).slice(-5).reverse();

  return (
    <div style={{ background: '#fff', borderRadius: 8, padding: 20 }}>
      <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
      {activities.length === 0 ? (
        <p style={{ color: '#8a8f9c' }}>Nothing planned yet.</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {activities.map((a) => (
            <li key={a.id} style={{ marginBottom: 6 }}>
              {a.activityName} — Day #{a.dayNumber}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;