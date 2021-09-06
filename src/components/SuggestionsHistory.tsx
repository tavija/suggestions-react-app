import { SuggestionProps } from "../Types";
import SuggestionEntry from "./SuggestionEntry";

interface ISuggestionsHistory {
  suggestionsList: SuggestionProps[];
  username: string;
  handleDelete: () => void;
  handleVote: (suggestion_id: number) => void;
}

export function SuggestionsHistory(props: ISuggestionsHistory): JSX.Element {
  return (
    <div className="suggestion-history flex-right">
      <h2>All Suggestions</h2>
      {[...props.suggestionsList]
        .reverse()
        .map((suggestion: SuggestionProps) => (
          <SuggestionEntry
            key={suggestion.suggestion_id}
            suggestion={suggestion}
            handleVote={props.handleVote}
            handleDelete={props.handleDelete}
            username={props.username}
          />
        ))}
    </div>
  );
}
