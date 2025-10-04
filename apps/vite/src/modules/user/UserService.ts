import type { IEventAggregator } from '../../core/IEventAggregator';

export interface User {
  id: string;
  name: string;
  email: string;
}

export class UserService {
  private users: User[] = [];
  private eventAggregator: IEventAggregator;

  constructor(eventAggregator: IEventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  addUser(user: User): void {
    this.users.push(user);
    this.eventAggregator.publish('user:added', user);
  }

  getUsers(): User[] {
    return [...this.users];
  }

  getUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }
}
