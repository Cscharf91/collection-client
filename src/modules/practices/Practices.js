import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PracticeComponent from "./PracticeComponent";

function Practices(props) {
  const token = JSON.parse(localStorage.token);
  const [practices, setPractices] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getPractices = async () => {
      try {
        const { data } = await axios.get(
          '/api/practices/'
        );
        setPractices(data);
        setIsLoading(false);
      } catch (err) {
        setError("There are no practices. Please create one and then reload this page.");
        setIsLoading(false);
      }
    };
    getPractices();
  }, [props.match.params.id]);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const [searchResult] = practices.filter(practice => practice.code.toUpperCase() === search.toUpperCase());
    if (searchResult) window.location = `/practices/${searchResult._id}`;
  }

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this?')) {
      try {
        await axios.delete(`/api/practices/${id}`, token);
        const updatedPractices = practices.filter(practice => practice._id !== id);
        setPractices(updatedPractices);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      <div className="searchbox">
        <h3>Search by Code:</h3>
        <form onSubmit={handleSubmit}>
          <input name="code" type="text" onChange={handleChange} value={search}/>
          <button className="primary" type="submit">Submit</button>
        </form>
      </div>
      {isLoading && <div className="card"><h3>Loading...</h3></div>}
      {practices.map(practice => (
        <div className="card">
          <PracticeComponent practice={practice} />
          <Link to={`/practices/${practice._id}`}><p>View Practice/Collections</p></Link>
          <Link to={`/practices/${practice._id}/edit`}><p>Edit Practice</p></Link>
          <button onClick={() => handleDelete(practice._id)} className="danger">Delete</button>
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Practices;