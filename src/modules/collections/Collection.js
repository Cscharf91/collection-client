import axios from "axios";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CollectionComponent from "./CollectionComponent";
import scanPic from '../../images/scan.jpg';

function Collection(props) {
  const token = JSON.parse(localStorage.token);
  const [collection, setCollection] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ body: "", collectionId: "", reminder: "" });
  const [scan, setScan] = useState(null);
  const [error, setError] = useState();
  
  const handleNoteChange = (e) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value
    });
  }

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    try {
      setNewNote({...newNote, collectionId: collection._id});
      const { data } = await axios.post(
        `https://mighty-refuge-61161.herokuapp.com/api/notes`, newNote, token
      );
      setNotes([data, ...notes]);
      setNewNote({ ...newNote, body: "", reminder: "" })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getCollection = async () => {
      try {
        const { data } = await axios.get(
          `https://mighty-refuge-61161.herokuapp.com/api/collections/${props.match.params.id}`
        );
        setCollection(data);
        setNewNote({...newNote, collectionId: data._id})
        data.scan ? setScan(data.scan) : setScan(null);
      } catch (err) {
        setError("This collection does not exist");
      }
    };

    const getNotes = async () => {
      try {
        const { data } = await axios.get(
          `https://mighty-refuge-61161.herokuapp.com/api/collections/${props.match.params.id}/notes`, token
        );
        setNotes(data);
      } catch (err) {
        console.log(err);
      }
    }

    getCollection();
    getNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const { data } = await axios.post('https://mighty-refuge-61161.herokuapp.com/api/upload', formData, config);
        setScan(data.scan);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleScanChange = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete this?')) {
      try {
        await axios.delete(`https://mighty-refuge-61161.herokuapp.com/api/collections/${id}`);
        window.location = '/collections';
      } catch (err) {
        console.log(err);
      }
    }
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
          <Link to={`/collections/${collection._id}/edit`}><p>Edit Collection</p></Link>
          <button onClick={() => handleDelete(collection._id)} className="danger">Delete</button>
        </div>
        <div className="collection-scan">
          {scan && <a href={scan} target="_blank" rel="noreferrer"><img className="scan-img" src={scanPic} alt="scan" /></a>}
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
        <form className="card" onSubmit={handleNoteSubmit}>
          <div>
            <label>Message:</label>
            <input required type="text" name="body" value={newNote.body} onChange={handleNoteChange} />
            <label>Reminder Date (optional)</label>
            <input type="date" name="reminder" value={newNote.reminder} onChange={handleNoteChange} />
          </div>
          <button type="submit" className="primary">Submit</button>
        </form>
        {notes.map(note => (
          <div className="card" key={note._id}>
            <p><strong>Created:</strong> {DateTime.fromISO(note.date).toLocaleString()}</p>
            {note.reminder && <p><strong>Reminder:</strong> {DateTime.fromISO(note.reminder).toLocaleString()}</p>}
            <p>{note.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;