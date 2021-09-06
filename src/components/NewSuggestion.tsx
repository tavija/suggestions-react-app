import { useState } from "react";
import { Header } from "./header";

interface NewSuggestionProps {
  fetchSuggestionsList: () => Promise<void>; //could be just () => void
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPageView: React.Dispatch<React.SetStateAction<string>>;
  pageView: string
}

export function NewSuggestion(props: NewSuggestionProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [firstSubmit, setFirstSubmit] = useState(false)

  async function submitSuggestion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = { title, content, name };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    if (title !== "") {
      console.log({ title });

      try {
        const apiBaseURL = process.env.REACT_APP_API_BASE;
        const response = await fetch(
          apiBaseURL + "/suggestion",
          requestOptions
        );

        console.log(await response.json());

        //tells the parent to call the function to getSuggestions again to display new info
        props.fetchSuggestionsList(); //if there was follow up action, then use await
      } catch (err) {
        console.error(err.message);
      }
      resetSuggestion();
      setFirstSubmit(true)
    } else {
      console.log("empty title");
    }
  }

  function resetSuggestion() {
    setContent("");
    setTitle("");
    setName("");
    setFirstSubmit(false)
  }

  return (
    <div>
      <Header
        pageTitle="Make a suggestion"
        setUsername={props.setUsername}
        setPageView={props.setPageView}
        pageView={props.pageView}
      />
      <form id="newSuggestion" onSubmit={submitSuggestion} className="new-suggestion">
        <label className="form-label">Title: </label>
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
          className="name-box"
        />
        <br />
        <div className="center">
          <input type="submit" value="Submit" className="button" />
          <button type="reset" onClick={resetSuggestion} className="button">
            Reset
          </button>
        </div>
        {firstSubmit === true &&
          <p className="center">Thank you for submitting your suggestion! You can submit another one or return to view all suggestions.</p>
        }
      </form>
    </div>
  );
}
