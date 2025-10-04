import { useState } from 'react';
import { useService } from '../../hooks/useService';
import { DashboardService } from './DashboardService';
import { UserService, type User } from '../user/UserService';

export const Dashboard: React.FC = () => {
  const dashboardService = useService<DashboardService>(DashboardService);
  const userService = useService<UserService>(UserService);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const stats = dashboardService.getStats();

  const handleAddUser = () => {
    if (name && email) {
      const user: User = {
        id: Date.now().toString(),
        name,
        email,
      };
      userService.addUser(user);
      setName('');
      setEmail('');
    }
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #FF9800', borderRadius: '8px', margin: '10px' }}>
      <h2>Dashboard Module</h2>
      <p>Total Users: {stats.totalUsers}</p>

      <div style={{ marginTop: '20px' }}>
        <h3>Add New User:</h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '5px' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '5px' }}
          />
          <button onClick={handleAddUser} style={{ padding: '5px 15px' }}>
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};
