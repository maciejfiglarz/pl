import { Container } from 'inversify';
import type { IModule } from '../../core/IModule';
import { NotificationService } from './NotificationService';
import { SERVICE_IDENTIFIERS } from '../../core/ServiceIdentifiers';
import type { IEventAggregator } from '../../core/IEventAggregator';

export class NotificationModule implements IModule {
  registerTypes(container: Container): void {
    container.bind(NotificationService).toDynamicValue(() => {
      const eventAggregator = container.get<IEventAggregator>(SERVICE_IDENTIFIERS.EventAggregator);
      return new NotificationService(eventAggregator);
    }).inSingletonScope();
  }

  onInitialized(container: Container): void {
    // Initialize the notification service to start listening to events
    const notificationService = container.get(NotificationService);
    notificationService.initialize();
    console.log('NotificationModule initialized');
  }
}
