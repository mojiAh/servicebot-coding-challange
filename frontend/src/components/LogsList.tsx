import { useLogs } from "../hooks";
import type { Worker } from "../types";

interface LogsListProps {
  selectedBotId: string | null;
  selectedWorker: Worker | null;
}

export default function LogsList({
  selectedBotId,
  selectedWorker,
}: LogsListProps) {
  const selectedWorkerId = selectedWorker?.id ?? null;
  const selectedWorkerName = selectedWorker?.name ?? null;
  const {
    data: logs,
    loading,
    error,
  } = useLogs({ selectedBotId, selectedWorkerId });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading: {error.message}</div>;
  if (logs.length === 0) return <div>Select a bot to view logs</div>;
  return (
    <table>
      <caption className="table-caption">
        <span>Logs ({`${logs.length}`})</span>
        {selectedWorkerId && (
          <span className="sub-caption">Worker: {selectedWorkerName}</span>
        )}
      </caption>
      <colgroup>
        <col className="col-message" />
        <col className="col-date" />
      </colgroup>
      <thead>
        <tr>
          <th>Message</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td title={log.message}>{log.message}</td>
            <td className="col-date">
              {new Date(log.created).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
