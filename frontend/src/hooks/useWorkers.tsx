import { useState, useEffect } from "react";
import type { Worker } from "../types";

export default function useWorkers(selectedBotId: string | null) {
  const [data, setData] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      if (!selectedBotId) {
        setData([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const result = await fetch(
          `http://localhost:3000/bots/${selectedBotId}/workers`
        );
        if (!result.ok) {
          throw new Error(`Response status: ${result.status}`);
        }
        setData(await result.json());
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [selectedBotId]);
  return { data, loading, error };
}
