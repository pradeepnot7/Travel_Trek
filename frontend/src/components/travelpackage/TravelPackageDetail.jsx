import React from 'react';
import { can } from '../../utils/permissions';

const PACKAGE_IMAGES = {
  'Swiss Alps':
    'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&q=85',

  'Amalfi':
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',

  'Italy':
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85',

  'Kyoto':
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85',

  'Goa':
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85',

  'Bali':
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85',

  'Maldives':
    'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85',
};

const getPackageImage = (destination = '') => {
  const key = Object.keys(PACKAGE_IMAGES).find((item) =>
    destination.toLowerCase().includes(item.toLowerCase())
  );

  return (
    PACKAGE_IMAGES[key] ||
    'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85'
  );
};

const getPackageDescription = (pkg) => {
  const destination =
    pkg.destination || 'this destination';

  return (
    pkg.description ||
    `A carefully curated journey through ${destination}, designed to combine memorable places, comfortable travel and a well-organised experience. Explore the destination at your own pace while keeping your itinerary and budget in one place.`
  );
};

const getHighlights = (pkg) => {
  const destination =
    (pkg.destination || '').toLowerCase();

  if (destination.includes('swiss')) {
    return [
      ['Scenic railways', 'Mountain routes and panoramic railway journeys'],
      ['Alpine lakes', 'Peaceful lakes surrounded by dramatic peaks'],
      ['Mountain villages', 'Traditional Swiss towns and local experiences'],
      ['Summit views', 'High-altitude viewpoints and walking routes'],
    ];
  }

  if (
    destination.includes('italy') ||
    destination.includes('amalfi')
  ) {
    return [
      ['Coastal villages', 'Cliffside towns overlooking the Mediterranean'],
      ['Local cuisine', 'Regional food and authentic Italian flavours'],
      ['Sea views', 'Scenic coastal roads and viewpoints'],
      ['Historic streets', 'Architecture, piazzas and local culture'],
    ];
  }

  if (destination.includes('kyoto')) {
    return [
      ['Historic temples', 'Explore Kyoto’s traditional temple districts'],
      ['Garden walks', 'Quiet Japanese gardens and seasonal scenery'],
      ['Local culture', 'Tea houses, markets and traditional streets'],
      ['Fushimi Inari', 'Walk beneath the famous torii gates'],
    ];
  }

  return [
    ['Curated route', 'A planned route covering key experiences'],
    ['Local experiences', 'Discover places beyond the usual tourist stops'],
    ['Flexible pace', 'Enough room for independent exploration'],
    ['Travel support', 'Keep the important trip information together'],
  ];
};

const formatPrice = (value) => {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return 'Price on request';
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return value;
  }

  return `$${number.toLocaleString()}`;
};

