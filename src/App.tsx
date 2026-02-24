import "./App.css";

const env = import.meta.env;

const viteAppVars = Object.entries(env).filter(([key]) =>
  key.startsWith("VITE_APP_"),
);

function App() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🚀 Environment Variables</h1>
        <p className="subtitle">VITE_APP_* Configuration</p>

        {viteAppVars.length === 0 ? (
          <p className="empty">No VITE_APP_* variables found</p>
        ) : (
          <div className="env-list">
            {viteAppVars.map(([key, value]) => (
              <div key={key} className="env-item">
                <span className="env-key">{key}</span>
                <span className="env-value">{String(value)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
