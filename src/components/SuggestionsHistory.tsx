import { SuggestionProps } from "../Types";
import SuggestionEntry from "./SuggestionEntry";

interface ISuggestionsHistory{
  suggestionsList: SuggestionProps[]
}

export function SuggestionsHistory(props: ISuggestionsHistory): JSX.Element {
  return (
    <div className="suggestion-history flex-right">
      <h2>All Suggestions</h2>
      <div className="scroll-bar">
        {/* slice creates shallow copy, reverse reverses it*/}
        {[...props.suggestionsList].reverse().map((suggestion: SuggestionProps) => (
          <SuggestionEntry key={suggestion.suggestion_id} {...suggestion} />
        ))}
      </div>
    </div>
  );
}
