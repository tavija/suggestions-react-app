import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { NewSuggestionForm } from "./components/NewSuggestion";
import { SuggestionsHistory } from "./components/SuggestionsHistory";
import "./styles.css";
import { PageId, SuggestionProps } from "./Types";


function App(): JSX.Element {
  const [suggestionsList, setSuggestionsList] = useState<SuggestionProps[]>([]);
  const [username, setUsername] = useState("Tavija");
  const [pageView, setPageView] = useState<PageId>("allSuggestions");

  const apiBaseURL = process.env.REACT_APP_API_BASE;
  const getSuggestions = async () => {
    try {
      const response = await fetch(apiBaseURL + "/suggestions");
      const receivedSuggestions = await response.json();
      
      if (response.status === 200){
        setSuggestionsList(receivedSuggestions);
      } else {
        console.error("Failed to post suggestion. Error: ", response.status)
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  
  useEffect(() => {
    getSuggestions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  //Send POST request to send vote to DB when 'Upvote' button is clicked
  async function handleVote(suggestionId: number) {
    const body = {suggestion_id: suggestionId, username};
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    if (typeof suggestionId === "number") {
      try {
        const response = await fetch(apiBaseURL + "/vote", requestOptions);

        if (response.status === 201){ //Success response status
          getSuggestions();
        } else {
          console.error("Failed to post vote. Error: ", response.status)
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  //Send DELETE request to delete suggestion from DB when 'Delete' button is clicked
  async function handleDelete(suggestionId: number) {
    if (typeof suggestionId === "number") {
      try {
        const response = await fetch(
          apiBaseURL + "/suggestion/" + suggestionId.toString(),
          { method: "DELETE" }
        );
        if (response.status === 200){ //Success response status
          getSuggestions();
        } else {
          console.error("Failed to delete. Error: ", response.status)
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  return (
    <div className="app">
      <Header
        setUsername={setUsername}
        setPageView={setPageView}
        pageView={pageView}
        username={username}
      />
      {pageView === "newSuggestion" && (
        <NewSuggestionForm 
          fetchSuggestionsList={getSuggestions}
          username={username}
        />
      )}
      {pageView === "allSuggestions" && (
        <SuggestionsHistory
          suggestionsList={suggestionsList}
          username={username}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
