import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm'; // Make sure this path is correct
import './ChatPage.css';

// Chat message component
const Message = ({ text, isUser }) => {
  const messageClass = isUser ? 'user' : 'other';
  return (
    <div className={`message ${messageClass}`}>
      {text}
    </div>
  );
};

// Main Chat Page component
const ChatPage = ({ onBack }) => {
  const [messages, setMessages] = useState([]);

  // Function to send message (to be passed to FeedbackForm)
  const sendChat = (chatMessage) => {
    if (chatMessage.trim() !== '') {
      setMessages([...messages, { text: chatMessage, isUser: true }]);
    }
  };

  return (
    <div className="chat-page">
      <div className="top-right">
        <button className="back-button" onClick={onBack}>Exit</button>
      </div>
      <div className="messages-list">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} isUser={msg.isUser} />
        ))}
      </div>
      {/* Reusing FeedbackForm component for sending messages */}
        <div className="feedback-form-container">
            <FeedbackForm onSend={sendChat} />
        </div>
    </div>
  );
};

export default ChatPage;
