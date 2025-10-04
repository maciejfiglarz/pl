import './App.css';
import { Dashboard } from './modules/dashboard/Dashboard';
import { UserList } from './modules/user/UserList';
import { NotificationPanel } from './modules/notification/NotificationPanel';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Prism Modularity Pattern Demo</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px' }}>
        This app demonstrates modular architecture with DI, event aggregation, and module dependencies
      </p>

      <Dashboard />
      <UserList />
      <NotificationPanel />

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>How it works:</h3>
        <ul>
          <li><strong>UserModule</strong>: Manages user data</li>
          <li><strong>NotificationModule</strong>: Listens to user events and creates notifications</li>
          <li><strong>DashboardModule</strong>: Depends on UserModule, provides stats and user creation</li>
          <li>Modules communicate via <strong>EventAggregator</strong> (loose coupling)</li>
          <li>Services are injected via <strong>Inversify</strong> (dependency injection)</li>
          <li>Modules are initialized in dependency order via <strong>ModuleCatalog</strong></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
