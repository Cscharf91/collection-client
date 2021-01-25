import React from "react";
import Reminders from "./Reminders";

function Home(props) {
  const { user } = props;
  return (
    <div className="card">
      <Reminders />
    </div>
  );
}

export default Home;