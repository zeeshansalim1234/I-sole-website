import React, { useState, useEffect } from 'react';
import FeedbackForm from './FeedbackForm';
import axios from 'axios';  // Import axios
import './ChatPage.css';

const Message = ({ text, isUser }) => {
  const messageClass = isUser ? 'user' : 'other';
  return (
    <div className={`message ${messageClass}`}>
      {text}
    </div>
  );
};

const ChatPage = ({ onBack, selectedMessages,threadIndex }) => {
  const [messages, setMessages] = useState([]);
  const username = 'Zeeshan'; // Set the username

  useEffect(() => {
    if (Array.isArray(selectedMessages) && selectedMessages.length > 0) {
      const initialMessages = selectedMessages.map(msg => ({
        text: msg.message,
        isUser: msg.sender === username
      }));
      setMessages(initialMessages);
    }
  }, [selectedMessages]);

  const sendChat = async (chatMessage) => {
    if (chatMessage.trim() !== '') {
      // Add message to UI
      setMessages(prevMessages => [...prevMessages, { text: chatMessage, isUser: true }]);
      
      // Send message to server
      try {
        const response = await axios.post('http://127.0.0.1:5000/add_message', {
          username: username,
          index: threadIndex,
          message: chatMessage
        });

        console.log('Message sent to server:', response.data);
      } catch (error) {
        console.error('Error sending message to server:', error);
      }
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
      <div className="feedback-form-container">
        <FeedbackForm onSend={sendChat} />
      </div>
    </div>
  );
};

export default ChatPage;
