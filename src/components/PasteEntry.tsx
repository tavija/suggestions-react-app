import { useState } from "react";

interface PasteEntryProps {
  paste_id: number;
  title: string;
  content: string;
  time: string;
}

export function PasteEntry({
  paste_id,
  title,
  content,
  time,
}: PasteEntryProps): JSX.Element {
  const [readMore, setReadMore] = useState(false);
  const extraContent = (
    <div>
      <p>{content}</p>
    </div>
  );
  const linkName = readMore ? "Read Less << " : "Read Content >> ";

  return (
    <div className="individual-paste">
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
        Posted at: {time.slice(0, 10)} {time.slice(11, 16)}
      </p>
    </div>
  );
}
