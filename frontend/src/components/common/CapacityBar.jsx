import React from 'react';

const CapacityBar = ({ used = 0, total = 0 }) => {
  const pct = total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;
  return (
    <div style={{ width: '100%' }}>
      <div style={{ background: '#e5e8ee', borderRadius: 6, height: 8, overflow: 'hidden' }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: pct > 85 ? '#e2483d' : '#3d7bf5',
          }}
        />
      </div>
      <span style={{ fontSize: 12, color: '#666' }}>
        {used}/{total} ({pct}%)
      </span>
    </div>
  );
};

export default CapacityBar;