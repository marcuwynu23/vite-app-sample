import React from "react";
import {useRootFetch} from "../hooks/useRootFetch";
import {EnvList} from "../components/EnvList";
import {FetchResult} from "../components/FetchResult";

const env = import.meta.env;
const viteAppVars = Object.entries(env).filter(([key]) =>
  key.startsWith("VITE_APP_"),
);
const viteAppUrl = env.VITE_APP_URL as string | undefined;

export const Home: React.FC = () => {
  const rootFetch = useRootFetch(viteAppUrl);

  return (
    <div className="card">
      <header className="card-header">
        <span className="badge">Vite</span>
        <h1 className="title">Environment variables</h1>
        <p className="subtitle">
          <code>VITE_APP_*</code> keys from your config
        </p>
      </header>

      <EnvList vars={viteAppVars} />

      {viteAppUrl?.trim() && (
        <FetchResult url={viteAppUrl} result={rootFetch} />
      )}
    </div>
  );
};
