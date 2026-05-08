import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="card">
      <header className="card-header">
        <span className="badge">Info</span>
        <h1 className="title">About this project</h1>
        <p className="subtitle">
          A modular Vite + React application sample
        </p>
      </header>
      
      <div className="about-content" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
        <p>
          This project demonstrates a modern frontend architecture using:
        </p>
        <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
          <li>React 19</li>
          <li>Vite 7</li>
          <li>TypeScript</li>
          <li>React Router 7</li>
          <li>Modular directory structure</li>
        </ul>
      </div>
    </div>
  );
};
