import { Paste } from "../App";
import { PasteEntry } from "./PasteEntry";

interface DisplayPasteHistoryProps {
    pastesList: Paste[];
}

export function DisplayPasteHistory(props: DisplayPasteHistoryProps): JSX.Element {
    return (
        <div className="paste-history">
            <h1>Previous Pastes</h1>
            <div>
                {/* slice creates shallow copy, reverse reverses it*/}
                {[...props.pastesList].reverse().map((paste: Paste) => (
                    <PasteEntry
                        key={paste.paste_id}
                        {...paste}
                    />))}
            </div>
        </div>
    );
}