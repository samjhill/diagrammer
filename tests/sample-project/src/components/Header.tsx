import React from 'react';
import { UserService } from '../services/UserService';

interface HeaderProps {
  userService: UserService;
}

export const Header: React.FC<HeaderProps> = ({ userService }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    userService.getCurrentUser().then(setUser);
  }, [userService]);

  return (
    <header>
      <h1>My App</h1>
      {user && <span>Welcome, {user.name}</span>}
    </header>
  );
};
