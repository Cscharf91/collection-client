import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';

function NavBar(props) {
  const { user, logOut } = props;
  return (
    <nav className="navbar">
      <Link to="/"><h1>Demo Billing</h1></Link>
    </nav>
  );
}

export default NavBar;