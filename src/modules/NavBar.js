import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  const { user, logOut } = props;

  return (
    <div>
      <Link to="/">
          <button>Home</button>
      </Link>
      {user && <button onClick={logOut}>Log Out</button>}
      {user && (
        <Link to="/practices/create">
          <button>Create Practice</button>
        </Link>
      )}
    </div>
  );
}

export default NavBar;