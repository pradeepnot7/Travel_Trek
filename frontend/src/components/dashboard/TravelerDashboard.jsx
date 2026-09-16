import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTripItineraries } from '../../store/slices/tripItinerarySlice';
import { fetchBookingReservations } from '../../store/slices/bookingReservationSlice';
import { fetchTravelPackages } from '../../store/slices/travelPackageSlice';

const PHOTOS = [
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1000&q=80',
];

const TravelerDashboard = ({
  setActiveTab,
}) => {
  const dispatch = useDispatch();

  const account = useSelector(
    (s) => s.auth.account
  );

  const itineraries = useSelector(
    (s) =>
      s.tripItineraries?.items || []
  );

  const bookings = useSelector(
    (s) =>
      s.bookingReservations?.items || []
  );

  const packages = useSelector(
    (s) =>
      s.travelPackages?.items || []
  );

  useEffect(() => {
    dispatch(fetchTripItineraries());
    dispatch(fetchBookingReservations());
    dispatch(fetchTravelPackages());
  }, [dispatch]);

  const upcoming =
    itineraries.filter(
      (item) =>
        item.status === 'CONFIRMED' ||
        item.status === 'ACTIVE'
    );

  const next =
    upcoming[0] ||
    itineraries[0];

  const firstName =
    account?.fullName
      ?.split(' ')[0] ||
    'Traveler';

  return (
    <div className="dashboard-page traveler-dashboard">

      <header className="topbar">

        <div className="topbar-search">
          <span>⌕</span>

          <input
            aria-label="Search travel"
            placeholder="Search trips, destinations or dates..."
          />
        </div>

        <div className="topbar-user">

          <span className="notification-dot" />

          <span className="top-avatar">
            {firstName.charAt(0)}
          </span>

          <div>
            <strong>
              {account?.fullName ||
                'Traveler'}
            </strong>

            <small>
              Traveler
            </small>
          </div>

        </div>

      </header>

      <div className="page-intro">

        <div>

          <span className="section-kicker">
            TRAVEL PLANNER
          </span>

          <h1>
            Hello {firstName}
          </h1>

          <p>
            Your travel at a glance.
            Keep every journey organised
            from the first idea to the final day.
          </p>

        </div>

        <button
          className="primary-action compact"
          onClick={() =>
            setActiveTab('packages')
          }
        >
          Explore packages
          <span>→</span>
        </button>

      </div>

      <section className="next-trip-card">

        <div
          className="next-trip-photo"
          style={{
            backgroundImage:
              `url('${PHOTOS[0]}')`,
          }}
        />

        <div className="next-trip-content">

          <span className="section-kicker">
            NEXT JOURNEY
          </span>

          {next ? (
            <>
              <h2>
                {next.title}
              </h2>

              <p className="destination-line">
                {next.destination}
              </p>

              <div className="trip-meta">

                <span>
                  {next.startDate ||
                    'Date not set'}
                  {' → '}
                  {next.endDate ||
                    'Date not set'}
                </span>

                <span>
                  {duration(
                    next.startDate,
                    next.endDate
                  )}{' '}
                  days
                </span>

                <span>
                  $
                  {Number(
                    next.budgetAllocationLimit ||
                      0
                  ).toLocaleString()}
                  {' '}budget
                </span>

              </div>

              <div className="trip-actions">

                <button
                  className="light-action"
                  onClick={() =>
                    setActiveTab(
                      'itineraries'
                    )
                  }
                >
                  View trip
                </button>

                <button
                  className="text-link"
                  onClick={() =>
                    setActiveTab(
                      'bookings'
                    )
                  }
                >
                  View bookings →
                </button>

              </div>
            </>
          ) : (
            <>
              <h2>
                No journey planned yet
              </h2>

              <p className="destination-line">
                Start with a curated package
                or create your first itinerary.
              </p>

              <button
                className="light-action"
                onClick={() =>
                  setActiveTab(
                    'packages'
                  )
                }
              >
                Explore destinations
              </button>
            </>
          )}

        </div>

      </section>

      <div className="section-heading">

        <div>
          <span className="section-kicker">
            YOUR TRAVEL
          </span>

          <h2>
            Everything in one place
          </h2>
        </div>

      </div>

      <section className="metric-grid three">

        <Metric
          label="Trips"
          value={itineraries.length}
          detail="All your journeys"
        />

        <Metric
          label="Upcoming"
          value={upcoming.length}
          detail="Confirmed or active"
        />

        <Metric
          label="Bookings"
          value={bookings.length}
          detail="Reservations"
        />

      </section>

      <section className="content-section">

        <div className="section-heading">

          <div>
            <span className="section-kicker">
              RECENT TRIPS
            </span>

            <h2>
              Your journeys
            </h2>
          </div>

          <button
            className="text-link"
            onClick={() =>
              setActiveTab(
                'itineraries'
              )
            }
          >
            View all →
          </button>

        </div>

        <div className="dashboard-trip-grid">

          {itineraries
            .slice(0, 3)
            .map(
              (trip, index) => (
                <TripPreview
                  key={trip.id}
                  trip={trip}
                  image={
                    PHOTOS[
                      index %
                        PHOTOS.length
                    ]
                  }
                  onOpen={() =>
                    setActiveTab(
                      'itineraries'
                    )
                  }
                />
              )
            )}

          {!itineraries.length && (
            <div className="empty-panel">

              <strong>
                Your next story starts here.
              </strong>

              <span>
                Create an itinerary or
                explore a package.
              </span>

              <button
                className="light-action"
                onClick={() =>
                  setActiveTab(
                    'packages'
                  )
                }
              >
                Explore packages
              </button>

            </div>
          )}

        </div>

      </section>

      <section className="content-section compact-section">

        <div className="section-heading">

          <div>
            <span className="section-kicker">
              CURATED FOR YOU
            </span>

            <h2>
              Popular packages
            </h2>
          </div>

          <button
            className="text-link"
            onClick={() =>
              setActiveTab(
                'packages'
              )
            }
          >
            Browse all →
          </button>

        </div>

        <div className="mini-package-grid">

          {packages
            .slice(0, 3)
            .map(
              (pkg, index) => (
                <div
                  className="mini-package"
                  key={pkg.id}
                >

                  <div
                    className="mini-package-photo"
                    style={{
                      backgroundImage:
                        `url('${PHOTOS[index % PHOTOS.length]}')`,
                    }}
                  />

                  <div>
                    <strong>
                      {pkg.packageName}
                    </strong>

                    <span>
                      {pkg.destination}
                    </span>

                    <b>
                      ${pkg.price}
                    </b>
                  </div>

                </div>
              )
            )}

        </div>

      </section>

    </div>
  );
};

