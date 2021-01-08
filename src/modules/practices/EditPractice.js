import axios from "axios";
import React, { useEffect, useState } from "react";
import FormComponent from "../FormComponent";

function EditPractice(props) {
  const user = JSON.parse(localStorage.user);
  const token = JSON.parse(localStorage.token);
  const [practice, setPractice] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const getPractice = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/practices/${props.match.params.id}`
        );
        setPractice(data);
      } catch (err) {
        setError("This practice does not exist.");
      }
    };
    getPractice();
  }, [props.match.params.id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.patch(
        `http://localhost:5000/api/practices/${props.match.params.id}`,
        practice,
        token
      );
      console.log(data);
      window.location = `/practices/${props.match.params.id}`;
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
    <div>
      {!user && <p>Must be logged in to edit a practice.</p>}
      {error && <p>{error}</p>}
      {user && practice && (
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

export default EditPractice;
