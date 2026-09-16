// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchTripItineraries,
//   deleteTripItinerary,
//   confirmTripItinerary,
//   setStatusFilter,
//   generateAiItinerary,
// } from '../../store/slices/tripItinerarySlice';
// import TripItineraryForm from './TripItineraryForm';
// import EmptyState from '../common/EmptyState';
// import { can } from '../../utils/permissions';

// const STATUS_OPTIONS = ['ALL', 'DRAFT', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED'];

// const TripItineraryList = () => {
//   const dispatch = useDispatch();
//   const { items, loading, statusFilter } = useSelector((state) => state.tripItineraries);
//   const role = useSelector((state) => state.auth.account?.role);
//   const [search, setSearch] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [aiPrompt, setAiPrompt] = useState('');
//   const [showAiBox, setShowAiBox] = useState(false);

//   useEffect(() => {
//     dispatch(fetchTripItineraries());
//   }, []);

//   const filtered = (items || []).filter((i) => {
//     const matchesStatus = statusFilter === 'ALL' || i.status === statusFilter;
//     const q = search.toLowerCase();
//     const matchesSearch = !q || i.title?.toLowerCase().includes(q) || i.destination?.toLowerCase().includes(q);
//     return matchesStatus && matchesSearch;
//   });

//   const handleAiGenerate = async () => {
//     if (!aiPrompt) return;
//     await dispatch(generateAiItinerary(aiPrompt));
//     setAiPrompt('');
//     setShowAiBox(false);
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
//         <div>
//           <h2 style={{ margin: 0 }}>Trip Itinerary List</h2>
//           {!can(role, 'CREATE_ITINERARY') && (
//             <span style={{ fontSize: 12, color: '#8a8f9c' }}>View-only — itinerary planning is handled by our travel team.</span>
//           )}
//         </div>
//         <div style={{ display: 'flex', gap: 10 }}>
//           {can(role, 'CREATE_ITINERARY') && (
//             <button onClick={() => setShowAiBox((s) => !s)} style={{ background: '#6a3de8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6 }}>
//               AI Itinerary Prompt
//             </button>
//           )}
//           {can(role, 'CREATE_ITINERARY') && (
//             <button onClick={() => setShowForm(true)} style={{ background: '#2d6cdf', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6 }}>
//               + Add Itinerary
//             </button>
//           )}
//         </div>
//       </div>

//       {showAiBox && can(role, 'CREATE_ITINERARY') && (
//         <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
//           <input
//             placeholder="Describe the trip you want (destination, days, vibe)..."
//             value={aiPrompt}
//             onChange={(e) => setAiPrompt(e.target.value)}
//             style={{ flex: 1, padding: 10, border: '1px solid #d7dbe3', borderRadius: 6 }}
//           />
//           <button onClick={handleAiGenerate} style={{ background: '#6a3de8', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 6 }}>
//             Generate
//           </button>
//         </div>
//       )}

//       <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
//         <input
//           placeholder="Filter collection by lifecycle status parameters below..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{ flex: 1, padding: 10, border: '1px solid #d7dbe3', borderRadius: 6 }}
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => dispatch(setStatusFilter(e.target.value))}
//           style={{ padding: 10, border: '1px solid #d7dbe3', borderRadius: 6 }}
//         >
//           {STATUS_OPTIONS.map((s) => (
//             <option key={s} value={s}>
//               {s === 'ALL' ? 'Show All Statuses' : s}
//             </option>
//           ))}
//         </select>
//       </div>

//       {loading && <p>Loading itineraries...</p>}
//       {!loading && filtered.length === 0 && <EmptyState message="No itineraries found." />}

