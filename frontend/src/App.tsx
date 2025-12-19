import { useState } from "react";
import "./App.css";
import BotsList from "./pages/BotsList";

function App() {
  const [selectedBotId, setSelectedBotId] = useState<string>();
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>();

  return (
    <>
      <BotsList
        selectedBotId={selectedBotId}
        onSelectBotId={setSelectedBotId}
      />
    </>
  );
}

export default App;
