import React from 'react';

const EmptyState = ({ message = 'No records found.' }) => (
  <div style={{ padding: '32px', textAlign: 'center', color: '#8a8f9c' }}>
    <p>{message}</p>
  </div>
);

export default EmptyState;