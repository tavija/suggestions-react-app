import { useState } from "react";

interface NewSuggestionFormProps {
  fetchSuggestionsList: () => Promise<void>;
  username: string;
}

export function NewSuggestionForm(props: NewSuggestionFormProps): JSX.Element {
  //useState for tracking title, content, name of new suggestion. Used later to POST suggestion
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("anonymous");

  //useStates used for conditional rendering to display additional messages
  const [shouldDislaySuccessfulSubmitMessage, setShouldDislaySuccessfulSubmitMessage] = useState(false);
  const [shouldDisplayEmptyTitleMessage, setShouldDisplayEmptyTitleMessage] = useState(false);

  //POST request to send suggestion to DB when 'Submit' button is clicked, clears the form and tells the parent to fetch new suggestionsList
  async function submitSuggestion(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const body = { title, content, name };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    if (title === "") {
      setShouldDislaySuccessfulSubmitMessage(false);
      setShouldDisplayEmptyTitleMessage(true);
    } else {
      try {
        const apiBaseURL = process.env.REACT_APP_API_BASE;
        const response = await fetch(
          apiBaseURL + "/suggestion",
          requestOptions
        );
        if (response.status === 201) { //Success response status
          props.fetchSuggestionsList(); //Tells parent to refresh with new suggestionsList 
          resetSuggestionForm();
          setShouldDislaySuccessfulSubmitMessage(true);
        } else {
          console.error("Failed to post. Error: ", response.status)
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  }

  //Resets fields of new suggestion form and hides additional messages
  function resetSuggestionForm() {
    setContent("");
    setTitle("");
    setShouldDislaySuccessfulSubmitMessage(false);
    setShouldDisplayEmptyTitleMessage(false);
  }

  //TODO deal with empty input
  function capitalizeFirstLetter(word: string): string {
    return (word.charAt(0).toUpperCase() + word.slice(1))
  }

  return (
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
          maxLength={200} //TODO provide user feedback when approaching character limit
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
        <button type="reset" onClick={resetSuggestionForm} className="button">
          Reset
        </button>
      {shouldDislaySuccessfulSubmitMessage && (
        <p>
          Thank you for submitting your suggestion! You can submit another one
          or return to view all suggestions.
        </p>
      )}
      {shouldDisplayEmptyTitleMessage && (
        <p>
          Please enter title to submit your suggestion.
        </p>
      )}
      </div>
    </div>
  );
}
