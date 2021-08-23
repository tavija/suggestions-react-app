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

    return (
        <section className="individual-paste">
            <h2>{title}</h2>
            <p>{content}</p>
            <p>Posted at: {time.slice(0,10)} {time.slice(11,16)}</p>
        </section>
    )
 }