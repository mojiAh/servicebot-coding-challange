import { useState, useEffect } from "react";
import type { Worker } from "../types";

export default function useWorkers(selectedBotId: string | null) {
  const [data, setData] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [selectedBotId]);
  return { data, loading };
}
