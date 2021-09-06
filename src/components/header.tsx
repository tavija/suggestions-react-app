interface IHeader {
  pageTitle: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPageView: React.Dispatch<React.SetStateAction<string>>;
  pageView: string;
}

export function Header(props: IHeader): JSX.Element {
  function handleUserClick(event: React.ChangeEvent<HTMLSelectElement>) {
    props.setUsername(event.target.value);
  }

  function handlePageClick(page: string) {
    props.setPageView(page);
  }

  if (props.pageView === "enterNewSuggestion") {
    return (
      <div className="new-suggestion-header">
        <div className="flex-column header-menu">
          <button className="cancel-button" onClick={() => { handlePageClick("allSugestions") }}>
            Return
          </button>
          <select onChange={handleUserClick} className="user-list right-column new-suggestion-user-list">
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="header center">
          <h1 className="page-title">{props.pageTitle}</h1>
        </div>
      </div>
    )
  } else {
  return (
    <div className="suggestion-history-header">
      <div className="flex-column header-menu">
        <div></div>
        <select onChange={handleUserClick} className="user-list right-column suggestion-history-user-list">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <div className="header center">
        <h1 className="page-title">{props.pageTitle}</h1>
        {props.pageView === "allSugestions" &&
          <button className="button" style={{ width: 200 }} onClick={() => { handlePageClick("enterNewSuggestion") }}>
            Make a suggestion
          </button>}
      </div>
    </div>
  );
}
}
