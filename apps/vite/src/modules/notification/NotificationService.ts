import type { IEventAggregator } from '../../core/IEventAggregator';

export interface Notification {
  id: string;
  message: string;
  timestamp: Date;
}

export class NotificationService {
  private notifications: Notification[] = [];
  private eventAggregator: IEventAggregator;

  constructor(eventAggregator: IEventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  initialize(): void {
    // Listen to user:added events and create notifications
    this.eventAggregator.subscribe('user:added', (user: any) => {
      this.addNotification(`New user added: ${user.name}`);
    });
  }

  private addNotification(message: string): void {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      timestamp: new Date(),
    };
    this.notifications.push(notification);
    this.eventAggregator.publish('notification:added', notification);
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }
}