//       {filtered.map((it) => (
//         <div key={it.id} style={{ background: '#fff', border: '1px solid #e5e8ee', borderRadius: 10, padding: 16, marginBottom: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <div>
//               <strong>{it.title}</strong>{' '}
//               <span style={{ fontSize: 12, color: '#8a8f9c' }}>{it.status}</span>
//               <p style={{ color: '#666', fontSize: 13 }}>
//                 Destination target: {it.destination} | Planned for units: {it.startDate} to {it.endDate}
//               </p>
//             </div>
//             <div style={{ textAlign: 'right', fontSize: 13 }}>
//               <div>Budget allocation limit: ${it.budgetAllocationLimit}</div>
//               <div>Cumulative expense total: ${it.cumulativeSpend || 0}</div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
//             {can(role, 'CONFIRM_ITINERARY') && it.status !== 'CONFIRMED' && (
//               <button onClick={() => dispatch(confirmTripItinerary(it.id))} style={{ background: '#2f9e52', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6 }}>
//                 Confirm Itinerary
//               </button>
//             )}
//             {can(role, 'EDIT_ITINERARY') && (
//               <button style={{ background: '#f5a623', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6 }}>Edit</button>
//             )}
//             {can(role, 'DELETE_ITINERARY') && (
//               <button onClick={() => dispatch(deleteTripItinerary(it.id))} style={{ background: '#e2483d', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 6 }}>
//                 Delete
//               </button>
//             )}
//           </div>
//         </div>
//       ))}

//       {showForm && (
//         <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           <TripItineraryForm onClose={() => setShowForm(false)} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default TripItineraryList;
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTripItineraries,
  deleteTripItinerary,
  confirmTripItinerary,
  setStatusFilter,
  generateAiItinerary,
} from '../../store/slices/tripItinerarySlice';
import TripItineraryForm from './TripItineraryForm';
import TripItineraryDetail from './TripItineraryDetail';
import EmptyState from '../common/EmptyState';
import { can } from '../../utils/permissions';

const STATUS_OPTIONS = [
  'ALL',
  'DRAFT',
  'CONFIRMED',
  'ACTIVE',
  'COMPLETED',
  'CANCELLED',
];

const DEFAULT_TRIPS = [
  {
    id: 'demo-kyoto',
    title: 'Kyoto Serene Gardens Exploration Route',
    destination: 'Kyoto, Japan',
    startDate: '2026-06-12',
    endDate: '2026-06-19',
    budgetAllocationLimit: 3200,
    cumulativeSpend: 2180,
    status: 'CONFIRMED',
    progress: 88,
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85',
    description:
      'A calm Kyoto route balancing historic streets, temple visits, garden time and neighbourhood food stops without turning every day into a race.',
    highlights: [
      'Fushimi Inari and southern Kyoto',
      'Arashiyama and bamboo grove',
      'Gion evening walk',
      'Traditional food experience',
    ],
    dayPlan: [
      'Arrival in Kyoto and hotel check-in',
      'Fushimi Inari and Higashiyama',
      'Arashiyama and riverside walk',
      'Gion and traditional neighbourhoods',
      'Nishiki Market and free exploration',
    ],
  },
  {
    id: 'demo-goa',
    title: 'Goa Coast & Heritage Escape',
    destination: 'Goa, India',
    startDate: '2026-05-12',
    endDate: '2026-05-18',
    budgetAllocationLimit: 1200,
    cumulativeSpend: 760,
    status: 'CONFIRMED',
    progress: 76,
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=85',
    description:
      'A coastal break mixing relaxed beach days with Old Goa heritage, local food and a slower South Goa rhythm.',
    highlights: [
      'Palolem and South Goa coastline',
      'Old Goa heritage circuit',
      'Sunset by the Arabian Sea',
      'Local Goan food stops',
    ],
    dayPlan: [
      'Arrival and coastal check-in',
      'South Goa beach circuit',
      'Old Goa heritage day',
      'Slow beach morning and local food',
      'Sunset coast drive',
    ],
  },
  {
    id: 'demo-alps',
    title: 'Swiss Alps Grand Explorer',
    destination: 'Interlaken, Switzerland',
    startDate: '2026-07-04',
    endDate: '2026-07-10',
    budgetAllocationLimit: 2400,
    cumulativeSpend: 0,
    status: 'DRAFT',
    progress: 54,
    image:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85',
    description:
      'A mountain-focused itinerary built around scenic rail journeys, alpine viewpoints, lakeside time and flexible outdoor days.',
    highlights: [
      'Jungfrau region',
      'Lake Thun and Lake Brienz',
      'Mountain rail experience',
      'Flexible alpine day',
    ],
    dayPlan: [
      'Arrival and Interlaken orientation',
      'Lakes and old town',
      'Mountain railway day',
      'Alpine village exploration',
      'Flexible weather day',
    ],
  },
  {
    id: 'demo-bali',
    title: 'Bali Temples & Coastal Escape',
    destination: 'Bali, Indonesia',
    startDate: '2026-08-02',
    endDate: '2026-08-08',
    budgetAllocationLimit: 1900,
    cumulativeSpend: 0,
    status: 'DRAFT',
    progress: 42,
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85',
    description:
      'A balanced Bali journey combining temple landscapes, Ubud culture, tropical coastlines and generous downtime.',
    highlights: [
      'Ubud and rice terraces',
      'Balinese temple circuit',
      'Coastal sunset',
      'Local craft and food experience',
    ],
    dayPlan: [
      'Arrival and Ubud check-in',
      'Ubud cultural route',
      'Temple and countryside day',
      'Transfer to the coast',
      'Beach and sunset day',
    ],
  },
  {
    id: 'demo-maldives',
    title: 'Maldives Blue Lagoon Retreat',
    destination: 'Maldives',
    startDate: '2026-09-16',
    endDate: '2026-09-20',
    budgetAllocationLimit: 2800,
    cumulativeSpend: 0,
    status: 'ACTIVE',
    progress: 67,
    image:
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85',
    description:
      'A compact island retreat designed around clear-water experiences, quiet mornings, water activities and unhurried evenings.',
    highlights: [
      'Lagoon and reef time',
      'Island transfer experience',
      'Water activity window',
      'Sunset and free evenings',
    ],
    dayPlan: [
      'Arrival and island transfer',
      'Lagoon and beach day',
      'Water activity morning',
      'Slow island day',
      'Departure preparation',
    ],
  },
];

