import React, { useState } from 'react';

const FeedbackForm = ({ onSend }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSend(feedback); // Use the onSend prop to send the message
    setFeedback(''); // Clear the textarea after sending the message
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your message..."
        className="feedback-textarea"
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default FeedbackForm;
