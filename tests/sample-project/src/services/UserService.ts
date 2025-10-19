import { ApiClient } from '../utils/ApiClient';

export interface User {
  id: string;
  name: string;
  email: string;
}

export class UserService {
  constructor(private apiClient: ApiClient) {}

  async getCurrentUser(): Promise<User> {
    return this.apiClient.get<User>('/api/user/me');
  }

  async updateUser(user: User): Promise<User> {
    return this.apiClient.put<User>('/api/user', user);
  }
}
