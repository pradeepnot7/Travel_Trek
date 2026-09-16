import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTripItineraries } from '../../store/slices/tripItinerarySlice';
import { fetchPlannedActivities } from '../../store/slices/plannedActivitySlice';
import { fetchBookingReservations } from '../../store/slices/bookingReservationSlice';
import { fetchTravelPackages } from '../../store/slices/travelPackageSlice';

const AgentDashboard = ({
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

  const activities = useSelector(
    (s) =>
      s.plannedActivities?.items || []
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
    dispatch(fetchPlannedActivities());
    dispatch(fetchBookingReservations());
    dispatch(fetchTravelPackages());
  }, [dispatch]);

  const drafts =
    itineraries.filter(
      (item) =>
        item.status === 'DRAFT'
    );

  const confirmed =
    itineraries.filter(
      (item) =>
        item.status === 'CONFIRMED' ||
        item.status === 'ACTIVE'
    );

  const pending =
    bookings.filter(
      (item) =>
        item.bookingStatus ===
        'PENDING'
    );

  const firstName =
    account?.fullName
      ?.split(' ')[0] ||
    'Agent';

  return (
    <div className="dashboard-page agent-dashboard">

      <header className="topbar">

        <div className="topbar-search">
          <span>⌕</span>

          <input
            aria-label="Search workspace"
            placeholder="Search itineraries, destinations or travelers..."
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
                'Tour Agent'}
            </strong>

            <small>
              Tour Agent
            </small>
          </div>

        </div>

      </header>

      <div className="page-intro">

        <div>

          <span className="section-kicker">
            AGENT WORKSPACE
          </span>

          <h1>
            Hello {firstName}
          </h1>

          <p>
            Build stronger journeys,
            coordinate activities and keep
            every itinerary moving.
          </p>

        </div>

        <div className="intro-actions">

          <button
            className="secondary-action"
            onClick={() =>
              setActiveTab(
                'itineraries'
              )
            }
          >
            Open itineraries
          </button>

          <button
            className="primary-action compact"
            onClick={() =>
              setActiveTab(
                'itineraries'
              )
            }
          >
            New itinerary
            <span>+</span>
          </button>

        </div>

      </div>

      <section className="metric-grid three">

        <Metric
          label="Itineraries"
          value={itineraries.length}
          detail="Across your workspace"
        />

        <Metric
          label="Drafts"
          value={drafts.length}
          detail="Need attention"
        />

        <Metric
          label="Confirmed"
          value={confirmed.length}
          detail="Ready to travel"
        />

      </section>

      <section className="agent-focus-grid">

        <div className="focus-card">

          <div className="section-heading">

            <div>
              <span className="section-kicker">
                NEEDS ATTENTION
              </span>

              <h2>
                Planning queue
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

          {drafts
            .slice(0, 4)
            .map((item) => (
              <div
                className="queue-row"
                key={item.id}
              >

                <div className="queue-avatar">
                  {(item.destination ||
                    'T').charAt(0)}
                </div>

                <div>
                  <strong>
                    {item.title}
                  </strong>

                  <span>
                    {item.destination}
                    {' · '}
                    Draft itinerary
                  </span>
                </div>

                <button
                  className="row-action"
                  onClick={() =>
                    setActiveTab(
                      'itineraries'
                    )
                  }
                >
                  Continue
                </button>

              </div>
            ))}

          {!drafts.length && (
            <div className="empty-inline">
              No draft itineraries are
              waiting for review.
            </div>
          )}

        </div>

        <div className="focus-card dark-focus">

          <span className="section-kicker">
            TODAY
          </span>

          <h2>
            Operations snapshot
          </h2>

          <div className="focus-number">
            {pending.length}
          </div>

          <p>
            pending booking
            {pending.length === 1
              ? ''
              : 's'} need attention.
          </p>

          <button
            className="light-action"
            onClick={() =>
              setActiveTab(
                'bookings'
              )
            }
          >
            Review bookings
          </button>

        </div>

      </section>

      <section className="content-section">

        <div className="section-heading">

          <div>
            <span className="section-kicker">
              WORKSPACE
            </span>

            <h2>
              What are you working on?
            </h2>
          </div>

        </div>

        <div className="quick-work-grid">

          <QuickWork
            title="Trip itineraries"
            count={itineraries.length}
            description="Build and confirm journeys."
            onClick={() =>
              setActiveTab(
                'itineraries'
              )
            }
          />

          <QuickWork
            title="Planned activities"
            count={activities.length}
            description="Shape the day-by-day experience."
            onClick={() =>
              setActiveTab(
                'activities'
              )
            }
          />

          <QuickWork
            title="Bookings"
            count={bookings.length}
            description="Coordinate traveler reservations."
            onClick={() =>
              setActiveTab(
                'bookings'
              )
            }
          />

          <QuickWork
            title="Packages"
            count={packages.length}
            description="Review available packages."
            onClick={() =>
              setActiveTab(
                'packages'
              )
            }
          />

        </div>

      </section>

    </div>
  );
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

const QuickWork = ({
  title,
  count,
  description,
  onClick,
}) => (
  <button
    className="quick-work"
    onClick={onClick}
  >

    <div>
      <span>{title}</span>
      <strong>{count}</strong>
    </div>

    <p>
      {description}
    </p>

    <b>
      Open workspace →
    </b>

  </button>
);

export default AgentDashboard;