const duration = (
  start,
  end
) => {
  if (!start || !end) {
    return '—';
  }

  const days =
    Math.round(
      (new Date(end) -
        new Date(start)) /
        86400000
    ) + 1;

  return Number.isFinite(days) &&
    days > 0
    ? days
    : '—';
};

const Metric = ({
  label,
  value,
  detail,
}) => (
  <div className="metric-card">
    <span>{label}</span>
    <strong>{value}</strong>
    <small>{detail}</small>
  </div>
);

const TripPreview = ({
  trip,
  image,
  onOpen,
}) => (
  <article className="dashboard-trip-card">

    <div
      className="dashboard-trip-image"
      style={{
        backgroundImage:
          `url('${image}')`,
      }}
    >

      <span
        className={`status-chip ${String(
          trip.status || ''
        ).toLowerCase()}`}
      >
        {trip.status ||
          'DRAFT'}
      </span>

    </div>

    <div className="dashboard-trip-body">

      <span>
        {trip.destination}
      </span>

      <h3>
        {trip.title}
      </h3>

      <div className="trip-card-meta">

        <span>
          {trip.startDate || '—'}
        </span>

        <span>
          {duration(
            trip.startDate,
            trip.endDate
          )}{' '}
          days
        </span>

        <span>
          $
          {Number(
            trip.budgetAllocationLimit ||
              0
          ).toLocaleString()}
        </span>

      </div>

      <button
        className="card-link"
        onClick={onOpen}
      >
        View trip
        <span>→</span>
      </button>

    </div>

  </article>
);

export default TravelerDashboard;