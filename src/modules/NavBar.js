import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  const { user, logOut } = props;

  return (
    <nav className="navbar">
      <h1>RJS Billing</h1>
      <div className="nav-links">
        <Link to="/">
            <button className="primary">Home</button>
        </Link>
        {user && (
          <Link to="#">
            <button className="primary" onClick={logOut}>Log Out</button>
          </Link>
        )}
        {!user && (
          <Link to="/login">
            <button className="primary">Log In</button>
          </Link>
        )}
        {!user && (
          <Link to="/signup">
            <button className="primary">Sign Up</button>
          </Link>
        )}
        {user && (
          <Link to="/practices/create">
            <button className="primary">Create Practice</button>
          </Link>
        )}
        {user && (
          <Link to="/collections/create">
            <button className="primary">Create Collection</button>
          </Link>
        )}
        {user && (
          <Link to="/practices">
            <button className="primary">View Practices</button>
          </Link>
        )}
        {user && (
          <Link to="/collections">
            <button className="primary">View Collections</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;