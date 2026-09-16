import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const NAV_CONFIG = {
  TRAVELER: [
    {
      key: 'home',
      label: 'Overview',
      icon: 'dashboard',
    },
    {
      key: 'itineraries',
      label: 'My Trips',
      icon: 'calendar',
    },
    {
      key: 'packages',
      label: 'Explore Packages',
      icon: 'compass',
    },
    {
      key: 'bookings',
      label: 'My Bookings',
      icon: 'ticket',
    },
  ],

  TOUR_AGENT: [
    {
      key: 'home',
      label: 'Overview',
      icon: 'dashboard',
    },
    {
      key: 'itineraries',
      label: 'My Itineraries',
      icon: 'calendar',
    },
    {
      key: 'activities',
      label: 'Activities',
      icon: 'activity',
    },
    {
      key: 'packages',
      label: 'Travel Packages',
      icon: 'package',
    },
    {
      key: 'bookings',
      label: 'Bookings',
      icon: 'ticket',
    },
  ],

  AGENCY_MANAGER: [
    {
      key: 'home',
      label: 'Overview',
      icon: 'dashboard',
    },
    {
      key: 'itineraries',
      label: 'Trips',
      icon: 'calendar',
    },
    {
      key: 'activities',
      label: 'Activities',
      icon: 'activity',
    },
    {
      key: 'packages',
      label: 'Packages',
      icon: 'package',
    },
    {
      key: 'bookings',
      label: 'Bookings',
      icon: 'ticket',
    },
    {
      key: 'accounts',
      label: 'System Accounts',
      icon: 'users',
    },
  ],
};

const ROLE_LABEL = {
  TRAVELER: 'Traveler',
  TOUR_AGENT: 'Tour Agent',
  AGENCY_MANAGER: 'Agency Manager',
};

const ROLE_META = {
  TRAVELER: {
    workspace: 'Travel workspace',
    accent: 'traveler',
  },
  TOUR_AGENT: {
    workspace: 'Agent workspace',
    accent: 'agent',
  },
  AGENCY_MANAGER: {
    workspace: 'Agency workspace',
    accent: 'manager',
  },
};

const Icon = ({
  name,
  size = 18,
}) => {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  switch (name) {
    case 'dashboard':
      return (
        <svg {...props}>
          <rect x="4" y="4" width="6" height="6" rx="1" />
          <rect x="14" y="4" width="6" height="6" rx="1" />
          <rect x="4" y="14" width="6" height="6" rx="1" />
          <rect x="14" y="14" width="6" height="6" rx="1" />
        </svg>
      );

    case 'calendar':
      return (
        <svg {...props}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4M16 3v4M4 9h16" />
          <path d="M8 13h3M8 16h5" />
        </svg>
      );

    case 'compass':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m14.8 9.2-2 4.1-3.6 1.5 2-4.1 3.6-1.5Z" />
        </svg>
      );

    case 'ticket':
      return (
        <svg {...props}>
          <path d="M5 7.5h14v3a2 2 0 0 0 0 4v3H5v-3a2 2 0 0 0 0-4v-3Z" />
          <path d="M12 9v1M12 14v1M12 17v-1" />
        </svg>
      );

    case 'activity':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M7 12h3l1.5-4 2.5 8 1.5-4H18" />
        </svg>
      );

    case 'package':
      return (
        <svg {...props}>
          <path d="m5 8 7-4 7 4-7 4-7-4Z" />
          <path d="M5 8v8l7 4 7-4V8M12 12v8" />
        </svg>
      );

    case 'users':
      return (
        <svg {...props}>
          <circle cx="9" cy="9" r="3" />
          <path d="M3.5 19c.7-3 2.4-4.5 5.5-4.5s4.8 1.5 5.5 4.5" />
          <path d="M16 11a3 3 0 1 0 0-6M16 14.5c2.5.2 4 1.7 4.5 4.5" />
        </svg>
      );

    case 'heart':
      return (
        <svg {...props}>
          <path d="M20 8.8c0 4.8-8 9.2-8 9.2s-8-4.4-8-9.2A4.1 4.1 0 0 1 12 6a4.1 4.1 0 0 1 8 2.8Z" />
        </svg>
      );

    case 'help':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9.8 9a2.3 2.3 0 1 1 3.8 1.7c-1 .8-1.6 1.2-1.6 2.6" />
          <path d="M12 16.7h.01" />
        </svg>
      );

    case 'settings':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 13.5a7.8 7.8 0 0 0 0-3l2-1.2-2-3.4-2.1.9a8 8 0 0 0-2.6-1.5L14 3h-4l-.3 2.3a8 8 0 0 0-2.6 1.5L5 5.9 3 9.3l2 1.2a7.8 7.8 0 0 0 0 3l-2 1.2L5 18.1l2.1-.9a8 8 0 0 0 2.6 1.5L10 21h4l.3-2.3a8 8 0 0 0 2.6-1.5l2.1.9 2-3.4-2-1.2Z" />
        </svg>
      );

    case 'logout':
      return (
        <svg {...props}>
          <path d="M14 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8" />
          <path d="M11 12h9M17 8l3 4-3 4" />
        </svg>
      );

    default:
      return null;
  }
};

