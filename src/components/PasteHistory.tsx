import { Paste } from "../App";
import { PasteEntry } from "./PasteEntry";

interface PasteHistoryProps {
  pastesList: Paste[];
}

export function PasteHistory(props: PasteHistoryProps): JSX.Element {
  return (
    <div className="paste-history flex-right">
      <h2>Previous Pastes</h2>
      <div className="scroll-bar">
        {/* slice creates shallow copy, reverse reverses it*/}
        {[...props.pastesList].reverse().map((paste: Paste) => (
          <PasteEntry key={paste.paste_id} {...paste} />
        ))}
      </div>
    </div>
  );
}
