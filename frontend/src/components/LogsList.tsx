import { useState, useEffect } from "react";
import type { Log } from "../types";

interface LogsListProps {
  selectedBotId?: string | null;
  selectedWorkerId?: string | null;
}

export default function LogsList({
  selectedBotId,
  selectedWorkerId,
}: LogsListProps) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!selectedBotId) {
      setLogs([]);
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
        setLogs(await result.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [selectedBotId, selectedWorkerId]);

  if (loading) return <div>Loading...</div>;
  if (logs.length === 0) return <div>Select a bot to view logs</div>;
  return (
    <table>
      <thead>
        <tr>
          <th>Message</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{log.message}</td>
            <td>{new Date(log.created).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
