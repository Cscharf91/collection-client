import React from "react";

function Home(props) {
  const { user } = props;
  return (
    <div className="card">
      {user && <p>Welcome, {user.username}</p>}
      <p>(this page is empty for now)</p>
    </div>
  );
}

export default Home;