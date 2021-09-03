import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { NewSuggestion } from "./components/NewSuggestion";
import { SuggestionsHistory } from "./components/SuggestionsHistory";
import "./styles.css";
import { SuggestionProps } from "./Types";


function App(): JSX.Element {
  const [suggestionsList, setSuggestionsList] = useState<SuggestionProps[]>([]);
  const [username, setUsername] = useState("admin")
  //TODO delete votes useState when POST request for vote has been coded in handleVote()
  const [pageView, setPageView] = useState("allSugestions")

  const getSuggestions = async () => {
    try {
      const apiBaseURL = process.env.REACT_APP_API_BASE;
      const response = await fetch(apiBaseURL + "/suggestions")
      const jsonData = await response.json();
      
      setSuggestionsList(jsonData)
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  //POST request to send vote to DB when 'Upvote' button is clicked
  async function handleVote(suggestion_id: number) {
    const body = { suggestion_id, username };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    if (typeof suggestion_id === "number") {
      try {
        const apiBaseURL = process.env.REACT_APP_API_BASE;
        const response = await fetch(apiBaseURL + "/vote", requestOptions)
        console.log(await response.json());
        getSuggestions();
      } catch (err) {
        console.error(err.message);
      }
    }
  }


  function handleDelete() {
    console.log("would delete")
  }

  return (
    <div>
      <Header pageTitle="Suggestions Box" setUsername={setUsername} setPageView={setPageView} />
      <div className="flex-container">
        {pageView === "enterNewSuggestion" &&
          <NewSuggestion fetchSuggestionsList={getSuggestions} />}
        {pageView === "allSugestions" &&
          <SuggestionsHistory
            suggestionsList={suggestionsList}
            username={username}
            handleVote={handleVote}
            handleDelete={handleDelete}
          />}
      </div>
    </div>
  );
}

export default App;
