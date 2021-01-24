import axios from "axios";
import React, { useState, useEffect } from "react";
import FormComponent from "../FormComponent";

function CreateCollection(props) {
  const user = JSON.parse(localStorage.user);
  const token = JSON.parse(localStorage.token);
  const [error, setError] = useState(false);
  const [practices, setPractices] = useState([]);
  const currentPractice = props.location.currentPractice || "";
  const [collection, setCollection] = useState({
    fname: "",
    lname: "",
    practice: currentPractice,
    accountNumber: "",
    amountDue: "",
    amountPaid: "",
    dob: "",
    ssn: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    selectedFile: "",
  });

  useEffect(() => {
    const getPractices = async () => {
      try {
        const { data } = await axios.get("https://mighty-refuge-61161.herokuapp.com/api/practices");
        console.log(data);
        setPractices(data);
      } catch (err) {
        setError("Please create a practice before creating a collection.");
      }
    };
    getPractices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://mighty-refuge-61161.herokuapp.com/api/collections",
        collection,
        token
      );
      window.location = `/collections/${data._id}`;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setCollection({
      ...collection,
      [e.target.name]: e.target.value.toString(),
    });
  };

  return (
    <div className="card">
      {!user && <p>Must be logged in to create a collection.</p>}
      {error && <p>{error}</p>}
      {user && practices && (
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

export default CreateCollection;
