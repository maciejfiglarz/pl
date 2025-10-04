import { useState, useEffect } from 'react';
import { useService } from '../../hooks/useService';
import { NotificationService, type Notification } from './NotificationService';
import type { IEventAggregator } from '../../core/IEventAggregator';
import { SERVICE_IDENTIFIERS } from '../../core/ServiceIdentifiers';

export const NotificationPanel: React.FC = () => {
  const notificationService = useService<NotificationService>(NotificationService);
  const eventAggregator = useService<IEventAggregator>(SERVICE_IDENTIFIERS.EventAggregator);
  const [notifications, setNotifications] = useState(notificationService.getNotifications());

  useEffect(() => {
    // Subscribe to notification added events
    const unsubscribe = eventAggregator.subscribe('notification:added', () => {
      setNotifications(notificationService.getNotifications());
    });

    return unsubscribe;
  }, [notificationService, eventAggregator]);

  return (
    <div style={{ padding: '20px', border: '2px solid #2196F3', borderRadius: '8px', margin: '10px' }}>
      <h2>Notification Module</h2>
      <h3>Notifications:</h3>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map((notif: Notification) => (
            <li key={notif.id}>
              {notif.message} <small>({notif.timestamp.toLocaleTimeString()})</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
