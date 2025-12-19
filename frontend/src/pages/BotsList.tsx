import { useState, useEffect } from "react";
import type { Bot } from "../types";

export default function BotsList() {
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
          <th>Bot list</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {bots.map((bot) => (
          <tr key={bot.id}>
            <td>{bot.name}</td>
            <td>{bot.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
