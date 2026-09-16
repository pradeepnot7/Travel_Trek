import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTripItineraries } from '../../store/slices/tripItinerarySlice';
import { fetchBookingReservations } from '../../store/slices/bookingReservationSlice';
import { fetchTravelPackages } from '../../store/slices/travelPackageSlice';
import { fetchSystemAccounts } from '../../store/slices/systemAccountSlice';

const ManagerDashboard = ({
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

  const accounts = useSelector(
    (s) =>
      s.systemAccounts?.items || []
  );

  useEffect(() => {
    dispatch(fetchTripItineraries());
    dispatch(fetchBookingReservations());
    dispatch(fetchTravelPackages());
    dispatch(fetchSystemAccounts());
  }, [dispatch]);

  const pending =
    bookings.filter(
      (item) =>
        item.bookingStatus ===
        'PENDING'
    ).length;

  const activePackages =
    packages.filter(
      (item) => item.active
    ).length;

  const draftTrips =
    itineraries.filter(
      (item) =>
        item.status === 'DRAFT'
    ).length;

  const revenue =
    bookings.reduce(
      (sum, booking) =>
        sum +
        Number(
          booking.amount || 0
        ),
      0
    );

  const firstName =
    account?.fullName
      ?.split(' ')[0] ||
    'Manager';

  return (
    <div className="dashboard-page manager-dashboard">

      <header className="topbar">

        <div className="topbar-search">
          <span>⌕</span>

          <input
            aria-label="Search agency"
            placeholder="Search trips, bookings, packages or accounts..."
          />
        </div>

        <div className="topbar-user">

          <span className="notification-dot" />

          <span className="top-avatar manager-avatar">
            {firstName.charAt(0)}
          </span>

          <div>
            <strong>
              {account?.fullName ||
                'Agency Manager'}
            </strong>

            <small>
              Agency Manager
            </small>
          </div>

        </div>

      </header>

      <div className="page-intro">

        <div>

          <span className="section-kicker">
            AGENCY OPERATIONS
          </span>

          <h1>
            Agency overview
          </h1>

          <p>
            One view across travel operations,
            package inventory, bookings and
            team accounts.
          </p>

        </div>

        <button
          className="primary-action compact"
          onClick={() =>
            setActiveTab(
              'packages'
            )
          }
        >
          Manage packages
          <span>→</span>
        </button>

      </div>

      <section className="metric-grid four">

        <Metric
          label="Trips"
          value={itineraries.length}
          detail="All itineraries"
        />

        <Metric
          label="Bookings"
          value={bookings.length}
          detail={`${pending} pending`}
        />

        <Metric
          label="Live packages"
          value={activePackages}
          detail={`${packages.length} total`}
        />

        <Metric
          label="Revenue"
          value={`$${revenue.toLocaleString()}`}
          detail="Recorded bookings"
        />

      </section>

      <section className="manager-grid">

        <div className="chart-card">

          <div className="section-heading">

            <div>
              <span className="section-kicker">
                BOOKING ACTIVITY
              </span>

              <h2>
                Operational pulse
              </h2>
            </div>

            <span className="chart-period">
              Last 30 days
            </span>

          </div>

          <div className="chart-area">

            <div className="chart-gridlines">
              <i />
              <i />
              <i />
              <i />
            </div>

            <svg
              viewBox="0 0 640 190"
              preserveAspectRatio="none"
              className="line-chart"
              aria-label="Booking activity chart"
            >
              <polyline
                points="
                  0,158
                  55,132
                  110,142
                  165,108
                  220,124
                  275,76
                  330,91
                  385,55
                  440,82
                  495,45
                  550,66
                  640,26
                "
              />
            </svg>

            <div className="chart-labels">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>

          </div>

        </div>

        <div className="attention-card">

          <span className="section-kicker">
            REQUIRES ATTENTION
          </span>

          <h2>
            Keep things moving
          </h2>

          <Attention
            count={pending}
            label="Pending bookings"
            onClick={() =>
              setActiveTab(
                'bookings'
              )
            }
          />

          <Attention
            count={draftTrips}
            label="Draft itineraries"
            onClick={() =>
              setActiveTab(
                'itineraries'
              )
            }
          />

          <Attention
            count={
              packages.filter(
                (item) =>
                  !item.active
              ).length
            }
            label="Inactive packages"
            onClick={() =>
              setActiveTab(
                'packages'
              )
            }
          />

        </div>

      </section>

      <section className="content-section">

        <div className="section-heading">

          <div>
            <span className="section-kicker">
              MANAGEMENT
            </span>

            <h2>
              Agency workspaces
            </h2>
          </div>

        </div>

        <div className="quick-work-grid">

          <QuickWork
            title="Trips"
            count={itineraries.length}
            description="Review and control itineraries."
            onClick={() =>
              setActiveTab(
                'itineraries'
              )
            }
          />

          <QuickWork
            title="Packages"
            count={packages.length}
            description="Publish, update and manage inventory."
            onClick={() =>
              setActiveTab(
                'packages'
              )
            }
          />

          <QuickWork
            title="Bookings"
            count={bookings.length}
            description="Monitor reservations and payments."
            onClick={() =>
              setActiveTab(
                'bookings'
              )
            }
          />

          <QuickWork
            title="System accounts"
            count={accounts.length}
            description="Manage your agency team."
            onClick={() =>
              setActiveTab(
                'accounts'
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

const Attention = ({
  count,
  label,
  onClick,
}) => (
  <button
    className="attention-row"
    onClick={onClick}
  >
    <strong>{count}</strong>
    <span>{label}</span>
    <b>→</b>
  </button>
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

export default ManagerDashboard;