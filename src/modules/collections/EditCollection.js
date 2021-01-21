import axios from "axios";
import React, { useEffect, useState } from "react";
import FormComponent from "../FormComponent";

function EditCollection(props) {
  const user = JSON.parse(localStorage.user);
  const token = JSON.parse(localStorage.token);
  const [practices, setPractices] = useState([]);
  const [collection, setCollection] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const getCollection = async () => {
      try {
        const { data } = await axios.get(
          `https://mighty-refuge-61161.herokuapp.com/api/collections/${props.match.params.id}`
        );
        setCollection({ ...data, practice: data.practice._id });
      } catch (err) {
        setError("This Collection does not exist.");
      }
    };
    const getPractices = async () => {
      try {
        const { data } = await axios.get("https://mighty-refuge-61161.herokuapp.com/api/practices");
        setPractices(data);
      } catch (err) {
        setError("Please create a practice before creating a collection.");
      }
    };
    getPractices();
    getCollection();
  }, [props.match.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.patch(
        `https://mighty-refuge-61161.herokuapp.com/api/collections/${props.match.params.id}`,
        collection,
        token
      );
      console.log(data);
      window.location = `/collections/${props.match.params.id}`;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCollection({
      ...collection,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="card">
      {!user && <p>Must be logged in to create a collection.</p>}
      {error && <p>{error}</p>}
      {user && practices && collection && (
        <form onSubmit={handleSubmit}>
          <FormComponent
            name={"fname"}
            object={collection}
            type={"text"}
            required={true}
            handleChange={handleChange}
          />
          <FormComponent
            name={"lname"}
            object={collection}
            type={"text"}
            required={true}
            handleChange={handleChange}
          />
          <div className="form-component">
            <label htmlFor="practice">Practice:</label>
            <select
              onChange={handleChange}
              value={collection.practice}
              name="practice"
              required
            >
              <option value="">Select Practice</option>
              {practices.map((practice) => (
                <option key={practice._id} value={practice._id}>
                  {practice.name}
                </option>
              ))}
            </select>
          </div>
          <FormComponent
            name={"accountNumber"}
            object={collection}
            type={"text"}
            required={true}
            handleChange={handleChange}
          />
          <FormComponent
            name={"amountDue"}
            object={collection}
            type={"number"}
            required={true}
            handleChange={handleChange}
          />
          <FormComponent
            name={"amountPaid"}
            object={collection}
            type={"number"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"dob"}
            object={collection}
            type={"date"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"ssn"}
            object={collection}
            type={"text"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"address"}
            object={collection}
            type={"text"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"city"}
            object={collection}
            type={"text"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"state"}
            object={collection}
            type={"text"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"zip"}
            object={collection}
            type={"text"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"phone"}
            object={collection}
            type={"text"}
            handleChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default EditCollection;
