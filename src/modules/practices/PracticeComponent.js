import React from "react";

function PracticeComponent(props) {
  const { practice } = props;
  return (
    <div>
      <h1><strong>{practice.name}</strong></h1>
      {practice.code && <p><strong>Code:</strong> {practice.code}</p>}
      {practice.address && <p><strong>Address:</strong> {practice.address}</p>}
      {practice.city && <p><strong>City:</strong> {practice.city}</p>}
      {practice.state && <p><strong>State:</strong> {practice.state}</p>}
      {practice.zip && <p><strong>Zip:</strong> {practice.zip}</p>}
      {practice.phone && <p><strong>Phone:</strong> {practice.phone}</p>}
      {practice.type && <p><strong>Type:</strong> {practice.type}</p>}
    </div>
  );
}

export default PracticeComponent;