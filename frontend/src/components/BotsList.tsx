import { useBots } from "../hooks";

interface BotsListProps {
  selectedBotId: string | null;
  onSelectBotId: (botId: string) => void;
}

export default function BotsList({
  selectedBotId,
  onSelectBotId,
}: BotsListProps) {
  const { data: bots, loading } = useBots();

  if (loading) return <div>Loading...</div>;
  if (bots.length === 0) return <div>No Bots found</div>;
  return (
    <table>
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
            <td>{new Date(bot.created).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
