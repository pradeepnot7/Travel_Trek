import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSystemAccount } from '../../store/slices/systemAccountSlice';

const SystemAccountForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [identityName, setIdentityName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [domainRole, setDomainRole] = useState('TRAVELER');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identityName || !email || !password) {
      setError('Identity name, email and password are required.');
      return;
    }
    try {
      await dispatch(createSystemAccount({ identityName, email, password, domainRole, status: 'ACTIVE' })).unwrap();
      if (onClose) onClose();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Could not save the account.');
    }
  };

  return (
    <div style={{ background: '#fff', padding: 28, borderRadius: 10, width: 400, maxWidth: '90vw' }}>
      <h3>Add System Account</h3>
      <form onSubmit={handleSubmit}>
        <label>Identity Name *</label>
        <input placeholder="e.g. Senior Package Curation Specialist" value={identityName} onChange={(e) => setIdentityName(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />

        <label>Email Address *</label>
        <input type="email" placeholder="agent@traveltrek.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />

        <label>Account Password *</label>
        <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }} />

        <label>Domain Role</label>
        <select value={domainRole} onChange={(e) => setDomainRole(e.target.value)} style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }}>
          <option value="TRAVELER">TRAVELER</option>
          <option value="TOUR_AGENT">TOUR_AGENT</option>
          <option value="AGENCY_MANAGER">AGENCY_MANAGER</option>
        </select>

        {error && <p style={{ color: '#c0392b', fontSize: 13 }}>{error}</p>}

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="submit" style={{ flex: 1, background: '#2d6cdf', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600 }}>
            Save Account
          </button>
          <button type="button" onClick={onClose} style={{ flex: 1, background: '#eef0f4', color: '#333', border: 'none', padding: 12, borderRadius: 6 }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SystemAccountForm;