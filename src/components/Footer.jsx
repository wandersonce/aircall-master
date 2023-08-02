import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <Link to="/">Inbox</Link>
      <Link to="/archived">Archived </Link>
    </footer>
  );
}
