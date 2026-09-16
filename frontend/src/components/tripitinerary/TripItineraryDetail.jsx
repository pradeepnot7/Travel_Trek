import React from 'react';
import { can } from '../../utils/permissions';

const money = (value) => {
  const amount = Number(value || 0);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (value) => {
  if (!value) {
    return 'Date to be confirmed';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const daysBetween = (start, end) => {
  if (!start || !end) {
    return null;
  }

  const a = new Date(start);
  const b = new Date(end);

  if (
    Number.isNaN(a.getTime()) ||
    Number.isNaN(b.getTime())
  ) {
    return null;
  }

  const days =
    Math.round((b - a) / 86400000) + 1;

  return days > 0 ? days : null;
};

const DEFAULT_DAYS = [
  'Arrival and local orientation',
  'Signature sights and neighbourhood walk',
  'Local food and cultural experience',
  'Scenic day outside the city centre',
  'Free time and flexible exploration',
];

const TripItineraryDetail = ({
  itinerary,
  role,
  onBack,
  onEdit,
}) => {
  const duration = daysBetween(
    itinerary.startDate,
    itinerary.endDate
  );

  const image = itinerary.image;

  const highlights =
    itinerary.highlights || [
      'Curated destination highlights',
      'Flexible daily planning',
      'Local experiences and free time',
    ];

  const dayPlan =
    itinerary.dayPlan || DEFAULT_DAYS;

  const progress = Number(
    itinerary.progress || 72
  );

  return (
    <section className="trip-detail-page fade-in">

      {/* TOP BAR */}
      <div className="trip-detail-topbar">

        <button
          type="button"
          className="detail-back"
          onClick={onBack}
        >
          <span aria-hidden="true">
            ←
          </span>

          Back to My Trips
        </button>

        <span className="detail-kicker">
          TRIP OVERVIEW
        </span>

      </div>

      {/* HERO */}
      <div className="trip-detail-hero">

        <div
          className="trip-detail-hero-image"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        >

          <div className="trip-detail-hero-shade" />

          <div className="trip-detail-hero-copy">

            <span
              className={`trip-status trip-status-${String(
                itinerary.status || 'DRAFT'
              ).toLowerCase()}`}
            >
              {itinerary.status || 'DRAFT'}
            </span>

            <h1>
              {itinerary.title}
            </h1>

            <p>
              {itinerary.destination}
            </p>

          </div>

        </div>

        {/* SUMMARY */}
        <div className="trip-detail-summary">

          <div className="detail-summary-item">
            <span>DATES</span>

            <strong>
              {formatDate(
                itinerary.startDate
              )}{' '}
              –{' '}
              {formatDate(
                itinerary.endDate
              )}
            </strong>
          </div>

          <div className="detail-summary-item">
            <span>DURATION</span>

            <strong>
              {duration
                ? `${duration} days`
                : 'Flexible'}
            </strong>
          </div>

          <div className="detail-summary-item">
            <span>EST. BUDGET</span>

            <strong>
              {money(
                itinerary.budgetAllocationLimit
              )}
            </strong>
          </div>

          <div className="detail-summary-item">
            <span>PLANNING</span>

            <strong>
              {progress}% complete
            </strong>
          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="trip-detail-layout">

        <main className="trip-detail-main">

          {/* EXPERIENCE */}
          <section className="detail-panel">

            <div className="detail-panel-heading">

              <div>
                <span className="detail-section-label">
                  THE EXPERIENCE
                </span>

                <h2>
                  What this trip is about
                </h2>
              </div>

              <span className="detail-panel-index">
                01
              </span>

            </div>

            <p className="detail-description">
              {itinerary.description ||
                `A carefully paced ${
                  itinerary.destination ||
                  'destination'
                } journey designed around memorable places, practical travel time and enough room to explore at your own pace.`}
            </p>

            <div className="highlight-grid">

              {highlights.map((item) => (
                <div
                  className="highlight-item"
                  key={item}
                >
                  <span className="highlight-dot" />

                  <span>{item}</span>
                </div>
              ))}

            </div>

          </section>

          {/* DAY PLAN */}
          <section className="detail-panel">

            <div className="detail-panel-heading">

              <div>
                <span className="detail-section-label">
                  YOUR ROUTE
                </span>

                <h2>
                  Day-by-day plan
                </h2>
              </div>

              <span className="detail-panel-index">
                02
              </span>

            </div>

            <div className="day-plan">

              {dayPlan.map(
                (item, index) => (
                  <div
                    className="day-row"
                    key={`${item}-${index}`}
                  >

                    <div className="day-number">
                      {String(
                        index + 1
                      ).padStart(2, '0')}
                    </div>

                    <div className="day-line" />

                    <div className="day-content">

                      <span>
                        DAY {index + 1}
                      </span>

                      <strong>
                        {item}
                      </strong>

                      <p>
                        {index === 0
                          ? 'Arrival, check-in and a relaxed first look around.'
                          : 'Keep the pace comfortable with planned highlights and personal time.'}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

          </section>

        </main>

        {/* SIDEBAR */}
        <aside className="trip-detail-aside">

          {/* BUDGET */}
          <section className="detail-side-card budget-card">

            <span className="detail-section-label">
              BUDGET SNAPSHOT
            </span>

            <strong>
              {money(
                itinerary.budgetAllocationLimit
              )}
            </strong>

            <p>
              Planned allocation
            </p>

            <div className="budget-track">
              <span
                style={{
                  width: `${Math.min(
                    100,
                    progress
                  )}%`,
                }}
              />
            </div>

            <div className="budget-row">

              <span>
                Planning progress
              </span>

              <b>
                {progress}%
              </b>

            </div>

          </section>

          {/* DETAILS */}
          <section className="detail-side-card">

            <span className="detail-section-label">
              TRIP DETAILS
            </span>

            <div className="side-detail-list">

              <div>
                <span>
                  Destination
                </span>

                <strong>
                  {itinerary.destination}
                </strong>
              </div>

              <div>
                <span>
                  Start
                </span>

                <strong>
                  {formatDate(
                    itinerary.startDate
                  )}
                </strong>
              </div>

              <div>
                <span>
                  End
                </span>

                <strong>
                  {formatDate(
                    itinerary.endDate
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Status
                </span>

                <strong>
                  {itinerary.status ||
                    'DRAFT'}
                </strong>
              </div>

            </div>

          </section>

          {/* ACTION */}
          <section className="detail-side-card detail-actions-card">

            <span className="detail-section-label">
              NEXT STEP
            </span>

            <p>
              Keep your itinerary up to date
              as your plans change.
            </p>

            {can(
              role,
              'EDIT_ITINERARY'
            ) &&
              onEdit && (
                <button
                  type="button"
                  className="detail-primary-action"
                  onClick={onEdit}
                >
                  Edit trip

                  <span aria-hidden="true">
                    →
                  </span>
                </button>
              )}

            {!can(
              role,
              'EDIT_ITINERARY'
            ) && (
              <div className="view-only-note">
                This trip is currently
                view-only for your role.
              </div>
            )}

          </section>

        </aside>

      </div>

    </section>
  );
};

export default TripItineraryDetail;