const IMAGE_BY_DESTINATION = [
  {
    match: 'kyoto',
    image: DEFAULT_TRIPS[0].image,
  },
  {
    match: 'goa',
    image: DEFAULT_TRIPS[1].image,
  },
  {
    match: 'switzerland',
    image: DEFAULT_TRIPS[2].image,
  },
  {
    match: 'interlaken',
    image: DEFAULT_TRIPS[2].image,
  },
  {
    match: 'bali',
    image: DEFAULT_TRIPS[3].image,
  },
  {
    match: 'maldives',
    image: DEFAULT_TRIPS[4].image,
  },
];

const formatMoney = (value) => {
  const amount = Number(value || 0);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (value) => {
  if (!value) return 'Date flexible';

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

const duration = (start, end) => {
  if (!start || !end) return null;

  const a = new Date(start);
  const b = new Date(end);

  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) {
    return null;
  }

  const days = Math.round((b - a) / 86400000) + 1;

  return days > 0 ? days : null;
};

const enrichTrip = (trip) => {
  if (trip.image) {
    return trip;
  }

  const destination = String(trip.destination || '').toLowerCase();

  const match = IMAGE_BY_DESTINATION.find((entry) =>
    destination.includes(entry.match)
  );

  return {
    ...trip,
    image: match?.image || DEFAULT_TRIPS[0].image,
  };
};

const TripItineraryList = () => {
  const dispatch = useDispatch();

  const { items, loading, statusFilter } = useSelector(
    (state) => state.tripItineraries
  );

  const role = useSelector(
    (state) => state.auth.account?.role
  );

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiBox, setShowAiBox] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [editingTrip, setEditingTrip] = useState(null);

  useEffect(() => {
    dispatch(fetchTripItineraries());
  }, [dispatch]);

  /*
   * Backend trips are always preserved.
   *
   * If the backend currently contains fewer than five trips,
   * demo trips are added only for the frontend presentation.
   */
  const displayItems = useMemo(() => {
    const apiItems = Array.isArray(items) ? items : [];

    const safeItems = apiItems.map(enrichTrip);

    if (safeItems.length >= 5) {
      return safeItems;
    }

    const existingIds = new Set(
      safeItems.map((item) => String(item.id))
    );

    const destinationKeys = new Set(
      safeItems.map((item) =>
        String(item.destination || '').toLowerCase()
      )
    );

    const additions = DEFAULT_TRIPS.filter((trip) => {
      return (
        !existingIds.has(String(trip.id)) &&
        !destinationKeys.has(
          String(trip.destination).toLowerCase()
        )
      );
    });

    return [
      ...safeItems,
      ...additions.slice(0, 5 - safeItems.length),
    ];
  }, [items]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return displayItems.filter((trip) => {
      const matchesStatus =
        statusFilter === 'ALL' ||
        trip.status === statusFilter;

      const matchesSearch =
        !query ||
        String(trip.title || '')
          .toLowerCase()
          .includes(query) ||
        String(trip.destination || '')
          .toLowerCase()
          .includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [displayItems, search, statusFilter]);

  const stats = useMemo(
    () => ({
      total: displayItems.length,

      upcoming: displayItems.filter((item) =>
        ['CONFIRMED', 'ACTIVE'].includes(item.status)
      ).length,

      drafts: displayItems.filter(
        (item) => item.status === 'DRAFT'
      ).length,

      completed: displayItems.filter(
        (item) => item.status === 'COMPLETED'
      ).length,
    }),
    [displayItems]
  );

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) {
      return;
    }

    await dispatch(
      generateAiItinerary(aiPrompt.trim())
    );

    setAiPrompt('');
    setShowAiBox(false);
  };

  const handleDelete = async (trip) => {
    /*
     * Demo trips are presentation-only.
     * Never send fake demo IDs to the backend.
     */
    if (String(trip.id).startsWith('demo-')) {
      return;
    }

    await dispatch(
      deleteTripItinerary(trip.id)
    );
  };

  if (selectedTrip) {
    return (
      <TripItineraryDetail
        itinerary={selectedTrip}
        role={role}
        onBack={() => setSelectedTrip(null)}
        onEdit={() => {
          setEditingTrip(selectedTrip);
          setSelectedTrip(null);
          setShowForm(true);
        }}
      />
    );
  }

  return (
    <div className="trips-page fade-in">

      {/* PAGE HEADER */}
      <header className="trips-header">
        <div>
          <span className="page-eyebrow">
            TRAVEL PLANNER
          </span>

          <h1>Your trips</h1>

          <p>
            Keep every journey organised from the first
            idea to the final day.
          </p>
        </div>

        <div className="trips-header-actions">

          {can(role, 'CREATE_ITINERARY') && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() =>
                setShowAiBox((value) => !value)
              }
            >
              Plan with AI
            </button>
          )}

          {can(role, 'CREATE_ITINERARY') && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setEditingTrip(null);
                setShowForm(true);
              }}
            >
              + New trip
            </button>
          )}

        </div>
      </header>

      {/* STATISTICS */}
      <section
        className="trip-stats"
        aria-label="Trip statistics"
      >
        <div className="trip-stat-card">
          <span>Total trips</span>
          <strong>{stats.total}</strong>
          <small>Across your workspace</small>
        </div>

        <div className="trip-stat-card trip-stat-accent">
          <span>Upcoming</span>
          <strong>{stats.upcoming}</strong>
          <small>Confirmed or active</small>
        </div>

        <div className="trip-stat-card">
          <span>Drafts</span>
          <strong>{stats.drafts}</strong>
          <small>Still being planned</small>
        </div>

        <div className="trip-stat-card">
          <span>Completed</span>
          <strong>{stats.completed}</strong>
          <small>Journeys finished</small>
        </div>
      </section>

      {/* AI PLANNER */}
      {showAiBox &&
        can(role, 'CREATE_ITINERARY') && (
          <section className="ai-planner-strip">
            <div>
              <span>SMART PLANNER</span>

              <strong>
                Describe the journey you want to build
              </strong>
            </div>

            <input
              value={aiPrompt}
              onChange={(event) =>
                setAiPrompt(event.target.value)
              }
              placeholder="e.g. 6 days in Kyoto with temples, food and a relaxed pace"
            />

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAiGenerate}
            >
              Generate
            </button>
          </section>
        )}

      {/* SEARCH / FILTERS */}
      <section className="trip-toolbar">

        <div className="trip-search-wrap">
          <span aria-hidden="true">⌕</span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search trips or destinations"
            aria-label="Search trips or destinations"
          />
        </div>

        <div className="status-tabs">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              type="button"
              className={
                statusFilter === status
                  ? 'active'
                  : ''
              }
              onClick={() =>
                dispatch(setStatusFilter(status))
              }
            >
              {status === 'ALL'
                ? 'All'
                : status.charAt(0) +
                  status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div
          className="view-switch"
          aria-label="Trip view mode"
        >
          <button
            type="button"
            className={
              viewMode === 'grid'
                ? 'active'
                : ''
            }
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            ▦
          </button>

          <button
            type="button"
            className={
              viewMode === 'list'
                ? 'active'
                : ''
            }
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            ☷
          </button>
        </div>

      </section>

      {/* LOADING */}
      {loading && (
        <div className="trip-loading">
          Loading your journeys…
        </div>
      )}

      {/* EMPTY */}
      {!loading && filtered.length === 0 && (
        <EmptyState message="No itineraries found." />
      )}

      {/* TRIPS */}
      {!loading && filtered.length > 0 && (
        <section
          className={`trip-results ${
            viewMode === 'list'
              ? 'trip-results-list'
              : ''
          }`}
        >
          {filtered.map((trip, index) => {
            const tripDuration = duration(
              trip.startDate,
              trip.endDate
            );

            const progress = Number(
              trip.progress ||
                (trip.status === 'CONFIRMED'
                  ? 88
                  : 52)
            );

            const isDemo = String(
              trip.id
            ).startsWith('demo-');

            return (
              <article
                className="trip-card"
                key={trip.id}
              >

                {/* IMAGE */}
                <button
                  type="button"
                  className="trip-card-image"
                  onClick={() =>
                    setSelectedTrip(trip)
                  }
                  style={{
                    backgroundImage: `url("${trip.image}")`,
                  }}
                  aria-label={`View ${trip.title}`}
                >
                  <span
                    className={`trip-status trip-status-${String(
                      trip.status || 'DRAFT'
                    ).toLowerCase()}`}
                  >
                    {trip.status || 'DRAFT'}
                  </span>

                  <span className="trip-card-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </button>

                {/* CARD CONTENT */}
                <div className="trip-card-body">

                  <div className="trip-card-location">
                    {trip.destination}
                  </div>

                  <h2>{trip.title}</h2>

                  <div className="trip-meta-row">
                    <span>
                      {formatDate(
                        trip.startDate
                      )}
                    </span>

                    <span>•</span>

                    <span>
                      {tripDuration
                        ? `${tripDuration} days`
                        : 'Flexible duration'}
                    </span>
                  </div>

                  <div className="trip-card-bottom">

                    <div>
                      <span className="trip-budget-label">
                        EST. BUDGET
                      </span>

                      <strong>
                        {formatMoney(
                          trip.budgetAllocationLimit
                        )}
                      </strong>
                    </div>

                    <button
                      type="button"
                      className="trip-view-button"
                      onClick={() =>
                        setSelectedTrip(trip)
                      }
                    >
                      View trip
                      <span aria-hidden="true">
                        →
                      </span>
                    </button>

                  </div>

                  <div className="trip-progress">
                    <div>
                      <span>
                        Planning progress
                      </span>

                      <b>{progress}%</b>
                    </div>

                    <div className="progress-track">
                      <span
                        style={{
                          width: `${Math.min(
                            100,
                            progress
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                </div>

                {/* ACTIONS */}
                {(can(
                  role,
                  'CONFIRM_ITINERARY'
                ) ||
                  can(
                    role,
                    'EDIT_ITINERARY'
                  ) ||
                  can(
                    role,
                    'DELETE_ITINERARY'
                  )) && (
                  <div className="trip-card-actions">

                    {can(
                      role,
                      'CONFIRM_ITINERARY'
                    ) &&
                      trip.status !==
                        'CONFIRMED' &&
                      !isDemo && (
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              confirmTripItinerary(
                                trip.id
                              )
                            )
                          }
                        >
                          Confirm
                        </button>
                      )}

                    {can(
                      role,
                      'EDIT_ITINERARY'
                    ) &&
                      !isDemo && (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTrip(trip);
                            setShowForm(true);
                          }}
                        >
                          Edit
                        </button>
                      )}

                    {can(
                      role,
                      'DELETE_ITINERARY'
                    ) &&
                      !isDemo && (
                        <button
                          type="button"
                          className="danger"
                          onClick={() =>
                            handleDelete(trip)
                          }
                        >
                          Delete
                        </button>
                      )}

                  </div>
                )}

              </article>
            );
          })}
        </section>
      )}

      {/* CREATE / EDIT MODAL */}
      {showForm && (
        <div className="trip-modal-backdrop">
          <div
            className="trip-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Trip itinerary form"
          >
            <TripItineraryForm
              itinerary={editingTrip}
              onClose={() => {
                setShowForm(false);
                setEditingTrip(null);
                setSelectedTrip(null);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default TripItineraryList;