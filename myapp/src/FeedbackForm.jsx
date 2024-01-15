import React, { useState } from 'react';

const FeedbackForm = ({ onSend }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSend) {
      onSend(feedback);
    }
    setFeedback('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      // Submit the form when Enter key is pressed (without Shift key)
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        onKeyPress={handleKeyPress} // Listen for Enter key press
        placeholder="Enter your message..."
        className="feedback-textarea"
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default FeedbackForm;
