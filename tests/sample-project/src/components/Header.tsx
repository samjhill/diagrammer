import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  user?: User;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const Header: React.FC<HeaderProps> = ({ title, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>{title}</h1>
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {user && <Link to="/profile">Profile</Link>}
        </nav>
        <button onClick={handleMenuToggle} className="menu-toggle">
          Menu
        </button>
      </div>
    </header>
  );
};

export default Header;