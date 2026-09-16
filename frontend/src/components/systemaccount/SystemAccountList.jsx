import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSystemAccounts, deleteSystemAccount } from '../../store/slices/systemAccountSlice';
import SystemAccountForm from './SystemAccountForm';
import EmptyState from '../common/EmptyState';

const SystemAccountList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.systemAccounts);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchSystemAccounts());
  }, []);

  const filtered = (items || []).filter((a) => {
    const q = search.toLowerCase();
    return !q || a.identityName?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q);
  });

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>System Accounts Directory</h2>
        <button onClick={() => setShowForm(true)} style={{ background: '#2d6cdf', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6 }}>
          + Add Account
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <input
          placeholder="Search by resolver identity name or email address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: 10, border: '1px solid #d7dbe3', borderRadius: 6 }}
        />
        <button onClick={() => setSearch('')} style={{ padding: '8px 16px', border: '1px solid #d7dbe3', borderRadius: 6, background: '#fff' }}>
          Clear Filters
        </button>
      </div>

      {loading && <p>Loading accounts...</p>}
      {!loading && filtered.length === 0 && <EmptyState message="No system accounts found." />}

      {filtered.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #e5e8ee' }}>
              <th style={{ padding: 10 }}>Account ID</th>
              <th style={{ padding: 10 }}>Identity Name</th>
              <th style={{ padding: 10 }}>Email Address</th>
              <th style={{ padding: 10 }}>Domain Role</th>
              <th style={{ padding: 10 }}>Status</th>
              <th style={{ padding: 10 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} style={{ borderBottom: '1px solid #f0f1f4' }}>
                <td style={{ padding: 10 }}>{a.id}</td>
                <td style={{ padding: 10 }}>{a.identityName}</td>
                <td style={{ padding: 10 }}>{a.email}</td>
                <td style={{ padding: 10 }}>{a.domainRole}</td>
                <td style={{ padding: 10 }}>{a.status || 'ACTIVE'}</td>
                <td style={{ padding: 10 }}>
                  <button
                    onClick={() => dispatch(deleteSystemAccount(a.id))}
                    style={{ background: '#e2483d', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6 }}
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SystemAccountForm onClose={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default SystemAccountList;