import { useState } from "react";
import { Header } from "./header";

interface NewSuggestionProps {
  fetchSuggestionsList: () => Promise<void>; //could be just () => void
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPageView: React.Dispatch<React.SetStateAction<string>>;
  pageView: string;
  username: string;
}

export function NewSuggestion(props: NewSuggestionProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("anonymous");
  const [firstSubmit, setFirstSubmit] = useState(false);
  const [titleAlert, setTitleAlert] = useState(false);

  async function submitSuggestion(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    const body = { title, content, name };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    if (title !== "") {
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
      setFirstSubmit(true);
    } else {
      setFirstSubmit(false);
      setTitleAlert(true);
    }
  }

  function resetSuggestion() {
    setContent("");
    setTitle("");
    setFirstSubmit(false);
    setTitleAlert(false);
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <div>
      <Header
        pageTitle="Make a suggestion"
        setUsername={props.setUsername}
        setPageView={props.setPageView}
        pageView={props.pageView}
        username={props.username}
      />
      <div className="new-suggestion">
        <div className="new-suggestion-flex-column">
          <label className="form-label new-suggestion-left-column">Title</label>
          <textarea
            id="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            className="title-box new-suggestion-right-column"
            rows={1}
            cols={1}
            maxLength={200}
            required
          />
          <label className="form-label new-suggestion-left-column">
            Details
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
            className="content-box new-suggestion-right-column"
            rows={5}
            cols={5}
            wrap="off"
            required
          />
        </div>
        <fieldset>
          <legend>Submit as:</legend>
          <label>
            <input
              type="radio"
              name="anonymous"
              value="anonymous"
              onChange={handleNameChange}
              checked={"anonymous" === name}
            />
            Anonymous
          </label>
          <label>
            <input
              type="radio"
              name={props.username}
              value={props.username}
              onChange={(event) => handleNameChange(event)}
              checked={props.username === name}
            />
            {props.username.charAt(0).toUpperCase() + props.username.slice(1)}
          </label>
        </fieldset>
        <div className="center">
          <button type="submit" onClick={submitSuggestion} className="button">
            Submit
          </button>
          <button type="reset" onClick={resetSuggestion} className="button">
            Reset
          </button>
        </div>
        {firstSubmit === true && (
          <p className="center">
            Thank you for submitting your suggestion! You can submit another one
            or return to view all suggestions.
          </p>
        )}
        {titleAlert === true && (
          <p className="center">
            Please enter title to submit your Suggestion.
          </p>
        )}
      </div>
    </div>
  );
}
