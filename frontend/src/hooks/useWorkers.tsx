import { useState, useEffect } from "react";
import { fetchJson } from "../api";
import type { Worker } from "../types";

export default function useWorkers(selectedBotId: string | null) {
  const [data, setData] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!selectedBotId) {
      setData([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchJson<Worker[]>(`/bots/${selectedBotId}/workers`)
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        setError(e as Error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedBotId]);
  return { data, loading, error };
}
