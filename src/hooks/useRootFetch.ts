import {useState, useEffect} from "react";
import type {RootFetch} from "../types/fetch";

export function useRootFetch(url: string | undefined) {
  const [rootFetch, setRootFetch] = useState<RootFetch>({status: "idle"});

  useEffect(() => {
    if (!url?.trim()) return;

    const ac = new AbortController();
    queueMicrotask(() => setRootFetch({status: "loading"}));
    fetch(url, {signal: ac.signal, method: "GET"})
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
  }, [url]);

  return rootFetch;
}
