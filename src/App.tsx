import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { NewSuggestion } from "./components/NewSuggestion";
import { SuggestionsHistory } from "./components/SuggestionsHistory";
import "./styles.css";
import { SuggestionProps } from "./Types";

function App(): JSX.Element {
  const [suggestionsList, setSuggestionsList] = useState<SuggestionProps[]>([]);
  const [username, setUsername] = useState("Tavija");
  const [pageView, setPageView] = useState("allSuggestions");

  const apiBaseURL = process.env.REACT_APP_API_BASE;
  const getSuggestions = async () => {
    try {
      const response = await fetch(apiBaseURL + "/suggestions");
      const jsonData = await response.json();

      setSuggestionsList(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getSuggestions();
  });

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
        const response = await fetch(apiBaseURL + "/vote", requestOptions);
        console.log(await response.json());

        getSuggestions();
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  //DELETE request to delete suggestion from DB when 'Delete' button is clicked
  async function handleDelete(suggestion_id: number) {
    if (typeof suggestion_id === "number") {
      try {
        console.log("would delete with id: ", suggestion_id);
        const response = await fetch(
          apiBaseURL + "/suggestion/" + suggestion_id.toString(),
          { method: "DELETE" }
        );
        console.log(await response.json());
        getSuggestions();
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  return (
    <div className="app">
      <Header
        pageTitle={(pageView === "allSuggestions")? "Suggestions Box" : "Make a suggestion"}
        setUsername={setUsername}
        setPageView={setPageView}
        pageView={pageView}
        username={username}
      />
      {pageView === "newSuggestion" && (
        <NewSuggestion
          fetchSuggestionsList={getSuggestions}
          setUsername={setUsername}
          setPageView={setPageView}
          pageView={pageView}
          username={username}
        />
      )}
      {pageView === "allSuggestions" && (
        <SuggestionsHistory
          suggestionsList={suggestionsList}
          username={username}
          handleVote={handleVote}
          handleDelete={handleDelete}
          setUsername={setUsername}
          setPageView={setPageView}
          pageView={pageView}
        />
      )}
    </div>
  );
}

export default App;
