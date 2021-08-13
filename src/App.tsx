import { CreateNewPaste } from "./components/createNewPaste";
import { DisplayPasteHistory } from "./components/displayPasteHistory";
import { Header } from "./components/header";
import "./styles.css";

function App(): JSX.Element {
  
  return (
    <div>
      <Header />
      <CreateNewPaste />
      <DisplayPasteHistory />
    </div>
  );
}

export default App;
