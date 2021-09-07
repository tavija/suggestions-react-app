interface IHeader {
  pageTitle: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPageView: React.Dispatch<React.SetStateAction<string>>;
  pageView: string;
  username: string;
}

export function Header(props: IHeader): JSX.Element {

  //Sets different user
  function handleUserClick(event: React.ChangeEvent<HTMLSelectElement>) {
    props.setUsername(event.target.value);
  }

  //Sets different page view
  function handlePageClick(page: string) {
    props.setPageView(page);
  }

  const userList = [
    "Tavija",
    "Dave",
    "Jamie",
    "Liam",
    "Philippa",
    "Fay",
    "Baxter",
    "Mia",
    "Albie",
    "Marvin",
  ];

  function selectTagWithUsers(style: string) {
    return (
      <select
        onChange={handleUserClick}
        className={"user-list right-column " + style}
        defaultValue={props.username}
      >
        {[
          ...userList.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          )),
        ]}
        <option value="admin">Admin</option>
      </select>
    )
  }

  if (props.pageView === "newSuggestion") {
    return (
      <div className="new-suggestion-header">
        <div className="flex-column header-menu">
          <button
            className="cancel-button"
            onClick={() => {
              handlePageClick("allSuggestions");
            }}
          >
            Return
          </button>
          {selectTagWithUsers("new-suggestion-user-list")}
        </div>
        <div className="header center">
          <h1 className="page-title">{props.pageTitle}</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="suggestion-history-header">
        <div className="flex-column header-menu">
          <div></div>
          {selectTagWithUsers("suggestion-history-user-list")}
        </div>
        <div className="header center">
          <h1 className="page-title">{props.pageTitle}</h1>
            <button
              className="button"
              style={{ width: 200 }}
              onClick={() => {
                handlePageClick("newSuggestion");
              }}
            >
              Make a suggestion
            </button>
        </div>
      </div>
    );
  }
}
