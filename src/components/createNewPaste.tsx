import { useEffect, useState } from "react";

//Used to only fetch data
// const fetchData = () => {
//   return fetch("http://localhost:4000/")
//     .then((response) => response.json())
//     .then((data) => console.log(data))
// }

export function CreateNewPaste(): JSX.Element {
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("");

    //will rerender when there is any changes
    // useEffect(() => {
    //   fetchData();
    // }, []);

    //will rerender page only if isFirstLoad has been changed
    useEffect(() => {
        if (isFirstLoad) {
            loadDataFromEndPoint("/paste");
            setIsFirstLoad(false);
        }
    }, [isFirstLoad])

    const loadDataFromEndPoint = async (endpoint: `${string}`) => {
        try {
            const res = await fetch((`http://localhost:4000${endpoint}`))
            // const body = await res.json();
            // console.log({ endpoint })
            // console.log(body)
        } catch (err) {
            console.error(err.message)
            //or use setMessage method using states to return message
            //console.log(err);
            //setMessage(`${err.name}: ${err.message}`);
        }
    }


    async function submitPaste(event: React.FormEvent<HTMLFormElement>) {
        console.log(typeof event)
        console.log(title, content)
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
        } catch (err) {
            console.error(err.message);
        }
    }

    function resetPaste(){
        setContent("")
        setTitle("")
        //setIsFirstLoad(true);
    }

    return (
        <section className="form">
            <p>Please type in the title and content</p>
            <form id="submitPaste" onSubmit={submitPaste}>
                <label className="form-label">Title (optional): </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(event) => { setTitle(event.target.value) }} 
                    className="title"/>
                <br />
                <label className="form-label">Content: </label>
                <input
                    type="text"
                    id="content"
                    value={content}
                    onChange={(event) => { setContent(event.target.value) }}
                    className="content" />
                <br />
                <input type="submit" value="Submit" className="button"/>
                <button type="reset" onClick={resetPaste} className="button">Reset</button>
            </form>
        </section>
    );
}