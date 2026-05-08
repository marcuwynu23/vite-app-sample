import React from 'react';

interface EnvListProps {
  vars: [string, any][];
}

export const EnvList: React.FC<EnvListProps> = ({ vars }) => {
  if (vars.length === 0) {
    return (
      <div className="empty" role="status">
        <span className="empty-icon" aria-hidden>
          ◇
        </span>
        <p>
          No <code>VITE_APP_*</code> variables defined
        </p>
        <p className="empty-hint">
          Add them in <code>.env</code> or <code>.env.local</code>
        </p>
      </div>
    );
  }

  return (
    <ul className="env-list" aria-label="Environment variables">
      {vars.map(([key, value], i) => (
        <li
          key={key}
          className="env-item"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <span className="env-key">{key}</span>
          <span className="env-value">{String(value)}</span>
        </li>
      ))}
    </ul>
  );
};
