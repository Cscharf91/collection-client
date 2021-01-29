import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';

function NavBar(props) {
  const { user, logOut } = props;
  const [navToggle, setNavToggle] = useState("hidden");

  const handleMenuToggle = () => {
    const navDom = document.querySelector('.nav-links');
    if (navToggle === "hidden") {
      setNavToggle("");
      navDom.style.maxHeight = "10000px";
    } else {
      setNavToggle("hidden");
      navDom.style.maxHeight = "0";
    }
  }

  return (
    <nav className={navToggle !== "hidden" ? "navbar menu-selected" : "navbar"}>
      <h1>RJS Billing <br/>
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
            <button>Employee Log In</button>
          </Link>
        )}
        {/* {!user && (
          <Link onClick={() => setNavToggle('hidden')} to="/signup">
            <button>Sign Up</button>
          </Link>
        )} */}
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