import React from "react";
import Reminders from "./Reminders";

function Home(props) {
  const { user } = props;
  return (
    <div className="card">
      {user && 
        <Reminders />
      }
      {!user &&
        <h1>Please log in to view collections, practices, and notifications.</h1>
      }
    </div>
  );
}

export default Home;