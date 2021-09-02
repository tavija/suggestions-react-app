import { useEffect, useState } from "react";

import { Header } from "./components/header";
import { NewPaste } from "./components/NewPaste";
import { PasteHistory } from "./components/PasteHistory";
import "./styles.css";

export interface Paste {
  paste_id: number;
  title: string;
  content: string;
  time: string;
}

function App(): JSX.Element {
  const [pastes, setPastes] = useState<Paste[]>([]);

  const getPastes = async () => {
    try {
      const apiBaseURL = process.env.REACT_APP_API_BASE;
      const response = await fetch(apiBaseURL + "/pastes")
      // const response = await fetch(
      //   "https://pastebin-back-end-tavs.herokuapp.com/pastes"
      // );
      const jsonData = await response.json();

      setPastes(jsonData);
    } catch (err) {
      //might want to display something to the user
      console.error(err.message);
    }
  };
  useEffect(() => {
    getPastes();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex-container">
        <NewPaste fetchPastesList={getPastes} />
        <PasteHistory pastesList={pastes} />
      </div>
    </div>
  );
}

export default App;
