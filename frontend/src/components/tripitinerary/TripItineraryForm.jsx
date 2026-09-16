import React, {
  useEffect,
  useState,
} from 'react';

import { useDispatch } from 'react-redux';

import {
  createTripItinerary,
  updateTripItinerary,
} from '../../store/slices/tripItinerarySlice';

const TripItineraryForm = ({
  onClose,
  itinerary = null,
}) => {
  const dispatch = useDispatch();

  const editing = Boolean(
    itinerary?.id &&
      !String(itinerary.id).startsWith('demo-')
  );

  const [title, setTitle] = useState('');
  const [destination, setDestination] =
    useState('');

  const [startDate, setStartDate] =
    useState('');

  const [endDate, setEndDate] =
    useState('');

  const [
    budgetAllocationLimit,
    setBudgetAllocationLimit,
  ] = useState('');

  const [error, setError] =
    useState(null);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (!itinerary) {
      setTitle('');
      setDestination('');
      setStartDate('');
      setEndDate('');
      setBudgetAllocationLimit('');
      return;
    }

    setTitle(itinerary.title || '');

    setDestination(
      itinerary.destination || ''
    );

    setStartDate(
      itinerary.startDate || ''
    );

    setEndDate(
      itinerary.endDate || ''
    );

    setBudgetAllocationLimit(
      itinerary.budgetAllocationLimit ?? ''
    );
  }, [itinerary]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError(null);

    if (
      !title.trim() ||
      !destination.trim() ||
      !startDate ||
      !endDate
    ) {
      setError(
        'Title, destination and dates are required.'
      );

      return;
    }

    if (
      new Date(endDate) <
      new Date(startDate)
    ) {
      setError(
        'End date must be on or after the start date.'
      );

      return;
    }

    const payload = {
      title: title.trim(),

      destination:
        destination.trim(),

      startDate,

      endDate,

      budgetAllocationLimit:
        Number(
          budgetAllocationLimit
        ) || 0,

      status:
        itinerary?.status ||
        'DRAFT',
    };

    try {
      setSaving(true);

      if (editing) {
        await dispatch(
          updateTripItinerary({
            id: itinerary.id,
            payload,
          })
        ).unwrap();
      } else {
        await dispatch(
          createTripItinerary(
            payload
          )
        ).unwrap();
      }

      if (onClose) {
        onClose();
      }
    } catch (err) {
      setError(
        typeof err === 'string'
          ? err
          : 'Could not save the itinerary.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="trip-form-card">

      <div className="trip-form-header">

        <div>

          <span className="detail-section-label">
            {editing
              ? 'UPDATE JOURNEY'
              : 'NEW JOURNEY'}
          </span>

          <h2>
            {editing
              ? 'Edit trip'
              : 'Create a trip'}
          </h2>

          <p>
            Keep the essentials clear now.
            You can refine the itinerary later.
          </p>

        </div>

        <button
          type="button"
          className="trip-form-close"
          onClick={onClose}
          aria-label="Close form"
        >
          ×
        </button>

      </div>

      <form
        onSubmit={handleSubmit}
        className="trip-form"
      >

        <div className="trip-form-field full">

          <label>
            Itinerary title{' '}
            <span>*</span>
          </label>

          <input
            className="input"
            placeholder="e.g. Kyoto Serene Gardens Exploration Route"
            value={title}
            onChange={(event) =>
              setTitle(
                event.target.value
              )
            }
          />

        </div>

        <div className="trip-form-field full">

          <label>
            Destination target{' '}
            <span>*</span>
          </label>

          <input
            className="input"
            placeholder="e.g. Kyoto, Japan"
            value={destination}
            onChange={(event) =>
              setDestination(
                event.target.value
              )
            }
          />

        </div>

        <div className="trip-form-field">

          <label>
            Start date{' '}
            <span>*</span>
          </label>

          <input
            className="input"
            type="date"
            value={startDate}
            onChange={(event) =>
              setStartDate(
                event.target.value
              )
            }
          />

        </div>

        <div className="trip-form-field">

          <label>
            End date{' '}
            <span>*</span>
          </label>

          <input
            className="input"
            type="date"
            value={endDate}
            onChange={(event) =>
              setEndDate(
                event.target.value
              )
            }
          />

        </div>

        <div className="trip-form-field full">

          <label>
            Budget allocation limit
          </label>

          <div className="trip-money-input">

            <span>₹</span>

            <input
              className="input"
              type="number"
              min="0"
              placeholder="e.g. 2500"
              value={
                budgetAllocationLimit
              }
              onChange={(event) =>
                setBudgetAllocationLimit(
                  event.target.value
                )
              }
            />

          </div>

        </div>

        {error && (
          <div
            className="trip-form-error"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="trip-form-actions">

          <button
            type="button"
            className="btn btn-outline"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving
              ? 'Saving…'
              : editing
              ? 'Save changes'
              : 'Create trip'}
          </button>

        </div>

      </form>

    </div>
  );
};

export default TripItineraryForm;