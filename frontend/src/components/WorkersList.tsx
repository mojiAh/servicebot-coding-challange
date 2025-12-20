import { useWorkers } from "../hooks";
import type { Worker } from "../types";

interface WorkersListProps {
  selectedBotId: string | null;
  selectedWorker: Worker | null;
  onSelectWorker: (worker: Worker) => void;
}

export default function WorkersList({
  selectedBotId,
  selectedWorker,
  onSelectWorker,
}: WorkersListProps) {
  const { data: workers, loading, error } = useWorkers(selectedBotId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading: {error.message}</div>;
  if (workers.length === 0) return <div>Select a bot to view workers</div>;
  return (
    <table>
      <caption className="table-caption">
        Workers ({`${workers.length}`})
      </caption>
      <colgroup>
        <col className="col-name" />
        <col className="col-description" />
        <col className="col-date" />
      </colgroup>
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
            onClick={() => onSelectWorker(worker)}
            className={worker.id === selectedWorker?.id ? "selected" : ""}
          >
            <td>{worker.name}</td>
            <td>{worker.description}</td>
            <td className="col-date">
              {new Date(worker.created).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
