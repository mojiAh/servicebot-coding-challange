import { useState, useEffect } from "react";
import { fetchJson } from "../api";
import type { Bot } from "../types";

export default function useBots() {
  const [data, setData] = useState<Bot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchJson<Bot[]>("/bots")
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        setError(e as Error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return { data, loading, error };
}
