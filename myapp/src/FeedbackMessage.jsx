import React from 'react';

const FeedbackMessage = ({ date, message, index, doctorName }) => {
  return (
    <div className="feedback-message">
      <div className="message-header">
        <div className="doctor-info">
          <span className="doctor-icon">👤</span> {/* Replace with an actual image or icon */}
          <span className="doctor-name">{doctorName}</span>
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
