import { SuggestionProps } from "../Types";
import { SuggestionEntry } from "./SuggestionEntry";

interface ISuggestionsHistory {
  suggestionsList: SuggestionProps[];
  username: string;
  handleDelete: (suggestion_id: number) => Promise<void>;
  handleVote: (suggestion_id: number) => void;
  // setUsername: React.Dispatch<React.SetStateAction<string>>;
  // setPageView: React.Dispatch<React.SetStateAction<string>>;
  // pageView: string;
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
