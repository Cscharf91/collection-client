import axios from "axios";
import React, { useState } from "react";
import FormComponent from "../FormComponent";

function CreatePractice(props) {
  const user = JSON.parse(localStorage.user);
  const token = JSON.parse(localStorage.token);
  const [practice, setPractice] = useState({
    name: "",
    code: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://vast-ravine-96250.herokuapp.com/api/practices",
        practice,
        token
      );
      window.location = `/practices/${data._id}`;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setPractice({
      ...practice,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="card">
      {!user && <p>Must be logged in to create a practice.</p>}
      {user && (
        <form onSubmit={handleSubmit}>
          <FormComponent
            name={"name"}
            object={practice}
            type={"text"}
            required={true}
            handleChange={handleChange}
          />
          <FormComponent
            name={"code"}
            object={practice}
            type={"text"}
            required={true}
            handleChange={handleChange}
          />
          <FormComponent
            name={"address"}
            object={practice}
            type={"text"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"city"}
            object={practice}
            type={"text"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"state"}
            object={practice}
            type={"text"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"zip"}
            object={practice}
            type={"text"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"phone"}
            object={practice}
            type={"text"}
            handleChange={handleChange}
          />
          <FormComponent
            name={"type"}
            object={practice}
            type={"text"}
            handleChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default CreatePractice;
