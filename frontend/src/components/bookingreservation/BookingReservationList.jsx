import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingReservations, deleteBookingReservation } from '../../store/slices/bookingReservationSlice';
import BookingReservationForm from './BookingReservationForm';
import EmptyState from '../common/EmptyState';
import { can } from '../../utils/permissions';

const BookingReservationList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.bookingReservations);
  const role = useSelector((state) => state.auth.account?.role);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {  
    dispatch(fetchBookingReservations());
  }, []);

  const isStaff = can(role, 'MANAGE_BOOKINGS');

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>{isStaff ? 'Booking Reservations' : 'My Applications'}</h2>
        {can(role, 'CREATE_OWN_BOOKING') && (
          <button onClick={() => setShowForm(true)} style={{ background: '#2d6cdf', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6 }}>
            + New Application
          </button>
        )}
      </div>

      {loading && <p>Loading bookings...</p>}
      {!loading && (items || []).length === 0 && (
        <EmptyState message={isStaff ? 'No bookings recorded yet.' : 'You have no applications yet — browse packages to apply.'} />
      )}

      {(items || []).map((b) => (
        <div key={b.id} style={{ background: '#fff', border: '1px solid #e5e8ee', borderRadius: 10, padding: 16, marginBottom: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <strong>Reference #{b.itineraryId}</strong>
              <p style={{ fontSize: 13, color: '#666' }}>Activity: {b.activityId ? `#${b.activityId}` : '—'}</p>
            </div>
            <div style={{ textAlign: 'right', fontSize: 13 }}>
              <div>Amount: ${b.amount}</div>
              <div>Booking: {b.bookingStatus}</div>
              <div>Payment: {b.paymentStatus}</div>
            </div>
          </div>
          {isStaff && (
            <div style={{ marginTop: 10 }}>
              <button onClick={() => dispatch(deleteBookingReservation(b.id))} style={{ background: '#e2483d', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6 }}>
                Cancel Booking
              </button>
            </div>
          )}
        </div>
      ))}

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BookingReservationForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default BookingReservationList;