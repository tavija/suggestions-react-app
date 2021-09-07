import { useEffect, useState } from "react";
import { SuggestionProps } from "../Types";

interface ISuggestionsHistory {
  suggestion: SuggestionProps;
  handleDelete(suggestionId: number): Promise<void>;
  handleVote(suggestionId: number): Promise<void>;
  username: string;
}

export function SuggestionEntry(props: ISuggestionsHistory): JSX.Element {
  const [votesCount, setVotesCount] = useState(0);

  function handleClick(action: string) {
    if (action === "delete") {
      return props.handleDelete(props.suggestion.suggestion_id);
    } else if (action === "vote") {
      return props.handleVote(props.suggestion.suggestion_id);
    }
  }

  const getVotesForSuggestion = async (suggestionId: number) => {
    try {
      const apiBaseURL = process.env.REACT_APP_API_BASE;
      const response = await fetch(
        apiBaseURL + "/votes/" + suggestionId.toString()
      );
      const jsonData = await response.json();

      const votesCount = jsonData.data.getVotesForSuggestion[0].total_votes;

      setVotesCount(votesCount);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getVotesForSuggestion(props.suggestion.suggestion_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[getVotesForSuggestion]);

  //TODO deal with empty input
  function formatTime(){
    return " " + props.suggestion.time.slice(0, 10)+ " " +
        props.suggestion.time.slice(11, 16)
  }

  return (
    <div className="individual-suggestion">
      <h2>{props.suggestion.title}</h2>
      <p className="suggestion-content">{props.suggestion.content}</p>
      <br></br>
      <p className="suggestion-info">
        <b>{votesCount} votes.</b> Posted at:{formatTime()} by {props.suggestion.name}
      </p>
      <div className="center">
        {props.username.toLowerCase() === "admin" && (
          <button className="button" onClick={() => handleClick("delete")}>
            Delete
          </button>
        )}
        <button className="button" onClick={() => handleClick("vote")}>
          Upvote
        </button>
      </div>
    </div>
  );
}
