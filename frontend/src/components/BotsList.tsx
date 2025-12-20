import { useState, useEffect } from "react";
import type { Bot } from "../types";

interface BotsListProps {
  selectedBotId: string | null;
  onSelectBotId: (botId: string) => void;
}

export default function BotsList({
  selectedBotId,
  onSelectBotId,
}: BotsListProps) {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const result = await fetch("http://localhost:3000/bots");
        if (!result.ok) {
          throw new Error(`Response status: ${result.status}`);
        }
        setBots(await result.json());
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBots();
  }, []);

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
