import { useState, useEffect } from "react";
import type { Bot } from "../types";

export default function useBots() {
  const [data, setData] = useState<Bot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const result = await fetch("http://localhost:3000/bots");
        if (!result.ok) {
          throw new Error(`Response status: ${result.status}`);
        }
        setData(await result.json());
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBots();
  }, []);
  return { data, loading };
}
