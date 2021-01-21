import React from "react";
import { DateTime } from 'luxon';

function CollectionComponent(props) {
  const { collection } = props;
  return (
    <div>
      {collection.fname && <p><strong>First Name:</strong> {collection.fname}</p>}
      {collection.lname && <p><strong>Last Name:</strong> {collection.lname}</p>}
      {collection.practice.name && <p><strong>Practice Name:</strong> {collection.practice.name}</p>}
      {collection.amountDue && collection.amountPaid && <p><strong>Remaining Balance:</strong> ${parseFloat(collection.amountDue) - parseFloat(collection.amountPaid)}</p>}
      {collection.amountDue && <p><strong>Total Due:</strong> ${collection.amountDue}</p>}
      {collection.amountPaid && <p><strong>Amount Paid:</strong> ${collection.amountPaid}</p>}
      {collection.phone && <p><strong>Phone:</strong> {collection.phone}</p>}
      {collection.dob && <p><strong>Date of Birth:</strong> {collection.dob}</p>}
      {collection.ssn && <p><strong>SSN:</strong> {collection.ssn}</p>}
      {collection.address && <p><strong>Address:</strong> {collection.address}</p>}
      {collection.city && <p><strong>City:</strong> {collection.city}</p>}
      {collection.state && <p><strong>State:</strong> {collection.state}</p>}
      {collection.zip && <p><strong>Zip:</strong> {collection.zip}</p>}
      {collection && <p><strong>Collection Added:</strong> {DateTime.fromISO(collection.date).toLocaleString()}</p>}
    </div>);
}

export default CollectionComponent;
