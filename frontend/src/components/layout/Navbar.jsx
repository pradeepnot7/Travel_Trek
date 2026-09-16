import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const TABS = [
  { key: 'home', label: 'Home' },
  { key: 'itineraries', label: 'Trip Itineraries' },
  { key: 'activities', label: 'Planned Activities' },
  { key: 'packages', label: 'Travel Packages' },
  { key: 'bookings', label: 'Booking Reservations' },
  { key: 'accounts', label: 'System Accounts', roles: ['AGENCY_MANAGER'] },
];

const Navbar = ({ activeTab, setActiveTab }) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.auth.account);
  const role = account?.role;

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#1c1f2b',
        color: '#fff',
        padding: '12px 20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <strong>TravelTrek</strong>
        {TABS.filter((t) => !t.roles || t.roles.includes(role)).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab && setActiveTab(tab.key)}
            style={{
              background: activeTab === tab.key ? '#2d6cdf' : 'transparent',
              color: '#fff',
              border: 'none',
              padding: '6px 10px',
              borderRadius: 6,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span>Welcome back {account?.fullName || 'agent'}</span>
        <button
          onClick={() => dispatch(logout())}
          style={{ background: '#e2483d', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: 6 }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;