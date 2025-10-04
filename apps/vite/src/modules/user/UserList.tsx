import { useState, useEffect } from 'react';
import { useService } from '../../hooks/useService';
import { UserService, type User } from './UserService';
import type { IEventAggregator } from '../../core/IEventAggregator';
import { SERVICE_IDENTIFIERS } from '../../core/ServiceIdentifiers';

export const UserList: React.FC = () => {
  const userService = useService<UserService>(UserService);
  const eventAggregator = useService<IEventAggregator>(SERVICE_IDENTIFIERS.EventAggregator);
  const [users, setUsers] = useState(userService.getUsers());

  useEffect(() => {
    // Subscribe to user added events
    const unsubscribe = eventAggregator.subscribe('user:added', () => {
      setUsers(userService.getUsers());
    });

    return unsubscribe;
  }, [userService, eventAggregator]);

  return (
    <div style={{ padding: '20px', border: '2px solid #4CAF50', borderRadius: '8px', margin: '10px' }}>
      <h2>User Module</h2>
      <h3>Users List:</h3>
      {users.length === 0 ? (
        <p>No users yet</p>
      ) : (
        <ul>
          {users.map((user: User) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
