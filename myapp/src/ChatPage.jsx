import React, { useState, useEffect } from 'react';
import FeedbackForm from './FeedbackForm';
import './ChatPage.css';

const Message = ({ text, isUser }) => {
  const messageClass = isUser ? 'user' : 'other';
  return (
    <div className={`message ${messageClass}`}>
      {text}
    </div>
  );
};

const ChatPage = ({ onBack, selectedMessages }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Check if selectedMessages is an array and has elements
    if (Array.isArray(selectedMessages) && selectedMessages.length > 0) {
      // Map selectedMessages to the required format
      const initialMessages = selectedMessages.map(msg => ({
        text: msg.message,  // Assuming each message object has a 'message' property
        isUser: true      // Set to false assuming these are not user-sent messages
      }));
      setMessages(initialMessages);
    }
  }, [selectedMessages]);

  const sendChat = (chatMessage) => {
    if (chatMessage.trim() !== '') {
      setMessages((prevMessages) => [...prevMessages, { text: chatMessage, isUser: true }]);
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
