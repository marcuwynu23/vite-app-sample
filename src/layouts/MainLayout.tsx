import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../App.css';

export const MainLayout: React.FC = () => {
  return (
    <div className="app">
      <nav className="nav-container">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          About
        </NavLink>
      </nav>

      <main className="content-container">
        <Outlet />
      </main>
    </div>
  );
};
