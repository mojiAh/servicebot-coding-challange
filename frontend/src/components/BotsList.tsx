import { useBots } from "../hooks";

interface BotsListProps {
  selectedBotId: string | null;
  onSelectBotId: (botId: string) => void;
}

export default function BotsList({
  selectedBotId,
  onSelectBotId,
}: BotsListProps) {
  const { data: bots, loading, error } = useBots();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading: {error.message}</div>;
  if (bots.length === 0) return <div>No Bots found</div>;
  return (
    <table>
      <caption className="table-caption">Bots ({`${bots.length}`})</caption>
      <colgroup>
        <col className="col-name" />
        <col className="col-description" />
        <col className="col-status" />
        <col className="col-date" />
      </colgroup>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {bots.map((bot) => (
          <tr
            key={bot.id}
            onClick={() => onSelectBotId(bot.id)}
            className={bot.id === selectedBotId ? "selected" : ""}
          >
            <td>{bot.name}</td>
            <td>{bot.description}</td>
            <td>{bot.status}</td>
            <td className="col-date">
              {new Date(bot.created).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
