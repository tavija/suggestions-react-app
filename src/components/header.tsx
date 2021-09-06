interface IHeader {
  pageTitle: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPageView: React.Dispatch<React.SetStateAction<string>>;
}

export function Header(props: IHeader): JSX.Element {
  function handleUserClick(event: React.ChangeEvent<HTMLSelectElement>) {
    props.setUsername(event.target.value);
  }

  function handlePageClick(page: string) {
    props.setPageView(page);
  }

  return (
    <section className="header">
      <h1>{props.pageTitle}</h1>
      <button
        onClick={() => {
          handlePageClick("enterNewSuggestion");
        }}
      >
        Submit New Suggestion
      </button>
      <button
        onClick={() => {
          handlePageClick("allSugestions");
        }}
      >
        View Suggestions
      </button>
      <br></br>
      <select onChange={handleUserClick}>
        <option value="admin">Admin View</option>
        <option value="user">User View</option>
      </select>
    </section>
  );
}
