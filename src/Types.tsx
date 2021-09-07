export interface SuggestionProps {
  suggestion_id: number;
  title: string;
  content: string;
  name: string;
  time: string;
}

export type PageId = "allSuggestions" | "newSuggestion";