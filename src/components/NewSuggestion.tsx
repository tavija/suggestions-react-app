import { useState } from "react";

interface NewSuggestionProps {
  fetchSuggestionsList: () => Promise<void>; //could be just () => void
}

export function NewSuggestion(props: NewSuggestionProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("")

  async function submitSuggestion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = { title, content, name};
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    resetSuggestion();
    try {
      const apiBaseURL = process.env.REACT_APP_API_BASE;
      const response = await fetch(apiBaseURL + "/suggestion", requestOptions)
 
      console.log(await response.json());

      //tells the parent to call the function to getSuggestions again to display new info
      props.fetchSuggestionsList(); //if there was follow up action, then use await
    } catch (err) {
      console.error(err.message);
    }
  }

  function resetSuggestion() {
    setContent("");
    setTitle("");
  }

  return (
    <section className="form flex-left">
      <h2>Enter your suggestions</h2>
      <form id="submitSuggestion" onSubmit={submitSuggestion}>
        <label className="form-label">Title (optional): </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          className="title-box"
        />
        <label className="form-label">Content: </label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          className="content-box"
        />
        <label className="form-label">Name: </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          className="title-box"
        />
        <br />
        <input type="submit" value="Submit" className="button" />
        <button type="reset" onClick={resetSuggestion} className="button">
          Reset
        </button>
      </form>
    </section>
  );
}
