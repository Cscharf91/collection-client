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
        <h1>Demo Log In Info: Email: guest@guest.com - Password: guestpass1</h1>
      }
    </div>
  );
}

export default Home;