import React, { useState, useEffect } from 'react';
import FeedbackForm from './FeedbackForm';
import axios from 'axios';  // Import axios
import './ChatPage.css';

// Message component to display text, date, and time
const Message = ({ text, date, time, isUser }) => {
  const messageClass = isUser ? 'user' : 'other';
  return (
    <div className={`message ${messageClass}`}>
      <div className="message-text">{text}</div>
      <div className="message-footer">
        <div className="message-time">{time}</div>
      </div>
    </div>
  );
};


const ChatPage = ({ onBack, selectedMessages,threadIndex }) => {
  const [messages, setMessages] = useState([]);
  const [currUsername, setCurrUsername] = useState('');
  const [patientUsername, setpatientUsername] = useState('');

  useEffect(() => {

    const storedUsername = localStorage.getItem('curr_username');
    const patientUsername = localStorage.getItem('patientUsername');

    if (storedUsername) {
      setCurrUsername(storedUsername);
    } else {
      console.error("Username not found in local storage");
    }

    if (patientUsername) {
      setpatientUsername(patientUsername);
    } else {
      console.error("Username not found in local storage");
    }

    if (Array.isArray(selectedMessages) && selectedMessages.length > 0) {
      const initialMessages = selectedMessages.map(msg => ({
        text: msg.message,
        date: msg.date,
        time: msg.time,
        isUser: msg.sender === currUsername // Check if the sender is the current user
      }));
      setMessages(initialMessages);
    }
  }, [selectedMessages, currUsername]);

  const sendChat = async (chatMessage) => {
    if (chatMessage.trim() !== '') {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString(); // Format as 'MM/DD/YYYY'
      const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format as 'HH:MM AM/PM'

      setMessages(prevMessages => [...prevMessages, { text: chatMessage, date: formattedDate, time: formattedTime, isUser: true }]);
      
      try {
        const response = await axios.post('http://127.0.0.1:5000/add_message', {
          username: patientUsername,
          index: threadIndex,
          message: chatMessage,
          sender: currUsername
        });

        console.log('Message sent to server:', response.data);
      } catch (error) {
        console.error('Error sending message to server:', error);
      }
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-page-header">
        <h1> Dr. Hamdaan Younus</h1>
      </div>
      <div className="top-right">
        <button className="back-button" onClick={onBack}>Exit</button>
      </div>
      <div className="messages-list">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} date={msg.date} time={msg.time} isUser={msg.isUser} />
        ))}
      </div>
      <div className="feedback-form-container">
        <FeedbackForm onSend={sendChat} />
      </div>
    </div>
  );
};

export default ChatPage;
