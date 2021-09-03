import { useState } from "react";
import { SuggestionProps } from "../Types";
// import SuggestionEntry from "./SuggestionEntry";

interface ISuggestionsHistory {
  suggestionsList: SuggestionProps[];
  user: string;
  votes: number;
  setVotes: React.Dispatch<React.SetStateAction<number>>;
}

export function SuggestionsHistory(props: ISuggestionsHistory): JSX.Element {

  function handleVote() {
    props.setVotes(props.votes + 1)
  }

  const [readMore, setReadMore] = useState(false);

  const extraContent = (content: string) => {
    return (
      <div>
        <p>{content}</p>
      </div>
    )
  };

  const linkName = readMore ? "Read Less << " : "Read Suggestion >> ";

  function giveName(name: string) {
    if (name === "") {
      return "anonymous"
    } else {
      return name
    }
  }
  function handleDelete(){
    console.log("would delete")
  }

  if (props.user === "admin"){
  return (
    <div className="suggestion-history flex-right">
      <h2>All Suggestions</h2>
      <div className="scroll-bar">
        {[...props.suggestionsList].reverse().map((suggestion: SuggestionProps) => (
          <div key={suggestion.suggestion_id} className="individual-suggestion">
            <h2>{suggestion.title}</h2>
            <button
              className="read-more-link"
              onClick={() => {setReadMore(!readMore);}}
            >
              {linkName}
            </button>
            {readMore && extraContent(suggestion.content)}
            <p>
              Posted at: {suggestion.time.slice(0, 10)} {suggestion.time.slice(11, 16)} by {giveName(suggestion.name)}
            </p>
            <p>Total Votes: {props.votes}</p>
            <button onClick={handleDelete}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
  } else {
    return (
      <div className="suggestion-history flex-right">
      <h2>All Suggestions</h2>
      <div className="scroll-bar">
        {[...props.suggestionsList].reverse().map((suggestion: SuggestionProps) => (
          // move to separate component
          <div key={suggestion.suggestion_id} className="individual-suggestion">
            <h2>{suggestion.title}</h2>
            <button
              className="read-more-link"
              onClick={() => {setReadMore(!readMore);}}
            >
              {linkName}
            </button>
            {readMore && extraContent(suggestion.content)}
            <p>
              Posted at: {suggestion.time.slice(0, 10)} {suggestion.time.slice(11, 16)} by {giveName(suggestion.name)}
            </p>
            <button onClick={handleVote}>Upvote</button>
          </div>
          //up to here
        ))}
      </div>
    </div>
    )
  }
}
