interface IHeader {
  pageTitle: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPageView: React.Dispatch<React.SetStateAction<string>>;
  pageView: string;
  username: string;
}

export function Header(props: IHeader): JSX.Element {
  function handleUserClick(event: React.ChangeEvent<HTMLSelectElement>) {
    props.setUsername(event.target.value);
  }

  function handlePageClick(page: string) {
    props.setPageView(page);
  }

  const userList = ["Tavija", "Dave", "Jamie", "Liam", "Philippa", "Fay", "Baxter", "Mia", "Albie", "Marvin"]

  if (props.pageView === "enterNewSuggestion") {
    return (
      <div className="new-suggestion-header">
        <div className="flex-column header-menu">
          <button className="cancel-button" onClick={() => { handlePageClick("allSugestions") }}>
            Return
          </button>
          <select onChange={handleUserClick} className="user-list right-column new-suggestion-user-list">
            {[...userList.map((user) => (<option key={user} value={user} selected={(user === props.username)}>{user}</option>))]}
            <option value="admin" selected={"admin" === props.username}>Admin</option>
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
            {[...userList.map((user) => (<option key={user} value={user} selected={(user === props.username)}>{user}</option>))]}
            <option value="admin" selected={"admin" === props.username}>Admin</option>
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
