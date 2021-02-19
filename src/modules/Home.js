import React from "react";
import { Link } from "react-router-dom";
import Reminders from "./Reminders";
import Practices from "./practices/Practices";
import Breakdown from "./Breakdown";

function Home(props) {
  const { user, logOut } = props;
  
  return (
    <div className="home-wrapper">
      {user && 
        <div className="big-card2">
          <Reminders />
        </div>
      }
      {user &&
        <Practices />
      }
      {!user && (
        <div className="column2">
          <h1>Demo <Link to="/login">log in</Link> Info: Email: guest@guest.com - Password: guestpass1</h1>

        </div>
      )}
      {user &&
      <div className="column3">
        {user && (
          <Link to="/practices/create">
            <button className="sidebar-btn">Create Practice</button>
          </Link>
        )}
        {user && (
          <Link to="/collections/create">
            <button className="sidebar-btn">Create Collection</button>
          </Link>
        )}
        {user && (
          <Link to="/collections">
            <button className="sidebar-btn">View Collections</button>
          </Link>
        )}
        {user && (
          <Link to="#">
            <button className="sidebar-btn" onClick={logOut}>Log Out</button>
          </Link>
        )}
      </div>
      }
      {user &&
        <div className="column2">
          <h1>Goals & Breakdowns</h1>
          <Breakdown />
        </div>
      }
    </div>
  );
}

export default Home;
