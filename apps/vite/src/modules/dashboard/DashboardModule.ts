import { Container } from 'inversify';
import type { IModule } from '../../core/IModule';
import { DashboardService } from './DashboardService';
import { UserService } from '../user/UserService';

export class DashboardModule implements IModule {
  registerTypes(container: Container): void {
    container.bind(DashboardService).toDynamicValue(() => {
      const userService = container.get(UserService);
      return new DashboardService(userService);
    }).inSingletonScope();
  }

  onInitialized(_container: Container): void {
    console.log('DashboardModule initialized');
  }
}
