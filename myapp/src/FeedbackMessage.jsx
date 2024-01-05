import React from 'react';

const FeedbackMessage = ({ date, message, index, doctorName }) => {
  // Get the userRole and currName from local storage
  const userRole = localStorage.getItem('userRole');
  const currUsername = localStorage.getItem('curr_username'); // Replace with your actual storage key

  // Define the doctor's name based on the userRole and currName
  let doctorDisplayName = doctorName;

  if (userRole === 'Doctor' && doctorName === currUsername) {
    doctorDisplayName = `Dr. ${doctorName}`;
  }

  return (
    <div className="feedback-message">
      <div className="message-header">
        <div className="doctor-info">
          <span className="doctor-icon">👤</span> {/* Replace with an actual image or icon */}
          <span className="doctor-name">{doctorDisplayName}</span>
        </div>
        <div className="message-details">
          <span className="message-index">{index}</span>
          <span className="message-date">{date}</span>
        </div>
      </div>
      <div className="message-body">{message}</div>
    </div>
  );
};

export default FeedbackMessage;
