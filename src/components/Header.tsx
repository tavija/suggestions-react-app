import { PageId } from "../Types";

interface IHeader {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPageView: React.Dispatch<React.SetStateAction<PageId>>;
  pageView: string;
  username: string;
}

export function Header(props: IHeader): JSX.Element {
  //Sets different user
  function handleUserClick(event: React.ChangeEvent<HTMLSelectElement>) {
    props.setUsername(event.target.value);
  }

  //Sets different page view
  function handlePageClick(page: PageId) {
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

  //Select component for Users List
  function displaySelectTagWithUsers(style: string) {
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

  function displayHeaderTitle() {
    return (
      <h1 className="page-title">{(props.pageView === "allSuggestions") ? "Suggestions Box" : "Make a suggestion"}</h1>
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
          {displaySelectTagWithUsers("new-suggestion-user-list")}
        </div>
        <div className="header center">
        {displayHeaderTitle()}
        </div>
      </div>
    );
  } else {
    return (
      <div className="suggestion-history-header">
        <div className="flex-column header-menu">
          <div></div>
          {displaySelectTagWithUsers("suggestion-history-user-list")}
        </div>
        <div className="header center">
          {displayHeaderTitle()}
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
