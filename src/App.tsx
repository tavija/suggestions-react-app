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
  const [votes, setVotes] = useState(0)
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

  function handleVote(suggestion_id: number) {
    //POST request to send vote to DB
    setVotes(votes + 1)
    console.log({ votes }, { suggestion_id })
    const body = { suggestion_id, username };
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(body),
    // };
    // if (title !== "") {
    //   console.log({ title })

    //   try {
    //     const apiBaseURL = process.env.REACT_APP_API_BASE;
    //     const response = await fetch(apiBaseURL + "/suggestion", requestOptions)

    //     console.log(await response.json());

    //     //tells the parent to call the function to getSuggestions again to display new info
    //     props.fetchSuggestionsList(); //if there was follow up action, then use await
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    //   resetSuggestion();
    // } else {
    //   console.log("empty title")
    // }
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
            setVotes={setVotes}
            handleVote={handleVote}
            handleDelete={handleDelete}
          />}
      </div>
    </div>
  );
}

export default App;
