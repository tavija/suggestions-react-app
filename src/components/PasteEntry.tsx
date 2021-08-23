import { useState } from "react";

interface PasteEntryProps {
    paste_id: number;
    title: string;
    content: string;
    time: any;
}

export function PasteEntry({
    paste_id,
    title,
    content,
    time
}: PasteEntryProps): JSX.Element {

    const [readMore, setReadMore] = useState(false);
    const extraContent = <div>
        <p>{content}</p>
    </div>
    const linkName = readMore ? 'Read Less << ' : 'Read More >> '


    return (
        <div className="individual-paste">
            <h2>{title}</h2>
            <div>
                <a className="read-more-link" onClick={() => { setReadMore(!readMore) }}><p>{linkName}</p></a>
                {readMore && extraContent}
            </div>
            <p>Posted at: {time.slice(0, 10)} {time.slice(11, 16)}</p>
        </div>
    )
}