import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <footer>
      <Link className={`${currentLocation == '/' ? 'active' : ''}`} to="/">
        Inbox
      </Link>
      <Link
        className={`${currentLocation == '/archived' ? 'active' : ''}`}
        to="/archived"
      >
        Archived{' '}
      </Link>
    </footer>
  );
}
