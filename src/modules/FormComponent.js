import React from "react";

function FormComponent(props) {
  const { object, name, type, handleChange, required } = props;
  return (
    <div className="form-component">
      {required &&
        <div className="form-component">
          <label htmlFor={name}>
            {name.charAt(0).toUpperCase() + name.slice(1)}:
          </label>
          <input
            type={type}
            name={name}
            value={object[name]}
            onChange={handleChange}
            required
          />
        </div>
      }
      {!required &&
        <div className="form-component">
          <label htmlFor={name}>
            {name.charAt(0).toUpperCase() + name.slice(1)}:
          </label>
          <input
            type={type}
            name={name}
            value={object[name]}
            onChange={handleChange}
          />
        </div>
      }
    </div>
  );
}

export default FormComponent;