import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CollectionComponent from "./CollectionComponent";

function Collections(props) {
  const [collections, setCollections] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState();

  useEffect(() => {
    const getCollections = async () => {
      try {
        const { data } = await axios.get(
          'https://mighty-refuge-61161.herokuapp.com/api/collections/'
        );
        console.log(data);
        setCollections(data);
      } catch (err) {
        setError("There are no collections. Please create one and then reload this page.");
      }
    };
    getCollections();
  }, [props.match.params.id]);

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const [searchResult] = collections.filter(collection => collection.lname.toUpperCase() === search.toUpperCase());
    if (searchResult) window.location = `/collections/${searchResult._id}`;
  }

  return (
    <div>
      <div className="searchbox">
        <h3>Search Collections by Last Name:</h3>
        <form onSubmit={handleSubmit}>
          <input name="code" type="text" onChange={handleChange} value={search}/>
          <button className="primary" type="submit">Submit</button>
        </form>
      </div>
      {collections.map(collection => (
        <div className="card-grid">
          <div className="collection-info">
            <CollectionComponent collection={collection} />
            <Link to={`/collections/${collection._id}`}><p>View Collection</p></Link>
            <Link to={`/collections/${collection._id}/edit`}><p>Edit Collection</p></Link>
          </div>
          <div className="collection-scan">
            {collection.scan && <img className="scan-img" src={collection.scan} alt="scan" />}
          </div>
        </div>
      ))}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Collections;