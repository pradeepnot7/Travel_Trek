import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlannedActivities, deletePlannedActivity } from '../../store/slices/plannedActivitySlice';
import PlannedActivityForm from './PlannedActivityForm';
import CapacityBar from '../common/CapacityBar';
import EmptyState from '../common/EmptyState';
import { can } from '../../utils/permissions';

const PlannedActivityList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.plannedActivities);
  const role = useSelector((state) => state.auth.account?.role);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchPlannedActivities());
  }, []);

  const filtered = (items || []).filter((a) => {
    const q = search.toLowerCase();
    return !q || a.activityName?.toLowerCase().includes(q);
  });

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: 0 }}>Planned Activities Directory</h2>
          {!can(role, 'CREATE_ACTIVITY') && (
            <span style={{ fontSize: 12, color: '#8a8f9c' }}>View-only — activities are scheduled by our travel team.</span>
          )}
        </div>
        {can(role, 'CREATE_ACTIVITY') && (
          <button onClick={() => setShowForm(true)} style={{ background: '#2d6cdf', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6 }}>
            + Add Activity
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <input
          placeholder="Search by activity name, day or area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: 10, border: '1px solid #d7dbe3', borderRadius: 6 }}
        />
        <button onClick={() => setSearch('')} style={{ padding: '8px 16px', border: '1px solid #d7dbe3', borderRadius: 6, background: '#fff' }}>
          Clear Filters
        </button>
      </div>

      {loading && <p>Loading activities...</p>}
      {!loading && filtered.length === 0 && <EmptyState message="No planned activities found." />}

      {filtered.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #e5e8ee' }}>
              <th style={{ padding: 10 }}>Activity Name</th>
              <th style={{ padding: 10 }}>Day &amp; Schedule</th>
              <th style={{ padding: 10 }}>Cost Estimate</th>
              <th style={{ padding: 10 }}>Inventory / Capacity Usage</th>
              <th style={{ padding: 10 }}>Parent Linked ID</th>
              <th style={{ padding: 10 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} style={{ borderBottom: '1px solid #f0f1f4' }}>
                <td style={{ padding: 10 }}>{a.activityName}</td>
                <td style={{ padding: 10 }}>
                  Day #{a.dayNumber} / {a.schedule}
                </td>
                <td style={{ padding: 10 }}>${a.costEstimate}</td>
                <td style={{ padding: 10, minWidth: 140 }}>
                  <CapacityBar used={a.inventoryUsed || 0} total={a.inventoryCapacity || 0} />
                </td>
                <td style={{ padding: 10 }}>#{a.parentItineraryId}</td>
                <td style={{ padding: 10 }}>
                  {can(role, 'DELETE_ACTIVITY') && (
                    <button
                      onClick={() => dispatch(deletePlannedActivity(a.id))}
                      style={{ background: '#e2483d', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6 }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <PlannedActivityForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default PlannedActivityList;