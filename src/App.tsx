import { useEffect, useState } from "react";

import { Header } from "./components/header";
import { NewSuggestion } from "./components/NewSuggestion";
import { SuggestionsHistory } from "./components/SuggestionsHistory";
import "./styles.css";
import { SuggestionProps } from "./Types";


function App(): JSX.Element {
  const [suggestionsList, setSuggestionsList] = useState<SuggestionProps[]>([]);

  const getSuggestions = async () => {
    try {
      const apiBaseURL = process.env.REACT_APP_API_BASE;
      const response = await fetch(apiBaseURL + "/suggestions")

      const jsonData = await response.json();

      setSuggestionsList(jsonData);
    } catch (err) {
      //might want to display something to the user
      console.error(err.message);
    }
  };
  useEffect(() => {
    getSuggestions();
  }, []);

  return (
    <div>
      <Header pageTitle="Suggestion Box"/>
      <div className="flex-container">
        <NewSuggestion fetchSuggestionsList={getSuggestions} />
        <SuggestionsHistory suggestionsList={suggestionsList} />
      </div>
    </div>
  );
}

export default App;