const Sidebar = ({
  activeTab,
  setActiveTab,
}) => {
  const dispatch = useDispatch();

  const account = useSelector(
    (state) => state.auth.account
  );

  const role =
    account?.role || 'TRAVELER';

  const navItems =
    NAV_CONFIG[role] ||
    NAV_CONFIG.TRAVELER;

  const roleMeta =
    ROLE_META[role] ||
    ROLE_META.TRAVELER;

  const name =
    account?.fullName ||
    'Traveler';

  const initials =
    name
      .trim()
      .split(/\s+/)
      .map(
        (part) =>
          part.charAt(0)
      )
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'T';

  return (
    <aside
      className={`sidebar sidebar-${roleMeta.accent}`}
    >

      <div className="sidebar-brand">

        <div className="brand-mark">
          T
        </div>

        <div className="brand-copy">

          <strong>
            TravelTrek
          </strong>

          <span>
            {roleMeta.workspace}
          </span>

        </div>

      </div>

      <button
        type="button"
        className="sidebar-profile"
      >

        <span className="profile-avatar">
          {initials}
        </span>

        <span className="profile-copy">

          <strong>
            {name}
          </strong>

          <small>
            {ROLE_LABEL[role]}
          </small>

        </span>

        <span className="profile-status" />

      </button>

      <div className="sidebar-section-label">
        WORKSPACE
      </div>

      <nav
        className="sidebar-nav"
        aria-label="TravelTrek navigation"
      >

        {navItems.map((item) => {

          const active =
            activeTab ===
            item.key;

          return (
            <button
              key={item.key}
              type="button"
              className={`sidebar-link ${
                active
                  ? 'active'
                  : ''
              }`}
              onClick={() =>
                setActiveTab(
                  item.key
                )
              }
            >

              <span className="sidebar-icon">
                <Icon
                  name={item.icon}
                />
              </span>

              <span className="sidebar-label">
                {item.label}
              </span>

              {active && (
                <span className="sidebar-active-indicator" />
              )}

            </button>
          );
        })}

      </nav>

      {role === 'TRAVELER' && (
        <div className="sidebar-secondary">

          <div className="sidebar-section-label">
            SAVED
          </div>

          <button
            type="button"
            className="sidebar-link"
          >
            <span className="sidebar-icon">
              <Icon name="heart" />
            </span>

            <span className="sidebar-label">
              Saved Destinations
            </span>

          </button>

        </div>
      )}

      <div className="sidebar-bottom">

        <div className="sidebar-help-card">

          <div className="help-icon">
            <Icon
              name="help"
              size={16}
            />
          </div>

          <div>
            <strong>
              Need a hand?
            </strong>

            <span>
              Open support centre
            </span>
          </div>

        </div>

        <button
          type="button"
          className="sidebar-utility"
        >
          <Icon
            name="settings"
            size={17}
          />

          <span>
            Settings
          </span>
        </button>

        <button
          type="button"
          className="sidebar-logout"
          onClick={() =>
            dispatch(logout())
          }
        >
          <Icon
            name="logout"
            size={17}
          />

          <span>
            Sign out
          </span>
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;