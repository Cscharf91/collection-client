import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PracticeComponent from "./PracticeComponent";

function Practice(props) {
  const token = JSON.parse(localStorage.token);
  const [practice, setPractice] = useState({});
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const getPractice = async () => {
      try {
        const { data } = await axios.get(
          `https://mighty-refuge-61161.herokuapp.com/api/practices/${props.match.params.id}`
        );
        setPractice(data);
      } catch (err) {
        setError("This practice does not exist");
      }
    };
    const getPracticeCollections = async () => {
      try {
        const { data } = await axios.get(
          `https://mighty-refuge-61161.herokuapp.com/api/practices/${props.match.params.id}/collections`
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

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this?')) {
      try {
        await axios.delete(`https://mighty-refuge-61161.herokuapp.com/api/practices/${id}`, token);
        window.location = '/practices';
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      <div className="card">
      {error && <p>{error}</p>}
      {practice && (
        <PracticeComponent practice={practice} />
      )}
      <Link to={`/practices/${practice._id}/edit`}><p>Edit Practice</p></Link>
      <button onClick={() => handleDelete(practice._id)} className="danger">Delete</button>
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