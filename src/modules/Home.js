import React from "react";

function Home(props) {
  const { user } = props;
  return (
    <div className="home">
      {user && <p>Hi, {user.username}</p>}
    </div>
  );
}

export default Home;