import { SuggestionProps } from "../Types";
import { SuggestionEntry } from "./SuggestionEntry";

interface ISuggestionsHistory {
  suggestionsList: SuggestionProps[];
  username: string;
  handleDelete: (suggestionId: number) => Promise<void>;
  handleVote: (suggestionId: number) => Promise<void>;
}

export function SuggestionsHistory(props: ISuggestionsHistory): JSX.Element {
  return (
    <div>
      <div className="suggestion-history">
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
        {props.suggestionsList.length === 0 && (
          <h3 className="center">
            Suggestion box is empty. Maybe you could submit one?
          </h3>
        )}
      </div>
    </div>
  );
}
