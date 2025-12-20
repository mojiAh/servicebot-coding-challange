import { useLogs } from "../hooks";

interface LogsListProps {
  selectedBotId: string | null;
  selectedWorkerId: string | null;
}

export default function LogsList({
  selectedBotId,
  selectedWorkerId,
}: LogsListProps) {
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
      <caption className="table-caption">Logs ({`${logs.length}`})</caption>
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
            <td>{log.message}</td>
            <td className="col-date">
              {new Date(log.created).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
