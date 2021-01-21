import axios from "axios";
import React, { useEffect, useState } from "react";
import CollectionComponent from "./CollectionComponent";

function Collection(props) {
  const [collection, setCollection] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [scan, setScan] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    const getCollection = async () => {
      try {
        const { data } = await axios.get(
          `http://mighty-refuge-61161.herokuapp.com/api/collections/${props.match.params.id}`
        );
        setCollection(data);
        data.scan ? setScan(data.scan) : setScan(null);
      } catch (err) {
        setError("This collection does not exist");
      }
    };
    getCollection();
  }, [props.match.params.id]);

  const handleScanUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
  
      formData.append("image", selectedFile);
      formData.append("collectionId", JSON.stringify(collection._id).slice(1, -1));
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        const { data } = await axios.post('http://mighty-refuge-61161.herokuapp.com/api/upload', formData, config);
        setScan(data.scan);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleScanChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  return (
    <div>
      <div className="card-grid">
        <div className="collection-info">
          <h1>Collection</h1>
          {error && <p>{error}</p>}
          {collection && collection.practice && (
          <CollectionComponent collection={collection} />
          )}
        </div>
        <div className="collection-scan">
          {scan && <img className="scan-img" src={scan} alt="scan" />}
          <form onSubmit={handleScanUpload}>
            <input
              type="file"
              name="scan"
              // value={scan}
              onChange={handleScanChange}
            />
            <button className="primary">Upload Scan</button>
          </form>
        </div>
      </div>
      <div className="card">
        <h1>Notes</h1>
      </div>
    </div>
  );
}

export default Collection;