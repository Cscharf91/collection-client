import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PracticeComponent from "./PracticeComponent";

function Practice(props) {
  const [practice, setPractice] = useState({});
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const getPractice = async () => {
      try {
        const { data } = await axios.get(
          `http://mighty-refuge-61161.herokuapp.com/api/practices/${props.match.params.id}`
        );
        setPractice(data);
      } catch (err) {
        setError("This practice does not exist");
      }
    };
    const getPracticeCollections = async () => {
      try {
        const { data } = await axios.get(
          `http://mighty-refuge-61161.herokuapp.com/api/practices/${props.match.params.id}/collections`
        );
        const practiceCollections = data.sort((a, b) => parseInt(a.amountDue) - parseInt(a.amountPaid) < parseInt(b.amountDue) - parseInt(b.amountPaid) ? 1 : -1)
        setCollections(practiceCollections);
      } catch (err) {
        console.log(err);
      }
    }
    getPractice();
    getPracticeCollections();
  }, [props.match.params.id]);


  return (
    <div>
      <div className="card">
      {error && <p>{error}</p>}
      {practice && (
        <PracticeComponent practice={practice} />
      )}
      </div>
      <div className="card">
        <h1>{collections.length} Collection{collections.length === 1 ? '' : 's'} (sorted by total owed now)</h1>
        {collections.length > 0 && collections.map(collection => (
          <Link key={collection._id} to={`/collections/${collection._id}`}><p>{`${collection.fname} ${collection.lname}: $${parseInt(collection.amountDue) - parseInt(collection.amountPaid)}`}</p></Link>
        ))}
      </div>
    </div>
  );
}

export default Practice;