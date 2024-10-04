import React from 'react';

const SubmissionDialog = ({ info, onClose }) => {
  return (
    <div>
      <h3>Submission Successful</h3>
      <p>Here are your details:</p>
      <p><strong>Name:</strong> {info.name}</p>
      <p><strong>Email:</strong> {info.email}</p>
      <p><strong>Zipcode:</strong> {info.zipcode}</p>
      <p><strong>Address:</strong> {info.address}</p>
      <p><strong>Phone:</strong> {info.phone}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SubmissionDialog;

