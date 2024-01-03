import React, { useState } from 'react';
import './Settings.css';
import logo from './images/logo.png'
import zeeshan_profile from './images/zeeshan.png';

function Settings() {
    const [activity, setActivity] = useState(false);
    const [meals, setMeals] = useState(false);
    const [feedback, setFeedback] = useState(false);
  
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


        <main className="settings">
          <h1>Notifications</h1>
          <div className="toggle">
            <label>
              Allow Family Members to see Activity
              <input
                type="checkbox"
                checked={activity}
                onChange={() => setActivity(!activity)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle">
            <label>
              Allow Family Members to see Meals
              <input
                type="checkbox"
                checked={meals}
                onChange={() => setMeals(!meals)}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle">
            <label>
              Allow Family Members to see Doctor's Feedback
              <input
                type="checkbox"
                checked={feedback}
                onChange={() => setFeedback(!feedback)}
              />
              <span className="slider"></span>
            </label>
          </div>
          
          
        </main>
      </div>
    );
  }
  
  export default Settings;
