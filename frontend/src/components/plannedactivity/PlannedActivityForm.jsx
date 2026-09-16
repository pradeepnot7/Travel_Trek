import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPlannedActivity } from '../../store/slices/plannedActivitySlice';

const PlannedActivityForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [activityName, setActivityName] = useState('');
  const [dayNumber, setDayNumber] = useState('');
  const [schedule, setSchedule] = useState('');
  const [costEstimate, setCostEstimate] = useState('');
  const [inventoryCapacity, setInventoryCapacity] = useState('');
  const [parentItineraryId, setParentItineraryId] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activityName || !dayNumber || !costEstimate) {
      setError('Activity name, day number and cost estimate are required.');
      return;
    }
    try {
      await dispatch(
        createPlannedActivity({
          activityName,
          dayNumber: Number(dayNumber),
          schedule,
          costEstimate: Number(costEstimate),
          inventoryCapacity: Number(inventoryCapacity) || 0,
          inventoryUsed: 0,
          parentItineraryId: Number(parentItineraryId) || null,
        })
      ).unwrap();
      if (onClose) onClose();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Could not save the activity.');
    }
  };

  return (
    <div style={{ background: '#fff', padding: 28, borderRadius: 10, width: 420, maxWidth: '90vw' }}>
      <h3>Add Planned Activity</h3>
      <form onSubmit={handleSubmit}>
        <label>Activity Name *</label>
        <input placeholder="e.g. Morning Architecture Tour" value={activityName} onChange={(e) => setActivityName(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label>Day Number *</label>
            <input type="number" placeholder="e.g. 1" value={dayNumber} onChange={(e) => setDayNumber(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Schedule</label>
            <input placeholder="e.g. 9:00 AM" value={schedule} onChange={(e) => setSchedule(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />
          </div>
        </div>

        <label>Cost Estimate (USD) *</label>
        <input type="number" placeholder="e.g. 45" value={costEstimate} onChange={(e) => setCostEstimate(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />

        <label>Inventory Capacity</label>
        <input type="number" placeholder="e.g. 50" value={inventoryCapacity} onChange={(e) => setInventoryCapacity(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />

        <label>Parent Itinerary ID</label>
        <input type="number" placeholder="e.g. 1" value={parentItineraryId} onChange={(e) => setParentItineraryId(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />

        {error && <p style={{ color: '#c0392b', fontSize: 13 }}>{error}</p>}

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="submit" style={{ flex: 1, background: '#2d6cdf', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600 }}>
            Save Activity
          </button>
          <button type="button" onClick={onClose} style={{ flex: 1, background: '#eef0f4', color: '#333', border: 'none', padding: 12, borderRadius: 6 }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlannedActivityForm;