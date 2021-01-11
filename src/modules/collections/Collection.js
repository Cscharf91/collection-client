import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Collection(props) {
  const [collection, setCollection] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    const getCollection = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/collections/${props.match.params.id}`
        );
        console.log(data.practice.name);
        setCollection(data);
      } catch (err) {
        setError("This collection does not exist");
      }
    };
    getCollection();
  }, [props.match.params.id]);


  return (
    <div>
      {error && <p>{error}</p>}
      {collection && collection.practice && (
        <div>
          <p>{collection.fname}</p>
          <p>{collection.lname}</p>
          <p>Practice: {collection.practice.name}</p>
          <p>{collection.amountDue}</p>
          <p>{collection.amountPaid}</p>
          <p>{collection.phone}</p>
          <p>{collection.dob}</p>
          <p>{collection.ssn}</p>
          <p>{collection.address}</p>
          <p>{collection.city}</p>
          <p>{collection.state}</p>
          <p>{collection.zip}</p>
          <p>{collection.date}</p>
        </div>
      )}
      <Link to={`/collections/props.match.params.id/edit`}>Edit Collection</Link>
    </div>
  );
}

export default Collection;