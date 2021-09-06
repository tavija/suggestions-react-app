import { useEffect, useState } from "react";
import { SuggestionProps } from "../Types";

interface ISuggestionsHistory {
  suggestion: SuggestionProps;
  handleDelete: (suggestion_id: number) => Promise<void>;
  handleVote: (suggestion_id: number) => void;
  username: string;
}

export default function SuggestionEntry(
  props: ISuggestionsHistory
): JSX.Element {
  const [votesCount, setVotesCount] = useState(0);

  function handleClick(user: string) {
    if (user === "admin") {
      return props.handleDelete(props.suggestion.suggestion_id);
    } else {
      return props.handleVote(props.suggestion.suggestion_id);
    }
  }

  function giveName() {
    if (props.suggestion.name === "") {
      return "anonymous";
    } else {
      return props.suggestion.name;
    }
  }

  function buttonName(username: string) {
    if (username === "admin") {
      return "Delete";
    } else {
      return "Upvote";
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
  });

  return (
    <div className="individual-suggestion">
      <h2>{props.suggestion.title}</h2>
      <p>{props.suggestion.content}</p>
      <br></br>
      <p className="suggestion-info">
        <b>{votesCount} votes.</b> Posted at: {props.suggestion.time.slice(0, 10)}{" "}
        {props.suggestion.time.slice(11, 16)} by {giveName()}
      </p>
      <div className="center">
      {props.username === "admin" && (
        <button className="button" onClick={() => handleClick("user")}>
          {buttonName("user")}
        </button>
      )}
      <button className="button" onClick={() => handleClick(props.username)}>
        {buttonName(props.username)}
      </button>
      </div>
    </div>
  );
}
