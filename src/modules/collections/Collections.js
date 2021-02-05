import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CollectionComponent from "./CollectionComponent";
import scanPic from '../../images/scan.jpg';

function Collections(props) {
  const token = JSON.parse(localStorage.token);
  const [collections, setCollections] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState('last name');
  const [error, setError] = useState();
  const history = useHistory();

  useEffect(() => {
    const getCollections = async () => {
      try {
        const { data } = await axios.get(
          'https://vast-ravine-96250.herokuapp.com/api/collections/'
        );
        setIsLoading(false);
        setCollections(data);
      } catch (err) {
        setError("There are no collections. Please create one and then reload this page.");
        setIsLoading(false);
      }
    };
    getCollections();
  }, [props.match.params.id]);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    let searchResults;
    switch(filterType) {
      case 'last name':
        searchResults = collections.filter(collection => collection.lname.toUpperCase() === search.toUpperCase());
        break;
      case 'account number':
        searchResults = collections.filter(collection => collection.accountNumber === search);
        break;
      default:
        console.log(filterType);
    }
    if (searchResults) history.push(`/collections/${searchResults[0]._id}`);
  }

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this?')) {
      try {
        await axios.delete(`https://vast-ravine-96250.herokuapp.com/api/collections/${id}`, token);
        const updatedCollections = collections.filter(collection => collection._id !== id);
        setCollections(updatedCollections);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      <div className="searchbox">
        <h3>Search Collections by:</h3>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="last name">Last Name</option>
          <option value="account number">Account Number</option>
        </select>
        <form onSubmit={handleSubmit}>
          <input name="code" type="text" onChange={handleChange} value={search}/>
          <button className="primary" type="submit">Submit</button>
        </form>
      </div>
      {isLoading && <div className="card"><h3>Loading...</h3></div>}
      {collections.map(collection => (
        <div className="card-grid">
          <div className="collection-info">
            <CollectionComponent collection={collection} />
            <Link to={`/collections/${collection._id}`}><p>View Collection</p></Link>
            <Link to={`/collections/${collection._id}/edit`}><p>Edit Collection</p></Link>
            <button onClick={() => handleDelete(collection._id)} className="danger">Delete</button>
          </div>
          <div className="collection-scan">
            {collection.scan && <a href={collection.scan} target="_blank" rel="noreferrer"><img className="scan-img" src={scanPic} alt="scan" /></a>}
          </div>
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Collections;