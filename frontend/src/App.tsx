import { useState } from "react";
import "./App.css";
import BotsList from "./components/BotsList";
import WorkersList from "./components/WorkersList";
import LogsList from "./components/LogsList";
import type { Bot, Worker } from "./types";

function App() {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

  const selectedBotId = selectedBot?.id ?? null;
  const selectedBotName = selectedBot?.name ?? null;

  const handleSelectedBot = (bot: Bot) => {
    setSelectedBot(bot);
    setSelectedWorker(null);
  };

  return (
    <div className="layout">
      <div className="layout-header">
        {selectedBotId && (
          <span>
            Selected Bot: <strong>{selectedBotName}</strong>
          </span>
        )}
      </div>
      <div className="layout-body">
        <div className="column">
          <BotsList selectedBot={selectedBot} onSelectBot={handleSelectedBot} />
        </div>
        <div className="column">
          <WorkersList
            selectedBotId={selectedBotId}
            selectedWorker={selectedWorker}
            onSelectWorker={setSelectedWorker}
          />
        </div>
        <div className="column">
          <LogsList
            selectedBotId={selectedBotId}
            selectedWorker={selectedWorker}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
