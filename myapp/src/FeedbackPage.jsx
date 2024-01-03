import React, { useState } from 'react';
import './App.css'
import FeedbackForm from './FeedbackForm';
import ChatPage from './ChatPage'; 
import FeedbackMessage from './FeedbackMessage';
import logo from './images/logo.png'
import zeeshan_profile from './images/zeeshan.png';

const FeedbackPage = () => {
  const messages = [
    { date: '17 May 2023', message: 'Your recent glucose trends show a consistent decline, indicating excellent management of your diet and medication. Keep up the good work, and continue maintaining a healthy lifestyle to support these positive changes.', index: 5 },
    { date: '25 May 2023', message: 'Your glucose levels have displayed a slight upward trend in the past few weeks. It\'s essential to review your diet and medication regimen to identify any potential triggers and work towards stabilizing your glucose levels. Consider scheduling a follow-up to discuss adjustments.', index: 2 },
    { date: '10 June 2023', message: 'Your glucose trends reflect remarkable stability, suggesting effective adherence to your treatment plan. Continue maintaining this balance and remember to communicate any significant changes or concerns during your next appointment for ongoing personalized care.', index: 1 },
  ];

  const [showChat, setShowChat] = useState(false);

  // Function to handle message click
  const handleFeedbackClick = () => {
    setShowChat(true); // When a message box is clicked, show the chat
  };

  // Function to return back to the feedback message list
  const handleBackToFeedback = () => {
    setShowChat(false); // Hide the chat and show the feedback list
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
                <div key={index} onClick={handleFeedbackClick}>
                  <FeedbackMessage
                    date={msg.date}
                    message={msg.message}
                    index={msg.index}
                    doctorName={'Dr. Z Chougle'}
                  />
                </div>
              ))}        
            </main>

            <div className="feedback-form-container">
              <FeedbackForm />
            </div>
          </>
        ) : (
          <ChatPage onBack={handleBackToFeedback} />
        )}
      </div>

    </div>
   
  );
};

export default FeedbackPage;
