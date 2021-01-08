import axios from "axios";
import React, { useEffect, useState } from "react";

function Practice(props) {
  const [practice, setPractice] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    const getPractice = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/practices/${props.match.params.id}`
        );
        setPractice(data);
      } catch (err) {
        setError("This practice does not exist");
      }
    };
    getPractice();
  }, [props.match.params.id]);


  return (
    <div>
      {practice && (
        <div>
          <p>{practice.name}</p>
          <p>{practice.code}</p>
          <p>{practice.address}</p>
          <p>{practice.city}</p>
          <p>{practice.state}</p>
          <p>{practice.zip}</p>
          <p>{practice.phone}</p>
          <p>{practice.type}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Practice;