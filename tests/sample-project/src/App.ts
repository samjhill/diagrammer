import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UserService } from './services/UserService';
import { ApiClient } from './utils/ApiClient';

export class App extends React.Component {
  private userService: UserService;
  private apiClient: ApiClient;

  constructor(props: any) {
    super(props);
    this.apiClient = new ApiClient();
    this.userService = new UserService(this.apiClient);
  }

  render() {
    return (
      <div>
        <Header userService={this.userService} />
        <main>Hello World</main>
        <Footer />
      </div>
    );
  }
}
