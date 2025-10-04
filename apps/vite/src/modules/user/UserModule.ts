import { Container } from 'inversify';
import type { IModule } from '../../core/IModule';
import { UserService } from './UserService';
import { SERVICE_IDENTIFIERS } from '../../core/ServiceIdentifiers';
import type { IEventAggregator } from '../../core/IEventAggregator';

export class UserModule implements IModule {
  registerTypes(container: Container): void {
    container.bind(UserService).toDynamicValue(() => {
      const eventAggregator = container.get<IEventAggregator>(SERVICE_IDENTIFIERS.EventAggregator);
      return new UserService(eventAggregator);
    }).inSingletonScope();
  }

  onInitialized(_container: Container): void {
    console.log('UserModule initialized');
  }
}
