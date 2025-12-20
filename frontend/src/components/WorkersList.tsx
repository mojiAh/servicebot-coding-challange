import { useWorkers } from "../hooks";

interface WorkersListProps {
  selectedBotId: string | null;
  selectedWorkerId?: string | null;
  onSelectWorkerId: (workerId: string) => void;
}

export default function WorkersList({
  selectedBotId,
  selectedWorkerId,
  onSelectWorkerId,
}: WorkersListProps) {
  const { data: workers, loading } = useWorkers(selectedBotId);

  if (loading) return <div>Loading...</div>;
  if (workers.length === 0) return <div>Select a bot to view workers</div>;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {workers.map((worker) => (
          <tr
            key={worker.id}
            onClick={() => onSelectWorkerId(worker.id)}
            className={worker.id === selectedWorkerId ? "selected" : ""}
          >
            <td>{worker.name}</td>
            <td>{worker.description}</td>
            <td>{new Date(worker.created).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