const TravelPackageDetail = ({
  pkg,
  role,
  onClose,
  onApply,
  applying,
  onEdit,
}) => {
  if (!pkg) {
    return null;
  }

  const total =
    Number(pkg.totalCapacity) || 0;

  const reserved =
    Number(pkg.reservedCapacity) || 0;

  const available =
    Math.max(total - reserved, 0);

  const percentage =
    total > 0
      ? Math.min(
          Math.round(
            (reserved / total) * 100
          ),
          100
        )
      : 0;

  const active =
    pkg.active !== false;

  const highlights =
    getHighlights(pkg);

  return (
    <div
      className="package-detail-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Travel package details"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="package-detail">

        {/* HEADER */}

        <div className="package-detail-header">

          <button
            type="button"
            className="package-back-button"
            onClick={onClose}
          >
            ←
            <span>Back to packages</span>
          </button>

          <button
            type="button"
            className="package-close-button"
            onClick={onClose}
            aria-label="Close package details"
          >
            ×
          </button>

        </div>


        {/* HERO */}

        <div className="package-detail-hero">

          <img
            src={getPackageImage(
              pkg.destination
            )}
            alt={pkg.destination}
          />

          <div className="package-detail-hero-overlay" />

          <div className="package-detail-hero-content">

            <span
              className={`package-detail-status ${
                active
                  ? 'active'
                  : 'inactive'
              }`}
            >
              {active
                ? 'AVAILABLE'
                : 'CURRENTLY INACTIVE'}
            </span>

            <h1>
              {pkg.packageName}
            </h1>

            <p>
              {pkg.destination}
            </p>

          </div>

        </div>


        {/* BODY */}

        <div className="package-detail-body">

          {/* MAIN */}

          <div className="package-detail-main">

            <section className="package-section">

              <span className="package-section-label">
                ABOUT THIS JOURNEY
              </span>

              <h2>
                A thoughtfully curated
                travel experience.
              </h2>

              <p className="package-description">
                {getPackageDescription(pkg)}
              </p>

            </section>


            {/* HIGHLIGHTS */}

            <section className="package-section">

              <span className="package-section-label">
                EXPERIENCE HIGHLIGHTS
              </span>

              <div className="package-highlights">

                {highlights.map(
                  ([title, description]) => (
                    <div
                      className="package-highlight"
                      key={title}
                    >

                      <span className="highlight-number">
                        {String(
                          highlights.indexOf(
                            [
                              title,
                              description,
                            ]
                          ) + 1
                        ).padStart(2, '0')}
                      </span>

                      <div>
                        <strong>
                          {title}
                        </strong>

                        <p>
                          {description}
                        </p>
                      </div>

                    </div>
                  )
                )}

              </div>

            </section>


            {/* WHAT'S INCLUDED */}

            <section className="package-section">

              <span className="package-section-label">
                PACKAGE SNAPSHOT
              </span>

              <div className="package-snapshot">

                <div>
                  <span>Destination</span>
                  <strong>
                    {pkg.destination ||
                      'Not specified'}
                  </strong>
                </div>

                <div>
                  <span>Availability</span>
                  <strong>
                    {active
                      ? 'Open for booking'
                      : 'Not currently bookable'}
                  </strong>
                </div>

                <div>
                  <span>Package status</span>
                  <strong>
                    {active
                      ? 'Active'
                      : 'Inactive'}
                  </strong>
                </div>

                <div>
                  <span>Package reference</span>
                  <strong>
                    #{pkg.id}
                  </strong>
                </div>

              </div>

            </section>

          </div>


          {/* SIDEBAR */}

          <aside className="package-detail-sidebar">

            <div className="package-booking-card">

              <div className="package-price-label">
                STARTING FROM
              </div>

              <div className="package-detail-price">
                {formatPrice(pkg.price)}
              </div>

              <div className="package-price-note">
                per package
              </div>


              {/* CAPACITY */}

              {total > 0 && (
                <div className="package-capacity-section">

                  <div className="package-capacity-heading">

                    <span>
                      Availability
                    </span>

                    <strong>
                      {available} remaining
                    </strong>

                  </div>

                  <div className="package-capacity-track">

                    <div
                      className="package-capacity-fill"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                  <div className="package-capacity-meta">
                    {reserved} reserved of {total} places
                  </div>

                </div>
              )}


              {/* TRAVELER ACTION */}

              {can(
                role,
                'APPLY_PACKAGE'
              ) &&
                active && (
                  <button
                    type="button"
                    className="package-primary-action"
                    disabled={applying}
                    onClick={() =>
                      onApply(pkg)
                    }
                  >
                    {applying
                      ? 'Submitting application…'
                      : 'Apply for this package'}
                    {!applying && (
                      <span>→</span>
                    )}
                  </button>
                )}


              {/* MANAGER ACTIONS */}

              {can(
                role,
                'EDIT_PACKAGE'
              ) && (
                <button
                  type="button"
                  className="package-secondary-action"
                  onClick={() =>
                    onEdit(pkg)
                  }
                >
                  Edit package
                </button>
              )}

              <div className="package-secure-note">
                Package information is shown
                directly from the TravelTrek
                workspace.
              </div>

            </div>


            {/* SMALL INFO CARD */}

            <div className="package-help-card">

              <span>
                TRAVELTREK
              </span>

              <strong>
                Everything you need,
                before you go.
              </strong>

              <p>
                Review the destination,
                availability and package
                information before applying.
              </p>

            </div>

          </aside>

        </div>

      </div>
    </div>
  );
};

export default TravelPackageDetail;