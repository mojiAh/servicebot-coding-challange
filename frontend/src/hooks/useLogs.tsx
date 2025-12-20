import { useState, useEffect } from "react";
import type { Log } from "../types";

export default function useLogs({
  selectedBotId,
  selectedWorkerId,
}: {
  selectedBotId: string | null;
  selectedWorkerId: string | null;
}) {
  const [data, setData] = useState<Log[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!selectedBotId) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const fetchLogs = async () => {
      try {
        const result = await fetch(
          !selectedWorkerId
            ? `http://localhost:3000/bots/${selectedBotId}/logs`
            : `http://localhost:3000/bots/${selectedBotId}/workers/${selectedWorkerId}/logs`
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

    fetchLogs();
  }, [selectedBotId, selectedWorkerId]);
  return { data, loading };
}
