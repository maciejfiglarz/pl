import 'reflect-metadata';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Container } from 'inversify';
import './index.css';
import App from './App.tsx';
import { ContainerProvider } from './context/ContainerContext';
import { ModuleCatalog } from './core/ModuleCatalog';
import { EventAggregator } from './core/EventAggregator';
import type { IEventAggregator } from './core/IEventAggregator';
import { SERVICE_IDENTIFIERS } from './core/ServiceIdentifiers';

// Import modules
import { UserModule } from './modules/user/UserModule';
import { NotificationModule } from './modules/notification/NotificationModule';
import { DashboardModule } from './modules/dashboard/DashboardModule';

// Create DI container
const container = new Container();

// Register core services
container.bind<IEventAggregator>(SERVICE_IDENTIFIERS.EventAggregator).to(EventAggregator).inSingletonScope();

// Create module catalog
const moduleCatalog = new ModuleCatalog(container);

// Register modules
moduleCatalog.registerModule({
  name: 'UserModule',
  module: new UserModule(),
});

moduleCatalog.registerModule({
  name: 'NotificationModule',
  module: new NotificationModule(),
  dependencies: ['UserModule'], // NotificationModule depends on UserModule
});

moduleCatalog.registerModule({
  name: 'DashboardModule',
  module: new DashboardModule(),
  dependencies: ['UserModule'], // DashboardModule depends on UserModule
});

// Initialize all modules
moduleCatalog.initialize();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContainerProvider container={container}>
      <App />
    </ContainerProvider>
  </StrictMode>,
);
