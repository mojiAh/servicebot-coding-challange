import { useState } from "react";
import "./App.css";
import BotsList from "./components/BotsList";
import WorkersList from "./components/WorkersList";
import LogsList from "./components/LogsList";

function App() {
  const [selectedBotId, setSelectedBotId] = useState<string | null>(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

  const handleSelectedBotId = (botId: string) => {
    setSelectedBotId(botId);
    setSelectedWorkerId(null);
  };

  return (
    <div className="layout">
      <div className="column">
        <BotsList
          selectedBotId={selectedBotId}
          onSelectBotId={handleSelectedBotId}
        />
      </div>
      <div className="column">
        <WorkersList
          selectedBotId={selectedBotId}
          selectedWorkerId={selectedWorkerId}
          onSelectWorkerId={setSelectedWorkerId}
        />
      </div>
      <div className="column">
        <LogsList
          selectedBotId={selectedBotId}
          selectedWorkerId={selectedWorkerId}
        />
      </div>
    </div>
  );
}

export default App;
