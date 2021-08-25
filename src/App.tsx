import { useEffect, useState } from "react";
import { CreateNewPaste } from "./components/createNewPaste";
import { DisplayPasteHistory } from "./components/displayPasteHistory";
import { Header } from "./components/header";
import "./styles.css";

export interface Paste {
  paste_id: number;
  title: string;
  content: string;
  time: string;
}

function App(): JSX.Element {

  const [pastes, setPastes] = useState<Paste[]>([])

  const getPastes = async () => {
    try {
      const response = await fetch("http://localhost:4000/paste")
      const jsonData = await response.json()

      setPastes(jsonData)

    } catch (err) {
      //might want to display something to the user
      console.error(err.message)
    }
  }
  useEffect(() => {
    getPastes();
  }, []);

  return (
    <div>
      <Header />
      <CreateNewPaste
        fetchPastesList={getPastes}
      />
      <DisplayPasteHistory
        pastesList={pastes}
      />
    </div>
  );
}

export default App;
