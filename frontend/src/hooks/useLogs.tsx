import { useState, useEffect } from "react";
import { fetchJson } from "../api";
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
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!selectedBotId) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    fetchJson<Log[]>(
      !selectedWorkerId
        ? `/bots/${selectedBotId}/logs`
        : `/bots/${selectedBotId}/workers/${selectedWorkerId}/logs`
    )
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        setError(e as Error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedBotId, selectedWorkerId]);
  return { data, loading, error };
}
