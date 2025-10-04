import { UserService } from '../user/UserService';

export class DashboardService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getStats() {
    return {
      totalUsers: this.userService.getUsers().length,
    };
  }
}
