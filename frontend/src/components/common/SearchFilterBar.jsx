import React from 'react';

const SearchFilterBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  filterValue,
  onFilterChange,
  filterOptions,
  filterLabel,
}) => (
  <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ flex: 1, minWidth: 220, padding: '8px 12px', border: '1px solid #d7dbe3', borderRadius: 6 }}
    />
    {filterOptions && (
      <select
        aria-label={filterLabel || 'Filter'}
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
        style={{ padding: '8px 12px', border: '1px solid #d7dbe3', borderRadius: 6 }}
      >
        {filterOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )}
  </div>
);

export default SearchFilterBar;