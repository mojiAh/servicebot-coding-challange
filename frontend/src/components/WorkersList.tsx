import { useState, useEffect } from "react";
import type { Worker } from "../types";

interface WorkersListProps {
  selectedBotId?: string;
  selectedWorkerId?: string;
  onSelectWorkerId: (workerId: string) => void;
}

export default function WorkersList({
  selectedBotId,
  selectedWorkerId,
  onSelectWorkerId,
}: WorkersListProps) {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchWorkers = async () => {
      if (!selectedBotId) {
        setWorkers([]);
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
        setWorkers(await result.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [selectedBotId]);

  if (loading) return <div>Loading...</div>;
  if (workers.length === 0) return <div>No Workers for found</div>;
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
