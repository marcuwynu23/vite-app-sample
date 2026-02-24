import {useEffect, useState} from "react";
import "./App.css";

const env = import.meta.env;
const viteAppVars = Object.entries(env).filter(([key]) =>
  key.startsWith("VITE_APP_"),
);
const viteAppUrl = env.VITE_APP_URL as string | undefined;

type RootFetch =
  | {status: "idle"}
  | {status: "loading"}
  | {status: "ok"; statusCode: number; body: string}
  | {status: "error"; message: string};

function App() {
  const [rootFetch, setRootFetch] = useState<RootFetch>({status: "idle"});

  useEffect(() => {
    if (!viteAppUrl?.trim()) return;

    const ac = new AbortController();
    queueMicrotask(() => setRootFetch({status: "loading"}));
    fetch(viteAppUrl, {signal: ac.signal, method: "GET"})
      .then(async (res) => {
        const body = await res.text();
        setRootFetch({
          status: "ok",
          statusCode: res.status,
          body: body.slice(0, 2000) + (body.length > 2000 ? "…" : ""),
        });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setRootFetch({
          status: "error",
          message: err instanceof Error ? err.message : String(err),
        });
      });
    return () => ac.abort();
  }, []);

  return (
    <div className="app">
      <div className="card">
        <header className="card-header">
          <span className="badge">Vite</span>
          <h1 className="title">Environment variables</h1>
          <p className="subtitle">
            <code>VITE_APP_*</code> keys from your config
          </p>
        </header>

        {viteAppVars.length === 0 ? (
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
        ) : (
          <ul className="env-list" aria-label="Environment variables">
            {viteAppVars.map(([key, value], i) => (
              <li
                key={key}
                className="env-item"
                style={{animationDelay: `${i * 40}ms`}}
              >
                <span className="env-key">{key}</span>
                <span className="env-value">{String(value)}</span>
              </li>
            ))}
          </ul>
        )}
        {/* 
        <p className="hint">
          (Note: Vite only exposes variables starting with <code>VITE_</code> to
          the client. Other variables are not included in the bundle and cannot
          be accessed from the browser.)
        </p> */}
        {viteAppUrl?.trim() && (
          <section className="root-fetch" aria-label="Root fetch result">
            <h2 className="root-fetch-title">GET {viteAppUrl}</h2>
            {rootFetch.status === "loading" && (
              <p className="root-fetch-loading">Loading…</p>
            )}
            {rootFetch.status === "ok" && (
              <div className="root-fetch-ok">
                <p className="root-fetch-status">HTTP {rootFetch.statusCode}</p>
                <pre className="root-fetch-body">
                  {rootFetch.body || "(empty)"}
                </pre>
              </div>
            )}
            {rootFetch.status === "error" && (
              <p className="root-fetch-error">{rootFetch.message}</p>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
