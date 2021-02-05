import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PracticeComponent from "./PracticeComponent";
import { DateTime } from 'luxon';

function Practice(props) {
  const token = JSON.parse(localStorage.token);
  const [practice, setPractice] = useState({});
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getPractice = async () => {
      try {
        const { data } = await axios.get(
          `https://vast-ravine-96250.herokuapp.com/api/practices/${props.match.params.id}`
        );
        setPractice(data);
        setIsLoading(false);
      } catch (err) {
        setError("This practice does not exist");
        setIsLoading(false);
      }
    };
    const getPracticeCollections = async () => {
      try {
        const { data } = await axios.get(
          `https://vast-ravine-96250.herokuapp.com/api/practices/${props.match.params.id}/collections`
        );
        setCollections(data);
        setFilteredCollections(data);
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
        await axios.delete(`https://vast-ravine-96250.herokuapp.com/api/practices/${id}`, token);
        window.location = '/practices';
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleFilterSelect = (e) => {
    if (collections && e.target.value === 'newest') {
      setFilteredCollections(collections);
    } else if (collections && e.target.value === 'moneyDue') {
      const practiceCollections = [...collections].sort((a, b) => parseFloat(a.amountDue) - parseFloat(a.amountPaid) < parseFloat(b.amountDue) - parseFloat(b.amountPaid) ? 1 : -1);
      setFilteredCollections(practiceCollections);
    } else if (collections && e.target.value === 'oldest') {
      const practiceCollections = [...collections].sort((a, b) => a.date > b.date ? 1 : -1);
      setFilteredCollections(practiceCollections);
    } else if (collections && e.target.value === 'lname') {
      const practiceCollections = [...collections].sort((a, b) => a.lname > b.lname ? 1 : -1);
      setFilteredCollections(practiceCollections);
    }
  }

  return (
    <div>
      <div className="card">
      {error && <p>{error}</p>}
      {isLoading && <h3>Loading...</h3>}
      {practice && (
        <PracticeComponent practice={practice} />
      )}
      <Link to={{
        pathname: `/collections/create`,
        currentPractice: practice._id
      }}><p>Create Collections</p></Link>
      <Link to={`/practices/${practice._id}/edit`}><p>Edit Practice</p></Link>
      <button onClick={() => handleDelete(practice._id)} className="danger">Delete</button>
      </div>
      <div className="card">
        <h1>{collections.length} Collection{collections.length === 1 ? '' : 's'}</h1>
        <p>Sort By:</p>
        <select onChange={(handleFilterSelect)} >
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
          <option value="moneyDue">Amount Owed</option>
          <option value="lname">Alphabetical (last name)</option>
        </select>
        {filteredCollections.length > 0 && filteredCollections.map(collection => (
          <Link key={collection._id} to={`/collections/${collection._id}`}><p>{`${collection.fname} ${collection.lname}: $${(parseFloat(collection.amountDue) - parseFloat(collection.amountPaid)).toFixed(2)}`} | {DateTime.fromISO(collection.date).toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Practice;