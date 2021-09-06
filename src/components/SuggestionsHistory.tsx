import { SuggestionProps } from "../Types";
import { Header } from "./header";
import SuggestionEntry from "./SuggestionEntry";

interface ISuggestionsHistory {
  suggestionsList: SuggestionProps[];
  username: string;
  handleDelete: (suggestion_id: number) => Promise<void>;
  handleVote: (suggestion_id: number) => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPageView: React.Dispatch<React.SetStateAction<string>>;
  pageView: string;
}

export function SuggestionsHistory(props: ISuggestionsHistory): JSX.Element {
  return (
    <div>
      <Header
        pageTitle="Suggestions Box"
        setUsername={props.setUsername}
        setPageView={props.setPageView}
        pageView={props.pageView}
        username={props.username}
      />
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
      </div>
    </div>
  );
}
