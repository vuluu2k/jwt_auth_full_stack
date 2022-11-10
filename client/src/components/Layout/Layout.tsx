import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import config from 'config';

type Props = {};

function Layout({}: Props) {
  return (
    <div>
      <h1>AUTHENTICATION FULLSTACK</h1>
      <nav style={{ borderBottom: '1px solid black', paddingBottom: 12 }}>
        <Link to={config.routes.home}>Home</Link> | <Link to={config.routes.login}>Login</Link> |{' '}
        <Link to={config.routes.register}>Register</Link> | <Link to={config.routes.profile}>Profile</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
