import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBookingReservation } from '../../store/slices/bookingReservationSlice';

const BookingReservationForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [itineraryId, setItineraryId] = useState('');
  const [activityId, setActivityId] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itineraryId || !amount) {
      setError('Itinerary and amount are required.');
      return;
    }
    try {
      await dispatch(
        createBookingReservation({
          itineraryId: Number(itineraryId),
          activityId: activityId ? Number(activityId) : null,
          amount: Number(amount),
          bookingStatus: 'PENDING',
          paymentStatus: 'PENDING',
        })
      ).unwrap();
      if (onClose) onClose();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Could not save the booking.');
    }
  };

  return (
    <div style={{ background: '#fff', padding: 28, borderRadius: 10, width: 400, maxWidth: '90vw' }}>
      <h3>Add Booking Reservation</h3>
      <form onSubmit={handleSubmit}>
        <label>Itinerary ID *</label>
        <input type="number" value={itineraryId} onChange={(e) => setItineraryId(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />

        <label>Activity ID</label>
        <input type="number" value={activityId} onChange={(e) => setActivityId(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />

        <label>Amount (USD) *</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />

        {error && <p style={{ color: '#c0392b', fontSize: 13 }}>{error}</p>}

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="submit" style={{ flex: 1, background: '#2d6cdf', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600 }}>
            Confirm Booking
          </button>
          <button type="button" onClick={onClose} style={{ flex: 1, background: '#eef0f4', color: '#333', border: 'none', padding: 12, borderRadius: 6 }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingReservationForm;