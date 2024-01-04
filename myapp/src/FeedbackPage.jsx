import React, { useState, useEffect } from 'react';
import './App.css'
import FeedbackForm from './FeedbackForm';
import ChatPage from './ChatPage'; 
import FeedbackMessage from './FeedbackMessage';
import logo from './images/logo.png'
import zeeshan_profile from './images/zeeshan.png';
import axios from 'axios';

const FeedbackPage = () => {
 
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setselectedMessages] = useState(null);

  useEffect(() => {
    fetchFeedback();
  }, []);

  
  // Function to return back to the feedback message list
  const handleBackToFeedback = () => {
    setselectedMessages(null);
    setShowChat(false);
  };

  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_all_conversations/Zeeshan');
      setMessages(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching feedback data:", error);
      // Handle error appropriately
    }
  };

  const handleSendFeedback = async (feedbackMessage) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/start_new_thread', {
        username: "Zeeshan",
        message: feedbackMessage
      });
      fetchFeedback(); // fetch feedback again to show new data
      console.log("Feedback Sent:", response.data);
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  };

  // Function to handle message click
  const handleFeedbackClick = async (index) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/get_one_conversation/Zeeshan/${index+1}`);
      setselectedMessages(response.data);
      setShowChat(true);
      fetchFeedback();
      console.log("CLick Conversation:", response.data);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      // Handle error appropriately
    }
  };

  return (

    <div className="app">
      
      <aside className="sidebar">

          <div className="sidebar-logo">
            <img src={logo} alt="I-Sole Diabetic Tracking" />
          </div>

          <nav className="sidebar-nav">
            <ul>
              <li><a href="/homepage">🏠 Homepage</a></li>
              <li><a href="/feedback" className="active">💬 Feedback</a></li>
              <li><a href="/analytics">📊 Analytics</a></li>
              <li><a href="/settings">⚙️ Settings</a></li>
            </ul>
          </nav>

          <div className="sidebar-profile">
            <img src={zeeshan_profile} alt="Dr. Z Chougle" className="sidebar-profile-pic" />
            <div className="sidebar-profile-name">Dr. Z Chougle</div>
            <button className="signout-button">➜</button> {/* This is a placeholder icon */}
          </div>

      </aside>

      <div className="main-container">
        {!showChat ? (
          <>
            <main className="content">

              {messages.map((msg, index) => (
                <div key={index} onClick={() => handleFeedbackClick(index)}>
                  <FeedbackMessage
                    date={msg.date}
                    message={msg.message}
                    index={msg.count}
                    doctorName={msg.sender}
                  />
                </div>
              ))}        
            </main>

            <div className="feedback-form-container">
              <FeedbackForm onSend={handleSendFeedback}/>
            </div>
          </>
        ) : (
          <ChatPage onBack={handleBackToFeedback} selectedMessages={selectedMessages}/>
        )}
      </div>

    </div>
   
  );
};

export default FeedbackPage;
