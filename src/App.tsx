import { useEffect, useState } from "react";

import { Header } from "./components/header";
import { NewSuggestion } from "./components/NewSuggestion";
import { SuggestionsHistory } from "./components/SuggestionsHistory";
import "./styles.css";
import { SuggestionProps } from "./Types";


function App(): JSX.Element {
  const [suggestionsList, setSuggestionsList] = useState<SuggestionProps[]>([]);
  const [user, setUser] = useState("admin")
  const [votes, setVotes] = useState(0)
  const [pageView, setPageView] = useState("allSugestions")

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
      <Header pageTitle="Suggestions Box" setUser={setUser} setPageView={setPageView}/>
      <div className="flex-container">
        {pageView === "enterNewSuggestion" && <NewSuggestion fetchSuggestionsList={getSuggestions} />}
        {pageView === "allSugestions" && <SuggestionsHistory suggestionsList={suggestionsList} user={user} setVotes={setVotes }votes={votes}/>}
      </div>
    </div>
  );
}

export default App;
