// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { dismissNotification } from '../store/slices/authSlice';

// const colorFor = (type) => {
//   switch (type) {
//     case 'error':
//       return { bg: '#fdecea', border: '#e2483d', text: '#7a1f18' };
//     case 'success':
//       return { bg: '#e9f8ee', border: '#2f9e52', text: '#1c5c31' };
//     default:
//       return { bg: '#eaf1fd', border: '#3d7bf5', text: '#1c3f7a' };
//   }
// };

// const NotificationStack = ({ notifications: notificationsProp }) => {
//   const dispatch = useDispatch();
//   const reduxNotifications = useSelector((state) => state.auth.notifications);
//   const notifications = notificationsProp !== undefined ? notificationsProp : reduxNotifications;

//   if (!notifications || notifications.length === 0) {
//     return null;
//   }

//   return (
//     <div
//       style={{
//         position: 'fixed',
//         top: 16,
//         right: 16,
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 8,
//         zIndex: 1000,
//         maxWidth: 340,
//       }}
//     >
//       {notifications.map((n) => {
//         const c = colorFor(n.type);
//         return (
//           <div
//             key={n.id}
//             style={{
//               background: c.bg,
//               border: `1px solid ${c.border}`,
//               color: c.text,
//               padding: '10px 14px',
//               borderRadius: 6,
//               fontSize: 14,
//               display: 'flex',
//               justifyContent: 'space-between',
//               gap: 12,
//             }}
//           >
//             <span>{n.message}</span>
//             <button
//               onClick={() => dispatch(dismissNotification(n.id))}
//               style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.text, fontWeight: 700 }}
//             >
//               ×
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default NotificationStack;
import React, {
  useEffect,
} from 'react';

import {
  useSelector,
  useDispatch,
} from 'react-redux';

import {
  dismissNotification,
} from '../store/slices/authSlice';

const colorFor = (type) => {
  switch (type) {
    case 'error':
      return {
        bg: '#fff4f3',
        border: '#e26b62',
        text: '#8f3029',
      };

    case 'success':
      return {
        bg: '#effaf3',
        border: '#57ad75',
        text: '#24673d',
      };

    default:
      return {
        bg: '#f1f5fd',
        border: '#6d8fd5',
        text: '#345487',
      };
  }
};

const NotificationItem = ({
  notification,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [
    notification.id,
    onDismiss,
  ]);

  const c = colorFor(
    notification.type
  );

  return (
    <div
      className="notification-item"
      style={{
        '--notification-bg': c.bg,
        '--notification-border':
          c.border,
        '--notification-text':
          c.text,
      }}
    >

      <div className="notification-content">

        <span
          className={`notification-indicator ${
            notification.type || 'info'
          }`}
        />

        <span>
          {notification.message}
        </span>

      </div>

      <button
        type="button"
        className="notification-close"
        onClick={() =>
          onDismiss(notification.id)
        }
        aria-label="Dismiss notification"
      >
        ×
      </button>

      <div className="notification-progress">
        <span />
      </div>

    </div>
  );
};

const NotificationStack = ({
  notifications: notificationsProp,
}) => {
  const dispatch = useDispatch();

  const reduxNotifications =
    useSelector(
      (state) =>
        state.auth.notifications
    );

  const notifications =
    notificationsProp !== undefined
      ? notificationsProp
      : reduxNotifications;

  const dismiss = (id) => {
    dispatch(
      dismissNotification(id)
    );
  };

  if (
    !notifications ||
    notifications.length === 0
  ) {
    return null;
  }

  return (
    <div className="notification-stack">

      {notifications.map(
        (notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onDismiss={dismiss}
          />
        )
      )}

    </div>
  );
};

export default NotificationStack;