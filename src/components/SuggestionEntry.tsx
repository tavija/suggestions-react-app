import { useState } from "react";
import { SuggestionProps } from "../Types";

export default function SuggestionEntry({
  title,
  content,
  name,
  time,
}: SuggestionProps): JSX.Element {
  const [readMore, setReadMore] = useState(false);
  const extraContent = (
    <div>
      <p>{content}</p>
    </div>
  );
  const linkName = readMore ? "Read Less << " : "Read Suggestion >> ";
  
  function giveName(){
    if (name ===""){
      return "anonymous"
    } else {
      return name
    }
  }
  
  return (
    <div className="individual-suggestion">
      <h2>{title}</h2>
      <button
        className="read-more-link"
        onClick={() => {
          setReadMore(!readMore);
        }}
      >
        {linkName}
      </button>
      {readMore && extraContent}
      <p>
        Posted at: {time.slice(0, 10)} {time.slice(11, 16)} by {giveName()}
      </p>
    </div>
  );
}
