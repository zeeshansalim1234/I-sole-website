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
  const [currentThreadIndex, setCurrentThreadIndex] = useState(null);
  const [curr_username, setUsername] = useState('');
  const [patientUsername, setPatientUsername] = useState('');

  useEffect(() => {
    // Retrieve the current username from local storage
    const storedUsername = localStorage.getItem('curr_username');
    const storedPatientId = localStorage.getItem('patientID');

    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Handle the case where the username is not found in local storage
      console.error("Username not found in local storage");
    }

    if (storedPatientId) {
      getPatientUsername(storedPatientId);
    } else {
      console.error("Patient ID not found in local storage");
    }
  }, []); // Empty dependency array to run only on component mount


  useEffect(() => {
    console.log("Current username:", curr_username);
    console.log("Patient username:", patientUsername);
    fetchFeedback();
  }, [curr_username, patientUsername]); // This useEffect runs when curr_username or patientUsername changes
  
  
  const getPatientUsername = async (patientId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/get_username_by_patient_id/${patientId}`);
      if (response.data.success) {
        setPatientUsername(response.data.username);
        localStorage.setItem('patientUsername', response.data.username);
      } else {
        console.error("Failed to fetch patient username");
      }
    } catch (error) {
      console.error("Error fetching patient username:", error);
    }
  };

  // Function to return back to the feedback message list
  const handleBackToFeedback = () => {
    setselectedMessages(null);
    setShowChat(false);
    fetchFeedback(); // fetch feedback again to show new data
  };

  const fetchFeedback = async () => {
    try {
      if (patientUsername) {
        const response = await axios.get(`http://127.0.0.1:5000/get_all_conversations/${patientUsername}`);
        setMessages(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  const handleSendFeedback = async (feedbackMessage) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/start_new_thread', {
        username: patientUsername,
        message: feedbackMessage,
        sender: curr_username,
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
      const response = await axios.get(`http://127.0.0.1:5000/get_one_conversation/${patientUsername}/${index+1}`);
      setselectedMessages(response.data);
      setCurrentThreadIndex(index + 1); // Set the current thread index
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
          <ChatPage onBack={handleBackToFeedback} selectedMessages={selectedMessages} threadIndex={currentThreadIndex}/>
        )}
      </div>

    </div>
   
  );
};

export default FeedbackPage;
