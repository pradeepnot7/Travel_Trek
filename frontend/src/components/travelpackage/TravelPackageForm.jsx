import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTravelPackage, updateTravelPackage } from '../../store/slices/travelPackageSlice';

const TravelPackageForm = ({ onClose, initialData }) => {
  const dispatch = useDispatch();
  const isEditing = !!initialData;

  const [packageName, setPackageName] = useState(initialData?.packageName || '');
  const [destination, setDestination] = useState(initialData?.destination || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [active, setActive] = useState(initialData?.active !== undefined ? initialData.active : true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!packageName || !destination || !price) {
      setError('Package name, destination and price are required.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const payload = { packageName, destination, price: Number(price), description, active };
    try {
      if (isEditing) {
        await dispatch(updateTravelPackage({ id: initialData.id, payload })).unwrap();
      } else {
        await dispatch(createTravelPackage(payload)).unwrap();
      }
      if (onClose) onClose();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Could not save the travel package.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#fff', padding: 28, borderRadius: 10, width: 420, maxWidth: '90vw' }}>
      <h3>{isEditing ? 'Update Travel Package' : 'Publish Pre-curated Travel Package'}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pkg-name">Package Name *</label>
        <input
          id="pkg-name"
          placeholder="e.g. Premium Rhine Valley Explorer"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }}
        />

        <label htmlFor="pkg-destination">Destination *</label>
        <input
          id="pkg-destination"
          placeholder="e.g. Rhine Valley, Germany"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }}
        />

        <label htmlFor="pkg-price">Base Price (USD) *</label>
        <input
          id="pkg-price"
          type="number"
          placeholder="e.g. 1800"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }}
        />

        <label htmlFor="pkg-description">Description</label>
        <textarea
          id="pkg-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: 10, margin: '6px 0 14px', border: '1px solid #d7dbe3', borderRadius: 6 }}
        />

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          Instantly Make Package Active
        </label>

        {error && <p style={{ color: '#c0392b', fontSize: 13 }}>{error}</p>}

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            type="submit"
            disabled={submitting}
            style={{ flex: 1, background: '#2d6cdf', color: '#fff', border: 'none', padding: 12, borderRadius: 6, fontWeight: 600 }}
          >
            Store Curation Package Setup
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{ flex: 1, background: '#eef0f4', color: '#333', border: 'none', padding: 12, borderRadius: 6 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelPackageForm;