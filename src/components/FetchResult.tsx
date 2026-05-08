import React from "react";
import type {RootFetch} from "../types/fetch";

interface FetchResultProps {
  url: string;
  result: RootFetch;
}

export const FetchResult: React.FC<FetchResultProps> = ({url, result}) => {
  return (
    <section className="root-fetch" aria-label="Root fetch result">
      <h2 className="root-fetch-title">GET {url}</h2>
      {result.status === "loading" && (
        <p className="root-fetch-loading">Loading…</p>
      )}
      {result.status === "ok" && (
        <div className="root-fetch-ok">
          <p className="root-fetch-status">HTTP {result.statusCode}</p>
          <pre className="root-fetch-body">{result.body || "(empty)"}</pre>
        </div>
      )}
      {result.status === "error" && (
        <p className="root-fetch-error">{result.message}</p>
      )}
    </section>
  );
};
