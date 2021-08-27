import { useState } from "react";

interface NewPasteProps {
    fetchPastesList: () => Promise<void> //could be just () => void
}

export function newPaste(props: NewPasteProps): JSX.Element {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");


    async function submitPaste(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const body = { title, content }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        resetPaste()
        try {
            const response = await fetch('http://localhost:4000/paste', requestOptions);
            console.log(await response.json())

            //tells the parent to call the function to getPastes again to display new info
            props.fetchPastesList() //if there was follow up action, then use await
        } catch (err) {
            console.error(err.message);
        }
    }

    function resetPaste() {
        setContent("")
        setTitle("")
    }

    return (
        <section className="form flex-left">
            <h2>Please type in the title and content</h2>
            <form id="submitPaste" onSubmit={submitPaste}>
                <label className="form-label">Title (optional): </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => { setTitle(event.target.value) }}
                    className="title-box" />
                <br />
                <label className="form-label">Content: </label>
                <input
                    type="text"
                    id="content"
                    value={content}
                    onChange={(event) => { setContent(event.target.value) }}
                    className="content-box" />
                <br />
                <input type="submit" value="Submit" className="button" />
                <button type="reset" onClick={resetPaste} className="button">Reset</button>
            </form>
        </section>
    );
}