import { useState } from "react";

interface NewSuggestionProps {
  fetchSuggestionsList: () => Promise<void>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPageView: React.Dispatch<React.SetStateAction<string>>;
  username: string;
}

export function NewSuggestion(props: NewSuggestionProps): JSX.Element {
  //useState for setting title, content, name of new suggestion. Used later to POST suggestion
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("anonymous");

  //useStates used for conditional rendering to display additional messages
  const [firstSubmit, setFirstSubmit] = useState(false);
  const [emptyTitleAlert, setEmptyTitleAlert] = useState(false);

  //POST request to send suggestion to DB when 'Submit' button is clicked
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
        if (response.status === 201) {
          props.fetchSuggestionsList();
          resetSuggestion();
          setFirstSubmit(true);
        } else {
          console.error("Failed to post. Error: ", response.status)
        }

      } catch (err) {
        console.error(err.message);
      }
    } else {
      setFirstSubmit(false);
      setEmptyTitleAlert(true);
    }
  }

  //Resets fields of new suggestion form
  function resetSuggestion() {
    setContent("");
    setTitle("");
    setFirstSubmit(false);
    setEmptyTitleAlert(false);
  }

  function capitalizeFirstLetter(word: string) {
    return (word.charAt(0).toUpperCase() + word.slice(1))
  }

  return (
    <div>
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
          />
        </div>
        <fieldset>
          <legend>Submit as:</legend>
          <label>
            <input
              type="radio"
              name="anonymous"
              value="anonymous"
              onChange={(event) => {
                setName(event.target.value);
              }}
              checked={"anonymous" === name}
            />
            Anonymous
          </label>
          <label>
            <input
              type="radio"
              name={props.username}
              value={props.username}
              onChange={(event) => {
                setName(event.target.value);
              }}
              checked={props.username === name}
            />
            {capitalizeFirstLetter(props.username)}
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
        {emptyTitleAlert === true && (
          <p className="center">
            Please enter title to submit your Suggestion.
          </p>
        )}
      </div>
    </div>
  );
}
