import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';

function NavBar(props) {
  const { user, logOut } = props;
  const [navToggle, setNavToggle] = useState("hidden");

  const handleMenuToggle = () => {
    navToggle === "hidden" ? setNavToggle("") : setNavToggle("hidden");
  }

  return (
    <nav className={navToggle !== "hidden" ? "navbar menu-selected" : "navbar"}>
      <h1>RJS Billing</h1>
      <h1>
        <MenuIcon fontSize="large" onClick={handleMenuToggle} />
      </h1>
      <div className={`nav-links ${navToggle}`}>
        <Link onClick={() => setNavToggle('hidden')} to="/">
            <button>Home</button>
        </Link>
        {user && (
          <Link onClick={() => setNavToggle('hidden')} to="#">
            <button onClick={logOut}>Log Out</button>
          </Link>
        )}
        {!user && (
          <Link onClick={() => setNavToggle('hidden')} to="/login">
            <button>Log In</button>
          </Link>
        )}
        {!user && (
          <Link onClick={() => setNavToggle('hidden')} to="/signup">
            <button>Sign Up</button>
          </Link>
        )}
        {user && (
          <Link onClick={() => setNavToggle('hidden')} to="/practices/create">
            <button>Create Practice</button>
          </Link>
        )}
        {user && (
          <Link onClick={() => setNavToggle('hidden')} to="/collections/create">
            <button>Create Collection</button>
          </Link>
        )}
        {user && (
          <Link onClick={() => setNavToggle('hidden')} to="/practices">
            <button>View Practices</button>
          </Link>
        )}
        {user && (
          <Link onClick={() => setNavToggle('hidden')} to="/collections">
            <button>View Collections</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;